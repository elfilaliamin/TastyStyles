import { registries } from './registry';

/**
 * Dynamically injects Google Fonts link into document head.
 */
export function updateDynamicFonts(families: string[]): void {
  if (typeof document === 'undefined' || !families.length) return;

  const uniqueFamilies = Array.from(new Set(families.filter(Boolean)));
  const linkId = 'tastystyles-active-fonts';
  let link = document.getElementById(linkId) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Build Google Fonts CSS2 query string
  const familyQueries = uniqueFamilies.map((fam) => {
    const regFont = registries.fonts.find(
      (rf) => rf.id === fam || rf.family.toLowerCase() === fam.toLowerCase()
    );
    const fontName = regFont ? regFont.family : fam;
    const formatted = fontName.replace(/\s+/g, '+');
    const availableWeights = regFont?.weights?.filter((w) => [400, 500, 600, 700].includes(w)) || [400, 500, 600, 700];
    const weightsStr = availableWeights.length > 0 ? `:wght@${availableWeights.join(';')}` : ':wght@400';
    return `family=${formatted}${weightsStr}`;
  });

  const url = `https://fonts.googleapis.com/css2?${familyQueries.join('&')}&display=swap`;
  if (link.href !== url) {
    link.href = url;
  }
}

/**
 * Loads all font families in the registry so font preview dropdowns show true typefaces.
 */
export function loadAllPreviewFonts(): void {
  if (typeof document === 'undefined') return;

  const linkId = 'tastystyles-all-preview-fonts';
  if (document.getElementById(linkId)) return;

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';

  const families = registries.fonts.map((f) => {
    const formatted = f.family.replace(/\s+/g, '+');
    const availableWeights = f.weights.filter((w) => [400, 600, 700].includes(w));
    const weightsStr = availableWeights.length > 0 ? `:wght@${availableWeights.join(';')}` : ':wght@400';
    return `family=${formatted}${weightsStr}`;
  });

  link.href = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
  document.head.appendChild(link);
}

