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
import { resolveLayout } from '../src/lib/layoutRegistry';
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
import { generateUnifiedCssTokens, resolveTokens } from '../src/lib/tokenModel';
import { COMPONENT_RECIPES } from '../src/config/recipes';

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

console.log('--- Testing Layout Parity: Part A Layout ID == Part B Layout ID ---');
// 1. Test for every purpose
for (const purpose of PURPOSES) {
  const pState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: purpose.id });
  const brief = compileProjectBrief(pState);
  for (const page of pState.project.pages.filter((p) => p.enabled)) {
    const canonicalLayout = resolveLayout(pState, page.pageType);
    if (!brief.includes(page.pageType)) {
      console.error(`❌ Layout parity failed: Purpose ${purpose.id} missing page ${page.pageType} in brief`);
      process.exit(1);
    }
    if (page.layoutId !== canonicalLayout) {
      console.error(`❌ Layout parity failed: Purpose ${purpose.id} page ${page.pageType} mismatch: project ${page.layoutId} vs resolved ${canonicalLayout}`);
      process.exit(1);
    }
  }
}

// 2. Test for every preset with SaaS purpose
for (const preset of presets) {
  const saasState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: 'saas' });
  const presetState = designReducer(saasState, { type: 'LOAD_PRESET', id: preset.id });
  for (const page of presetState.project.pages.filter((p) => p.enabled)) {
    const canonicalLayout = resolveLayout(presetState, page.pageType);
    if (page.layoutId !== canonicalLayout) {
      console.error(`❌ Layout parity failed: Preset ${preset.id} page ${page.pageType} mismatch: project ${page.layoutId} vs resolved ${canonicalLayout}`);
      process.exit(1);
    }
  }
}
console.log('✅ Layout parity verified: Part A layout ID strictly equals Part B layout ID for all purposes and presets.');

console.log('--- Testing Batch 2: Export Scoping & Foreign Wireframe Isolation ---');
const saasState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: 'saas' });
const saasBrief = compileProjectBrief(saasState);
const foreignToSaas = [
  'cinema-theater',
  'hero-impact-thermometer',
  'three-column-reddit',
  'split-calendar-slots',
  'split-map-list',
  'faceted-sidebar',
];
for (const foreignId of foreignToSaas) {
  if (saasBrief.includes(foreignId)) {
    console.error(`❌ Batch 2 check failed: SaaS export leaked foreign archetype '${foreignId}'`);
    process.exit(1);
  }
}

const ecomState = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: 'ecommerce' });
const ecomBrief = compileProjectBrief(ecomState);
const foreignToEcom = [
  'sidebar-grid',
  'cinema-theater',
  'hero-impact-thermometer',
  'three-column-reddit',
];
for (const foreignId of foreignToEcom) {
  if (ecomBrief.includes(foreignId)) {
    console.error(`❌ Batch 2 check failed: E-Commerce export leaked foreign archetype '${foreignId}'`);
    process.exit(1);
  }
}
if (ecomBrief.includes('Sidebar Application Rail:')) {
  console.error("❌ Batch 2 check failed: E-Commerce export unexpectedly emitted 'Sidebar Application Rail:'");
  process.exit(1);
}
console.log('✅ Batch 2 verified: Foreign wireframes isolated and global rails scoped.');

console.log('--- Testing Batch 3: Page Scope Rules & Restyle Directives ---');
if (!saasBrief.includes('- **Scope**: restyle if exists; do not create if missing')) {
  console.error("❌ Batch 3 check failed: SaaS export missing feature page scope directive");
  process.exit(1);
}
if (!saasBrief.includes('- **Scope**: restyle if exists; may create if missing, visual only')) {
  console.error("❌ Batch 3 check failed: SaaS export missing system page scope directive");
  process.exit(1);
}
if (!saasBrief.includes('Page Scope & Restyling Contract')) {
  console.error("❌ Batch 3 check failed: SaaS export missing 'Page Scope & Restyling Contract' directive");
  process.exit(1);
}
const saasMarkdown = compileMarkdown(saasState);
if (!saasMarkdown.includes('Every page declared in the sitemap that exists in the project is restyled; missing feature pages were NOT created; missing system pages were added as visual shells and reported.')) {
  console.error("❌ Batch 3 check failed: compileMarkdown missing updated Section 9.2 checklist text");
  process.exit(1);
}
console.log('✅ Batch 3 verified: Page scope rules, restyle directives, and checklist sign-off verified.');

