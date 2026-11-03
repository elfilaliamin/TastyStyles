/**
 * WCAG 2.1 Contrast Calculation Utilities
 */

export interface ContrastResult {
  ratio: number;
  formattedRatio: string;
  passesAA: boolean;       // >= 4.5:1 (normal text)
  passesAALarge: boolean;  // >= 3.0:1 (large text / UI components)
  passesAAA: boolean;      // >= 7.0:1 (enhanced contrast)
  level: 'FAIL' | 'AA Large' | 'AA' | 'AAA';
}

function hexToRgb(hex: string): [number, number, number] {
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

  return {
    ratio: roundedRatio,
    formattedRatio: `${roundedRatio.toFixed(2)}:1`,
    passesAA,
    passesAALarge,
    passesAAA,
    level,
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

