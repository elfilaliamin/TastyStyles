import React, { useState, useMemo } from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import { Type, Check, Search, X } from 'lucide-react';
import { ALL_TYPOGRAPHY_PRESETS, type TypographyClassification } from '../../config/typographyPresets';

interface TypeGroupMeta {
  category: TypographyClassification;
  label: string;
  badge: string;
  desc: string;
}

const TYPE_GROUPS: TypeGroupMeta[] = [
  {
    category: 'Sans-Serif',
    label: 'Sans-Serif',
    badge: 'Modern & Clean',
    desc: 'High-legibility neo-grotesque, humanist, and geometric pairings for modern apps and SaaS dashboards',
  },
  {
    category: 'Serif',
    label: 'Serif',
    badge: 'Editorial & Elegant',
    desc: 'Timeless transitional and modern serifs providing editorial prestige and reading comfort',
  },
  {
    category: 'Monospace & Code',
    label: 'Monospace & Code',
    badge: 'Technical & Developer',
    desc: 'Fixed-width developer typography designed for developer tools, APIs, and terminals',
  },
  {
    category: 'Display & High-Impact',
    label: 'Display & High-Impact',
    badge: 'Bold & Expressive',
    desc: 'Dramatic high-contrast fonts designed for impactful headlines and creative studios',
  },
  {
    category: 'Serif + Sans Pairing',
    label: 'Serif + Sans Pairing',
    badge: 'Editorial Authority',
    desc: 'Authoritative serif headings paired with clean, ultra-readable sans-serif body copy',
  },
  {
    category: 'Sans + Serif Pairing',
    label: 'Sans + Serif Pairing',
    badge: 'Modern Head + Literary Body',
    desc: 'Contemporary geometric sans headings paired with comfortable serif reading typography',
  },
];

export const TypographySection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const { headingFont, bodyFont, scale, baseSize } = state.typography;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter presets based on search query
  const filteredPresets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_TYPOGRAPHY_PRESETS;
    return ALL_TYPOGRAPHY_PRESETS.filter((p) => {
      return (
        p.label.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.headingFontName.toLowerCase().includes(q) ||
        p.bodyFontName.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-5">
      {/* 1. VISUAL TYPOGRAPHY PAIRINGS - GROUNDED FULL SIDEBAR SCROLL */}
      <div className="space-y-4">
        {/* Header with preset count */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Visual Typography Pairings
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">
              {ALL_TYPOGRAPHY_PRESETS.length} Pairs
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Type Specimen Presets</span>
        </div>

        {/* Live Filter Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search fonts by family, style, or classification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Typography Classification Groups Displayed Directly in DOM Flow (No Inner Scroll) */}
        {TYPE_GROUPS.map((group) => {
          const groupPresets = filteredPresets.filter((p) => p.category === group.category);
          if (groupPresets.length === 0) return null;

          return (
            <div key={group.category} className="space-y-2">
              {/* Group Header */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {group.label}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {groupPresets.length}
                  </span>
                </div>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
                  {group.badge}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight m-0">
                {group.desc}
              </p>

              {/* 2-Column Grid of Typography Cards */}
              <div className="grid grid-cols-2 gap-2">
                {groupPresets.map((preset) => {
                  const isActive = headingFont === preset.headingFont && bodyFont === preset.bodyFont;
                  const headingFontFallback =
                    preset.headingCategory === 'Serif'
                      ? `'${preset.headingFontName}', serif`
                      : preset.headingCategory === 'Monospace'
                      ? `'${preset.headingFontName}', monospace`
                      : `'${preset.headingFontName}', sans-serif`;

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
                          : 'bg-white/90 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
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
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2 overflow-hidden">
                        <div
                          style={{ fontFamily: headingFontFallback, fontSize: '20px', fontWeight: 800 }}
                          className="text-slate-800 dark:text-slate-100 leading-none select-none"
                        >
                          Aa
                        </div>
                        <div className="text-[10px] text-right truncate">
                          <div className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                            {preset.headingFontName}
                          </div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 truncate">
                            {preset.bodyFontName}
                          </div>
                        </div>
                      </div>

                      {/* Sample preview text */}
                      <p
                        style={{ fontFamily: headingFontFallback }}
                        className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-1 italic m-0"
                      >
                        &ldquo;{preset.previewSample}&rdquo;
                      </p>

                      {/* Scale & Size Badges */}
                      <div className="flex items-center justify-between gap-1 text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="px-1.5 py-0.5 rounded-sm bg-slate-200/70 dark:bg-slate-700/70 font-medium">
                            {preset.scale}x
                          </span>
                          <span className="px-1.5 py-0.5 rounded-sm bg-slate-200/70 dark:bg-slate-700/70 font-medium">
                            {preset.baseSize}px
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredPresets.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            No typography presets found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>

      {/* 2. INDIVIDUAL FONT SELECTORS */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
          Fine-Tune Typography
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
    </div>
  );
};
