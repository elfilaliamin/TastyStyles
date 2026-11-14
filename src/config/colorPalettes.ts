import type { ColorPalette } from './schema';
import { registries } from '../lib/registry';

export interface VisualColorPalette {
  id: string;
  name: string;
  category: 'SaaS & Tech' | 'Dark & Cyber' | 'Warm & Nature' | 'Vibrant & Creative' | 'Luxury & Minimal';
  description: string;
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
}

// 1. Initial 20 Palettes derived from registered presets
const presetPalettes: VisualColorPalette[] = registries.presets.map((p) => {
  let category: VisualColorPalette['category'] = 'SaaS & Tech';
  if (['cyber-neon', 'obsidian-beam', 'tokyo-night', 'monokai-pro', 'linear-dark', 'dracula-dev'].includes(p.id)) {
    category = 'Dark & Cyber';
  } else if (['nordic-forest', 'sage-wellness', 'terracotta-clay', 'autumn-warmth'].includes(p.id)) {
    category = 'Warm & Nature';
  } else if (['sunset-editorial', 'aurora-emerald', 'crisp-amber'].includes(p.id)) {
    category = 'Vibrant & Creative';
  } else if (['zinc-minimal', 'rose-luxury', 'high-contrast'].includes(p.id)) {
    category = 'Luxury & Minimal';
  }

  return {
    id: p.id,
    name: p.label,
    category,
    description: p.description,
    colors: p.state.colors,
  };
});

