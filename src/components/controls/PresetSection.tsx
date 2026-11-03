import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';

export const PresetSection: React.FC = () => {
  const { state, dispatch } = useDesign();

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
        Pick a curated design archetype to seed your system tokens:
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {registries.presets.map((preset) => {
          const colors = preset.state.colors[preset.state.activeMode];
          const isSelected = state.name === preset.state.name;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => dispatch({ type: 'LOAD_PRESET', id: preset.id })}
              className={`p-3 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring ${
                isSelected
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {preset.label}
                  </span>
                  {/* Color dots preview */}
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-700"
                      style={{ backgroundColor: colors.primary }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-700"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-700"
                      style={{ backgroundColor: colors.surface }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {preset.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
