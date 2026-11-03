import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';

// Mini visual wireframe thumbnails for each layout archetype
const LayoutMiniThumbnail: React.FC<{ type: string; isSelected: boolean }> = ({ type, isSelected }) => {
  const borderCol = isSelected ? 'border-sky-500' : 'border-slate-300 dark:border-slate-700';
  const fillCol = isSelected ? 'bg-sky-500/20' : 'bg-slate-200 dark:bg-slate-800/60';
  const subFillCol = isSelected ? 'bg-sky-400/40' : 'bg-slate-300 dark:bg-slate-700/60';

  switch (type) {
    case 'sidebar-content':
      return (
        <div className={`w-full h-12 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/4 h-full rounded-sm ${subFillCol}`} />
          <div className="flex-1 flex flex-col gap-1">
            <div className={`w-full h-2 rounded-sm ${fillCol}`} />
            <div className={`w-full flex-1 rounded-sm ${fillCol}`} />
          </div>
        </div>
      );
    case 'bento-grid':
      return (
        <div className={`w-full h-12 rounded border ${borderCol} p-1 grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`col-span-2 h-5 rounded-sm ${subFillCol}`} />
          <div className={`col-span-1 h-5 rounded-sm ${fillCol}`} />
          <div className={`col-span-1 h-4 rounded-sm ${fillCol}`} />
          <div className={`col-span-2 h-4 rounded-sm ${subFillCol}`} />
        </div>
      );
    case 'landing':
      return (
        <div className={`w-full h-12 rounded border ${borderCol} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-2.5 rounded-sm ${subFillCol}`} />
          <div className={`w-full h-4 rounded-sm ${fillCol}`} />
          <div className="flex gap-1 flex-1">
            <div className={`flex-1 rounded-sm ${subFillCol}`} />
            <div className={`flex-1 rounded-sm ${subFillCol}`} />
            <div className={`flex-1 rounded-sm ${subFillCol}`} />
          </div>
        </div>
      );
    case 'dashboard-split':
      return (
        <div className={`w-full h-12 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="w-2/3 flex flex-col gap-1">
            <div className={`w-full h-2 rounded-sm ${subFillCol}`} />
            <div className={`w-full flex-1 rounded-sm ${fillCol}`} />
          </div>
          <div className={`w-1/3 h-full rounded-sm ${subFillCol}`} />
        </div>
      );
    default:
      return (
        <div className={`w-full h-12 rounded border ${borderCol} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-2 rounded-sm ${subFillCol}`} />
          <div className={`w-full flex-1 rounded-sm ${fillCol}`} />
        </div>
      );
  }
};

export const LayoutSection: React.FC = () => {
  const { state, dispatch } = useDesign();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {registries.layouts.map((layout) => {
          const isSelected = state.layout === layout.id;
          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => dispatch({ type: 'SET_LAYOUT', id: layout.id })}
              className={`p-3 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring ${
                isSelected
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <LayoutMiniThumbnail type={layout.wireframe} isSelected={isSelected} />
              <div className="mt-2.5">
                <div
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-sky-600 dark:text-sky-300' : 'text-slate-900 dark:text-slate-200'
                  }`}
                >
                  {layout.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {layout.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
