import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import { Type } from 'lucide-react';

interface TypographyPreset {
  id: string;
  label: string;
  description: string;
  headingFont: string;
  bodyFont: string;
  scale: number;
  baseSize: number;
}

const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    id: 'modern-saas',
    label: 'Modern SaaS (Inter)',
    description: 'Clean, neutral neo-grotesque standard for data-dense products.',
    headingFont: 'inter',
    bodyFont: 'inter',
    scale: 1.125,
    baseSize: 16,
  },
  {
    id: 'editorial-serif',
    label: 'Editorial Elegance (Playfair + Inter)',
    description: 'Sophisticated Playfair Display serif paired with readable Inter body.',
    headingFont: 'playfair-display',
    bodyFont: 'inter',
    scale: 1.25,
    baseSize: 17,
  },
  {
    id: 'geometric-tech',
    label: 'Geometric Modernist (Space Grotesk)',
    description: 'Distinctive Space Grotesk display paired with neutral Inter.',
    headingFont: 'space-grotesk',
    bodyFont: 'inter',
    scale: 1.2,
    baseSize: 16,
  },
  {
    id: 'warm-humanist',
    label: 'Warm Humanist (Plus Jakarta)',
    description: 'Friendly, geometric clarity with Plus Jakarta Sans across all hierarchy.',
    headingFont: 'plus-jakarta-sans',
    bodyFont: 'plus-jakarta-sans',
    scale: 1.15,
    baseSize: 16,
  },
  {
    id: 'developer-mono',
    label: 'Developer Monospace (JetBrains + Fira)',
    description: 'High-density developer aesthetic with JetBrains Mono and Fira Code.',
    headingFont: 'jetbrains-mono',
    bodyFont: 'fira-code',
    scale: 1.15,
    baseSize: 15,
  },
  {
    id: 'contemporary-studio',
    label: 'Contemporary Studio (Outfit + DM Sans)',
    description: 'Fashion-forward Outfit display paired with balanced DM Sans body.',
    headingFont: 'outfit',
    bodyFont: 'dm-sans',
    scale: 1.2,
    baseSize: 16,
  },
  {
    id: 'high-impact-syne',
    label: 'High-Impact Brand (Syne + Inter)',
    description: 'Expressive Syne headers with aggressive 1.333 Major Third scale.',
    headingFont: 'syne',
    bodyFont: 'inter',
    scale: 1.333,
    baseSize: 16,
  },
  {
    id: 'classic-merriweather',
    label: 'Literary Editorial (Merriweather)',
    description: 'Traditional literary serif for rich storytelling and articles.',
    headingFont: 'merriweather',
    bodyFont: 'merriweather',
    scale: 1.25,
    baseSize: 18,
  },
  {
    id: 'corporate-montserrat',
    label: 'Executive Corporate (Montserrat + Roboto)',
    description: 'Stately geometric corporate hierarchy for enterprise portals.',
    headingFont: 'montserrat',
    bodyFont: 'roboto',
    scale: 1.2,
    baseSize: 16,
  },
  {
    id: 'refined-lora',
    label: 'Refined Luxury (Lora + Plus Jakarta)',
    description: 'Delicate contemporary serif paired with ultra-clean sans body.',
    headingFont: 'lora',
    bodyFont: 'plus-jakarta-sans',
    scale: 1.2,
    baseSize: 16,
  },
];

