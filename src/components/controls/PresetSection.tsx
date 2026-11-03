import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import { Check, Sparkles } from 'lucide-react';

export const PresetSection: React.FC = () => {
  const { state, dispatch } = useDesign();

  return (
    <div className="space-y-2.5">
      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>Pick a curated design archetype:</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-500" />
          5 System Archetypes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {registries.presets.map((preset) => {
          const isSelected = state.name === preset.state.name;
          const lightColors = preset.state.colors.light;
          const darkColors = preset.state.colors.dark;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => dispatch({ type: 'LOAD_PRESET', id: preset.id })}
              className={`p-3 rounded-xl border text-left transition-all min-h-[96px] flex flex-col justify-between focus-ring group cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/30 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
              }`}
            >
              <div>
                {/* Header: Name + Active Check */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {preset.label}
                  </span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 leading-snug">
                  {preset.description}
                </p>
              </div>

              {/* Dual-Tone Light / Dark Mode Color Swatches */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2">
                {/* Light Palette Swatch */}
                <div
                  className="flex-1 px-1.5 py-1 rounded-md border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                  style={{ backgroundColor: lightColors.background }}
                  title="Light mode palette: Primary, Accent, Surface"
                >
                  <span className="text-[9px] font-bold tracking-tight opacity-70" style={{ color: lightColors.text }}>
                    L
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-black/10"
                      style={{ backgroundColor: lightColors.primary }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-black/10"
                      style={{ backgroundColor: lightColors.accent }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-black/10"
                      style={{ backgroundColor: lightColors.surface }}
                    />
                  </div>
                </div>

                {/* Dark Palette Swatch */}
                <div
                  className="flex-1 px-1.5 py-1 rounded-md border border-slate-700/80 flex items-center justify-between"
                  style={{ backgroundColor: darkColors.background }}
                  title="Dark mode palette: Primary, Accent, Surface"
                >
                  <span className="text-[9px] font-bold tracking-tight opacity-70" style={{ color: darkColors.text }}>
                    D
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-white/10"
                      style={{ backgroundColor: darkColors.primary }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-white/10"
                      style={{ backgroundColor: darkColors.accent }}
                    />
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-2xs border border-white/10"
                      style={{ backgroundColor: darkColors.surface }}
                    />
                  </div>
                </div>
              </div>

              {/* Typography Subtext */}
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                <span className="truncate">{preset.state.typography.headingFont}</span>
                <span className="capitalize">{preset.state.layout}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
