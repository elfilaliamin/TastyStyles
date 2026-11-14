import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import { Type, Check } from 'lucide-react';
import { ALL_TYPOGRAPHY_PRESETS } from '../../config/typographyPresets';

const TYPE_CATEGORIES = ['All', 'SaaS & Modern', 'Editorial & Serif', 'Tech & Monospace', 'Display & High-Impact', 'Humanist & Soft'] as const;

export const TypographySection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const { headingFont, bodyFont, scale, baseSize } = state.typography;
  const [selectedCategory, setSelectedCategory] = useState<typeof TYPE_CATEGORIES[number]>('All');

  const filteredPresets = ALL_TYPOGRAPHY_PRESETS.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <div className="space-y-4">
      {/* 1. VISUAL TYPOGRAPHY PAIRINGS GRID (PRESETS FOR TYPOGRAPHY ONLY) */}
      <div className="space-y-2.5 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Visual Typography Pairings
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">
              {ALL_TYPOGRAPHY_PRESETS.length} Pairs
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Type Only</span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {TYPE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors whitespace-nowrap flex-shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Visual Typography Specimen Cards */}
        <div className="grid grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
          {filteredPresets.map((preset) => {
            const isActive = headingFont === preset.headingFont && bodyFont === preset.bodyFont;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_TYPOGRAPHY_PRESET',
                    typography: {
                      headingFont: preset.headingFont,
                      bodyFont: preset.bodyFont,
                      scale: preset.scale,
                      baseSize: preset.baseSize,
                    },
                  })
                }
                className={`p-2.5 rounded-xl text-left transition-all flex flex-col gap-1.5 cursor-pointer relative ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 border-2 border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white/80 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Header: Title + Active Check */}
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate">
                    {preset.label}
                  </span>
                  {isActive && (
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Visual Font Specimen Box */}
                <div
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2 overflow-hidden"
                >
                  <div
                    style={{ fontFamily: `'${preset.headingFontName}', sans-serif`, fontSize: '20px', fontWeight: 800 }}
                    className="text-slate-800 dark:text-slate-100 leading-none select-none"
                  >
                    Aa
                  </div>
                  <div className="text-[10px] text-right truncate">
                    <div className="font-semibold text-slate-700 dark:text-slate-300 truncate">{preset.headingFontName}</div>
                    <div className="text-[9px] text-slate-400 dark:text-slate-500 truncate">{preset.bodyFontName}</div>
                  </div>
                </div>

                {/* Sample preview text */}
                <p
                  style={{ fontFamily: `'${preset.headingFontName}', sans-serif` }}
                  className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-1 italic m-0"
                >
                  "{preset.previewSample}"
                </p>

                {/* Scale & Size Badges */}
                <div className="flex items-center gap-1 text-[9px] text-slate-500 dark:text-slate-400">
                  <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700/70 font-mono font-medium">
                    {preset.scale}x
                  </span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-700/70 font-mono font-medium">
                    {preset.baseSize}px
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. INDIVIDUAL FONT SELECTORS */}
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
            className="w-full min-h-[40px] px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer transition-colors"
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
            className="w-full min-h-[40px] px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer transition-colors"
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
          <label htmlFor="modular-scale-input" className="font-medium text-slate-700 dark:text-slate-300">
            Modular Scale Ratio
          </label>
          <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{scale.toFixed(3)}</span>
        </div>

        <input
          id="modular-scale-input"
          type="range"
          min={1.0}
          max={1.333}
          step={0.001}
          value={scale}
          onChange={(e) =>
            dispatch({
              type: 'SET_TYPOGRAPHY',
              updates: { scale: parseFloat(e.target.value) },
            })
          }
          className="w-full accent-sky-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer focus-ring"
        />

        {/* Quick scale stops */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_TYPOGRAPHY', updates: { scale: 1.067 } })}
            className="hover:text-sky-500 transition-colors cursor-pointer"
            title="1.067 - Minor Second"
          >
            1.067
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_TYPOGRAPHY', updates: { scale: 1.125 } })}
            className="hover:text-sky-500 transition-colors cursor-pointer"
            title="1.125 - Major Second"
          >
            1.125
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_TYPOGRAPHY', updates: { scale: 1.200 } })}
            className="hover:text-sky-500 transition-colors cursor-pointer"
            title="1.200 - Minor Third"
          >
            1.200
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_TYPOGRAPHY', updates: { scale: 1.250 } })}
            className="hover:text-sky-500 transition-colors cursor-pointer"
            title="1.250 - Major Third"
          >
            1.250
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_TYPOGRAPHY', updates: { scale: 1.333 } })}
            className="hover:text-sky-500 transition-colors cursor-pointer"
            title="1.333 - Perfect Fourth"
          >
            1.333
          </button>
        </div>
      </div>
    </div>
  );
};
