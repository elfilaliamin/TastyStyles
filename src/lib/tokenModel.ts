import type { DesignState } from '../config/schema';
import {
  getFontEntry,
  getRadiusEntry,
  getShadowEntry,
  getSpacingEntry,
} from './registry';
import { getBestContrastingColor } from './contrast';

export interface TypeScaleStep {
  role: string;
  step: number;
  fontSizePx: string;
  fontSizeRem: string;
  lineHeight: string;
  fontWeight: string;
  tracking: string;
}

export interface ResolvedTokenSet {
  name: string;
  activeMode: 'light' | 'dark';
  lightColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    onPrimary: string;
    onSecondary: string;
    onAccent: string;
    muted: string;
    ring: string;
  };
  darkColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    onPrimary: string;
    onSecondary: string;
    onAccent: string;
    muted: string;
    ring: string;
  };
  typography: {
    headingFamily: string;
    headingCategory: string;
    bodyFamily: string;
    bodyCategory: string;
    baseSize: number;
    scaleRatio: number;
    googleFontsUrl: string;
    weights: number[];
    steps: TypeScaleStep[];
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radius: string;
  shadow: string;
  icons: {
    library: string;
    mode: string;
    duotone: boolean;
    weight: string;
    strokeWidth: string;
    strokeWidthNum: number;
    fillOpacity: string;
    pkg: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
}

const ICON_PACKAGES: Record<string, string> = {
  lucide: 'lucide-react',
  tabler: '@tabler/icons-react',
  phosphor: '@phosphor-icons/react',
  heroicons: '@heroicons/react',
  remix: '@remixicon/react',
};

const ICON_STROKE_MAP: Record<string, { px: string; num: number }> = {
  thin: { px: '1.25px', num: 1.25 },
  light: { px: '1.50px', num: 1.50 },
  regular: { px: '1.75px', num: 1.75 },
  medium: { px: '2.25px', num: 2.25 },
  bold: { px: '2.75px', num: 2.75 },
};

/**
 * Compute typographic scale steps adhering strictly to font weights
 */
function computeTypeScaleSteps(baseSize: number, scale: number, availableWeights: number[]): TypeScaleStep[] {
  const has700 = availableWeights.includes(700);
  const has600 = availableWeights.includes(600);
  const has500 = availableWeights.includes(500);

  const boldWeight = has700 ? '700' : has600 ? '600' : 'bold';
  const semiWeight = has600 ? '600' : has700 ? '700' : has500 ? '500' : '600';
  const regularWeight = availableWeights.includes(400) ? '400' : 'normal';

  const rawSteps = [
    { role: 'Display (H1)', step: 4, weight: boldWeight, tracking: '-0.025em', lineHeight: '1.15' },
    { role: 'Section (H2)', step: 3, weight: boldWeight, tracking: '-0.02em', lineHeight: '1.2' },
    { role: 'Subsection (H3)', step: 2, weight: semiWeight, tracking: '-0.015em', lineHeight: '1.25' },
    { role: 'Card Header (H4)', step: 1, weight: semiWeight, tracking: '-0.01em', lineHeight: '1.3' },
    { role: 'Body Copy', step: 0, weight: regularWeight, tracking: '0em', lineHeight: '1.5' },
    { role: 'Small / Caption', step: -1, weight: regularWeight, tracking: '0.01em', lineHeight: '1.4' },
  ];

  return rawSteps.map((s) => {
    const pxVal = Math.round(baseSize * Math.pow(scale, s.step) * 10) / 10;
    const remVal = (pxVal / 16).toFixed(3);
    return {
      role: s.role,
      step: s.step,
      fontSizePx: `${pxVal}px`,
      fontSizeRem: `${remVal}rem`,
      lineHeight: s.lineHeight,
      fontWeight: s.weight,
      tracking: s.tracking,
    };
  });
}

/**
 * Resolves all design tokens deterministically from raw DesignState
 */
export function resolveTokens(state: DesignState): ResolvedTokenSet {
  const headingFont = getFontEntry(state.typography.headingFont) ?? {
    id: state.typography.headingFont,
    label: state.typography.headingFont,
    family: state.typography.headingFont,
    category: 'sans-serif' as const,
    weights: [400, 700],
  };

  const bodyFont = getFontEntry(state.typography.bodyFont) ?? {
    id: state.typography.bodyFont,
    label: state.typography.bodyFont,
    family: state.typography.bodyFont,
    category: 'sans-serif' as const,
    weights: [400, 500, 700],
  };

  const radius = getRadiusEntry(state.radius) ?? {
    id: state.radius,
    label: state.radius,
    value: '8px',
  };

  const shadow = getShadowEntry(state.shadow) ?? {
    id: state.shadow,
    label: state.shadow,
    value: '0 4px 12px rgba(0,0,0,0.08)',
  };

  const spacing = getSpacingEntry(state.spacing) ?? {
    id: state.spacing,
    label: 'Comfortable',
    baseFactor: 1.0,
    scale: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
  };

  // Google Fonts URL building with verified available weights
  const uniqueFamilies = Array.from(new Set([headingFont, bodyFont]));
  const fontLinkParams = uniqueFamilies
    .map((f) => {
      const weightsParam = f.weights.length > 0 ? `:wght@${f.weights.sort().join(';')}` : ':wght@400;700';
      return `family=${f.family.replace(/\s+/g, '+')}${weightsParam}`;
    })
    .join('&');
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontLinkParams}&display=swap`;

  const allAvailableWeights = Array.from(
    new Set([...headingFont.weights, ...bodyFont.weights])
  );
  const typeScaleSteps = computeTypeScaleSteps(
    state.typography.baseSize,
    state.typography.scale,
    allAvailableWeights
  );

  // Icon geometry
  const iconConfig = state.icons ?? {
    library: 'lucide',
    mode: 'outline',
    duotone: false,
    weight: 'regular',
  };
  const iconWeight = ICON_STROKE_MAP[iconConfig.weight] ?? ICON_STROKE_MAP.regular;
  const iconPkg = ICON_PACKAGES[iconConfig.library] ?? 'lucide-react';
  const iconFillOpacity = iconConfig.mode === 'solid' ? '1' : iconConfig.duotone ? '0.22' : '0';

  // Semantic Status & On-Colors
  const lightPrimary = state.colors.light.primary;
  const darkPrimary = state.colors.dark.primary;
  const lightSecondary = state.colors.light.secondary;
  const darkSecondary = state.colors.dark.secondary;
  const lightAccent = state.colors.light.accent;
  const darkAccent = state.colors.dark.accent;

  return {
    name: state.name,
    activeMode: state.activeMode,
    lightColors: {
      ...state.colors.light,
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#0284c7',
      onPrimary: getBestContrastingColor(lightPrimary),
      onSecondary: getBestContrastingColor(lightSecondary),
      onAccent: getBestContrastingColor(lightAccent),
      muted: '#64748b',
      ring: lightPrimary,
    },
    darkColors: {
      ...state.colors.dark,
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171',
      info: '#38bdf8',
      onPrimary: getBestContrastingColor(darkPrimary),
      onSecondary: getBestContrastingColor(darkSecondary),
      onAccent: getBestContrastingColor(darkAccent),
      muted: '#94a3b8',
      ring: darkAccent,
    },
    typography: {
      headingFamily: headingFont.family,
      headingCategory: headingFont.category,
      bodyFamily: bodyFont.family,
      bodyCategory: bodyFont.category,
      baseSize: state.typography.baseSize,
      scaleRatio: state.typography.scale,
      googleFontsUrl,
      weights: allAvailableWeights,
      steps: typeScaleSteps,
    },
    spacing: spacing.scale,
    radius: radius.value,
    shadow: shadow.value,
    icons: {
      library: iconConfig.library,
      mode: iconConfig.mode,
      duotone: iconConfig.duotone,
      weight: iconConfig.weight,
      strokeWidth: iconWeight.px,
      strokeWidthNum: iconWeight.num,
      fillOpacity: iconFillOpacity,
      pkg: iconPkg,
    },
    breakpoints: {
      mobile: '375px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1280px',
    },
  };
}

/**
 * Generate canonical CSS variables block (Identical in Markdown spec and tokens.css)
 */
export function generateUnifiedCssTokens(state: DesignState): string {
  const tokens = resolveTokens(state);

  return `:root {
  /* Colors (Light Mode) */
  --color-primary: ${tokens.lightColors.primary};
  --color-secondary: ${tokens.lightColors.secondary};
  --color-accent: ${tokens.lightColors.accent};
  --color-background: ${tokens.lightColors.background};
  --color-surface: ${tokens.lightColors.surface};
  --color-text: ${tokens.lightColors.text};
  --color-border: ${tokens.lightColors.border};
  --color-success: ${tokens.lightColors.success};
  --color-warning: ${tokens.lightColors.warning};
  --color-danger: ${tokens.lightColors.danger};
  --color-info: ${tokens.lightColors.info};
  --color-on-primary: ${tokens.lightColors.onPrimary};
  --color-on-secondary: ${tokens.lightColors.onSecondary};
  --color-on-accent: ${tokens.lightColors.onAccent};
  --color-muted: ${tokens.lightColors.muted};
  --color-ring: ${tokens.lightColors.ring};

  /* Typography */
  --font-heading: '${tokens.typography.headingFamily}', ${tokens.typography.headingCategory};
  --font-body: '${tokens.typography.bodyFamily}', ${tokens.typography.bodyCategory};
  --font-size-base: ${tokens.typography.baseSize}px;
  --font-scale: ${tokens.typography.scaleRatio};

  /* Typographic Hierarchy Steps */
${tokens.typography.steps
  .map(
    (s) =>
      `  --font-size-step-${s.step >= 0 ? s.step : 'sub1'}: ${s.fontSizeRem}; /* ${s.fontSizePx} (${s.role}) */`
  )
  .join('\n')}

  /* Spacing Scale */
  --spacing-xs: ${tokens.spacing.xs};
  --spacing-sm: ${tokens.spacing.sm};
  --spacing-md: ${tokens.spacing.md};
  --spacing-lg: ${tokens.spacing.lg};
  --spacing-xl: ${tokens.spacing.xl};

  /* Shape & Elevation */
  --radius-base: ${tokens.radius};
  --radius-surface: ${tokens.radius === '9999px' ? '20px' : tokens.radius};
  --shadow-base: ${tokens.shadow};

  /* Icon System (${tokens.icons.library} • ${tokens.icons.mode} • ${tokens.icons.weight}) */
  --icon-library: '${tokens.icons.library}';
  --icon-stroke: ${tokens.icons.strokeWidth};
  --icon-fill-opacity: ${tokens.icons.fillOpacity};

  /* Breakpoints */
  --breakpoint-mobile: ${tokens.breakpoints.mobile};
  --breakpoint-tablet: ${tokens.breakpoints.tablet};
  --breakpoint-desktop: ${tokens.breakpoints.desktop};
  --breakpoint-wide: ${tokens.breakpoints.wide};
}

/* Dark Mode Overrides */
[data-theme='dark'],
.dark {
  --color-primary: ${tokens.darkColors.primary};
  --color-secondary: ${tokens.darkColors.secondary};
  --color-accent: ${tokens.darkColors.accent};
  --color-background: ${tokens.darkColors.background};
  --color-surface: ${tokens.darkColors.surface};
  --color-text: ${tokens.darkColors.text};
  --color-border: ${tokens.darkColors.border};
  --color-success: ${tokens.darkColors.success};
  --color-warning: ${tokens.darkColors.warning};
  --color-danger: ${tokens.darkColors.danger};
  --color-info: ${tokens.darkColors.info};
  --color-on-primary: ${tokens.darkColors.onPrimary};
  --color-on-secondary: ${tokens.darkColors.onSecondary};
  --color-on-accent: ${tokens.darkColors.onAccent};
  --color-muted: ${tokens.darkColors.muted};
  --color-ring: ${tokens.darkColors.ring};
}`;
}

/**
 * Generate preview CSS variables mapping for the live PreviewPane sandbox
 */
export function getPreviewCssVariables(state: DesignState): Record<string, string> {
  const tokens = resolveTokens(state);
  const activeColors = state.activeMode === 'dark' ? tokens.darkColors : tokens.lightColors;

  return {
    '--ts-color-primary': activeColors.primary,
    '--ts-color-secondary': activeColors.secondary,
    '--ts-color-accent': activeColors.accent,
    '--ts-color-background': activeColors.background,
    '--ts-color-surface': activeColors.surface,
    '--ts-color-text': activeColors.text,
    '--ts-color-border': activeColors.border,
    '--ts-color-success': activeColors.success,
    '--ts-color-warning': activeColors.warning,
    '--ts-color-danger': activeColors.danger,
    '--ts-color-info': activeColors.info,
    '--ts-color-on-primary': activeColors.onPrimary,
    '--ts-color-on-secondary': activeColors.onSecondary,
    '--ts-color-on-accent': activeColors.onAccent,
    '--ts-color-muted': activeColors.muted,
    '--ts-color-ring': activeColors.ring,

    '--ts-font-heading': `'${tokens.typography.headingFamily}', ${tokens.typography.headingCategory}`,
    '--ts-font-body': `'${tokens.typography.bodyFamily}', ${tokens.typography.bodyCategory}`,
    '--ts-base-size': `${tokens.typography.baseSize}px`,
    '--ts-scale': `${tokens.typography.scaleRatio}`,

    // Typographic steps
    '--ts-text-display': tokens.typography.steps.find((s) => s.step === 4)?.fontSizeRem ?? '2.441rem',
    '--ts-text-section': tokens.typography.steps.find((s) => s.step === 3)?.fontSizeRem ?? '1.953rem',
    '--ts-text-subsection': tokens.typography.steps.find((s) => s.step === 2)?.fontSizeRem ?? '1.563rem',
    '--ts-text-card': tokens.typography.steps.find((s) => s.step === 1)?.fontSizeRem ?? '1.25rem',
    '--ts-text-body': tokens.typography.steps.find((s) => s.step === 0)?.fontSizeRem ?? '1rem',
    '--ts-text-caption': tokens.typography.steps.find((s) => s.step === -1)?.fontSizeRem ?? '0.8rem',

    '--ts-radius': tokens.radius,
    '--ts-radius-surface': tokens.radius === '9999px' ? '20px' : tokens.radius,
    '--ts-shadow': tokens.shadow,

    '--ts-space-xs': tokens.spacing.xs,
    '--ts-space-sm': tokens.spacing.sm,
    '--ts-space-md': tokens.spacing.md,
    '--ts-space-lg': tokens.spacing.lg,
    '--ts-space-xl': tokens.spacing.xl,

    '--ts-icon-stroke': tokens.icons.strokeWidth,
    '--ts-icon-fill-opacity': tokens.icons.fillOpacity,
    '--ts-icon-library': tokens.icons.library,
    '--ts-icon-mode': tokens.icons.mode,
  };
}

