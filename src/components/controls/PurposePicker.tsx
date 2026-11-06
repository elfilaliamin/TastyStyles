import React, { useMemo } from 'react';
import { useDesign } from '../../context/DesignContext';
import { PURPOSES } from '../../config/purposes';
import type { PurposeDefinition, ProjectGoal } from '../../config/schema';
import type { PreviewComponentType } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PurposePickerProps {
  onNotify?: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const PurposePicker: React.FC<PurposePickerProps> = ({ onNotify }) => {
  const { dispatch, setActivePreview } = useDesign();

  const sortedPurposes = useMemo(() => {
    return [...PURPOSES].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const handleSelectPurpose = (purpose: PurposeDefinition) => {
    dispatch({ type: 'SET_PURPOSE', purpose: purpose.id });

    // Sync projectGoal if purpose corresponds to a known goal
    const goalMap: Record<string, ProjectGoal> = {
      saas: 'saas',
      ecommerce: 'ecommerce',
      marketplace: 'marketplace',
      portfolio: 'portfolio',
      booking: 'booking',
      editorial: 'editorial',
    };
    if (goalMap[purpose.id]) {
      dispatch({ type: 'SET_PROJECT_GOAL', goal: goalMap[purpose.id] });
    }

    // Set preview to first page of the chosen purpose
    const firstPage = purpose.pages[0]?.pageType as PreviewComponentType;
    if (firstPage) {
      setActivePreview(firstPage);
    }

    onNotify?.('Purpose Selected', `Initialized sitemap for ${purpose.label}. Opened advanced controls.`, 'success');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950/80 transition-colors overflow-y-auto">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Choose Project Purpose
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Select what you are building to initialize your page suite and unlock advanced token controls.
        </p>
      </div>

      {/* Purpose Selection Cards */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-3">
        {sortedPurposes.map((purpose) => (
          <button
            key={purpose.id}
            type="button"
            onClick={() => handleSelectPurpose(purpose)}
            className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-sky-500/80 dark:hover:border-sky-500/80 hover:bg-sky-50/30 dark:hover:bg-sky-950/20 hover:shadow-md transition-all group focus-ring flex flex-col gap-2.5 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl group-hover:scale-110 transition-transform" role="img" aria-label={purpose.label}>
                  {purpose.emoji}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {purpose.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{purpose.tagline}</p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-600 group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {purpose.description}
            </p>

            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Pages ({purpose.pages.length}):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {purpose.pages.slice(0, 4).map((p) => (
                  <span
                    key={p.pageType}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {p.pageType}
                  </span>
                ))}
                {purpose.pages.length > 4 && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    +{purpose.pages.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

