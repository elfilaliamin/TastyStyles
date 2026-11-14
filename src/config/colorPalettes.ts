import type { ColorPalette } from './schema';
import { registries } from '../lib/registry';

export type ColorHarmonyCategory =
  | 'Complementary'
  | 'Analogous'
  | 'Monochromatic'
  | 'Split-Complementary'
  | 'Triadic'
  | 'Square';

export interface VisualColorPalette {
  id: string;
  name: string;
  category: ColorHarmonyCategory;
  harmonyBadge: string;
  description: string;
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
}

// Map the 20 builtin presets into Graphic Design Color Harmonies
const presetHarmonies: Record<string, { category: ColorHarmonyCategory; badge: string }> = {
  'editorial-luxury': { category: 'Complementary', badge: '180° Navy & Gold' },
  'crisp-amber': { category: 'Complementary', badge: '180° Slate & Amber' },
  'fintech-teal': { category: 'Complementary', badge: '180° Teal & Coral' },
  'airbnb-coral': { category: 'Complementary', badge: '180° Coral & Teal' },
  'spotify-pulse': { category: 'Complementary', badge: '180° Neon & Black' },
  'supabase-emerald': { category: 'Complementary', badge: '180° Emerald & Orange' },

  'nordic-forest': { category: 'Analogous', badge: '30° Emerald & Mint' },
  'sunset-amber': { category: 'Analogous', badge: '45° Amber & Rose' },
  'sage-wellness': { category: 'Analogous', badge: '30° Sage & Eucalyptus' },
  'terracotta-clay': { category: 'Analogous', badge: '40° Terracotta & Sand' },
  'aurora-emerald': { category: 'Analogous', badge: '35° Emerald & Teal' },

  'zinc-minimal': { category: 'Monochromatic', badge: '0° Zinc Tones' },
  'linear-obsidian': { category: 'Monochromatic', badge: '0° Pure Obsidian' },
  'vercel-stark': { category: 'Monochromatic', badge: '0° Stark Grayscale' },
  'notion-ivory': { category: 'Monochromatic', badge: '0° Warm Ivory' },

  'stripe-indigo': { category: 'Split-Complementary', badge: '150°/210° Indigo & Coral' },
  'obsidian-beam': { category: 'Split-Complementary', badge: '150°/210° Violet & Cyan' },

  'cyber-neon': { category: 'Triadic', badge: '120° Cyan, Magenta, Gold' },
  'monokai-pro': { category: 'Triadic', badge: '120° Gold, Ruby, Cyan' },

  'tokyo-night': { category: 'Square', badge: '90° Tetradic Cyber' },
};

const builtinPresetsAsHarmonies: VisualColorPalette[] = registries.presets.map((p) => {
  const harmony = presetHarmonies[p.id] ?? { category: 'Complementary', badge: '180° Dual Tone' };
  return {
    id: p.id,
    name: p.label,
    category: harmony.category,
    harmonyBadge: harmony.badge,
    description: p.description,
    colors: p.state.colors,
  };
});

