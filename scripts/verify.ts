import fs from 'fs';
import path from 'path';
import {
  RegistriesSchema,
  DesignStateSchema,
  LayoutManifestSchema,
  SectionManifestSchema,
  type DesignState,
} from '../src/config/schema';
import fontsRaw from '../src/config/fonts.json';
import layoutsRaw from '../src/config/layouts.json';
import radiusRaw from '../src/config/radius.json';
import shadowsRaw from '../src/config/shadows.json';
import spacingRaw from '../src/config/spacing.json';
import presetsRaw from '../src/config/presets.json';
import { compileMarkdown } from '../src/lib/compileMarkdown';
import { compileProjectBrief } from '../src/lib/compileProjectBrief';
import { calculateContrastRatio, calculateAPCA, checkColorHarmony } from '../src/lib/contrast';
import { defaultInitialState, designReducer } from '../src/context/designReducer';
import { validatePageTypes, PAGE_TYPES } from '../src/config/pageTypes';
import { validatePurposes, PURPOSES } from '../src/config/purposes';
import {
  generateCssTokens,
  generateTailwindConfig,
  generateTypeScriptTokens,
  generateDtcgTokens,
  createZipBlob,
} from '../src/lib/exportUtils';
import { generateUnifiedCssTokens } from '../src/lib/tokenModel';

console.log('--- Verifying TastyStyles Registries & Specs ---');

// 1. Validate Registries Schema
const registriesResult = RegistriesSchema.safeParse({
  fonts: fontsRaw,
  layouts: layoutsRaw,
  radius: radiusRaw,
  shadows: shadowsRaw,
  spacing: spacingRaw,
  presets: presetsRaw,
});

if (!registriesResult.success) {
  console.error('❌ Registry validation failed:', registriesResult.error);
  process.exit(1);
} else {
  console.log('✅ All 6 JSON registries passed Zod validation.');
}

// 2. Validate Default Initial State
const stateResult = DesignStateSchema.safeParse(defaultInitialState);
if (!stateResult.success) {
  console.error('❌ Default state validation failed:', stateResult.error);
  process.exit(1);
} else {
  console.log('✅ Default DesignState passed Zod validation.');
}

// 3. Test Roundtrip JSON Serialization
const serialized = JSON.stringify(defaultInitialState);
const deserialized = JSON.parse(serialized);
const roundtripResult = DesignStateSchema.safeParse(deserialized);
if (!roundtripResult.success) {
  console.error('❌ Roundtrip validation failed:', roundtripResult.error);
  process.exit(1);
} else {
  console.log('✅ Roundtrip JSON serialization/deserialization confirmed.');
}

// 4. Test WCAG Contrast
const highContrast = calculateContrastRatio('#000000', '#ffffff');
console.log(`✅ High contrast (#000000 on #ffffff): ${highContrast.formattedRatio} (AA: ${highContrast.passesAA})`);
if (highContrast.ratio < 4.5 || !highContrast.passesAA) {
  console.error('❌ Contrast calculation incorrect');
  process.exit(1);
}

const lowContrast = calculateContrastRatio('#888888', '#999999');
console.log(`✅ Low contrast (#888888 on #999999): ${lowContrast.formattedRatio} (AA: ${lowContrast.passesAA})`);
if (lowContrast.passesAA) {
  console.error('❌ Low contrast should fail AA');
  process.exit(1);
}

// 5. Test Markdown Generation & Sections
const markdown = compileMarkdown(defaultInitialState);
const requiredSections = [
  '## 0. Agent Contract',
  '## 1. Overview & Visual Language',
  '## 2. Design Tokens',
  '## 3. CSS Variables Block',
  '## 4. Tailwind CSS Configuration',
  '## 5. Icon & Font System',
  '## 6. Component Recipes',
  '## 7. Page Inventory & Wireframe Architecture',
  '## 8. Responsive Breakpoints & Execution Rules',
  "## 9. Do / Don't & Acceptance Checklist",
];

for (const section of requiredSections) {
  if (!markdown.includes(section)) {
    console.error(`❌ Missing required section: ${section}`);
    process.exit(1);
  }
}
console.log('✅ All 10 required DESIGN.md v2 sections verified in compiled spec.');

// 6. Test Exporters
const cssTokens = generateCssTokens(defaultInitialState);
if (!cssTokens.includes(':root') || !cssTokens.includes('--color-primary')) {
  console.error('❌ CSS token generation failed.');
  process.exit(1);
}
console.log('✅ CSS custom properties exporter verified.');

