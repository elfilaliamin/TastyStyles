/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useReducer, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { DesignStateSchema, type DesignState, type ColorPalette } from '../config/schema';
import { designReducer, defaultInitialState, type DesignAction } from './designReducer';
import { compileMarkdown } from '../lib/compileMarkdown';
import { updateDynamicFonts, loadAllPreviewFonts } from '../lib/fonts';
import { getFontEntry, registries } from '../lib/registry';
import type { PreviewComponentType } from '../types';

interface DesignContextType {
  state: DesignState;
  dispatch: React.Dispatch<DesignAction>;
  activeColors: ColorPalette;
  compiledMarkdown: string;
  activePreview: PreviewComponentType;
  setActivePreview: (preview: PreviewComponentType) => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

const STORAGE_KEY = 'tastystyles_design_state_v1';

/**
 * Robustly migrates raw or legacy stored state to current schema format.
 * Guarantees zero data-loss on schema evolution or missing keys.
 */
function migrateDesignState(raw: any): DesignState {
  if (!raw || typeof raw !== 'object') return defaultInitialState;

  const defaultLight = defaultInitialState.colors.light;
  const defaultDark = defaultInitialState.colors.dark;
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;

  const sanitizeColor = (val: any, fallback: string): string => {
    if (typeof val === 'string' && hexRegex.test(val)) return val;
    return fallback;
  };

  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name : defaultInitialState.name;
  const activeMode: 'light' | 'dark' = raw.activeMode === 'dark' ? 'dark' : 'light';

  const colors = {
    light: {
      primary: sanitizeColor(raw.colors?.light?.primary, defaultLight.primary),
      secondary: sanitizeColor(raw.colors?.light?.secondary, defaultLight.secondary),
      accent: sanitizeColor(raw.colors?.light?.accent, defaultLight.accent),
      background: sanitizeColor(raw.colors?.light?.background, defaultLight.background),
      surface: sanitizeColor(raw.colors?.light?.surface, defaultLight.surface),
      text: sanitizeColor(raw.colors?.light?.text, defaultLight.text),
      border: sanitizeColor(raw.colors?.light?.border, defaultLight.border),
    },
    dark: {
      primary: sanitizeColor(raw.colors?.dark?.primary, defaultDark.primary),
      secondary: sanitizeColor(raw.colors?.dark?.secondary, defaultDark.secondary),
      accent: sanitizeColor(raw.colors?.dark?.accent, defaultDark.accent),
      background: sanitizeColor(raw.colors?.dark?.background, defaultDark.background),
      surface: sanitizeColor(raw.colors?.dark?.surface, defaultDark.surface),
      text: sanitizeColor(raw.colors?.dark?.text, defaultDark.text),
      border: sanitizeColor(raw.colors?.dark?.border, defaultDark.border),
    },
  };

  const rawScale = typeof raw.typography?.scale === 'number' ? raw.typography.scale : defaultInitialState.typography.scale;
  const clampedScale = Math.min(Math.max(rawScale, 1.0), 1.333);
  const rawBaseSize = typeof raw.typography?.baseSize === 'number' ? raw.typography.baseSize : defaultInitialState.typography.baseSize;
  const clampedBaseSize = Math.min(Math.max(rawBaseSize, 12), 24);

  const typography = {
    headingFont: typeof raw.typography?.headingFont === 'string' ? raw.typography.headingFont : defaultInitialState.typography.headingFont,
    bodyFont: typeof raw.typography?.bodyFont === 'string' ? raw.typography.bodyFont : defaultInitialState.typography.bodyFont,
    scale: clampedScale,
    baseSize: clampedBaseSize,
  };

  const layout = registries.layouts.some((l) => l.id === raw.layout)
    ? raw.layout
    : (registries.layouts[0]?.id ?? 'sidebar-content');
  const radius = registries.radius.some((r) => r.id === raw.radius)
    ? raw.radius
    : (registries.radius[0]?.id ?? 'rounded');
  const shadow = registries.shadows.some((s) => s.id === raw.shadow)
    ? raw.shadow
    : (registries.shadows[0]?.id ?? 'soft');
  const spacing = registries.spacing.some((s) => s.id === raw.spacing)
    ? raw.spacing
    : (registries.spacing[0]?.id ?? 'comfortable');

  const icons = {
    library: raw.icons?.library ?? defaultInitialState.icons?.library ?? 'lucide',
    mode: raw.icons?.mode ?? defaultInitialState.icons?.mode ?? 'outline',
    duotone: typeof raw.icons?.duotone === 'boolean' ? raw.icons.duotone : false,
    weight: raw.icons?.weight ?? defaultInitialState.icons?.weight ?? 'regular',
  };

  const projectGoal = typeof raw.projectGoal === 'string' ? raw.projectGoal : 'saas';

  const pageLayouts = {
    ...defaultInitialState.pageLayouts,
    ...(typeof raw.pageLayouts === 'object' && raw.pageLayouts !== null ? raw.pageLayouts : {}),
  };

  return {
    version: 1,
    name,
    activeMode,
    colors,
    typography,
    layout,
    radius,
    shadow,
    spacing,
    iconStyle: defaultInitialState.iconStyle,
    icons,
    pageLayouts,
    projectGoal,
  };
}

function getInitialState(): DesignState {
  if (typeof window === 'undefined') return defaultInitialState;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Run through migration to ensure backwards-compatible defaults
      const migrated = migrateDesignState(parsed);
      const result = DesignStateSchema.safeParse(migrated);
      if (result.success) {
        return result.data;
      } else {
        console.warn('Failed to parse migrated state, saving backup:', result.error);
        try {
          localStorage.setItem('tastystyles_design_state_backup', saved);
        } catch {}
      }
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }

