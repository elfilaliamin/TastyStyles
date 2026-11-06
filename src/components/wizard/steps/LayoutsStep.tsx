import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { getLayoutsForPage } from '../../../lib/layoutRegistry';
import { PAGE_TYPES_BY_ID } from '../../../config/pageTypes';
import type { PreviewComponentType } from '../../../types';
import { ArrowLeft, ArrowRight, Check, LayoutTemplate, Layers } from 'lucide-react';

interface LayoutsStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const LayoutsStep: React.FC<LayoutsStepProps> = ({ onBack, onNext }) => {
  const { state, dispatch, setActivePreview, activePreview } = useDesign();
  const enabledPages = (state.project?.pages ?? []).filter((p) => p.enabled);

  const [activePageType, setActivePageType] = useState<string>(
    enabledPages.find((p) => p.pageType === activePreview)?.pageType ??
      enabledPages[0]?.pageType ??
      'landing'
  );

  const activePageObj = enabledPages.find((p) => p.pageType === activePageType);
  const activeLayoutId = activePageObj?.layoutId ?? 'default';
  const layoutsForPage = getLayoutsForPage(activePageType);
  const activePageDef = PAGE_TYPES_BY_ID.get(activePageType);

  const handleSelectPage = (pageType: string) => {
    setActivePageType(pageType);
    setActivePreview(pageType as PreviewComponentType);
  };

  const handleApplyLayout = (layoutId: string) => {
    dispatch({ type: 'SET_PAGE_LAYOUT', pageType: activePageType, layoutId });
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
            3
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Select Section Layouts</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Choose layout architectures for each page in your sitemap. Changes apply immediately in the live preview canvas.
        </p>
      </div>

      {/* Enabled Pages Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {enabledPages.map((p) => {
          const isSelected = p.pageType === activePageType;
          const def = PAGE_TYPES_BY_ID.get(p.pageType);

          return (
            <button
              key={p.pageType}
              type="button"
              onClick={() => handleSelectPage(p.pageType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 focus-ring ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{def?.label ?? p.pageType}</span>
            </button>
          );
        })}
      </div>

      {/* Active Page Header & Layouts */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Available layouts for <span className="text-sky-600 dark:text-sky-400">{activePageDef?.label ?? activePageType}</span>:
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Active: {activeLayoutId}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {layoutsForPage.map((layout) => {
            const isApplied = activeLayoutId === layout.id;

            return (
              <button
                key={layout.id}
                type="button"
                onClick={() => handleApplyLayout(layout.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 focus-ring ${
                  isApplied
                    ? 'border-sky-500 bg-sky-50/40 dark:bg-sky-950/20 shadow-sm ring-1 ring-sky-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className={`w-4 h-4 ${isApplied ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`} />
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{layout.label}</h4>
                  </div>
                  {isApplied && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/60 px-2 py-0.5 rounded-full">
                      <Check className="w-2.5 h-2.5" /> Applied
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {layout.description}
                </p>

                {layout.sections.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Layers className="w-3 h-3" /> Sections:
                    </span>
                    {layout.sections.map((sec) => (
                      <span
                        key={sec}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-3 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-2 shadow-sm transition-all"
        >
          <span>Style Theme Tokens</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