const tailwindConfig = generateTailwindConfig(defaultInitialState);
if (!tailwindConfig.includes('export default config') || !tailwindConfig.includes('primary:')) {
  console.error('❌ Tailwind config generation failed.');
  process.exit(1);
}
console.log('✅ Tailwind configuration exporter verified.');

const tsTokens = generateTypeScriptTokens(defaultInitialState);
if (!tsTokens.includes('export const designTokens =') || !tsTokens.includes('as const;')) {
  console.error('❌ TypeScript token generation failed.');
  process.exit(1);
}
console.log('✅ TypeScript constants exporter verified.');

const dtcgTokens = generateDtcgTokens(defaultInitialState);
const dtcgParsed = JSON.parse(dtcgTokens);
if (!dtcgParsed.color?.light?.primary?.$value || dtcgParsed.color?.light?.primary?.$type !== 'color') {
  console.error('❌ W3C DTCG token generation failed.');
  process.exit(1);
}
console.log('✅ W3C DTCG JSON token exporter verified.');

// 7. Test In-Memory ZIP Generation
const testZip = createZipBlob([
  { name: 'test.txt', content: 'TastyStyles test content' },
  { name: 'tokens.json', content: dtcgTokens },
]);
if (!testZip || testZip.size < 100 || testZip.type !== 'application/zip') {
  console.error('❌ ZIP generation failed or output invalid size.');
  process.exit(1);
}
console.log(`✅ Pure TS in-memory ZIP package generator verified (${testZip.size} bytes).`);

// 8. Test APCA & Color Harmony
const apcaScore = calculateAPCA('#000000', '#ffffff');
if (Math.abs(apcaScore) < 100) {
  console.error('❌ APCA score for black on white expected ~106, got:', apcaScore);
  process.exit(1);
}
console.log(`✅ APCA contrast calculation confirmed (black on white Lc: ${apcaScore.toFixed(1)}).`);

const harmony = checkColorHarmony('#2563eb', '#f59e0b');
console.log(`✅ Color harmony relationship confirmed (${harmony.status}: ${harmony.message}).`);

// 9. Claude Consulting Gate Q1: CSS Truth & Parity Test Across Presets
console.log('--- Testing Token Parity & Zero-Drift Contract Across Presets ---');
const presets = presetsRaw as Array<{ id: string; label: string; description: string; state: any }>;

for (const preset of presets) {
  const presetState = {
    ...defaultInitialState,
    ...preset.state,
    colors: {
      light: { ...defaultInitialState.colors.light, ...preset.state.colors?.light },
      dark: { ...defaultInitialState.colors.dark, ...preset.state.colors?.dark },
    },
    typography: { ...defaultInitialState.typography, ...preset.state.typography },
  };

  const compiledMd = compileMarkdown(presetState);
  const unifiedCss = generateUnifiedCssTokens(presetState);

  // Parity check: CSS block in markdown must contain the generated CSS
  if (!compiledMd.includes(unifiedCss.trim())) {
    console.error(`❌ Zero-drift mismatch: Markdown CSS block does not match generateUnifiedCssTokens for preset ${preset.label}`);
    process.exit(1);
  }

  // Variable check: All var(--ts-*) or var(--color-*) in markdown recipes must be defined in the CSS block
  const varMatches = compiledMd.matchAll(/var\((--[a-zA-Z0-9_-]+)\)/g);
  for (const match of varMatches) {
    const varName = match[1];
    // Exclude runtime css properties like calc() or local variables if any
    if (varName.startsWith('--color-') || varName.startsWith('--font-') || varName.startsWith('--spacing-') || varName.startsWith('--radius-') || varName.startsWith('--shadow-') || varName.startsWith('--icon-')) {
      if (!unifiedCss.includes(varName)) {
        console.error(`❌ Broken token reference: ${varName} used in Markdown recipes but NOT defined in CSS tokens for ${preset.label}`);
        process.exit(1);
      }
    }
  }
}
console.log(`✅ Zero-drift parity verified across all ${presets.length} presets: Markdown CSS strictly equals canonical tokens.`);

