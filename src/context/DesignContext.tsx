import React, { createContext, useContext, useReducer, useEffect, useMemo, useState } from 'react';
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
}

const STORAGE_KEY = 'tastystyles_design_state_v1';

function getInitialState(): DesignState {
  if (typeof window === 'undefined') return defaultInitialState;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const result = DesignStateSchema.safeParse(parsed);
      if (result.success) {
        // Validate that stored IDs actually exist in registries; fallback if removed
        const data = result.data;
        if (!registries.layouts.some((l) => l.id === data.layout)) {
          data.layout = registries.layouts[0]?.id ?? 'sidebar-content';
        }
        if (!registries.radius.some((r) => r.id === data.radius)) {
          data.radius = registries.radius[0]?.id ?? 'rounded';
        }
        if (!registries.shadows.some((s) => s.id === data.shadow)) {
          data.shadow = registries.shadows[0]?.id ?? 'soft';
        }
        if (!registries.spacing.some((s) => s.id === data.spacing)) {
          data.spacing = registries.spacing[0]?.id ?? 'comfortable';
        }
        if (!data.pageLayouts) {
          data.pageLayouts = defaultInitialState.pageLayouts;
        }
        return data;
      }
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
  }

  // Fallback to first preset or default
  if (registries.presets.length > 0) {
    const preset = registries.presets[0];
    return {
      version: 1,
      name: preset.state.name,
      activeMode: preset.state.activeMode,
      colors: preset.state.colors,
      typography: preset.state.typography,
      layout: preset.state.layout,
      radius: preset.state.radius,
      shadow: preset.state.shadow,
      spacing: preset.state.spacing,
      pageLayouts: defaultInitialState.pageLayouts,
    };
  }

  return defaultInitialState;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, undefined, getInitialState);
  const [activePreview, setActivePreview] = useState<PreviewComponentType>('overview');

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

