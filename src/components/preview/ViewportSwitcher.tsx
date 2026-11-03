import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import type { ViewportMode } from '../../types';

interface ViewportSwitcherProps {
  currentMode: ViewportMode;
  onChange: (mode: ViewportMode) => void;
}

export const ViewportSwitcher: React.FC<ViewportSwitcherProps> = ({ currentMode, onChange }) => {
  return (
    <div className="inline-flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 gap-1 transition-colors">
      <button
        type="button"
        onClick={() => onChange('mobile')}
        className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all focus-ring ${
          currentMode === 'mobile'
            ? 'bg-sky-600 text-white shadow-sm font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
        }`}
        title="Mobile Viewport (375px)"
      >
        <Smartphone className="w-4 h-4" />
        <span className="hidden sm:inline">Mobile (375px)</span>
        <span className="sm:hidden">375px</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('tablet')}
        className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all focus-ring ${
          currentMode === 'tablet'
            ? 'bg-sky-600 text-white shadow-sm font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
        }`}
        title="Tablet Viewport (768px)"
      >
        <Tablet className="w-4 h-4" />
        <span className="hidden sm:inline">Tablet (768px)</span>
        <span className="sm:hidden">768px</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('desktop')}
        className={`min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all focus-ring ${
          currentMode === 'desktop'
            ? 'bg-sky-600 text-white shadow-sm font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
        }`}
        title="Desktop Viewport (Fluid / 1280px)"
      >
        <Monitor className="w-4 h-4" />
        <span className="hidden sm:inline">Desktop</span>
        <span className="sm:hidden">Fluid</span>
      </button>
    </div>
  );
};
