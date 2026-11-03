import { RegistriesSchema, DesignStateSchema } from '../src/config/schema';
import fontsRaw from '../src/config/fonts.json';
import layoutsRaw from '../src/config/layouts.json';
import radiusRaw from '../src/config/radius.json';
import shadowsRaw from '../src/config/shadows.json';
import spacingRaw from '../src/config/spacing.json';
import presetsRaw from '../src/config/presets.json';
import { compileMarkdown } from '../src/lib/compileMarkdown';
import { calculateContrastRatio } from '../src/lib/contrast';
import { defaultInitialState } from '../src/context/designReducer';

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

// 5. Test Markdown Generation
const markdown = compileMarkdown(defaultInitialState);
const requiredSections = [
  '## 1. Intent & Overview',
  '## 2. Design Tokens',
  '## 3. CSS Variables Block',
  '## 4. Tailwind CSS Configuration Snippet',
  '## 5. Layout Architecture',
  '## 6. Responsive Breakpoints & Rules',
  '## 7. Component Rules',
  "## 8. Do / Don't Guidelines for AI Coding Agents",
  '## 9. Google Fonts Import Snippet',
];

for (const section of requiredSections) {
  if (!markdown.includes(section)) {
    console.error(`❌ Missing required section: ${section}`);
    process.exit(1);
  }
}
console.log('✅ All 9 required Markdown sections verified in compiled spec.');
console.log('--- All Verification Checks Passed! ---');
