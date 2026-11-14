import React, { useState, useMemo } from 'react';
import { useDesign } from '../../context/DesignContext';
import { ContrastBadge } from '../layout/ContrastBadge';
import { Dices, Palette, Check } from 'lucide-react';
import type { ColorPalette } from '../../config/schema';
import { getBestContrastingColor, checkColorHarmony } from '../../lib/contrast';
import { ALL_COLOR_PALETTES } from '../../config/colorPalettes';
import { CategoryNavRow } from './CategoryNavRow';

const COLOR_TOKENS: Array<{ key: keyof ColorPalette; label: string; desc: string }> = [
  { key: 'primary', label: 'Primary Brand', desc: 'Main interactive elements & buttons' },
  { key: 'secondary', label: 'Secondary', desc: 'Subtle badges & supporting accents' },
  { key: 'accent', label: 'Accent', desc: 'Highlights & active indicators' },
  { key: 'background', label: 'Background', desc: 'Canvas / application root background' },
  { key: 'surface', label: 'Surface', desc: 'Cards, sidebars, and panels' },
  { key: 'text', label: 'Text', desc: 'High-contrast typography' },
  { key: 'border', label: 'Border', desc: 'Card edges, inputs & dividers' },
];

const COLOR_HARMONY_CATEGORIES = [
  'All',
  'Complementary',
  'Analogous',
  'Monochromatic',
  'Split-Complementary',
  'Triadic',
  'Square',
] as const;