  // Fallback to first preset or default
  if (registries.presets.length > 0) {
    const preset = registries.presets[0];
    return migrateDesignState(preset.state);
  }

  return defaultInitialState;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, undefined, getInitialState);
  const [activePreview, setActivePreview] = useState<PreviewComponentType>('buttons');

  // History stack for Undo / Redo
  const [past, setPast] = useState<DesignState[]>([]);
  const [future, setFuture] = useState<DesignState[]>([]);
  const isNavigatingHistory = useRef(false);
  const previousStateRef = useRef<DesignState>(state);

  // Record history on state changes
  useEffect(() => {
    if (isNavigatingHistory.current) {
      isNavigatingHistory.current = false;
      previousStateRef.current = state;
      return;
    }
    // Only push if state actually changed (deep compare via JSON)
    const prevJson = JSON.stringify(previousStateRef.current);
    const currJson = JSON.stringify(state);
    if (prevJson !== currJson) {
      setPast((prevPast) => [...prevPast.slice(-29), previousStateRef.current]);
      setFuture([]); // Clear redo stack on new action branch
      previousStateRef.current = state;
    }
  }, [state]);

  // Pure undo without nested state updaters
  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setPast(newPast);
    setFuture((prevFuture) => [state, ...prevFuture]);
    isNavigatingHistory.current = true;
    dispatch({ type: 'IMPORT_STATE', state: previousState });
  }, [past, state]);

  // Pure redo without nested state updaters
  const redo = useCallback(() => {
    if (future.length === 0) return;
    const nextState = future[0];
    const newFuture = future.slice(1);
    
    setFuture(newFuture);
    setPast((prevPast) => [...prevPast, state]);
    isNavigatingHistory.current = true;
    dispatch({ type: 'IMPORT_STATE', state: nextState });
  }, [future, state]);

  // Global Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [state]);

  // Dynamic font injection for heading and body font
  useEffect(() => {
    loadAllPreviewFonts();
    const heading = getFontEntry(state.typography.headingFont);
    const body = getFontEntry(state.typography.bodyFont);
    const families: string[] = [];
    if (heading?.family) families.push(heading.family);
    if (body?.family) families.push(body.family);
    updateDynamicFonts(families);
  }, [state.typography.headingFont, state.typography.bodyFont]);

  const activeColors = useMemo(
    () => state.colors[state.activeMode],
    [state.colors, state.activeMode]
  );

  const compiledMarkdown = useMemo(
    () => compileMarkdown(state),
    [state]
  );

  return (
    <DesignContext.Provider
      value={{
        state,
        dispatch,
        activeColors,
        compiledMarkdown,
        activePreview,
        setActivePreview,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
        undo,
        redo,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export function useDesign(): DesignContextType {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
}
