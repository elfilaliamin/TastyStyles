import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { downloadFile } from '../../lib/exportUtils';
import { Download, RotateCcw, FileCode } from 'lucide-react';

interface ExportBarProps {
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  onOpenExportModal: () => void;
}

export const ExportBar: React.FC<ExportBarProps> = ({ onNotify, onOpenExportModal }) => {
  const { compiledMarkdown, state, dispatch } = useDesign();

  const handleDownload = () => {
    downloadFile(compiledMarkdown, `${state.name.toLowerCase().replace(/\s+/g, '-')}-spec.md`);
    onNotify('Downloaded Spec!', 'File saved as design-spec.md', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all tokens to defaults?')) {
      dispatch({ type: 'RESET_DEFAULTS' });
      onNotify('Reset to Defaults', 'Design tokens restored.', 'info');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2.5 sm:hidden flex items-center justify-between gap-2 shadow-2xl transition-colors">
      <button
        type="button"
        onClick={onOpenExportModal}
        className="flex-1 min-h-[44px] px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 focus-ring"
      >
        <FileCode className="w-4 h-4 text-sky-600 dark:text-sky-400" />
        <span>View Spec</span>
      </button>

      <button
        type="button"
        onClick={handleDownload}
        className="flex-1 min-h-[44px] px-3 py-2 text-xs font-semibold rounded-xl bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/20 focus-ring"
      >
        <Download className="w-4 h-4" />
        <span>Download .md</span>
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center justify-center focus-ring"
        title="Reset Tokens"
        aria-label="Reset Tokens"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