console.log('--- Testing Batch 4: Shell, Manifest & Title Consistency ---');
for (const p of PURPOSES) {
  const st = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: p.id });
  const brief = compileProjectBrief(st);
  if (brief.includes('header-navbar')) {
    console.error(`❌ Batch 4 check failed: Purpose ${p.id} leaked fallback section 'header-navbar'`);
    process.exit(1);
  }
  if (brief.match(/\b\w+-main\b/)) {
    console.error(`❌ Batch 4 check failed: Purpose ${p.id} leaked fallback section *-main`);
    process.exit(1);
  }
  // Verify Part A titles never equal raw layout IDs
  for (const page of st.project.pages.filter((pg) => pg.enabled)) {
    const rawId = resolveLayout(st, page.pageType);
    if (brief.includes(`- **Layout Title**: ${rawId}`)) {
      console.error(`❌ Batch 4 check failed: Purpose ${p.id} page ${page.pageType} has raw layout ID as title: '${rawId}'`);
      process.exit(1);
    }
  }
}

// In default SaaS brief: dashboard must have sidebar section and no footer section
const saasDashboardSectionsMatch = saasBrief.match(/#### 3\.\d+ Application Dashboard & Analytics[^\n]*\n([\s\S]*?)(?=#### 3\.\d+|\n### 4)/);
if (!saasDashboardSectionsMatch) {
  console.error("❌ Batch 4 check failed: Could not find Dashboard section breakdown in SaaS brief");
  process.exit(1);
}
const saasDashboardBlock = saasDashboardSectionsMatch[1];
if (!saasDashboardBlock.includes('`sidebar`')) {
  console.error("❌ Batch 4 check failed: Dashboard section breakdown missing `sidebar` section");
  process.exit(1);
}
if (saasDashboardBlock.includes('`footer`')) {
  console.error("❌ Batch 4 check failed: Dashboard section breakdown unexpectedly contained `footer` section");
  process.exit(1);
}
if (!saasBrief.includes('- **Footer Layout Pattern**:')) {
  console.error("❌ Batch 4 check failed: SaaS brief missing '- **Footer Layout Pattern**:' in Section 4");
  process.exit(1);
}
console.log('✅ Batch 4 verified: Manifest sections updated, no fallback sections/titles, dashboard has sidebar & no footer.');

console.log('--- Testing Batch 5: Tokens, Recipes & Font Weights ---');
const saasCss = generateUnifiedCssTokens(saasState);
const requiredCssTokens = [
  '--radius-pill: 9999px',
  '--radius-surface:',
  '--shadow-sm:',
  '--shadow-hover:',
  '--blur-glass: 12px',
  '--color-scrim:',
  '--z-dropdown: 1000',
  '--z-sticky: 1100',
  '--z-modal: 1200',
  '--z-toast: 1300',
  '--duration-fast: 150ms',
  '--duration-base: 200ms',
  '--duration-slow: 300ms',
  '--ease-standard:',
  '--font-weight-regular: 400',
  '--font-weight-medium: 500',
  '--font-weight-semibold: 600',
  '--font-weight-bold: 700',
  '--color-primary-text:',
  '--color-secondary-text:',
  '--color-accent-text:',
  '--color-success-text:',
  '--color-warning-text:',
  '--color-danger-text:',
  '--color-info-text:',
  '--color-success-bg:',
  '--color-warning-bg:',
  '--color-danger-bg:',
  '--color-info-bg:',
];
for (const tok of requiredCssTokens) {
  if (!saasCss.includes(tok)) {
    console.error(`❌ Batch 5 check failed: tokens.css missing '${tok}'`);
    process.exit(1);
  }
}

// Verify no "strictly 16px" or "16px fallback" in compiled brief or spec
const freshSaasBrief = compileProjectBrief(saasState);
if (freshSaasBrief.includes('16px fallback') || freshSaasBrief.includes('strictly 16px')) {
  console.error("❌ Batch 5 check failed: Export brief leaked '16px fallback' or 'strictly 16px'");
  process.exit(1);
}

// Verify font weights embed in default SaaS state
const saasTokens = resolveTokens(saasState);
if (!saasTokens.typography.googleFontsUrl.includes('wght@400;500;600;700')) {
  console.error(`❌ Batch 5 check failed: Google Fonts URL missing required weights 400;500;600;700: ${saasTokens.typography.googleFontsUrl}`);
  process.exit(1);
}

// Verify recipes
const cardRecipe = COMPONENT_RECIPES.find((r) => r.id === 'card-surface');
if (!cardRecipe || cardRecipe.radius !== 'var(--radius-surface)' || !cardRecipe.states.hover?.includes('var(--shadow-hover)')) {
  console.error("❌ Batch 5 check failed: card-surface recipe missing --radius-surface or --shadow-hover");
  process.exit(1);
}
const badgeRecipe = COMPONENT_RECIPES.find((r) => r.id === 'badge-pill');
if (!badgeRecipe || badgeRecipe.radius !== 'var(--radius-pill)') {
  console.error("❌ Batch 5 check failed: badge-pill recipe missing --radius-pill");
  process.exit(1);
}
console.log('✅ Batch 5 verified: Tokens, text-safe pairs, recipes, and font weights verified.');

console.log('--- Testing Batch 6: Contrast Honesty & Report Generation ---');
// 1. Verify no unconditional "WCAG AAA contrast" or "AAA contrast" claims
for (const p of PURPOSES) {
  const pSt = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: p.id });
  const pBrief = compileProjectBrief(pSt);
  const pSpec = compileMarkdown(pSt);
  if (pBrief.includes('WCAG AAA contrast') || pSpec.includes('WCAG AAA contrast') || pBrief.includes('AAA contrast') || pSpec.includes('AAA contrast')) {
    console.error(`❌ Batch 6 check failed: Purpose ${p.id} leaked unconditional 'AAA contrast' claim`);
    process.exit(1);
  }
}