export const ColorSection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const currentMode = state.activeMode;
  const currentPalette = state.colors[currentMode];
  const [drafts, setDrafts] = useState<Partial<Record<keyof ColorPalette, string>>>({});
  const [selectedCategory, setSelectedCategory] = useState<typeof COLOR_HARMONY_CATEGORIES[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getDisplayValue = (key: keyof ColorPalette) => {
    return drafts[key] !== undefined ? drafts[key]! : currentPalette[key];
  };

  const handleInputChange = (key: keyof ColorPalette, value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }));
    let clean = value.trim();
    if (!clean.startsWith('#')) clean = `#${clean}`;

    // Expand 3-digit hex (#abc -> #aabbcc)
    if (/^#[0-9A-Fa-f]{3}$/.test(clean)) {
      clean = `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      dispatch({
        type: 'SET_COLOR',
        mode: currentMode,
        token: key,
        value: clean.toLowerCase(),
      });
    }
  };

  const handleInputBlur = (key: keyof ColorPalette) => {
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handlePickerChange = (key: keyof ColorPalette, value: string) => {
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    dispatch({
      type: 'SET_COLOR',
      mode: currentMode,
      token: key,
      value: value.toLowerCase(),
    });
  };

  const buttonTextColor = getBestContrastingColor(currentPalette.primary);

  // Compute category count badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_COLOR_PALETTES.length };
    for (const pal of ALL_COLOR_PALETTES) {
      counts[pal.category] = (counts[pal.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter palettes based on category and search
  const filteredPalettes = ALL_COLOR_PALETTES.filter((pal) => {
    const matchesCategory = selectedCategory === 'All' || pal.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      pal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pal.harmonyBadge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* 1. VISUAL COLOR PALETTES GRID (GRAPHIC DESIGN COLOR HARMONIES) */}
      <div className="space-y-2.5 p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Color Theory Palettes
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">
              {ALL_COLOR_PALETTES.length} Palettes
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Harmony Models</span>
        </div>

        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search harmony (e.g. complementary, analogous, triad)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Category Filter Chips with Smooth Arrow Navigation */}
        <CategoryNavRow
          categories={COLOR_HARMONY_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat as typeof COLOR_HARMONY_CATEGORIES[number])}
          counts={categoryCounts}
        />

        {/* Visual Palettes Cards Grid */}
        <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
          {filteredPalettes.map((pal) => {
            const palColors = pal.colors[currentMode];
            const isActive = currentPalette.primary.toLowerCase() === palColors.primary.toLowerCase() &&
              currentPalette.background.toLowerCase() === palColors.background.toLowerCase();

            return (
              <button
                key={pal.id}
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'SET_COLOR_PRESET',
                    colors: pal.colors,
                    name: pal.name,
                  })
                }
                className={`p-2 rounded-xl text-left transition-all flex flex-col gap-1.5 cursor-pointer relative ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 border-2 border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white/80 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Header: Title + Active Check */}
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate">
                    {pal.name}
                  </span>
                  {isActive && (
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Multi-Color Swatch Preview Bar */}
                <div className="flex items-center h-4 w-full rounded-md overflow-hidden border border-slate-300/60 dark:border-slate-700 shadow-2xs">
                  <div style={{ backgroundColor: palColors.primary }} className="h-full flex-2" title={`Primary: ${palColors.primary}`} />
                  <div style={{ backgroundColor: palColors.accent }} className="h-full flex-1" title={`Accent: ${palColors.accent}`} />
                  <div style={{ backgroundColor: palColors.surface }} className="h-full flex-1" title={`Surface: ${palColors.surface}`} />
                  <div style={{ backgroundColor: palColors.background }} className="h-full flex-1" title={`Background: ${palColors.background}`} />
                  <div style={{ backgroundColor: palColors.text }} className="h-full flex-1" title={`Text: ${palColors.text}`} />
                </div>

                {/* Subtitle / Harmony Badge */}
                <div className="flex items-center justify-between gap-1 mt-0.5">
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                    {pal.category}
                  </span>
                  <span className="text-[8.5px] font-mono px-1 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 truncate">
                    {pal.harmonyBadge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PALETTE INFO & RANDOMIZE BUTTON */}
      <div className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: currentPalette.primary }}
          />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Editing: <strong className="text-slate-900 dark:text-slate-200 capitalize">{currentMode} Mode</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => dispatch({ type: 'RANDOMIZE_PALETTE' })}
          className="min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors focus-ring"
          title="Generate harmonious random palette"
        >
          <Dices className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Randomize Palette</span>
        </button>
      </div>

      {/* 3. INDIVIDUAL COLOR TOKEN PICKERS */}
      <div className="space-y-2.5">
        {COLOR_TOKENS.map(({ key, label, desc }) => {
          const hex = currentPalette[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="text-xs font-medium text-slate-900 dark:text-slate-200">{label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{desc}</div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Visual color swatch picker */}
                <label className="relative cursor-pointer rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-sm w-8 h-8 flex items-center justify-center focus-within:ring-2 focus-within:ring-sky-500">
                  <input
                    type="color"
                    value={hex.length === 7 ? hex : '#000000'}
                    onChange={(e) => handlePickerChange(key, e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: hex }}
                  />
                </label>

                {/* Hex input */}
                <input
                  type="text"
                  value={getDisplayValue(key)}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  onBlur={() => handleInputBlur(key)}
                  maxLength={7}
                  className="w-20 px-2 py-1 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 uppercase focus-ring"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. HARMONY & CONTRAST BADGES */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Harmonic Relationship
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400 capitalize">
            {checkColorHarmony(currentPalette.primary, currentPalette.accent).status}
          </span>
        </div>

        {/* Contrast check cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Text on Surface</span>
            <ContrastBadge foreground={currentPalette.text} background={currentPalette.surface} label="Surface" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Text on Canvas</span>
            <ContrastBadge foreground={currentPalette.text} background={currentPalette.background} label="Canvas" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col gap-1.5 col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Primary Button Contrast</span>
              <span className="text-[10px] font-mono opacity-75">{buttonTextColor} on {currentPalette.primary}</span>
            </div>
            <ContrastBadge foreground={buttonTextColor} background={currentPalette.primary} label="Primary Button" />
          </div>
        </div>
      </div>
    </div>
  );
};
