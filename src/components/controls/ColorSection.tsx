import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { ContrastBadge } from '../layout/ContrastBadge';
import { Dices, Sparkles, AlertCircle } from 'lucide-react';
import type { ColorPalette } from '../../config/schema';
import { getBestContrastingColor, checkColorHarmony } from '../../lib/contrast';

const COLOR_TOKENS: Array<{ key: keyof ColorPalette; label: string; desc: string }> = [
  { key: 'primary', label: 'Primary Brand', desc: 'Main interactive elements & buttons' },
  { key: 'secondary', label: 'Secondary', desc: 'Subtle badges & supporting accents' },
  { key: 'accent', label: 'Accent', desc: 'Highlights & active indicators' },
  { key: 'background', label: 'Background', desc: 'Canvas / application root background' },
  { key: 'surface', label: 'Surface', desc: 'Cards, sidebars, and panels' },
  { key: 'text', label: 'Text', desc: 'High-contrast typography' },
  { key: 'border', label: 'Border', desc: 'Card edges, inputs & dividers' },
];

export const ColorSection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const currentMode = state.activeMode;
  const currentPalette = state.colors[currentMode];
  const [drafts, setDrafts] = React.useState<Partial<Record<keyof ColorPalette, string>>>({});

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

  return (
    <div className="space-y-4">
      {/* Palette Info & Randomize button */}
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

      {/* Color inputs */}
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
                    className="w-full h-full rounded-md"
                    style={{ backgroundColor: hex }}
                  />
                </label>

                {/* Hex code input field */}
                <input
                  type="text"
                  maxLength={7}
                  value={getDisplayValue(key)}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  onBlur={() => handleInputBlur(key)}
                  className="w-20 px-2 py-1.5 text-xs font-mono rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 focus-ring"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* WCAG Contrast check section */}
      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>WCAG Contrast Verification</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Target: ≥ 4.5:1</span>
        </div>
        <ContrastBadge
          label="Text on Background"
          foreground={currentPalette.text}
          background={currentPalette.background}
        />
        <ContrastBadge
          label="Text on Surface"
          foreground={currentPalette.text}
          background={currentPalette.surface}
        />
        <ContrastBadge
          label="Button Text on Primary"
          foreground={buttonTextColor}
          background={currentPalette.primary}
        />
      </div>

      {/* Color Harmony Analysis */}
      {(() => {
        const harmony = checkColorHarmony(currentPalette.primary, currentPalette.accent);
        const isClash = harmony.status === 'clashing';
        return (
          <div
            className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 transition-colors ${
              isClash
                ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-200'
                : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {isClash ? (
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-[11px] text-slate-900 dark:text-slate-100 flex items-center gap-1.5 capitalize">
                <span>Color Harmony: {harmony.status}</span>
                <span className="text-[10px] opacity-75 font-mono">({harmony.hueDiff}° Δ)</span>
              </div>
              <div className="text-[10.5px] opacity-80 mt-0.5 leading-snug">
                {harmony.message}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
