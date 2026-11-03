import React, { useState, useEffect } from 'react';
import { useDesign } from '../../context/DesignContext';
import {
  copyToClipboard,
  downloadFile,
  downloadZipBundle,
  generateCssTokens,
  generateTailwindConfig,
  generateTypeScriptTokens,
  generateDtcgTokens,
  generateAgyCliCommand,
} from '../../lib/exportUtils';
import { Copy, Download, FileCode, X, Terminal, Code2, Palette, FileText, Package, Braces } from 'lucide-react';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

type ExportTab = 'markdown' | 'css' | 'tailwind' | 'typescript' | 'dtcg' | 'cli';

export const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, onNotify }) => {
  const { compiledMarkdown, state } = useDesign();
  const [activeTab, setActiveTab] = useState<ExportTab>('markdown');

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

  // Resolve active content and filename
  const getExportData = () => {
    const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    switch (activeTab) {
      case 'css':
        return {
          content: generateCssTokens(state),
          filename: `${slug}-tokens.css`,
          mime: 'text/css',
          label: 'CSS Custom Properties',
        };
      case 'tailwind':
        return {
          content: generateTailwindConfig(state),
          filename: 'tailwind.config.ts',
          mime: 'text/typescript',
          label: 'Tailwind Config',
        };
      case 'typescript':
        return {
          content: generateTypeScriptTokens(state),
          filename: 'tokens.ts',
          mime: 'text/typescript',
          label: 'TypeScript Tokens',
        };
      case 'dtcg':
        return {
          content: generateDtcgTokens(state),
          filename: 'tokens.dtcg.json',
          mime: 'application/json',
          label: 'W3C DTCG Token JSON',
        };
      case 'cli':
        return {
          content: generateAgyCliCommand(state),
          filename: 'agy-apply.sh',
          mime: 'text/x-shellscript',
          label: 'Antigravity CLI Command',
        };
      case 'markdown':
      default:
        return {
          content: compiledMarkdown,
          filename: `${slug}-spec.md`,
          mime: 'text/markdown',
          label: 'Markdown Specification',
        };
    }
  };

  const { content, filename, mime, label } = getExportData();

  const handleCopy = async () => {
    const ok = await copyToClipboard(content);
    if (ok) {
      onNotify?.('Copied to Clipboard!', `${label} copied.`, 'success');
    } else {
      onNotify?.('Copy Failed', 'Could not access clipboard.', 'error');
    }
  };

  const handleDownload = () => {
    downloadFile(content, filename, mime);
    onNotify?.('Downloaded File!', `Saved as ${filename}`, 'success');
  };

  const handleDownloadZip = () => {
    downloadZipBundle(state, compiledMarkdown);
    const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onNotify?.('Downloaded Bundle!', `Saved complete package as ${slug}-design-tokens.zip`, 'success');
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
        className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-2xl shadow-2xl max-w-4xl w-full h-[88vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/60 select-none transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 id="modal-title" className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
                <span>Export System Artifacts</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  Ready for AI Agents & Figma
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Multi-format token compiler for {state.name}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors focus-ring cursor-pointer"
              title={`Copy ${label} to clipboard`}
            >
              <Copy className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 transition-colors shadow-sm focus-ring cursor-pointer"
              title={`Download ${filename}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadZip}
              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-sm focus-ring cursor-pointer"
              title="Download all formats in a single .zip bundle"
            >
              <Package className="w-3.5 h-3.5" />
              <span>All (.zip)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[38px] min-w-[38px] p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors focus-ring ml-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Format Switcher Tabs */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/40 flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'markdown', label: 'Markdown Spec (.md)', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'css', label: 'Pure CSS (.css)', icon: <Palette className="w-3.5 h-3.5" /> },
            { id: 'tailwind', label: 'Tailwind Config (.ts)', icon: <Code2 className="w-3.5 h-3.5" /> },
            { id: 'typescript', label: 'TypeScript (.ts)', icon: <Code2 className="w-3.5 h-3.5" /> },
            { id: 'dtcg', label: 'Figma DTCG (.json)', icon: <Braces className="w-3.5 h-3.5" /> },
            { id: 'cli', label: 'AGY CLI Command', icon: <Terminal className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ExportTab)}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs border border-slate-300 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Code Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-300 leading-relaxed select-text selection:bg-sky-500/30 selection:text-sky-200 transition-colors">
          <pre className="whitespace-pre-wrap">
            <code>{content}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <span className="text-[11px]">
            Target: <strong>{filename}</strong> • Zero placeholders • Validated for Claude, Cursor, Gemini & Figma Tokens
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