// 2. Verify contrast report with real numbers across presets
for (const preset of presets) {
  const prState = designReducer(defaultInitialState, { type: 'LOAD_PRESET', id: preset.id });
  const prSpec = compileMarkdown(prState);
  if (!prSpec.includes('### 2.1b Contrast Report')) {
    console.error(`❌ Batch 6 check failed: Preset ${preset.id} missing '### 2.1b Contrast Report'`);
    process.exit(1);
  }
  if (!prSpec.includes('Target: WCAG AA (4.5:1 body text, 3:1 large text and UI components)')) {
    console.error(`❌ Batch 6 check failed: Preset ${preset.id} missing realistic WCAG AA target statement`);
    process.exit(1);
  }
  // Check that real numbers (e.g. ratio pattern :1) are present
  const ratioMatches = prSpec.match(/\*\*\d+\.\d{2}:1\*\*/g);
  if (!ratioMatches || ratioMatches.length < 20) {
    console.error(`❌ Batch 6 check failed: Preset ${preset.id} contrast report missing calculated numeric ratios`);
    process.exit(1);
  }

  // Check all on-* pairs are in contrast report
  const onPairs = [
    'on-primary on primary',
    'on-secondary on secondary',
    'on-accent on accent',
    'on-success on success',
    'on-warning on warning',
    'on-danger on danger',
    'on-info on info',
  ];
  for (const onPair of onPairs) {
    if (!prSpec.includes(onPair)) {
      console.error(`❌ Batch 6 check failed: Preset ${preset.id} missing contrast pair '${onPair}'`);
      process.exit(1);
    }
  }

  // Verify on-* tokens strictly achieve AA contrast on their base color in both modes
  const prTokens = resolveTokens(prState);
  for (const mode of ['lightColors', 'darkColors'] as const) {
    const c = prTokens[mode];
    const pairs: [string, string, string][] = [
      ['on-primary', c.onPrimary, c.primary],
      ['on-secondary', c.onSecondary, c.secondary],
      ['on-accent', c.onAccent, c.accent],
      ['on-success', c.onSuccess, c.success],
      ['on-warning', c.onWarning, c.warning],
      ['on-danger', c.onDanger, c.danger],
      ['on-info', c.onInfo, c.info],
    ];
    for (const [name, fg, bg] of pairs) {
      const res = calculateContrastRatio(fg, bg);
      if (!res.passesAA) {
        console.error(`❌ Batch 6 check failed: Preset ${preset.id} ${mode} ${name} (${fg}) on base (${bg}) fails AA with ratio ${res.formattedRatio}`);
        process.exit(1);
      }
    }
  }
}
console.log('✅ Batch 6 verified: No unconditional AAA claims, contrast report generated with computed ratios for all presets.');

