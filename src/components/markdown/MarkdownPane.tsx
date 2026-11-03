import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { copyToClipboard, downloadFile } from '../../lib/exportUtils';
import { Copy, Download, FileText } from 'lucide-react';

interface MarkdownPaneProps {
  onNotify?: (title: string, desc?: string, type?: 'success' | 'error') => void;
}

export const MarkdownPane: React.FC<MarkdownPaneProps> = ({ onNotify }) => {
  const { compiledMarkdown, state } = useDesign();

  const handleCopy = async () => {
    const ok = await copyToClipboard(compiledMarkdown);
    if (ok) {
      onNotify?.('Copied to Clipboard!', 'Markdown design system specification copied.', 'success');
    } else {
      onNotify?.('Copy Failed', 'Could not access clipboard.', 'error');
    }
  };

  const handleDownload = () => {
    downloadFile(compiledMarkdown, `${state.name.toLowerCase().replace(/\s+/g, '-')}-spec.md`);
    onNotify?.('Downloaded!', 'design-spec.md saved to your device.', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800">
      {/* Header bar */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200">
            Compiled AI Specification (.md)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[44px] px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors focus-ring"
            title="Copy Markdown to clipboard"
          >
            <Copy className="w-3.5 h-3.5 text-sky-400" />
            <span>Copy</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="min-h-[44px] px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 transition-colors focus-ring"
            title="Download design-spec.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Monospace viewer */}
      <div className="flex-1 overflow-auto p-4 bg-slate-950">
        <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-sky-500/30 selection:text-sky-200">
          <code>{compiledMarkdown}</code>
        </pre>
      </div>
    </div>
  );
};

