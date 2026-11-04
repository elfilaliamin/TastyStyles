import { useState, useEffect } from 'react';
import { isRegistryValid, registryError, registryErrorDetails } from './lib/registry';
import { ErrorFallback } from './components/common/ErrorFallback';
import { DesignProvider, useDesign } from './context/DesignContext';
import { EditorThemeProvider, useEditorTheme } from './context/EditorThemeContext';
import { Header } from './components/layout/Header';
import { ControlsPanel } from './components/controls/ControlsPanel';
import { PreviewPane } from './components/preview/PreviewPane';
import { MarkdownModal } from './components/markdown/MarkdownModal';
import { ExportBar } from './components/layout/ExportBar';
import { Toast, type ToastMessage } from './components/common/Toast';
import { Sliders, Eye } from 'lucide-react';

function MainLayout() {
  const { state } = useDesign();
  const { editorTheme, setEditorTheme } = useEditorTheme();
  const [mobileTab, setMobileTab] = useState<'controls' | 'preview'>('preview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Synchronize editor theme whenever design state activeMode changes (e.g. presets, JSON imports, resets)
  useEffect(() => {
    if (state.activeMode !== editorTheme) {
      setEditorTheme(state.activeMode);
    }
  }, [state.activeMode, editorTheme, setEditorTheme]);

  // Keyboard shortcut Ctrl+B / Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          document.activeElement?.tagName === 'SELECT'
        ) {
          return;
        }
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({
      id: Date.now().toString(),
      title,
      description,
      type,
    });
  };

  return (
    <div className="h-screen max-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased overflow-hidden selection:bg-sky-500/30 selection:text-sky-200 transition-colors">
      {/* Top Application Header */}
      <Header
        onNotify={showToast}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Mobile Top Navigation Tabs (<640px) */}
      <div className="sm:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-30 px-3 py-2 flex-shrink-0 transition-colors">
        <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setMobileTab('controls')}
            className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all focus-ring ${
              mobileTab === 'controls'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Controls</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all focus-ring ${
              mobileTab === 'preview'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Work Area (Fixed Viewport, Independent Sidebar Scroll) */}
      <main className="flex-1 flex overflow-hidden w-full h-[calc(100vh-4rem)]">
        {/* =========================================================================
            1. MOBILE VIEWPORT (<640px)
            Single column showing active tab + sticky bottom bar
        ========================================================================= */}
        <div className="sm:hidden flex-1 flex flex-col overflow-hidden pb-16">
          {mobileTab === 'controls' ? (
            <div className="flex-1 overflow-y-auto">
              <ControlsPanel />
            </div>
          ) : (
            <div className="flex-1 overflow-hidden">
              <PreviewPane />
            </div>
          )}
        </div>

        {/* =========================================================================
            2. TABLET & DESKTOP VIEWPORT (>=640px)
            Left scrollable controls sidebar + Right expanded & fixed preview canvas
        ========================================================================= */}
        <div className="hidden sm:flex flex-1 overflow-hidden w-full h-full relative">
          {/* Left Controls Sidebar (scrollable & collapsible, always starts collapsed) */}
          <aside
            className={`${
              isSidebarOpen ? 'w-80 lg:w-[360px] opacity-100' : 'w-0 opacity-0 border-r-0 pointer-events-none'
            } flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950/80 transition-all duration-300 ease-in-out`}
          >
            <div className="w-80 lg:w-[360px] h-full flex flex-col">
              <ControlsPanel onClose={() => setIsSidebarOpen(false)} />
            </div>
          </aside>

          {/* Expanded & Fixed Right Preview Canvas */}
          <section className="flex-1 h-full overflow-hidden flex flex-col bg-slate-100/60 dark:bg-slate-950 transition-colors relative min-w-0">
            <PreviewPane />
          </section>
        </div>
      </main>

      {/* Sticky Action Bar for Mobile (<640px) */}
      <ExportBar
        onNotify={showToast}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Markdown Spec Popup Modal */}
      <MarkdownModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onNotify={showToast}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  if (!isRegistryValid) {
    return <ErrorFallback error={registryError} errorDetails={registryErrorDetails} />;
  }

  return (
    <EditorThemeProvider>
      <DesignProvider>
        <MainLayout />
      </DesignProvider>
    </EditorThemeProvider>
  );
}
