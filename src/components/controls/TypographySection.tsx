import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';

export const TypographySection: React.FC = () => {
  const { state, dispatch } = useDesign();
  const { headingFont, bodyFont, scale, baseSize } = state.typography;

  return (
    <div className="space-y-4">
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

      {/* Modular Scale Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="scale-slider" className="font-medium text-slate-700 dark:text-slate-300">
            Modular Scale Ratio
          </label>
          <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{scale.toFixed(3)}</span>
        </div>
        <input
          id="scale-slider"
          type="range"
          min={0.875}
          max={1.25}
          step={0.025}
          value={scale}
          onChange={(e) =>
            dispatch({
              type: 'SET_TYPOGRAPHY',
              updates: { scale: parseFloat(e.target.value) },
            })
          }
          className="w-full accent-sky-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer focus-ring"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>0.875 (Compact)</span>
          <span>1.125 (Major Second)</span>
          <span>1.250 (Major Third)</span>
        </div>
      </div>
    </div>
  );
};
