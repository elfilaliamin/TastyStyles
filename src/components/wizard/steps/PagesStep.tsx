import React, { useState } from 'react';
import { useDesign } from '../../../context/DesignContext';
import { PAGE_TYPES_BY_ID, PAGE_TYPES } from '../../../config/pageTypes';
import type { ProjectPage } from '../../../config/schema';
import type { PreviewComponentType } from '../../../types';
import { ArrowLeft, ArrowRight, Plus, ChevronUp, ChevronDown, Trash2, Eye } from 'lucide-react';

interface PagesStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const PagesStep: React.FC<PagesStepProps> = ({ onBack, onNext }) => {
  const { state, dispatch, setActivePreview, activePreview } = useDesign();
  const pages = state.project?.pages ?? [];
  const [selectedToAdd, setSelectedToAdd] = useState<string>('');

  const enabledCount = pages.filter((p) => p.enabled).length;

  const handleToggle = (pageType: string) => {
    dispatch({ type: 'TOGGLE_PAGE', pageType });
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;
    const newPages = [...pages];
    const [moved] = newPages.splice(index, 1);
    newPages.splice(targetIndex, 0, moved);
    dispatch({ type: 'REORDER_PAGES', pages: newPages });
  };

  const handleRemove = (pageType: string) => {
    const newPages = pages.filter((p) => p.pageType !== pageType);
    dispatch({ type: 'SET_PAGES', pages: newPages });
  };

  const handleAddPage = () => {
    if (!selectedToAdd) return;
    if (pages.some((p) => p.pageType === selectedToAdd)) return;
    const pageDef = PAGE_TYPES_BY_ID.get(selectedToAdd);
    const newPage: ProjectPage = {
      pageType: selectedToAdd,
      layoutId: pageDef?.defaultLayout ?? 'default',
      enabled: true,
    };
    dispatch({ type: 'SET_PAGES', pages: [...pages, newPage] });
    setSelectedToAdd('');
  };

  const handlePreview = (pageType: string) => {
    // Attempt to set active preview if it's a valid PreviewComponentType
    setActivePreview(pageType as PreviewComponentType);
  };

  const availableToAdd = PAGE_TYPES.filter(
    (pt) => !pages.some((p) => p.pageType === pt.id)
  );

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold">
            2
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Curate Sitemap & Pages</h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Enable the pages needed for this build. Reorder them into the desired user journey sequence. You have{' '}
          <strong className="text-slate-700 dark:text-slate-200">{enabledCount} pages enabled</strong>.
        </p>
      </div>

      {/* Pages List */}
      <div className="flex flex-col gap-2">
        {pages.map((p, idx) => {
          const pageDef = PAGE_TYPES_BY_ID.get(p.pageType);
          const isCurrentPreview = activePreview === p.pageType;

          return (
            <div
              key={p.pageType}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                p.enabled
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  : 'border-slate-200/50 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/20 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  id={`page-${p.pageType}`}
                  checked={p.enabled}
                  onChange={() => handleToggle(p.pageType)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />

                <div className="min-w-0">
                  <label
                    htmlFor={`page-${p.pageType}`}
                    className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate cursor-pointer"
                  >
                    {pageDef?.label ?? p.pageType}
                  </label>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                    Layout: <span className="font-mono text-sky-600 dark:text-sky-400">{p.layoutId}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  title="Preview this page"
                  onClick={() => handlePreview(p.pageType)}
                  className={`p-1.5 rounded-md text-xs transition-colors ${
                    isCurrentPreview
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  title="Move Up"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  title="Move Down"
                  disabled={idx === pages.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  title="Remove from Sitemap"
                  onClick={() => handleRemove(p.pageType)}
                  className="p-1 rounded text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Page Control */}
      {availableToAdd.length > 0 && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <select
            value={selectedToAdd}
            onChange={(e) => setSelectedToAdd(e.target.value)}
            className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus-ring"
          >
            <option value="">+ Add an archetype to sitemap...</option>
            {availableToAdd.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.label} ({pt.category})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddPage}
            disabled={!selectedToAdd}
            className="px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      )}

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
          disabled={enabledCount === 0}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
            enabledCount > 0
              ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Select Layouts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