export const TypographySection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const { headingFont, bodyFont, scale, baseSize } = state.typography;

  return (
    <div className="space-y-4">
      {/* Typography Presets (Typography Only) */}
      <div className="space-y-2 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <label htmlFor="typography-preset-select" className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-sky-500" />
            <span>Typography Presets</span>
          </label>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Type Only</span>
        </div>
        <select
          id="typography-preset-select"
          defaultValue=""
          onChange={(e) => {
            const presetId = e.target.value;
            if (!presetId) return;
            const found = TYPOGRAPHY_PRESETS.find((p) => p.id === presetId);
            if (found) {
              dispatch({
                type: 'SET_TYPOGRAPHY_PRESET',
                typography: {
                  headingFont: found.headingFont,
                  bodyFont: found.bodyFont,
                  scale: found.scale,
                  baseSize: found.baseSize,
                },
              });
              e.target.value = '';
            }
          }}
          className="w-full min-h-[36px] px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer"
        >
          <option value="" disabled>Apply Typography Preset (Fonts & Scale only)...</option>
          {TYPOGRAPHY_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Quick select chips for popular typography styles */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {TYPOGRAPHY_PRESETS.slice(0, 6).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                dispatch({
                  type: 'SET_TYPOGRAPHY_PRESET',
                  typography: {
                    headingFont: p.headingFont,
                    bodyFont: p.bodyFont,
                    scale: p.scale,
                    baseSize: p.baseSize,
                  },
                })
              }
              className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer"
              title={`${p.label}: ${p.description}`}
            >
              {p.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
      {/* Heading font selector */}
      <div className="space-y-1.5">
        <label htmlFor="heading-font-select" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
          Heading Font
        </label>
        <div className="relative">
          <select
            id="heading-font-select"
            value={headingFont}
            onChange={(e) =>
              dispatch({
                type: 'SET_TYPOGRAPHY',
                updates: { headingFont: e.target.value },
              })
            }
            className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer transition-colors"
          >
            {registries.fonts.map((f) => (
              <option
                key={f.id}
                value={f.id}
                style={{ fontFamily: `'${f.family}', sans-serif` }}
                className="bg-white dark:bg-slate-900 py-1 text-slate-900 dark:text-slate-100"
              >
                {f.label} ({f.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Body font selector */}
      <div className="space-y-1.5">
        <label htmlFor="body-font-select" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
          Body Font
        </label>
        <div className="relative">
          <select
            id="body-font-select"
            value={bodyFont}
            onChange={(e) =>
              dispatch({
                type: 'SET_TYPOGRAPHY',
                updates: { bodyFont: e.target.value },
              })
            }
            className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer transition-colors"
          >
            {registries.fonts.map((f) => (
              <option
                key={f.id}
                value={f.id}
                style={{ fontFamily: `'${f.family}', sans-serif` }}
                className="bg-white dark:bg-slate-900 py-1 text-slate-900 dark:text-slate-100"
              >
                {f.label} ({f.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Base font size */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="base-size-input" className="font-medium text-slate-700 dark:text-slate-300">
            Base Font Size
          </label>
          <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{baseSize}px</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            id="base-size-input"
            type="range"
            min={12}
            max={24}
            step={1}
            value={baseSize}
            onChange={(e) =>
              dispatch({
                type: 'SET_TYPOGRAPHY',
                updates: { baseSize: Number(e.target.value) },
              })
            }
            className="flex-1 accent-sky-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer focus-ring"
          />
        </div>
      </div>

      {/* Modular Scale Slider & Quick Stops */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="scale-slider" className="font-medium text-slate-700 dark:text-slate-300">
            Modular Scale Ratio
          </label>
          <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{scale.toFixed(3)}</span>
        </div>

        {/* Quick ratio chips */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { label: 'Minor 2nd', val: 1.067 },
            { label: 'Major 2nd', val: 1.125 },
            { label: 'Minor 3rd', val: 1.200 },
            { label: 'Major 3rd', val: 1.250 },
          ].map((preset) => {
            const isMatch = Math.abs(scale - preset.val) < 0.005;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_TYPOGRAPHY',
                    updates: { scale: preset.val },
                  })
                }
                className={`py-1 px-1 text-[10px] font-mono rounded border transition-colors cursor-pointer text-center ${
                  isMatch
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {preset.val.toFixed(3)}
              </button>
            );
          })}
        </div>

        <input
          id="scale-slider"
          type="range"
          min={1.000}
          max={1.333}
          step={0.005}
          value={Math.max(1.0, scale)}
          onChange={(e) =>
            dispatch({
              type: 'SET_TYPOGRAPHY',
              updates: { scale: parseFloat(e.target.value) },
            })
          }
          className="w-full accent-sky-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer focus-ring"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>1.000 (Subtle)</span>
          <span>1.125 (Standard)</span>
          <span>1.333 (Expressive)</span>
        </div>
      </div>
    </div>
  );
};