// Additional Curated Graphic Design Theory Palettes (Complementary, Analogous, Monochromatic, Split-Complementary, Triadic, Square)
const curatedTheoryPalettes: VisualColorPalette[] = [
  // 1. COMPLEMENTARY (180° opposites on color wheel)
  {
    id: 'comp-sapphire-ember',
    name: 'Sapphire & Ember',
    category: 'Complementary',
    harmonyBadge: '180° Blue & Orange',
    description: 'High-energy complementary contrast between deep ocean sapphire and radiant ember orange.',
    colors: {
      light: {
        primary: '#0284c7',
        secondary: '#475569',
        accent: '#ea580c',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#38bdf8',
        secondary: '#94a3b8',
        accent: '#fb923c',
        background: '#0b1320',
        surface: '#152238',
        text: '#f8fafc',
        border: '#1e3352',
      },
    },
  },
  {
    id: 'comp-amethyst-lime',
    name: 'Amethyst & Lime',
    category: 'Complementary',
    harmonyBadge: '180° Violet & Lime',
    description: 'Electric fashion pairing of deep royal amethyst with vivid lime focal points.',
    colors: {
      light: {
        primary: '#7c3aed',
        secondary: '#64748b',
        accent: '#65a30d',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#e9d5ff',
      },
      dark: {
        primary: '#a78bfa',
        secondary: '#94a3b8',
        accent: '#a3e635',
        background: '#120b24',
        surface: '#1e1338',
        text: '#faf5ff',
        border: '#2f1e56',
      },
    },
  },

  // 2. ANALOGOUS (30°-60° adjacent hues)
  {
    id: 'ana-ocean-wave',
    name: 'Oceanic Wave',
    category: 'Analogous',
    harmonyBadge: '30° Azure, Sky & Cyan',
    description: 'Cohesive, soothing progression across contiguous cool blue, sky, and cyan wavelengths.',
    colors: {
      light: {
        primary: '#2563eb',
        secondary: '#0284c7',
        accent: '#06b6d4',
        background: '#f0f9ff',
        surface: '#ffffff',
        text: '#0c4a6e',
        border: '#bae6fd',
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#38bdf8',
        accent: '#22d3ee',
        background: '#031726',
        surface: '#082f49',
        text: '#f0f9ff',
        border: '#0c4a6e',
      },
    },
  },
  {
    id: 'ana-cosmic-twilight',
    name: 'Cosmic Twilight',
    category: 'Analogous',
    harmonyBadge: '45° Indigo, Purple & Pink',
    description: 'Mystic nocturnal progression connecting royal indigo, rich purple, and rose blush.',
    colors: {
      light: {
        primary: '#4f46e5',
        secondary: '#7c3aed',
        accent: '#db2777',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#f3e8ff',
      },
      dark: {
        primary: '#818cf8',
        secondary: '#a78bfa',
        accent: '#f472b6',
        background: '#0f0c20',
        surface: '#1b1434',
        text: '#faf5ff',
        border: '#2e1f58',
      },
    },
  },

  // 3. MONOCHROMATIC (Single hue lightness & chroma variants)
  {
    id: 'mono-alpine-pine',
    name: 'Alpine Pine Monolith',
    category: 'Monochromatic',
    harmonyBadge: '0° Evergreen Tones',
    description: 'Singular evergreen hue graded across botanical deep shadows and crisp morning tints.',
    colors: {
      light: {
        primary: '#065f46',
        secondary: '#047857',
        accent: '#10b981',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#022c22',
        border: '#bbf7d0',
      },
      dark: {
        primary: '#34d399',
        secondary: '#10b981',
        accent: '#6ee7b7',
        background: '#021810',
        surface: '#052e1c',
        text: '#ecfdf5',
        border: '#094d2f',
      },
    },
  },
  {
    id: 'mono-sandstone-ochre',
    name: 'Sandstone & Ochre',
    category: 'Monochromatic',
    harmonyBadge: '0° Warm Sandstone',
    description: 'Timeless architectural warmth derived solely from earth pigment saturation gradients.',
    colors: {
      light: {
        primary: '#78350f',
        secondary: '#92400e',
        accent: '#d97706',
        background: '#fefce8',
        surface: '#ffffff',
        text: '#451a03',
        border: '#fde68a',
      },
      dark: {
        primary: '#f59e0b',
        secondary: '#fbbf24',
        accent: '#fde68a',
        background: '#1c1305',
        surface: '#2e1e07',
        text: '#fffbeb',
        border: '#4a320b',
      },
    },
  },

  // 4. SPLIT-COMPLEMENTARY (Base + 2 adjacent to opposite: 150° & 210°)
  {
    id: 'split-sapphire-warmth',
    name: 'Sapphire, Amber & Coral',
    category: 'Split-Complementary',
    harmonyBadge: '150°/210° Split Dual-Warm',
    description: 'Cool blue anchor balanced with split warm complements of honey amber and coral rose.',
    colors: {
      light: {
        primary: '#1d4ed8',
        secondary: '#e11d48',
        accent: '#d97706',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#fb7185',
        accent: '#fbbf24',
        background: '#091120',
        surface: '#122038',
        text: '#f8fafc',
        border: '#1b3256',
      },
    },
  },
  {
    id: 'split-emerald-royalty',
    name: 'Emerald, Ruby & Violet',
    category: 'Split-Complementary',
    harmonyBadge: '150°/210° Split Jewel Tone',
    description: 'Prestigious split complementary palette balancing emerald base with jewel-toned ruby and violet accents.',
    colors: {
      light: {
        primary: '#059669',
        secondary: '#7c3aed',
        accent: '#e11d48',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#022c22',
        border: '#dcfce7',
      },
      dark: {
        primary: '#34d399',
        secondary: '#a78bfa',
        accent: '#fb7185',
        background: '#051810',
        surface: '#0b2b1e',
        text: '#f0fdf4',
        border: '#134732',
      },
    },
  },
  {
    id: 'split-violet-gold-lime',
    name: 'Violet, Marigold & Lime',
    category: 'Split-Complementary',
    harmonyBadge: '150°/210° Split Royal Bright',
    description: 'Regal violet base highlighted by split complements of marigold gold and lime chartreuse.',
    colors: {
      light: {
        primary: '#7c3aed',
        secondary: '#65a30d',
        accent: '#f59e0b',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#ede9fe',
      },
      dark: {
        primary: '#a78bfa',
        secondary: '#a3e635',
        accent: '#fbbf24',
        background: '#120826',
        surface: '#1e103c',
        text: '#faf5ff',
        border: '#321c60',
      },
    },
  },

  // 5. TRIADIC (Three equidistant hues 120° apart)
  {
    id: 'triad-neo-classic',
    name: 'Classic Primary Triad',
    category: 'Triadic',
    harmonyBadge: '120° Blue, Red & Gold',
    description: 'Modernized primary triad balancing cobalt blue, crimson red, and bright gold.',
    colors: {
      light: {
        primary: '#2563eb',
        secondary: '#dc2626',
        accent: '#ca8a04',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#f87171',
        accent: '#facc15',
        background: '#0b1322',
        surface: '#16233d',
        text: '#f8fafc',
        border: '#1f355c',
      },
    },
  },
  {
    id: 'triad-fintech-balance',
    name: 'FinTech Sovereign Triad',
    category: 'Triadic',
    harmonyBadge: '120° Indigo, Jade & Amber',
    description: 'Equidistant 120° balance communicating institutional stability (indigo), growth (jade), and urgency (amber).',
    colors: {
      light: {
        primary: '#4338ca',
        secondary: '#059669',
        accent: '#d97706',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#e0e7ff',
      },
      dark: {
        primary: '#818cf8',
        secondary: '#34d399',
        accent: '#fbbf24',
        background: '#0c0e22',
        surface: '#161a3d',
        text: '#f8fafc',
        border: '#252b60',
      },
    },
  },
  {
    id: 'triad-studio-creative',
    name: 'Creative Studio Triad',
    category: 'Triadic',
    harmonyBadge: '120° Violet, Tangerine, Teal',
    description: 'Dynamic equilateral triad combining amethyst violet, fiery tangerine, and coastal teal.',
    colors: {
      light: {
        primary: '#7c3aed',
        secondary: '#ea580c',
        accent: '#0d9488',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#ede9fe',
      },
      dark: {
        primary: '#a78bfa',
        secondary: '#fb923c',
        accent: '#2dd4bf',
        background: '#120b24',
        surface: '#1f133d',
        text: '#faf5ff',
        border: '#332062',
      },
    },
  },

  // 6. SQUARE / TETRADIC (Four hues spaced 90° apart)
  {
    id: 'sq-prism-quad',
    name: 'Prism Square Quad',
    category: 'Square',
    harmonyBadge: '90° Blue, Jade, Amber, Purple',
    description: 'Harmonious 90° four-corner tetradic palette offering rich multi-accent hierarchy for complex platforms.',
    colors: {
      light: {
        primary: '#2563eb',
        secondary: '#059669',
        accent: '#f59e0b',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#34d399',
        accent: '#fbbf24',
        background: '#0a1222',
        surface: '#14223d',
        text: '#f8fafc',
        border: '#1e3358',
      },
    },
  },
  {
    id: 'sq-electric-quad',
    name: 'Electric Neon Quad',
    category: 'Square',
    harmonyBadge: '90° Cyan, Purple, Orange, Lime',
    description: 'High-contrast cyberpunk four-axis color geometry designed for gaming, Web3, and creative tools.',
    colors: {
      light: {
        primary: '#0891b2',
        secondary: '#9333ea',
        accent: '#ea580c',
        background: '#f0fdfa',
        surface: '#ffffff',
        text: '#164e63',
        border: '#ccfbf1',
      },
      dark: {
        primary: '#22d3ee',
        secondary: '#c084fc',
        accent: '#fb923c',
        background: '#04171d',
        surface: '#082b35',
        text: '#f0fdfa',
        border: '#0d4251',
      },
    },
  },
  {
    id: 'sq-cosmic-tetrad',
    name: 'Cosmic Tetradic',
    category: 'Square',
    harmonyBadge: '90° Indigo, Rose, Gold, Teal',
    description: 'Four-point cosmic quadrant combining deep indigo, rose blossom, honey gold, and maritime teal.',
    colors: {
      light: {
        primary: '#4f46e5',
        secondary: '#e11d48',
        accent: '#d97706',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#1e1b4b',
        border: '#ede9fe',
      },
      dark: {
        primary: '#818cf8',
        secondary: '#fb7185',
        accent: '#fbbf24',
        background: '#0e0b24',
        surface: '#1a143e',
        text: '#faf5ff',
        border: '#2c2262',
      },
    },
  },
  {
    id: 'sq-horizon-artisan',
    name: 'Horizon Artisan Quad',
    category: 'Square',
    harmonyBadge: '90° Navy, Coral, Olive, Plum',
    description: 'Subdued artisanal four-axis balance crafted for luxury, lifestyle, and editorial platforms.',
    colors: {
      light: {
        primary: '#1e3a8a',
        secondary: '#e11d48',
        accent: '#4d7c0f',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#93c5fd',
        secondary: '#fb7185',
        accent: '#a3e635',
        background: '#081122',
        surface: '#10203e',
        text: '#f8fafc',
        border: '#1a305a',
      },
    },
  },
];

export const ALL_COLOR_PALETTES: VisualColorPalette[] = [
  ...builtinPresetsAsHarmonies,
  ...curatedTheoryPalettes,
];
