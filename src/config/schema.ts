import { z } from 'zod';

export const HexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid 6-character hex color (#RRGGBB)');

export const ColorPaletteSchema = z.object({
  primary: HexColorSchema,
  secondary: HexColorSchema,
  accent: HexColorSchema,
  background: HexColorSchema,
  surface: HexColorSchema,
  text: HexColorSchema,
  border: HexColorSchema,
});

export const TypographyStateSchema = z.object({
  headingFont: z.string().min(1),
  bodyFont: z.string().min(1),
  scale: z.number().min(0.875).max(1.25),
  baseSize: z.number().min(12).max(24),
});

export const PageLayoutsSchema = z.object({
  auth: z.enum([
    'centered-card',
    'split',
    'split-image',
    'social-first',
    'full-background',
    'full-background-image',
    'single-field',
    'modal-overlay',
    'minimal',
    'glassmorphism',
  ]).default('centered-card'),
  authSocialButtons: z.boolean().default(true),
  authCardStyle: z.enum(['elevated', 'bordered', 'flat', 'glass']).default('elevated'),
  error: z.enum(['giant-hero', 'split-terminal', 'dialog-card', 'minimal']).default('giant-hero'),
  errorCode: z.enum(['404', '403', '500']).default('404'),
  errorShowTrace: z.boolean().default(true),
  dashboard: z.enum(['sidebar-grid', 'header-compact', 'analytical', 'feed-focus']).default('sidebar-grid'),
  landing: z.enum(['hero-split', 'hero-centered', 'feature-grid']).default('hero-split'),
  pricing: z.enum(['cards-3col', 'table-matrix', 'compact-toggle']).default('cards-3col'),
  kanban: z.enum(['board-columns', 'timeline-list', 'compact-grid']).default('board-columns'),
  chat: z.enum(['split-pane', 'compact-feed', 'minimal-bubble']).default('split-pane'),
  settings: z.enum(['tabbed', 'stacked-cards', 'sidebar-nav']).default('tabbed'),
  detail: z.enum(['split-sidepanel', 'full-document', 'tabbed-media']).default('split-sidepanel'),
  onboarding: z.enum(['wizard-stepper', 'card-stack', 'minimal-modal']).default('wizard-stepper'),
  emptyState: z.enum(['centered-action', 'illustration-card', 'checklist-guide']).default('centered-action'),
  success: z.enum(['celebration-card', 'receipt-summary', 'minimal-banner']).default('celebration-card'),
  navbar: z.enum(['saas-header', 'minimal-center', 'floating-pill', 'tabbed-nav', 'ecommerce-action']).default('saas-header'),
  sidebar: z.enum(['classic-grouped', 'compact-rail', 'dual-pane', 'floating-card', 'workspace-shell']).default('classic-grouped'),
});

export const DesignStateSchema = z.object({
  version: z.literal(1),
  name: z.string().default('My Design System'),
  activeMode: z.enum(['light', 'dark']).default('light'),
  colors: z.object({
    light: ColorPaletteSchema,
    dark: ColorPaletteSchema,
  }),
  typography: TypographyStateSchema,
  layout: z.string().min(1),
  radius: z.string().min(1),
  shadow: z.string().min(1),
  spacing: z.string().min(1),
  iconStyle: z.enum(['clean-outline', 'bold-stroke', 'minimal-thin', 'duotone', 'solid-badge']).default('clean-outline'),
  pageLayouts: PageLayoutsSchema.optional().default(() => PageLayoutsSchema.parse({})),
});

export type HexColor = z.infer<typeof HexColorSchema>;
export type ColorPalette = z.infer<typeof ColorPaletteSchema>;
export type TypographyState = z.infer<typeof TypographyStateSchema>;
export type PageLayouts = z.infer<typeof PageLayoutsSchema>;
export type DesignState = z.infer<typeof DesignStateSchema>;

// Registry schemas
export const FontEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  family: z.string(),
  category: z.enum(['sans-serif', 'serif', 'monospace', 'display']),
  weights: z.array(z.number()),
});

export const LayoutEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  wireframe: z.string(),
  responsiveRules: z.string(),
});

export const RadiusEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(), // e.g. "0px", "8px", "9999px"
});

export const ShadowEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(), // e.g. "0 4px 12px rgba(0,0,0,.08)"
});

export const SpacingEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  baseFactor: z.number(),
  scale: z.object({
    xs: z.string(),
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
  }),
});

export const PresetEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  state: DesignStateSchema.omit({ version: true }),
});

export type FontEntry = z.infer<typeof FontEntrySchema>;
export type LayoutEntry = z.infer<typeof LayoutEntrySchema>;
export type RadiusEntry = z.infer<typeof RadiusEntrySchema>;
export type ShadowEntry = z.infer<typeof ShadowEntrySchema>;
export type SpacingEntry = z.infer<typeof SpacingEntrySchema>;
export type PresetEntry = z.infer<typeof PresetEntrySchema>;

export const RegistriesSchema = z.object({
  fonts: z.array(FontEntrySchema).min(1),
  layouts: z.array(LayoutEntrySchema).min(1),
  radius: z.array(RadiusEntrySchema).min(1),
  shadows: z.array(ShadowEntrySchema).min(1),
  spacing: z.array(SpacingEntrySchema).min(1),
  presets: z.array(PresetEntrySchema).min(1),
});

export type Registries = z.infer<typeof RegistriesSchema>;

