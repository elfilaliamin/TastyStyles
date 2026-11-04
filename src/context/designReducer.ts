import type { DesignState, ColorPalette, TypographyState, PageLayouts } from '../config/schema';
import { getPresetEntry, registries } from '../lib/registry';

export type DesignAction =
  | { type: 'SET_COLOR'; mode: 'light' | 'dark'; token: keyof ColorPalette; value: string }
  | { type: 'SET_ACTIVE_MODE'; mode: 'light' | 'dark' }
  | { type: 'SET_TYPOGRAPHY'; updates: Partial<TypographyState> }
  | { type: 'SET_LAYOUT'; id: string }
  | { type: 'SET_PAGE_LAYOUT'; updates: Partial<PageLayouts> }
  | { type: 'SET_RADIUS'; id: string }
  | { type: 'SET_SHADOW'; id: string }
  | { type: 'SET_SPACING'; id: string }
  | { type: 'SET_ICON_STYLE'; style: DesignState['iconStyle'] }
  | { type: 'SET_NAME'; name: string }
  | { type: 'LOAD_PRESET'; id: string }
  | { type: 'RANDOMIZE_PALETTE' }
  | { type: 'RESET_DEFAULTS' }
  | { type: 'IMPORT_STATE'; state: DesignState };

export const defaultInitialState: DesignState = {
  version: 1,
  name: 'TastyStyles Spec',
  activeMode: 'light',
  colors: {
    light: {
      primary: '#0284c7',
      secondary: '#475569',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#0f172a',
      border: '#e2e8f0',
    },
    dark: {
      primary: '#38bdf8',
      secondary: '#94a3b8',
      accent: '#22d3ee',
      background: '#090d16',
      surface: '#0f172a',
      text: '#f8fafc',
      border: '#1e293b',
    },
  },
  typography: {
    headingFont: 'inter',
    bodyFont: 'inter',
    scale: 1.125,
    baseSize: 16,
  },
  layout: 'sidebar-content',
  radius: 'rounded',
  shadow: 'soft',
  spacing: 'comfortable',
  iconStyle: 'clean-outline',
  pageLayouts: {
    auth: 'centered-card',
    authSocialButtons: true,
    authCardStyle: 'elevated',
    error: 'giant-hero',
    errorCode: '404',
    errorShowTrace: true,
    dashboard: 'sidebar-grid',
    landing: 'hero-split',
    pricing: 'cards-3col',
    kanban: 'board-columns',
    chat: 'split-pane',
    settings: 'tabbed',
    detail: 'split-sidepanel',
    onboarding: 'wizard-stepper',
    emptyState: 'centered-action',
    success: 'celebration-card',
    navbar: 'saas-header',
    sidebar: 'classic-grouped',
  },
};

// Helper to generate harmonious random HSL-based palettes
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function generateHarmoniousPalette(): { light: ColorPalette; dark: ColorPalette } {
  const baseHue = Math.floor(Math.random() * 360);
  const secondaryHue = (baseHue + 40 + Math.floor(Math.random() * 40)) % 360;
  const accentHue = (baseHue + 180 + Math.floor(Math.random() * 30)) % 360;

  return {
    light: {
      primary: hslToHex(baseHue, 75, 42),
      secondary: hslToHex(secondaryHue, 35, 45),
      accent: hslToHex(accentHue, 85, 48),
      background: '#ffffff',
      surface: hslToHex(baseHue, 15, 97),
      text: hslToHex(baseHue, 25, 12),
      border: hslToHex(baseHue, 15, 88),
    },
    dark: {
      primary: hslToHex(baseHue, 80, 60),
      secondary: hslToHex(secondaryHue, 40, 65),
      accent: hslToHex(accentHue, 85, 65),
      background: hslToHex(baseHue, 30, 6),
      surface: hslToHex(baseHue, 25, 11),
      text: hslToHex(baseHue, 15, 96),
      border: hslToHex(baseHue, 20, 20),
    },
  };
}

export function designReducer(state: DesignState, action: DesignAction): DesignState {
  switch (action.type) {
    case 'SET_COLOR': {
      return {
        ...state,
        colors: {
          ...state.colors,
          [action.mode]: {
            ...state.colors[action.mode],
            [action.token]: action.value,
          },
        },
      };
    }
    case 'SET_ACTIVE_MODE': {
      return {
        ...state,
        activeMode: action.mode,
      };
    }
    case 'SET_TYPOGRAPHY': {
      return {
        ...state,
        typography: {
          ...state.typography,
          ...action.updates,
        },
      };
    }
    case 'SET_LAYOUT': {
      return {
        ...state,
        layout: action.id,
      };
    }
    case 'SET_PAGE_LAYOUT': {
      return {
        ...state,
        pageLayouts: {
          ...defaultInitialState.pageLayouts,
          ...state.pageLayouts,
          ...action.updates,
        },
      };
    }
    case 'SET_RADIUS': {
      return {
        ...state,
        radius: action.id,
      };
    }
    case 'SET_SHADOW': {
      return {
        ...state,
        shadow: action.id,
      };
    }
    case 'SET_SPACING': {
      return {
        ...state,
        spacing: action.id,
      };
    }
    case 'SET_ICON_STYLE': {
      return {
        ...state,
        iconStyle: action.style,
      };
    }
    case 'SET_NAME': {
      return {
        ...state,
        name: action.name,
      };
    }
    case 'LOAD_PRESET': {
      const preset = getPresetEntry(action.id);
      if (!preset) return state;
      return {
        version: 1,
        name: preset.state.name,
        activeMode: state.activeMode, // Preserve the user's current light or dark mode
        colors: preset.state.colors,
        typography: preset.state.typography,
        layout: preset.state.layout,
        radius: preset.state.radius,
        shadow: preset.state.shadow,
        spacing: preset.state.spacing,
        iconStyle: preset.state.iconStyle ?? state.iconStyle ?? 'clean-outline',
        pageLayouts: state.pageLayouts ?? defaultInitialState.pageLayouts,
      };
    }
    case 'RANDOMIZE_PALETTE': {
      const newColors = generateHarmoniousPalette();
      return {
        ...state,
        colors: newColors,
      };
    }
    case 'RESET_DEFAULTS': {
      const firstPreset = registries.presets[0];
      if (firstPreset) {
        return {
          version: 1,
          name: firstPreset.state.name,
          activeMode: firstPreset.state.activeMode,
          colors: firstPreset.state.colors,
          typography: firstPreset.state.typography,
          layout: firstPreset.state.layout,
          radius: firstPreset.state.radius,
          shadow: firstPreset.state.shadow,
          spacing: firstPreset.state.spacing,
          iconStyle: firstPreset.state.iconStyle ?? 'clean-outline',
          pageLayouts: defaultInitialState.pageLayouts,
        };
      }
      return defaultInitialState;
    }
    case 'IMPORT_STATE': {
      return action.state;
    }
    default:
      return state;
  }
}

