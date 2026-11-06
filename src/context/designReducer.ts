import type {
  ProjectGoal,
  DesignState,
  ColorPalette,
  TypographyState,
  PageLayouts,
  IconConfig,
  IconLibrary,
  IconMode,
  IconWeight,
  ProjectPage,
} from '../config/schema';
import { getPresetEntry, registries } from '../lib/registry';
import { GOAL_DEFINITIONS } from '../config/previews';
import { getPurposeDefinition } from '../config/purposes';

export type DesignAction =
  | { type: 'SET_COLOR'; mode: 'light' | 'dark'; token: keyof ColorPalette; value: string }
  | { type: 'SET_ACTIVE_MODE'; mode: 'light' | 'dark' }
  | { type: 'SET_TYPOGRAPHY'; updates: Partial<TypographyState> }
  | { type: 'SET_LAYOUT'; id: string }
  | { type: 'SET_PAGE_LAYOUT'; updates: Partial<PageLayouts> }
  | { type: 'SET_PAGE_LAYOUT'; pageType: string; layoutId: string }
  | { type: 'SET_PURPOSE'; purpose: string | null }
  | { type: 'SET_PAGES'; pages: ProjectPage[] }
  | { type: 'TOGGLE_PAGE'; pageType: string }
  | { type: 'REORDER_PAGES'; pages: ProjectPage[] }
  | { type: 'SET_PROJECT_GOAL'; goal: ProjectGoal }
  | { type: 'SET_RADIUS'; id: string }
  | { type: 'SET_SHADOW'; id: string }
  | { type: 'SET_SPACING'; id: string }
  | { type: 'SET_ICON_STYLE'; style: DesignState['iconStyle'] }
  | { type: 'SET_ICON_CONFIG'; updates: Partial<IconConfig> }
  | { type: 'SET_ICON_LIBRARY'; library: IconLibrary }
  | { type: 'SET_ICON_MODE'; mode: IconMode }
  | { type: 'SET_ICON_DUOTONE'; duotone: boolean }
  | { type: 'SET_ICON_WEIGHT'; weight: IconWeight }
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
  icons: {
    library: 'lucide',
    mode: 'outline',
    duotone: false,
    weight: 'regular',
  },
  projectGoal: 'saas',
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
    ecommerceCatalog: 'faceted-sidebar',
    productDetail: 'split-sticky-buy',
    checkout: 'slide-over-cart',
    marketplace: 'split-map-list',
    booking: 'split-calendar-slots',
    editorial: 'masonry-frontpage',
    charity: 'hero-impact-thermometer',
    forum: 'three-column-reddit',
    streaming: 'cinema-theater',
    portfolio: 'case-study-hero',
  },
  project: {
    purpose: null,
    pages: [],
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
      if (!/^#[0-9A-Fa-f]{6}$/.test(action.value)) {
        return state;
      }
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
    case 'SET_PROJECT_GOAL': {
      const def = GOAL_DEFINITIONS[action.goal];
      return {
        ...state,
        projectGoal: action.goal,
        pageLayouts: {
          ...defaultInitialState.pageLayouts,
          ...state.pageLayouts,
          ...(def?.defaultNavbar ? { navbar: def.defaultNavbar } : {}),
          ...(def?.defaultSidebar ? { sidebar: def.defaultSidebar } : {}),
        },
      };
    }

    case 'SET_PAGE_LAYOUT': {
      if ('updates' in action) {
        return {
          ...state,
          pageLayouts: {
            ...defaultInitialState.pageLayouts,
            ...state.pageLayouts,
            ...action.updates,
          },
        };
      }

      const existingPages = state.project?.pages ?? [];
      const pageIndex = existingPages.findIndex((p) => p.pageType === action.pageType);
      const updatedPages =
        pageIndex >= 0
          ? existingPages.map((p, idx) => (idx === pageIndex ? { ...p, layoutId: action.layoutId } : p))
          : [...existingPages, { pageType: action.pageType, layoutId: action.layoutId, enabled: true }];

      return {
        ...state,
        project: {
          ...(state.project ?? defaultInitialState.project),
          pages: updatedPages,
        },
        pageLayouts: {
          ...defaultInitialState.pageLayouts,
          ...state.pageLayouts,
          ...(action.pageType in (state.pageLayouts ?? {}) ? { [action.pageType]: action.layoutId } : {}),
        },
      };
    }
    case 'SET_PURPOSE': {
      const purposeDef = action.purpose ? getPurposeDefinition(action.purpose) : undefined;
      const initialPages: ProjectPage[] = purposeDef
        ? purposeDef.pages.map((p) => ({
            pageType: p.pageType,
            layoutId: p.defaultLayout ?? 'default',
            enabled: true,
          }))
        : (state.project?.pages ?? []);

      return {
        ...state,
        project: {
          ...(state.project ?? defaultInitialState.project),
          purpose: action.purpose,
          pages: initialPages,
        },
      };
    }
    case 'SET_PAGES': {
      return {
        ...state,
        project: {
          ...(state.project ?? defaultInitialState.project),
          pages: action.pages,
        },
      };
    }
    case 'TOGGLE_PAGE': {
      const currentPages = state.project?.pages ?? [];
      const matchIdx = currentPages.findIndex((p) => p.pageType === action.pageType);
      const newPages =
        matchIdx >= 0
          ? currentPages.map((p, idx) => (idx === matchIdx ? { ...p, enabled: !p.enabled } : p))
          : [...currentPages, { pageType: action.pageType, layoutId: 'default', enabled: true }];

      return {
        ...state,
        project: {
          ...(state.project ?? defaultInitialState.project),
          pages: newPages,
        },
      };
    }
    case 'REORDER_PAGES': {
      return {
        ...state,
        project: {
          ...(state.project ?? defaultInitialState.project),
          pages: action.pages,
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
    case 'SET_ICON_CONFIG': {
      return {
        ...state,
        icons: {
          ...(state.icons ?? defaultInitialState.icons!),
          ...action.updates,
        },
      };
    }
    case 'SET_ICON_LIBRARY': {
      return {
        ...state,
        icons: {
          ...(state.icons ?? defaultInitialState.icons!),
          library: action.library,
        },
      };
    }
    case 'SET_ICON_MODE': {
      return {
        ...state,
        icons: {
          ...(state.icons ?? defaultInitialState.icons!),
          mode: action.mode,
        },
      };
    }
    case 'SET_ICON_DUOTONE': {
      return {
        ...state,
        icons: {
          ...(state.icons ?? defaultInitialState.icons!),
          duotone: action.duotone,
        },
      };
    }
    case 'SET_ICON_WEIGHT': {
      return {
        ...state,
        icons: {
          ...(state.icons ?? defaultInitialState.icons!),
          weight: action.weight,
        },
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
        icons: preset.state.icons ?? state.icons ?? defaultInitialState.icons,
        pageLayouts: state.pageLayouts ?? defaultInitialState.pageLayouts,
        projectGoal: state.projectGoal ?? 'saas',
        project: state.project ?? defaultInitialState.project,
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
          icons: firstPreset.state.icons ?? defaultInitialState.icons,
          pageLayouts: defaultInitialState.pageLayouts,
          projectGoal: defaultInitialState.projectGoal,
          project: defaultInitialState.project,
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

