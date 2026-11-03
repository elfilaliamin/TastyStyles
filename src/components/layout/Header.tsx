import React, { useRef } from 'react';
import { useDesign } from '../../context/DesignContext';
import { useEditorTheme } from '../../context/EditorThemeContext';
import { exportJsonState, parseImportedJson } from '../../lib/exportUtils';
import { Download, Upload, RotateCcw, Sun, Moon, FileCode } from 'lucide-react';

interface HeaderProps {
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotify, onOpenExportModal }) => {
  const { state, dispatch } = useDesign();
  const { editorTheme, setEditorTheme } = useEditorTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleJsonExport = () => {
    exportJsonState(state);
    onNotify('Exported JSON', 'Design state JSON downloaded.', 'success');
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = parseImportedJson(content);
      if (result.success) {
        dispatch({ type: 'IMPORT_STATE', state: result.state });
        setEditorTheme(result.state.activeMode);
        onNotify('Import Successful', 'Design system state restored.', 'success');
      } else {
        onNotify('Import Failed', result.error, 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Reset all design tokens back to factory defaults?')) {
      dispatch({ type: 'RESET_DEFAULTS' });
      onNotify('Reset Completed', 'Design state restored to defaults.', 'info');
    }
  };

  const handleToggleTheme = () => {
    const nextMode = state.activeMode === 'dark' || editorTheme === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_ACTIVE_MODE', mode: nextMode });
    setEditorTheme(nextMode);
    onNotify(`Switched to ${nextMode.toUpperCase()} Mode (Editor & Preview)`, undefined, 'info');
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 select-none flex-shrink-0 z-20 transition-colors">
      {/* Brand title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <div className="w-4 h-4 rounded-sm bg-white dark:bg-slate-950 flex items-center justify-center font-black text-sky-500 dark:text-sky-400 text-xs">
            T
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 tracking-tight">
              TastyStyles
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
              AI Spec Builder
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Deterministic Design System Token Compiler
          </p>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleJsonImport}
          className="hidden"
          aria-label="Upload JSON Design State"
        />

        {/* Dark / Light Mode Toggle Button (Changes both Editor and Preview) */}
        <button
          type="button"
          onClick={handleToggleTheme}
          className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 flex items-center gap-1.5 transition-colors focus-ring"
          title={`Switch to ${state.activeMode === 'dark' ? 'Light' : 'Dark'} Mode (Editor & Preview)`}
          aria-label="Toggle dark and light mode for editor and preview"
        >
          {state.activeMode === 'dark' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </button>

        {/* JSON Import Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 flex items-center gap-1.5 transition-colors focus-ring"
          title="Import DesignState JSON"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="hidden md:inline">Import JSON</span>
        </button>

        {/* JSON Export Button */}
        <button
          type="button"
          onClick={handleJsonExport}
          className="min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 flex items-center gap-1.5 transition-colors focus-ring"
          title="Export DesignState JSON"
        >
          <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span className="hidden md:inline">Export JSON</span>
        </button>

        {/* Reset Tokens Button */}
        <button
          type="button"
          onClick={handleReset}
          className="min-h-[40px] px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-red-50 dark:bg-slate-900 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-300 border border-slate-300 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/60 flex items-center gap-1.5 transition-colors focus-ring"
          title="Reset to default tokens"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Reset</span>
        </button>

        {/* Prominent Export Spec Modal Button */}
        <button
          type="button"
          onClick={onOpenExportModal}
          className="min-h-[40px] px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-950/20 flex items-center gap-1.5 transition-colors focus-ring ml-1"
          title="Open Exported Markdown Spec Popup"
        >
          <FileCode className="w-4 h-4" />
          <span>Export Spec</span>
        </button>
      </div>
    </header>
  );
};
