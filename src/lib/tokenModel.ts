import type { DesignState } from '../config/schema';
import {
  getFontEntry,
  getRadiusEntry,
  getShadowEntry,
  getSpacingEntry,
} from './registry';
import { getBestContrastingColor, computeTextSafeColor, hexToRgb } from './contrast';
import { COMPONENT_RECIPES } from '../config/recipes';

export interface TypeScaleStep {
  role: string;
  step: number;
  fontSizePx: string;
  fontSizeRem: string;
  lineHeight: string;
  fontWeight: string;
  tracking: string;
}

export interface ColorTokenGroup {
  primary: string;
  primaryBg: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  accent: string;
  accentText: string;
  background: string;
  surface: string;
  text: string;
  border: string;
  success: string;
  successBg: string;
  successText: string;
  warning: string;
  warningBg: string;
  warningText: string;
  danger: string;
  dangerBg: string;
  dangerText: string;
  info: string;
  infoBg: string;
  infoText: string;
  onPrimary: string;
  onSecondary: string;
  onAccent: string;
  onSuccess: string;
  onWarning: string;
  onDanger: string;
  onInfo: string;
  muted: string;
  ring: string;
  scrim: string;
}

export interface ResolvedTokenSet {
  name: string;
  activeMode: 'light' | 'dark';
  lightColors: ColorTokenGroup;
  darkColors: ColorTokenGroup;
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
  radiusSurface: string;
  radiusPill: string;
  shadow: string;
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowHover: string;
  blurGlass: string;
  zIndex: {
    dropdown: string;
    sticky: string;
    modal: string;
    toast: string;
  };
  transitions: {
    durationFast: string;
    durationBase: string;
    durationSlow: string;
    easeStandard: string;
  };
  fontWeights: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  icons: {
    library: string;
    mode: string;
    duotone: boolean;
    weight: string;
    strokeWidth: string;
    strokeWidthNum: number;
    fillOpacity: string;
    pkg: string;
    supportsStroke: boolean;
  };
  breakpoints: {
    sm: string;
    lg: string;
    wide: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

const ICON_PACKAGES: Record<string, string> = {
  lucide: 'lucide-react',
  tabler: '@tabler/icons-react',
  phosphor: '@phosphor-icons/react',
  heroicons: '@heroicons/react',
  remix: '@remixicon/react',
  'react-icons': 'react-icons',
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

  const allAvailableWeights = Array.from(
    new Set([...headingFont.weights, ...bodyFont.weights])
  );
  const typeScaleSteps = computeTypeScaleSteps(
    state.typography.baseSize,
    state.typography.scale,
    allAvailableWeights
  );

  const neededWeights = new Set<number>([400]);
  typeScaleSteps.forEach((s) => {
    const w = parseInt(s.fontWeight, 10);
    if (!isNaN(w)) neededWeights.add(w);
  });
  COMPONENT_RECIPES.forEach((r) => {
    const match = r.typography.match(/font-weight:\s*(\d+)/);
    if (match) {
      neededWeights.add(parseInt(match[1], 10));
    }
  });

  // Google Fonts URL building with verified available weights
  const uniqueFamilies = Array.from(new Set([headingFont, bodyFont]));
  const fontLinkParams = uniqueFamilies
    .map((f) => {
      const available = f.weights && f.weights.length > 0 ? f.weights : [400, 700];
      const included = available.filter((w) => neededWeights.has(w));
      const weightsToEmbed = included.length > 0 ? included : available;
      weightsToEmbed.sort((a, b) => a - b);
      return `family=${f.family.replace(/\s+/g, '+')}:wght@${weightsToEmbed.join(';')}`;
    })
    .join('&');
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontLinkParams}&display=swap`;

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
  const lightBg = state.colors.light.background;
  const lightSurface = state.colors.light.surface;
  const darkBg = state.colors.dark.background;
  const darkSurface = state.colors.dark.surface;

  const lightPrimary = state.colors.light.primary;
  const darkPrimary = state.colors.dark.primary;
  const lightSecondary = state.colors.light.secondary;
  const darkSecondary = state.colors.dark.secondary;
  const lightAccent = state.colors.light.accent;
  const darkAccent = state.colors.dark.accent;

  const lightSuccess = '#10b981';
  const lightWarning = '#f59e0b';
  const lightDanger = '#ef4444';
  const lightInfo = '#0284c7';

  const darkSuccess = '#34d399';
  const darkWarning = '#fbbf24';
  const darkDanger = '#f87171';
  const darkInfo = '#38bdf8';

  const lightPrimaryText = computeTextSafeColor(lightPrimary, lightBg, lightSurface, 'light');
  const lightSecondaryText = computeTextSafeColor(lightSecondary, lightBg, lightSurface, 'light');
  const lightAccentText = computeTextSafeColor(lightAccent, lightBg, lightSurface, 'light');
  const lightSuccessText = computeTextSafeColor(lightSuccess, lightBg, lightSurface, 'light');
  const lightWarningText = computeTextSafeColor(lightWarning, lightBg, lightSurface, 'light');
  const lightDangerText = computeTextSafeColor(lightDanger, lightBg, lightSurface, 'light');
  const lightInfoText = computeTextSafeColor(lightInfo, lightBg, lightSurface, 'light');

  const darkPrimaryText = computeTextSafeColor(darkPrimary, darkBg, darkSurface, 'dark');
  const darkSecondaryText = computeTextSafeColor(darkSecondary, darkBg, darkSurface, 'dark');
  const darkAccentText = computeTextSafeColor(darkAccent, darkBg, darkSurface, 'dark');
  const darkSuccessText = computeTextSafeColor(darkSuccess, darkBg, darkSurface, 'dark');
  const darkWarningText = computeTextSafeColor(darkWarning, darkBg, darkSurface, 'dark');
  const darkDangerText = computeTextSafeColor(darkDanger, darkBg, darkSurface, 'dark');
  const darkInfoText = computeTextSafeColor(darkInfo, darkBg, darkSurface, 'dark');

  const radiusSurface = parseInt(radius.value, 10) > 20 || radius.value === '9999px' ? '20px' : radius.value;
  const supportsStroke = iconConfig.library === 'lucide' || iconConfig.library === 'tabler';

  const [lpr, lpg, lpb] = hexToRgb(lightPrimary);
  const [dpr, dpg, dpb] = hexToRgb(darkPrimary);

  return {
    name: state.name,
    activeMode: state.activeMode,
    lightColors: {
      ...state.colors.light,
      primaryBg: `rgba(${lpr}, ${lpg}, ${lpb}, 0.08)`,
      primaryText: lightPrimaryText,
      secondaryText: lightSecondaryText,
      accentText: lightAccentText,
      success: lightSuccess,
      successBg: 'rgba(16, 185, 129, 0.12)',
      successText: lightSuccessText,
      warning: lightWarning,
      warningBg: 'rgba(245, 158, 11, 0.12)',
      warningText: lightWarningText,
      danger: lightDanger,
      dangerBg: 'rgba(239, 68, 68, 0.12)',
      dangerText: lightDangerText,
      info: lightInfo,
      infoBg: 'rgba(2, 132, 199, 0.12)',
      infoText: lightInfoText,
      onPrimary: getBestContrastingColor(lightPrimary, ['#ffffff', '#000000']),
      onSecondary: getBestContrastingColor(lightSecondary, ['#ffffff', '#000000']),
      onAccent: getBestContrastingColor(lightAccent, ['#ffffff', '#000000']),
      onSuccess: getBestContrastingColor(lightSuccess, ['#ffffff', '#000000']),
      onWarning: getBestContrastingColor(lightWarning, ['#ffffff', '#000000']),
      onDanger: getBestContrastingColor(lightDanger, ['#ffffff', '#000000']),
      onInfo: getBestContrastingColor(lightInfo, ['#ffffff', '#000000']),
      muted: '#64748b',
      ring: lightPrimary,
      scrim: 'rgba(0, 0, 0, 0.5)',
    },
    darkColors: {
      ...state.colors.dark,
      primaryBg: `rgba(${dpr}, ${dpg}, ${dpb}, 0.16)`,
      primaryText: darkPrimaryText,
      secondaryText: darkSecondaryText,
      accentText: darkAccentText,
      success: darkSuccess,
      successBg: 'rgba(52, 211, 153, 0.16)',
      successText: darkSuccessText,
      warning: darkWarning,
      warningBg: 'rgba(251, 191, 36, 0.16)',
      warningText: darkWarningText,
      danger: darkDanger,
      dangerBg: 'rgba(248, 113, 113, 0.16)',
      dangerText: darkDangerText,
      info: darkInfo,
      infoBg: 'rgba(56, 189, 248, 0.16)',
      infoText: darkInfoText,
      onPrimary: getBestContrastingColor(darkPrimary, ['#ffffff', '#000000']),
      onSecondary: getBestContrastingColor(darkSecondary, ['#ffffff', '#000000']),
      onAccent: getBestContrastingColor(darkAccent, ['#ffffff', '#000000']),
      onSuccess: getBestContrastingColor(darkSuccess, ['#ffffff', '#000000']),
      onWarning: getBestContrastingColor(darkWarning, ['#ffffff', '#000000']),
      onDanger: getBestContrastingColor(darkDanger, ['#ffffff', '#000000']),
      onInfo: getBestContrastingColor(darkInfo, ['#ffffff', '#000000']),
      muted: '#94a3b8',
      ring: darkAccent,
      scrim: 'rgba(0, 0, 0, 0.75)',
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
    radiusSurface,
    radiusPill: '9999px',
    shadow: shadow.value,
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    blurGlass: '12px',
    zIndex: {
      dropdown: '1000',
      sticky: '1100',
      modal: '1200',
      toast: '1300',
    },
    transitions: {
      durationFast: '150ms',
      durationBase: '200ms',
      durationSlow: '300ms',
      easeStandard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    icons: {
      library: iconConfig.library,
      mode: iconConfig.mode,
      duotone: iconConfig.duotone,
      weight: iconConfig.weight,
      strokeWidth: iconWeight.px,
      strokeWidthNum: iconWeight.num,
      fillOpacity: iconFillOpacity,
      pkg: iconPkg,
      supportsStroke,
    },
    breakpoints: {
      sm: '640px',
      lg: '1024px',
      wide: '1280px',
      mobile: '640px',
      tablet: '1024px',
      desktop: '1280px',
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
  --color-primary-bg: ${tokens.lightColors.primaryBg};
  --color-primary-text: ${tokens.lightColors.primaryText};
  --color-secondary: ${tokens.lightColors.secondary};
  --color-secondary-text: ${tokens.lightColors.secondaryText};
  --color-accent: ${tokens.lightColors.accent};
  --color-accent-text: ${tokens.lightColors.accentText};
  --color-background: ${tokens.lightColors.background};
  --color-surface: ${tokens.lightColors.surface};
  --color-text: ${tokens.lightColors.text};
  --color-border: ${tokens.lightColors.border};
  --color-muted: ${tokens.lightColors.muted};
  --color-ring: ${tokens.lightColors.ring};
  --color-scrim: ${tokens.lightColors.scrim};

  /* Status Colors & Text-Safe Pairs (Light Mode) */
  --color-success: ${tokens.lightColors.success};
  --color-success-bg: ${tokens.lightColors.successBg};
  --color-success-text: ${tokens.lightColors.successText};
  --color-on-success: ${tokens.lightColors.onSuccess};

  --color-warning: ${tokens.lightColors.warning};
  --color-warning-bg: ${tokens.lightColors.warningBg};
  --color-warning-text: ${tokens.lightColors.warningText};
  --color-on-warning: ${tokens.lightColors.onWarning};

  --color-danger: ${tokens.lightColors.danger};
  --color-danger-bg: ${tokens.lightColors.dangerBg};
  --color-danger-text: ${tokens.lightColors.dangerText};
  --color-on-danger: ${tokens.lightColors.onDanger};

  --color-info: ${tokens.lightColors.info};
  --color-info-bg: ${tokens.lightColors.infoBg};
  --color-info-text: ${tokens.lightColors.infoText};
  --color-on-info: ${tokens.lightColors.onInfo};

  --color-on-primary: ${tokens.lightColors.onPrimary};
  --color-on-secondary: ${tokens.lightColors.onSecondary};
  --color-on-accent: ${tokens.lightColors.onAccent};

  /* Typography */
  --font-heading: '${tokens.typography.headingFamily}', ${tokens.typography.headingCategory};
  --font-body: '${tokens.typography.bodyFamily}', ${tokens.typography.bodyCategory};
  --font-size-base: ${tokens.typography.baseSize}px;
  --font-scale: ${tokens.typography.scaleRatio};

  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

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
  --radius-surface: ${tokens.radiusSurface};
  --radius-pill: 9999px;
  --shadow-sm: ${tokens.shadowSm};
  --shadow-base: ${tokens.shadow};
  --shadow-md: ${tokens.shadowMd};
  --shadow-lg: ${tokens.shadowLg};
  --shadow-hover: ${tokens.shadowHover};
  --blur-glass: 12px;

  /* Z-Index Hierarchy */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1200;
  --z-toast: 1300;

  /* Animation & Transitions */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1);

  /* Icon System (${tokens.icons.library} • ${tokens.icons.mode} • ${tokens.icons.weight}) */
  --icon-library: '${tokens.icons.library}';
${tokens.icons.supportsStroke ? `  --icon-stroke: ${tokens.icons.strokeWidth};\n` : ''}  --icon-fill-opacity: ${tokens.icons.fillOpacity};

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-lg: 1024px;
  --breakpoint-wide: 1280px;
}

/* Dark Mode Overrides */
[data-theme='dark'],
.dark {
  --color-primary: ${tokens.darkColors.primary};
  --color-primary-bg: ${tokens.darkColors.primaryBg};
  --color-primary-text: ${tokens.darkColors.primaryText};
  --color-secondary: ${tokens.darkColors.secondary};
  --color-secondary-text: ${tokens.darkColors.secondaryText};
  --color-accent: ${tokens.darkColors.accent};
  --color-accent-text: ${tokens.darkColors.accentText};
  --color-background: ${tokens.darkColors.background};
  --color-surface: ${tokens.darkColors.surface};
  --color-text: ${tokens.darkColors.text};
  --color-border: ${tokens.darkColors.border};
  --color-muted: ${tokens.darkColors.muted};
  --color-ring: ${tokens.darkColors.ring};
  --color-scrim: ${tokens.darkColors.scrim};

  --color-success: ${tokens.darkColors.success};
  --color-success-bg: ${tokens.darkColors.successBg};
  --color-success-text: ${tokens.darkColors.successText};
  --color-on-success: ${tokens.darkColors.onSuccess};

  --color-warning: ${tokens.darkColors.warning};
  --color-warning-bg: ${tokens.darkColors.warningBg};
  --color-warning-text: ${tokens.darkColors.warningText};
  --color-on-warning: ${tokens.darkColors.onWarning};

  --color-danger: ${tokens.darkColors.danger};
  --color-danger-bg: ${tokens.darkColors.dangerBg};
  --color-danger-text: ${tokens.darkColors.dangerText};
  --color-on-danger: ${tokens.darkColors.onDanger};

  --color-info: ${tokens.darkColors.info};
  --color-info-bg: ${tokens.darkColors.infoBg};
  --color-info-text: ${tokens.darkColors.infoText};
  --color-on-info: ${tokens.darkColors.onInfo};

  --color-on-primary: ${tokens.darkColors.onPrimary};
  --color-on-secondary: ${tokens.darkColors.onSecondary};
  --color-on-accent: ${tokens.darkColors.onAccent};
}

/* System Dark Mode (Applied when no data-theme is explicitly specified) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --color-primary: ${tokens.darkColors.primary};
    --color-primary-bg: ${tokens.darkColors.primaryBg};
    --color-primary-text: ${tokens.darkColors.primaryText};
    --color-secondary: ${tokens.darkColors.secondary};
    --color-secondary-text: ${tokens.darkColors.secondaryText};
    --color-accent: ${tokens.darkColors.accent};
    --color-accent-text: ${tokens.darkColors.accentText};
    --color-background: ${tokens.darkColors.background};
    --color-surface: ${tokens.darkColors.surface};
    --color-text: ${tokens.darkColors.text};
    --color-border: ${tokens.darkColors.border};
    --color-muted: ${tokens.darkColors.muted};
    --color-ring: ${tokens.darkColors.ring};
    --color-scrim: ${tokens.darkColors.scrim};

    --color-success: ${tokens.darkColors.success};
    --color-success-bg: ${tokens.darkColors.successBg};
    --color-success-text: ${tokens.darkColors.successText};
    --color-on-success: ${tokens.darkColors.onSuccess};

    --color-warning: ${tokens.darkColors.warning};
    --color-warning-bg: ${tokens.darkColors.warningBg};
    --color-warning-text: ${tokens.darkColors.warningText};
    --color-on-warning: ${tokens.darkColors.onWarning};

    --color-danger: ${tokens.darkColors.danger};
    --color-danger-bg: ${tokens.darkColors.dangerBg};
    --color-danger-text: ${tokens.darkColors.dangerText};
    --color-on-danger: ${tokens.darkColors.onDanger};

    --color-info: ${tokens.darkColors.info};
    --color-info-bg: ${tokens.darkColors.infoBg};
    --color-info-text: ${tokens.darkColors.infoText};
    --color-on-info: ${tokens.darkColors.onInfo};

    --color-on-primary: ${tokens.darkColors.onPrimary};
    --color-on-secondary: ${tokens.darkColors.onSecondary};
    --color-on-accent: ${tokens.darkColors.onAccent};
  }
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
    '--ts-color-primary-text': activeColors.primaryText,
    '--ts-color-secondary': activeColors.secondary,
    '--ts-color-secondary-text': activeColors.secondaryText,
    '--ts-color-accent': activeColors.accent,
    '--ts-color-accent-text': activeColors.accentText,
    '--ts-color-background': activeColors.background,
    '--ts-color-surface': activeColors.surface,
    '--ts-color-text': activeColors.text,
    '--ts-color-border': activeColors.border,
    '--ts-color-success': activeColors.success,
    '--ts-color-success-bg': activeColors.successBg,
    '--ts-color-success-text': activeColors.successText,
    '--ts-color-warning': activeColors.warning,
    '--ts-color-warning-bg': activeColors.warningBg,
    '--ts-color-warning-text': activeColors.warningText,
    '--ts-color-danger': activeColors.danger,
    '--ts-color-danger-bg': activeColors.dangerBg,
    '--ts-color-danger-text': activeColors.dangerText,
    '--ts-color-info': activeColors.info,
    '--ts-color-info-bg': activeColors.infoBg,
    '--ts-color-info-text': activeColors.infoText,
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
    '--ts-radius-button': tokens.radius,
    '--ts-radius-surface': parseInt(tokens.radius, 10) > 20 || tokens.radius === '9999px' ? '20px' : tokens.radius,
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