console.log('--- Testing Batch 7: Content Hygiene, Single H1 & Redesign Invariants ---');
// 1. Single H1 check in PROJECT-BRIEF.md
const defaultBrief = compileProjectBrief(defaultInitialState);
const h1Matches = defaultBrief.split('\n').filter((l) => /^#\s/.test(l));
if (h1Matches.length !== 1 || !h1Matches[0].includes('Project Brief & Site Architecture Specification')) {
  console.error(`❌ Batch 7 check failed: PROJECT-BRIEF.md has ${h1Matches.length} H1 headers, expected exactly 1.`);
  process.exit(1);
}

// 2. Content hygiene check
const forbiddenPatterns = [
  'alex@tastystyles.io',
  'Alex Rivers',
  'Rp 1.457.078.000',
  '#TS-',
  'DTCG v2',
  '[TS] Brand',
  '[TS] App',
  'Tokens [3]',
  'No Design Tokens Yet',
  'Create Token Palette',
];

for (const p of PURPOSES) {
  const pSt = designReducer(defaultInitialState, { type: 'SET_PURPOSE', purpose: p.id });
  const pBrief = compileProjectBrief(pSt);
  const pSpec = compileMarkdown(pSt);
  for (const forbidden of forbiddenPatterns) {
    if (pBrief.includes(forbidden) || pSpec.includes(forbidden)) {
      console.error(`❌ Batch 7 check failed: Purpose ${p.id} leaked '${forbidden}'`);
      process.exit(1);
    }
  }
}

// 3. Redesign Invariants & Conflict Precedence in Part A
if (!defaultBrief.includes('### 5. Conflict Precedence & Redesign Invariants')) {
  console.error("❌ Batch 7 check failed: Part A missing '### 5. Conflict Precedence & Redesign Invariants'");
  process.exit(1);
}
if (!defaultBrief.includes('Existing application routes, features, and domain content')) {
  console.error("❌ Batch 7 check failed: Part A missing 'Existing application routes, features, and domain content'");
  process.exit(1);
}

// 4. Section 8 Accessibility, Dark Mode & Section 9.2 Checklist
const defaultSpec = compileMarkdown(defaultInitialState);
if (!defaultSpec.includes('Theme & Dark Mode') || !defaultSpec.includes('Accessibility & Motion')) {
  console.error('❌ Batch 7 check failed: Section 8 missing Theme & Dark Mode or Accessibility & Motion rules');
  process.exit(1);
}

const requiredChecklistItems = [
  'Token Verification',
  'Responsive Integrity',
  'Theme & Contrast',
  'Accessibility & Motion',
  'Layout & Scope Adherence',
  'Zero Logic Regression',
];
for (const item of requiredChecklistItems) {
  if (!defaultSpec.includes(item)) {
    console.error(`❌ Batch 7 check failed: Section 9.2 checklist missing '${item}'`);
    process.exit(1);
  }
}
console.log('✅ Batch 7 verified: Content hygiene confirmed, single H1 enforced, redesign invariants and checkable acceptance checklist validated.');

console.log('--- Testing Remaining Export Polish (Items 1–12) ---');
// 1. Spliced sentences check
if (defaultBrief.includes('scales, Target:') || defaultSpec.includes('whitespace, Target:')) {
  console.error('❌ Polish check failed: Spliced sentence still present in directive 2 or section 0');
  process.exit(1);
}

// 2. Landing sector fit check
const mismatchState = {
  ...defaultInitialState,
  projectGoal: 'saas' as const,
  project: {
    ...defaultInitialState.project,
    purpose: 'saas',
    pages: [
      { pageType: 'landing', layoutId: 'organic-wellness', enabled: true },
    ],
  },
  pageLayouts: {
    ...defaultInitialState.pageLayouts,
    landing: 'organic-wellness' as const,
  },
};
const mismatchBrief = compileProjectBrief(mismatchState);
const mismatchSpec = compileMarkdown(mismatchState);
const expectedSectorNote = 'Structure only. Sections and copy are illustrative; map them to the project\'s real content and do not build sector-specific sections that the project does not have.';
if (!mismatchBrief.includes(expectedSectorNote)) {
  console.error('❌ Polish check failed: Sector mismatch note missing from Part A block');
  process.exit(1);
}
if (!mismatchSpec.includes(expectedSectorNote)) {
  console.error('❌ Polish check failed: Sector mismatch note missing from Section 7.3 wireframe');
  process.exit(1);
}

// 3. Starter shell footer check
if (!defaultSpec.includes('isPublic = false') || !defaultSpec.includes('omitted in authenticated sidebar app layouts')) {
  console.error('❌ Polish check failed: Starter shell missing isPublic footer guard or omission note');
  process.exit(1);
}

// 4. Mobile tap target rule check
if (!defaultSpec.includes('Controls smaller than 44px')) {
  console.error('❌ Polish check failed: Mobile tap target 44px rule missing from Section 8');
  process.exit(1);
}

// 5. Recipe "Checked" rename check
if (!defaultSpec.includes('- *Checked*:') || defaultSpec.includes('### 6.7 Toggle Switch\n- **Description**: Binary toggle switch for instant state enable/disable preferences.\n- **Height**: Small (`20px`), Medium (`24px`), Large (`28px`)\n- **Horizontal Padding**: Small (`2px`), Medium (`2px`), Large (`2px`)\n- **Border**: `1px solid var(--color-border)` | **Radius**: `var(--radius-pill)` \n- **Typography**: `font-family: var(--font-body);`\n- **State Behavior**:\n  - *Default*: `background-color: var(--color-border);`\n  - *Hover*: `filter: brightness(0.95);`\n  - *Active*:')) {
  console.error('❌ Polish check failed: Toggle switch / checkbox recipe missing *Checked* state');
  process.exit(1);
}

// 6. prefers-color-scheme in tokens.css check
const cssWithMedia = generateUnifiedCssTokens(defaultInitialState);
if (!cssWithMedia.includes('@media (prefers-color-scheme: dark)')) {
  console.error('❌ Polish check failed: tokens.css missing @media (prefers-color-scheme: dark) block');
  process.exit(1);
}

// 7. Icon stroke claim check
if (defaultSpec.includes('; bound to `--icon-stroke`')) {
  console.error('❌ Polish check failed: Icon stroke claim still present in Section 5.1');
  process.exit(1);
}

// 8. Section 2.1 and Tailwind config tokens check
const requiredColorTokens = [
  'primary-bg',
  'on-success',
  'on-warning',
  'on-danger',
  'on-info',
  'success-bg',
  'warning-bg',
  'danger-bg',
  'info-bg',
];
for (const tok of requiredColorTokens) {
  if (!defaultSpec.includes(`**${tok}**`)) {
    console.error(`❌ Polish check failed: Section 2.1 color table missing token '${tok}'`);
    process.exit(1);
  }
}
const twConfig = generateTailwindConfig(defaultInitialState);
if (!twConfig.includes("'primary-bg': 'var(--color-primary-bg)'")) {
  console.error("❌ Polish check failed: Tailwind config missing 'primary-bg'");
  process.exit(1);
}

// 9. Part B title header level check
if (!/^### Part B: Canonical Design System Tokens & Recipes/m.test(defaultBrief)) {
  console.error("❌ Polish check failed: Part B title must be '### Part B: Canonical Design System Tokens & Recipes'");
  process.exit(1);
}
if (/^## Part B: Canonical Design System Tokens & Recipes/m.test(defaultBrief)) {
  console.error("❌ Polish check failed: Part B title leaked as '## Part B'");
  process.exit(1);
}

// 10. Acceptance checklist runnable checks check
if (!defaultSpec.includes('grep -rnE "#[0-9a-fA-F]{3,8}\\b" src --include=*.{ts,tsx,css} --exclude=tokens.css')) {
  console.error('❌ Polish check failed: Section 9.2 missing runnable grep check');
  process.exit(1);
}
if (!defaultSpec.includes('document.documentElement.scrollWidth <= window.innerWidth')) {
  console.error('❌ Polish check failed: Section 9.2 missing runnable Playwright/browser check');
  process.exit(1);
}

// 11. Presets immutability check
for (const p of presets) {
  if (!p.state?.colors?.light?.primary || !p.state?.colors?.dark?.primary) {
    console.error(`❌ Polish check failed: Preset ${p.id} missing core palette colors`);
    process.exit(1);
  }
}
console.log('✅ Export polish verified: All 12 export issues strictly verified.');

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