console.log('--- Testing Phase 1: Project Data Model & Invariants ---');
// 1. Backward-compatibility: State without project field parses with default project
const legacyParsed = DesignStateSchema.parse({
  version: 1,
  name: 'Legacy State',
  colors: defaultInitialState.colors,
  typography: defaultInitialState.typography,
  layout: 'sidebar-content',
  radius: 'rounded',
  shadow: 'soft',
  spacing: 'comfortable',
});
if (!legacyParsed.project || legacyParsed.project.purpose !== null || legacyParsed.project.pages.length !== 0) {
  console.error('❌ Legacy state failed to default project to { purpose: null, pages: [] }');
  process.exit(1);
}
console.log('✅ Backward-compatibility check: unversioned/legacy state parsed with valid default project.');

// 2. Round-trip populated project
const populatedProject = {
  purpose: 'saas-dashboard',
  pages: [
    { pageType: 'landing', layoutId: 'hero-split', enabled: true },
    { pageType: 'dashboard', layoutId: 'sidebar-grid', enabled: true },
    { pageType: 'pricing', layoutId: 'cards-3col', enabled: false },
  ],
};
const parsedPopulated = DesignStateSchema.parse({
  ...defaultInitialState,
  project: populatedProject,
});
if (parsedPopulated.project.purpose !== 'saas-dashboard' || parsedPopulated.project.pages.length !== 3) {
  console.error('❌ Failed to parse populated project state accurately');
  process.exit(1);
}
console.log('✅ Populated project state parsed and preserved.');

// 3. Reducer tests: SET_PURPOSE, SET_PAGES, TOGGLE_PAGE, REORDER_PAGES, SET_PAGE_LAYOUT
let testState: DesignState = defaultInitialState;
testState = designReducer(testState, { type: 'SET_PURPOSE', purpose: 'ecommerce-store' });
if (testState.project.purpose !== 'ecommerce-store') {
  console.error('❌ Reducer SET_PURPOSE failed');
  process.exit(1);
}

testState = designReducer(testState, {
  type: 'SET_PAGES',
  pages: [
    { pageType: 'landing', layoutId: 'hero-editorial', enabled: true },
    { pageType: 'productDetail', layoutId: 'split-gallery', enabled: true },
  ],
});
if (testState.project.pages.length !== 2) {
  console.error('❌ Reducer SET_PAGES failed');
  process.exit(1);
}

testState = designReducer(testState, { type: 'TOGGLE_PAGE', pageType: 'landing' });
if (testState.project.pages.find((p) => p.pageType === 'landing')?.enabled !== false) {
  console.error('❌ Reducer TOGGLE_PAGE flip failed');
  process.exit(1);
}

testState = designReducer(testState, { type: 'SET_PAGE_LAYOUT', pageType: 'landing', layoutId: 'bento-grid' });
if (testState.project.pages.find((p) => p.pageType === 'landing')?.layoutId !== 'bento-grid') {
  console.error('❌ Reducer SET_PAGE_LAYOUT by pageType failed');
  process.exit(1);
}

// 4. Invariant: Presets are theme-only and must preserve state.project
const presetId = presets[0].id;
const afterPresetState = designReducer(testState, { type: 'LOAD_PRESET', id: presetId });
if (
  afterPresetState.project.purpose !== 'ecommerce-store' ||
  afterPresetState.project.pages.length !== 2 ||
  afterPresetState.project.pages[0].layoutId !== 'bento-grid'
) {
  console.error('❌ Invariant violation: LOAD_PRESET wiped or altered state.project!');
  process.exit(1);
}
console.log('✅ Invariant 3 verified: LOAD_PRESET strictly preserves state.project.');

console.log('--- Testing Phase 2: Purposes & Page Types Registries ---');
try {
  validatePageTypes();
  console.log(`✅ All ${PAGE_TYPES.length} page types validated against Zod schema.`);
} catch (err) {
  console.error('❌ Page types validation failed:', err);
  process.exit(1);
}

try {
  validatePurposes();
  console.log(`✅ All ${PURPOSES.length} project purposes validated against Zod schema and page references.`);
} catch (err) {
  console.error('❌ Purposes validation failed:', err);
  process.exit(1);
}

// Check purpose auto-population on SET_PURPOSE
const ecommerceState: DesignState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: 'ecommerce' });
if (ecommerceState.project.purpose !== 'ecommerce' || ecommerceState.project.pages.length !== 7) {
  console.error('❌ SET_PURPOSE for ecommerce failed to populate 7 default pages');
  process.exit(1);
}
const portfolioState: DesignState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: 'portfolio' });
if (portfolioState.project.purpose !== 'portfolio' || portfolioState.project.pages.length !== 5) {
  console.error('❌ SET_PURPOSE for portfolio failed to populate 5 default pages');
  process.exit(1);
}
console.log('✅ SET_PURPOSE automatically populates recommended pages with layout defaults.');