// 2. Additional 14 Curated Visual Palettes for massive variety
const extraPalettes: VisualColorPalette[] = [
  {
    id: 'ocean-abyssal',
    name: 'Ocean Abyssal',
    category: 'SaaS & Tech',
    description: 'Deep maritime navy with luminescent cyan and crisp azure highlights.',
    colors: {
      light: {
        primary: '#0369a1',
        secondary: '#475569',
        accent: '#06b6d4',
        background: '#f0f9ff',
        surface: '#ffffff',
        text: '#0c4a6e',
        border: '#bae6fd',
      },
      dark: {
        primary: '#38bdf8',
        secondary: '#94a3b8',
        accent: '#22d3ee',
        background: '#031726',
        surface: '#082f49',
        text: '#f0f9ff',
        border: '#0c4a6e',
      },
    },
  },
  {
    id: 'electric-amethyst',
    name: 'Electric Amethyst',
    category: 'Vibrant & Creative',
    description: 'Vibrant ultraviolet purple paired with vivid violet and magenta glow.',
    colors: {
      light: {
        primary: '#7c3aed',
        secondary: '#6b7280',
        accent: '#d946ef',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#3b0764',
        border: '#e9d5ff',
      },
      dark: {
        primary: '#a855f7',
        secondary: '#9ca3af',
        accent: '#f0abfc',
        background: '#120422',
        surface: '#240845',
        text: '#faf5ff',
        border: '#3b0764',
      },
    },
  },
  {
    id: 'matcha-calm',
    name: 'Matcha Calm',
    category: 'Warm & Nature',
    description: 'Soothing ceremonial green tea tones on warm oat ceramic backgrounds.',
    colors: {
      light: {
        primary: '#4d7c0f',
        secondary: '#57534e',
        accent: '#84cc16',
        background: '#f7fee7',
        surface: '#fefce8',
        text: '#1a2e05',
        border: '#d9f99d',
      },
      dark: {
        primary: '#a3e635',
        secondary: '#a8a29e',
        accent: '#bef264',
        background: '#0d1904',
        surface: '#1a3308',
        text: '#f7fee7',
        border: '#2d5a0d',
      },
    },
  },
  {
    id: 'desert-sand',
    name: 'Desert Dunes',
    category: 'Warm & Nature',
    description: 'Sun-baked terracotta, warm copper, and Sahara parchment hues.',
    colors: {
      light: {
        primary: '#c2410c',
        secondary: '#78716c',
        accent: '#f97316',
        background: '#fff7ed',
        surface: '#ffffff',
        text: '#431407',
        border: '#fed7aa',
      },
      dark: {
        primary: '#fb923c',
        secondary: '#a8a29e',
        accent: '#fdba74',
        background: '#1c0e05',
        surface: '#341a0b',
        text: '#fff7ed',
        border: '#57270e',
      },
    },
  },
  {
    id: 'glacier-frost',
    name: 'Glacier Frost',
    category: 'SaaS & Tech',
    description: 'Pristine arctic ice blues with sharp slate structural borders.',
    colors: {
      light: {
        primary: '#0284c7',
        secondary: '#64748b',
        accent: '#38bdf8',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#0f172a',
        border: '#e2e8f0',
      },
      dark: {
        primary: '#38bdf8',
        secondary: '#94a3b8',
        accent: '#7dd3fc',
        background: '#0a1120',
        surface: '#111e38',
        text: '#f8fafc',
        border: '#1e3258',
      },
    },
  },
  {
    id: 'retro-synthwave',
    name: 'Retro Synthwave',
    category: 'Dark & Cyber',
    description: 'Neon magenta and laser cyan over deep dark grid obsidian.',
    colors: {
      light: {
        primary: '#db2777',
        secondary: '#475569',
        accent: '#06b6d4',
        background: '#fdf2f8',
        surface: '#ffffff',
        text: '#500724',
        border: '#fbcfe8',
      },
      dark: {
        primary: '#f43f5e',
        secondary: '#94a3b8',
        accent: '#22d3ee',
        background: '#13041c',
        surface: '#240735',
        text: '#fdf2f8',
        border: '#450d63',
      },
    },
  },
  {
    id: 'crimson-velvet',
    name: 'Crimson Velvet',
    category: 'Luxury & Minimal',
    description: 'High-luxury deep Bordeaux wine red with champagne gold accents.',
    colors: {
      light: {
        primary: '#9f1239',
        secondary: '#71717a',
        accent: '#e11d48',
        background: '#fff1f2',
        surface: '#ffffff',
        text: '#4c0519',
        border: '#fecdd3',
      },
      dark: {
        primary: '#fb7185',
        secondary: '#a1a1aa',
        accent: '#fda4af',
        background: '#1f040b',
        surface: '#3b0817',
        text: '#fff1f2',
        border: '#5c0d24',
      },
    },
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    category: 'Vibrant & Creative',
    description: 'Energetic solar amber, radiant gold, and crisp clean canvas.',
    colors: {
      light: {
        primary: '#d97706',
        secondary: '#57534e',
        accent: '#f59e0b',
        background: '#fffbeb',
        surface: '#ffffff',
        text: '#451a03',
        border: '#fde68a',
      },
      dark: {
        primary: '#fbbf24',
        secondary: '#a8a29e',
        accent: '#fcd34d',
        background: '#1c1303',
        surface: '#362406',
        text: '#fffbeb',
        border: '#5c3d0b',
      },
    },
  },
  {
    id: 'botanical-moss',
    name: 'Botanical Moss',
    category: 'Warm & Nature',
    description: 'Rich evergreen moss, fern foliage, and dark soil accents.',
    colors: {
      light: {
        primary: '#15803d',
        secondary: '#525252',
        accent: '#22c55e',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#052e16',
        border: '#bbf7d0',
      },
      dark: {
        primary: '#4ade80',
        secondary: '#a3a3a3',
        accent: '#86efac',
        background: '#041c0d',
        surface: '#09361a',
        text: '#f0fdf4',
        border: '#14532d',
      },
    },
  },
  {
    id: 'midnight-plum',
    name: 'Midnight Plum',
    category: 'Luxury & Minimal',
    description: 'Deep royal imperial purple with subtle platinum borders.',
    colors: {
      light: {
        primary: '#581c87',
        secondary: '#64748b',
        accent: '#7e22ce',
        background: '#faf5ff',
        surface: '#ffffff',
        text: '#2e1065',
        border: '#f3e8ff',
      },
      dark: {
        primary: '#c084fc',
        secondary: '#94a3b8',
        accent: '#e9d5ff',
        background: '#130522',
        surface: '#250b42',
        text: '#faf5ff',
        border: '#3f136e',
      },
    },
  },
  {
    id: 'cyberpunk-gold',
    name: 'Cyberpunk Gold',
    category: 'Dark & Cyber',
    description: 'High-contrast industrial gold and carbon black matrix.',
    colors: {
      light: {
        primary: '#b45309',
        secondary: '#3f3f46',
        accent: '#f59e0b',
        background: '#fffdf5',
        surface: '#ffffff',
        text: '#18181b',
        border: '#fef08a',
      },
      dark: {
        primary: '#facc15',
        secondary: '#a1a1aa',
        accent: '#fde047',
        background: '#09090b',
        surface: '#18181b',
        text: '#fafafa',
        border: '#27272a',
      },
    },
  },
  {
    id: 'vintage-parchment',
    name: 'Vintage Parchment',
    category: 'Warm & Nature',
    description: 'Warm antique sepia tones, bookbinder ink, and soft aged paper.',
    colors: {
      light: {
        primary: '#78350f',
        secondary: '#57534e',
        accent: '#b45309',
        background: '#fefce8',
        surface: '#fffbeb',
        text: '#291807',
        border: '#e7e5e4',
      },
      dark: {
        primary: '#f59e0b',
        secondary: '#a8a29e',
        accent: '#fbbf24',
        background: '#140c04',
        surface: '#261809',
        text: '#fefce8',
        border: '#3d260f',
      },
    },
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    category: 'Vibrant & Creative',
    description: 'Delicate Sakura petals with subtle slate ink structure.',
    colors: {
      light: {
        primary: '#be185d',
        secondary: '#64748b',
        accent: '#ec4899',
        background: '#fdf2f8',
        surface: '#ffffff',
        text: '#500724',
        border: '#fce7f3',
      },
      dark: {
        primary: '#f472b6',
        secondary: '#94a3b8',
        accent: '#fbcfe8',
        background: '#1c0512',
        surface: '#330b22',
        text: '#fdf2f8',
        border: '#531338',
      },
    },
  },
  {
    id: 'slate-minimal',
    name: 'Slate Precision',
    category: 'Luxury & Minimal',
    description: 'Ultra-pure neutral grayscale with deliberate geometric contrast.',
    colors: {
      light: {
        primary: '#0f172a',
        secondary: '#475569',
        accent: '#334155',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#020617',
        border: '#cbd5e1',
      },
      dark: {
        primary: '#f8fafc',
        secondary: '#94a3b8',
        accent: '#e2e8f0',
        background: '#020617',
        surface: '#0f172a',
        text: '#f8fafc',
        border: '#1e293b',
      },
    },
  },
];

export const ALL_COLOR_PALETTES: VisualColorPalette[] = [
  ...presetPalettes,
  ...extraPalettes,
];
