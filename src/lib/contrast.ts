/**
 * WCAG 2.1 & APCA Contrast Calculation Utilities
 */

export interface ContrastResult {
  ratio: number;
  formattedRatio: string;
  passesAA: boolean;       // >= 4.5:1 (normal text)
  passesAALarge: boolean;  // >= 3.0:1 (large text / UI components)
  passesAAA: boolean;      // >= 7.0:1 (enhanced contrast)
  level: 'FAIL' | 'AA Large' | 'AA' | 'AAA';
  apcaScore?: number;      // Lc score (-108 to +106)
  apcaRating?: string;
}

export function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return [r, g, b];
}

function getChannelLuminance(channel: number): number {
  const sRGB = channel / 255;
  return sRGB <= 0.04045
    ? sRGB / 12.92
    : Math.pow((sRGB + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex: string): number {
  try {
    const [r, g, b] = hexToRgb(hex);
    return (
      0.2126 * getChannelLuminance(r) +
      0.7152 * getChannelLuminance(g) +
      0.0722 * getChannelLuminance(b)
    );
  } catch {
    return 0;
  }
}

/**
 * Advanced Perceptual Contrast Algorithm (APCA) calculation
 * Returns Lightness contrast score Lc (-108 to +106)
 */
export function calculateAPCA(txtHex: string, bgHex: string): number {
  try {
    const [tr, tg, tb] = hexToRgb(txtHex);
    const [br, bg, bb] = hexToRgb(bgHex);

    // Simple Y luminance conversion for APCA standard
    const yTxt = 0.2126729 * Math.pow(tr / 255, 2.4) + 0.7151522 * Math.pow(tg / 255, 2.4) + 0.0721750 * Math.pow(tb / 255, 2.4);
    const yBg = 0.2126729 * Math.pow(br / 255, 2.4) + 0.7151522 * Math.pow(bg / 255, 2.4) + 0.0721750 * Math.pow(bb / 255, 2.4);

    let sapc = 0;
    if (yBg >= yTxt) {
      // Dark text on light background
      sapc = (Math.pow(yBg, 0.56) - Math.pow(yTxt, 0.57)) * 1.14;
    } else {
      // Light text on dark background
      sapc = (Math.pow(yBg, 0.65) - Math.pow(yTxt, 0.62)) * 1.14;
    }

    const output = Math.round(sapc * 100);
    return isNaN(output) ? 0 : output;
  } catch {
    return 0;
  }
}

export function calculateContrastRatio(foregroundHex: string, backgroundHex: string): ContrastResult {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  const passesAAA = roundedRatio >= 7.0;
  const passesAA = roundedRatio >= 4.5;
  const passesAALarge = roundedRatio >= 3.0;

  let level: 'FAIL' | 'AA Large' | 'AA' | 'AAA' = 'FAIL';
  if (passesAAA) level = 'AAA';
  else if (passesAA) level = 'AA';
  else if (passesAALarge) level = 'AA Large';

  const apca = calculateAPCA(foregroundHex, backgroundHex);
  const absApca = Math.abs(apca);
  let apcaRating = 'Low';
  if (absApca >= 90) apcaRating = 'Preferred Body Text (Lc 90+)';
  else if (absApca >= 75) apcaRating = 'Acceptable Body Text (Lc 75+)';
  else if (absApca >= 60) apcaRating = 'Large Text & UI (Lc 60+)';
  else if (absApca >= 45) apcaRating = 'Headline & Bold Only (Lc 45+)';

  return {
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio.toFixed(2)}:1`,
    passesAA,
    passesAALarge,
    passesAAA,
    level,
    apcaScore: apca,
    apcaRating,
  };
}

export function getBestContrastingColor(bgHex: string, options = ['#ffffff', '#000000']): string {
  const ratios = options.map((fg) => ({
    color: fg,
    ratio: calculateContrastRatio(fg, bgHex).ratio,
  }));
  ratios.sort((a, b) => b.ratio - a.ratio);
  return ratios[0].color;
}

/**
 * Check color harmony between primary and accent hues
 */
export function checkColorHarmony(primaryHex: string, accentHex: string): {
  status: 'complementary' | 'analogous' | 'triadic' | 'clashing' | 'subtle';
  hueDiff: number;
  message: string;
} {
  try {
    const [r1, g1, b1] = hexToRgb(primaryHex);
    const [r2, g2, b2] = hexToRgb(accentHex);

    const rgbToHue = (r: number, g: number, b: number) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0;
      if (max === min) return 0;
      const d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      return Math.round(h * 60);
    };

    const h1 = rgbToHue(r1, g1, b1);
    const h2 = rgbToHue(r2, g2, b2);

    let diff = Math.abs(h1 - h2);
    if (diff > 180) diff = 360 - diff;

    if (diff >= 150 && diff <= 180) {
      return { status: 'complementary', hueDiff: diff, message: 'High-contrast complementary palette (ideal for CTA focal highlights).' };
    } else if (diff >= 105 && diff <= 135) {
      return { status: 'triadic', hueDiff: diff, message: 'Triadic harmony with rich chromatic balance.' };
    } else if (diff >= 25 && diff <= 60) {
      return { status: 'analogous', hueDiff: diff, message: 'Pleasing analogous palette (smooth tonal progression).' };
    } else if (diff > 5 && diff < 20) {
      return { status: 'clashing', hueDiff: diff, message: 'Potential chromatic dissonance: hues are very close but dissimilar.' };
    } else {
      return { status: 'subtle', hueDiff: diff, message: 'Subtle monochromatic chromatic variation.' };
    }
  } catch {
    return { status: 'subtle', hueDiff: 0, message: 'Balanced palette.' };
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Automatically compute the nearest text-safe shade of a base color that achieves >= 4.5:1
 * contrast against both the given background and surface containers.
 */
export function computeTextSafeColor(
  baseHex: string,
  bgHex: string,
  surfaceHex: string,
  mode: 'light' | 'dark'
): string {
  const currentRatioBg = calculateContrastRatio(baseHex, bgHex).ratio;
  const currentRatioSurface = calculateContrastRatio(baseHex, surfaceHex).ratio;
  if (currentRatioBg >= 4.5 && currentRatioSurface >= 4.5) {
    return baseHex;
  }

  const [r, g, b] = hexToRgb(baseHex);
  const target = mode === 'light' ? [0, 0, 0] : [255, 255, 255];
  for (let i = 1; i <= 100; i++) {
    const t = i / 100;
    const curR = r + (target[0] - r) * t;
    const curG = g + (target[1] - g) * t;
    const curB = b + (target[2] - b) * t;
    const candidate = rgbToHex(curR, curG, curB);
    if (
      calculateContrastRatio(candidate, bgHex).ratio >= 4.5 &&
      calculateContrastRatio(candidate, surfaceHex).ratio >= 4.5
    ) {
      return candidate;
    }
  }
  return mode === 'light' ? '#000000' : '#ffffff';
}

export interface ContrastReportColors {
  text: string;
  background: string;
  surface: string;
  muted: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  accent: string;
  accentText: string;
  success: string;
  successText: string;
  warning: string;
  warningText: string;
  danger: string;
  dangerText: string;
  info: string;
  infoText: string;
  onPrimary: string;
  onSecondary: string;
  onAccent: string;
}

export function generateContrastReport(
  lightColors: ContrastReportColors,
  darkColors: ContrastReportColors
): string {
  function renderTableForMode(mode: 'Light' | 'Dark', colors: ContrastReportColors): { table: string; warnings: string[] } {
    const rows = [
      { pair: 'text on background', fgName: 'text', fgHex: colors.text, bgName: 'background', bgHex: colors.background },
      { pair: 'text on surface', fgName: 'text', fgHex: colors.text, bgName: 'surface', bgHex: colors.surface },
      { pair: 'muted on background', fgName: 'muted', fgHex: colors.muted, bgName: 'background', bgHex: colors.background, remediation: 'text' },
      { pair: 'muted on surface', fgName: 'muted', fgHex: colors.muted, bgName: 'surface', bgHex: colors.surface, remediation: 'text' },
      { pair: 'on-primary on primary', fgName: 'on-primary', fgHex: colors.onPrimary, bgName: 'primary', bgHex: colors.primary },
      { pair: 'on-secondary on secondary', fgName: 'on-secondary', fgHex: colors.onSecondary, bgName: 'secondary', bgHex: colors.secondary },
      { pair: 'on-accent on accent', fgName: 'on-accent', fgHex: colors.onAccent, bgName: 'accent', bgHex: colors.accent },
      { pair: 'primary-text on background', fgName: 'primary-text', fgHex: colors.primaryText, bgName: 'background', bgHex: colors.background },
      { pair: 'primary-text on surface', fgName: 'primary-text', fgHex: colors.primaryText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'secondary-text on background', fgName: 'secondary-text', fgHex: colors.secondaryText, bgName: 'background', bgHex: colors.background },
      { pair: 'secondary-text on surface', fgName: 'secondary-text', fgHex: colors.secondaryText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'accent-text on background', fgName: 'accent-text', fgHex: colors.accentText, bgName: 'background', bgHex: colors.background },
      { pair: 'accent-text on surface', fgName: 'accent-text', fgHex: colors.accentText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'success-text on background', fgName: 'success-text', fgHex: colors.successText, bgName: 'background', bgHex: colors.background },
      { pair: 'success-text on surface', fgName: 'success-text', fgHex: colors.successText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'warning-text on background', fgName: 'warning-text', fgHex: colors.warningText, bgName: 'background', bgHex: colors.background },
      { pair: 'warning-text on surface', fgName: 'warning-text', fgHex: colors.warningText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'danger-text on background', fgName: 'danger-text', fgHex: colors.dangerText, bgName: 'background', bgHex: colors.background },
      { pair: 'danger-text on surface', fgName: 'danger-text', fgHex: colors.dangerText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'info-text on background', fgName: 'info-text', fgHex: colors.infoText, bgName: 'background', bgHex: colors.background },
      { pair: 'info-text on surface', fgName: 'info-text', fgHex: colors.infoText, bgName: 'surface', bgHex: colors.surface },
      { pair: 'success on surface (fill only)', fgName: 'success', fgHex: colors.success, bgName: 'surface', bgHex: colors.surface, isFillOnly: true },
      { pair: 'warning on surface (fill only)', fgName: 'warning', fgHex: colors.warning, bgName: 'surface', bgHex: colors.surface, isFillOnly: true },
      { pair: 'danger on surface (fill only)', fgName: 'danger', fgHex: colors.danger, bgName: 'surface', bgHex: colors.surface, isFillOnly: true },
      { pair: 'info on surface (fill only)', fgName: 'info', fgHex: colors.info, bgName: 'surface', bgHex: colors.surface, isFillOnly: true },
    ];

    const warnings: string[] = [];
    const tableRows = rows.map((r) => {
      const res = calculateContrastRatio(r.fgHex, r.bgHex);
      if (!r.isFillOnly && !res.passesAA) {
        warnings.push(`- ⚠️ **${mode} Mode Warning**: \`${r.fgName}\` on \`${r.bgName}\` achieves ${res.formattedRatio} (fails WCAG AA 4.5:1). Remedy: use \`--color-${r.remediation ?? `${r.fgName}-text`}\` for typography.`);
      }
      const aaBadge = r.isFillOnly
        ? res.passesAALarge ? '✅ Pass (UI)' : '⚠️ Fill Only'
        : res.passesAA ? '✅ Pass' : '❌ Fail';
      const aaaBadge = res.passesAAA ? '✅ Pass' : '—';
      return `| \`${r.pair}\` | \`${r.fgHex}\` | \`${r.bgHex}\` | **${res.formattedRatio}** | ${aaBadge} | ${aaaBadge} |`;
    });

    const table = `#### ${mode} Mode Contrast Table
| Evaluated Pair | Foreground | Background | Ratio | WCAG AA (4.5:1) | WCAG AAA (7.0:1) |
| :--- | :--- | :--- | :--- | :--- | :--- |
${tableRows.join('\n')}`;

    return { table, warnings };
  }

  const light = renderTableForMode('Light', lightColors);
  const dark = renderTableForMode('Dark', darkColors);

  const allWarnings = [...light.warnings, ...dark.warnings];
  const warningsBlock = allWarnings.length > 0
    ? `\n\n#### Contrast Warnings & Remediation Recommendations\n${allWarnings.join('\n')}`
    : '\n\n#### Contrast Compliance Status\n✅ All evaluated text and link pairs strictly satisfy WCAG AA (4.5:1) requirements.';

  return `### 2.1b Contrast Report
> **Compliance Target**: Target: WCAG AA (4.5:1 body text, 3:1 large text and UI components); AAA where the palette allows. See the contrast report below.

${light.table}

${dark.table}${warningsBlock}`;
}