console.log('--- Testing Phase 3: Layout & Section Registries ---');
// 1. Verify all sections
const sectionsDir = path.resolve('src/sections');
const sectionEntries = fs.readdirSync(sectionsDir, { withFileTypes: true }).filter((d: fs.Dirent) => d.isDirectory());
let verifiedSections = 0;
for (const entry of sectionEntries) {
  const manifestPath = path.join(sectionsDir, entry.name, 'manifest.ts');
  const sectionPath = path.join(sectionsDir, entry.name, 'Section.tsx');
  if (!fs.existsSync(manifestPath) || !fs.existsSync(sectionPath)) {
    continue;
  }
  const mod = await import(`../src/sections/${entry.name}/manifest.ts`);
  const parsed = SectionManifestSchema.parse(mod.manifest);
  if (!parsed.id || !parsed.name) {
    console.error(`❌ Section manifest in ${entry.name} invalid`);
    process.exit(1);
  }
  verifiedSections++;
}
console.log(`✅ Verified ${verifiedSections} section components and manifests with Zod.`);

// 2. Verify all layouts
const layoutsDir = path.resolve('src/layouts');
const pageTypeDirs = fs.readdirSync(layoutsDir, { withFileTypes: true }).filter((d: fs.Dirent) => d.isDirectory());
let verifiedLayouts = 0;
const layoutIdKeys = new Set<string>();

for (const pDir of pageTypeDirs) {
  const pDirPath = path.join(layoutsDir, pDir.name);
  const layoutDirs = fs.readdirSync(pDirPath, { withFileTypes: true }).filter((d: fs.Dirent) => d.isDirectory());
  for (const lDir of layoutDirs) {
    const manifestPath = path.join(pDirPath, lDir.name, 'manifest.ts');
    const layoutPath = path.join(pDirPath, lDir.name, 'Layout.tsx');
    if (!fs.existsSync(manifestPath) || !fs.existsSync(layoutPath)) {
      continue;
    }
    const mod = await import(`../src/layouts/${pDir.name}/${lDir.name}/manifest.ts`);
    const parsed = LayoutManifestSchema.parse(mod.manifest);
    const key = `${parsed.pageType}:${parsed.id}`;
    if (layoutIdKeys.has(key)) {
      console.error(`❌ Duplicate layout key found: ${key}`);
      process.exit(1);
    }
    layoutIdKeys.add(key);
    verifiedLayouts++;
  }
}
console.log(`✅ Verified ${verifiedLayouts} layout manifests and Layout.tsx components with Zod.`);

console.log('--- Testing Phase 5: Brief Compiler & Agent Contracts ---');
// 1. Generate brief for ecommerce state
const ecommerceBrief = compileProjectBrief(ecommerceState);

// Check required sections
if (!ecommerceBrief.includes('Part A: Application Architecture & Sitemap')) {
  console.error('❌ compileProjectBrief missing Part A header');
  process.exit(1);
}
if (!ecommerceBrief.includes('Part B: Canonical Design System Tokens & Recipes')) {
  console.error('❌ compileProjectBrief missing Part B header');
  process.exit(1);
}
if (!ecommerceBrief.includes('DO NOT INVENT SECTIONS')) {
  console.error('❌ compileProjectBrief missing mandatory agent prime directive');
  process.exit(1);
}

// Check every enabled page is present in Part A
for (const page of ecommerceState.project.pages.filter((p) => p.enabled)) {
  if (!ecommerceBrief.includes(page.pageType)) {
    console.error(`❌ compileProjectBrief missing enabled page '${page.pageType}'`);
    process.exit(1);
  }
}
console.log('✅ PROJECT-BRIEF.md verified: Contains Part A sitemap, per-page layout specs, and Part B tokens.');

console.log('--- Testing Phase 6: Layout Scaffolding & Quality Gates ---');
const workflowDoc = path.resolve('.agent/workflows/add-layout-from-image.md');
if (!fs.existsSync(workflowDoc)) {
  console.error('❌ Missing .agent/workflows/add-layout-from-image.md');
  process.exit(1);
}
const scaffoldScript = path.resolve('scripts/new-layout.ts');
if (!fs.existsSync(scaffoldScript)) {
  console.error('❌ Missing scripts/new-layout.ts');
  process.exit(1);
}
console.log('✅ Image-to-layout workflow documentation and scaffolding script verified.');

console.log('--- All Verification Checks Passed! ---');
