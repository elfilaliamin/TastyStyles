import React, { useEffect } from 'react';
import { useDesign } from '../../context/DesignContext';
import { copyToClipboard, downloadFile } from '../../lib/exportUtils';
import { Copy, Download, FileCode, X } from 'lucide-react';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, onNotify }) => {
  const { compiledMarkdown, state } = useDesign();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(compiledMarkdown);
    if (ok) {
      onNotify?.('Copied to Clipboard!', 'Markdown design system spec copied.', 'success');
    } else {
      onNotify?.('Copy Failed', 'Could not access clipboard.', 'error');
    }
  };

  const handleDownload = () => {
    downloadFile(compiledMarkdown, `${state.name.toLowerCase().replace(/\s+/g, '-')}-spec.md`);
    onNotify?.('Downloaded Spec!', 'File saved as design-spec.md', 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60 select-none transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 id="modal-title" className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
                <span>Exported Markdown Specification</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  Ready for AI Agents
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Deterministic 9-part system specification for {state.name}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors focus-ring"
              title="Copy Markdown to clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 transition-colors shadow-sm focus-ring"
              title="Download design-spec.md"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .md</span>
              <span className="sm:hidden">.md</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors focus-ring ml-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Code Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed select-text selection:bg-sky-500/30 selection:text-sky-200 transition-colors">
          <pre className="whitespace-pre-wrap">
            <code>{compiledMarkdown}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <span className="text-[11px]">
            Tokens match live state • Zero placeholders • Validated for Claude, Cursor, and Gemini
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
