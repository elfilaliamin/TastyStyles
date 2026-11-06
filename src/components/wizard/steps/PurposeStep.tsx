import React from 'react';
import { useDesign } from '../../../context/DesignContext';
import { PURPOSES } from '../../../config/purposes';
import type { PurposeDefinition } from '../../../config/schema';
import { Check, ArrowRight } from 'lucide-react';

interface PurposeStepProps {
  onNext: () => void;
}

export const PurposeStep: React.FC<PurposeStepProps> = ({ onNext }) => {
  const { state, dispatch } = useDesign();
  const currentPurpose = state.project?.purpose ?? null;

  const handleSelectPurpose = (purpose: PurposeDefinition) => {
    dispatch({ type: 'SET_PURPOSE', purpose: purpose.id });
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
            1
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Choose Project Purpose</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Select what kind of digital product you are building. TastyStyles will automatically configure a tailored sitemap, recommended layouts, and theme harmony.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PURPOSES.map((purpose) => {
          const isSelected = currentPurpose === purpose.id;
          return (
            <button
              key={purpose.id}
              type="button"
              onClick={() => handleSelectPurpose(purpose)}
              className={`w-full text-left p-4 rounded-xl border transition-all relative flex flex-col gap-2.5 focus-ring ${
                isSelected
                  ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/20 shadow-sm ring-1 ring-sky-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" role="img" aria-label={purpose.label}>
                    {purpose.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      {purpose.label}
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{purpose.tagline}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {purpose.description}
              </p>

              <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Recommended Pages ({purpose.pages.length}):
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
          );
        })}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!currentPurpose}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            currentPurpose
              ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Sitemap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

