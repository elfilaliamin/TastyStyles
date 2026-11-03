import React from 'react';
import { useDesign } from '../../context/DesignContext';
import type { PageLayouts } from '../../config/schema';
import type { PreviewComponentType } from '../../types';
import {
  PREVIEW_REGISTRY,
  getPreviewDefinition,
  getPreviewIndex,
  getNextPreview,
  getPrevPreview,
} from '../../config/previews';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Lock,
  AlertTriangle,
  LayoutDashboard,
  Globe,
  CreditCard,
  Kanban,
  MessageSquare,
  Settings,
  FileText,
  Sparkles,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

/* ==========================================================================
   Mini Visual Thumbnails for Page Layouts
   ========================================================================== */

const AuthMiniThumbnail: React.FC<{ layout: PageLayouts['auth']; isSelected: boolean }> = ({ layout, isSelected }) => {
  const borderCol = isSelected ? 'border-sky-500' : 'border-slate-300 dark:border-slate-700';
  const fillCol = isSelected ? 'bg-sky-500/20' : 'bg-slate-200 dark:bg-slate-800/60';
  const accentCol = isSelected ? 'bg-sky-500' : 'bg-slate-400 dark:bg-slate-600';

  switch (layout) {
    case 'split':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/2 h-full rounded-sm ${isSelected ? 'bg-sky-500/30' : 'bg-slate-300 dark:bg-slate-800'} flex flex-col justify-center items-center p-1`}>
            <div className={`w-4 h-1 rounded-full ${accentCol} mb-1`} />
            <div className={`w-6 h-1 rounded-full ${fillCol}`} />
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center gap-1 p-1">
            <div className={`w-full h-1.5 rounded-sm ${fillCol}`} />
            <div className={`w-full h-1.5 rounded-sm ${fillCol}`} />
            <div className={`w-1/2 h-1.5 rounded-sm ${accentCol}`} />
          </div>
        </div>
      );
    case 'centered-card':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors`}>
          <div className={`w-7/12 h-5/6 rounded border ${borderCol} bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-center items-center gap-1 p-1`}>
            <div className={`w-3 h-1 rounded-full ${accentCol}`} />
            <div className={`w-full h-1 rounded-sm ${fillCol}`} />
            <div className={`w-full h-1 rounded-sm ${fillCol}`} />
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex flex-col items-center justify-center gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-2.5 h-2.5 rounded-full ${accentCol}`} />
          <div className={`w-8 h-1 rounded-sm ${fillCol}`} />
          <div className={`w-12 h-1 rounded-sm ${fillCol}`} />
          <div className={`w-6 h-1.5 rounded-sm ${accentCol}`} />
        </div>
      );
    case 'glassmorphism':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 relative overflow-hidden flex items-center justify-center bg-slate-900 transition-colors`}>
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-500/50 blur-xs" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-cyan-400/50 blur-xs" />
          <div className="w-8/12 h-4/5 rounded backdrop-blur-xs bg-white/10 border border-white/30 flex flex-col items-center justify-center gap-1 p-1 z-10">
            <div className="w-4 h-1 rounded-full bg-white/80" />
            <div className="w-8 h-1 rounded-sm bg-white/40" />
          </div>
        </div>
      );
  }
};

const ErrorMiniThumbnail: React.FC<{ layout: PageLayouts['error']; isSelected: boolean }> = ({ layout, isSelected }) => {
  const borderCol = isSelected ? 'border-sky-500' : 'border-slate-300 dark:border-slate-700';
  const fillCol = isSelected ? 'bg-sky-500/20' : 'bg-slate-200 dark:bg-slate-800/60';
  const accentCol = isSelected ? 'bg-sky-500' : 'bg-slate-400 dark:bg-slate-600';

  switch (layout) {
    case 'giant-hero':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex flex-col items-center justify-center gap-0.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <span className={`text-[11px] font-black leading-none ${isSelected ? 'text-sky-500' : 'text-slate-500 dark:text-slate-400'}`}>404</span>
          <div className={`w-8 h-1 rounded-full ${accentCol}`} />
          <div className={`w-12 h-1 rounded-full ${fillCol}`} />
        </div>
      );
    case 'split-terminal':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="w-1/2 flex flex-col justify-center gap-1 p-0.5">
            <div className={`w-6 h-1 rounded-full ${accentCol}`} />
            <div className={`w-full h-1 rounded-full ${fillCol}`} />
            <div className={`w-8 h-1 rounded-full ${fillCol}`} />
          </div>
          <div className="w-1/2 h-full rounded bg-slate-900 border border-slate-700 p-1 flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-red-500" />
              <div className="w-1 h-1 rounded-full bg-amber-500" />
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
            </div>
            <div className="w-full h-0.5 bg-emerald-400/80 rounded" />
            <div className="w-3/4 h-0.5 bg-emerald-400/50 rounded" />
          </div>
        </div>
      );
    case 'dialog-card':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors`}>
          <div className={`w-8/12 h-5/6 rounded border ${borderCol} bg-white dark:bg-slate-900 p-1 flex flex-col justify-between`}>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className={`w-6 h-1 rounded ${accentCol}`} />
            </div>
            <div className={`w-full h-1 rounded ${fillCol}`} />
            <div className="flex justify-end gap-1">
              <div className={`w-3 h-1 rounded ${fillCol}`} />
              <div className={`w-4 h-1 rounded ${accentCol}`} />
            </div>
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className={`w-full h-11 rounded border ${borderCol} p-1 flex flex-col justify-center gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="flex items-center gap-1">
            <div className={`w-3 h-1 rounded ${accentCol}`} />
            <div className={`w-8 h-1 rounded ${fillCol}`} />
          </div>
          <div className={`w-full h-1 rounded ${fillCol}`} />
          <div className={`w-10 h-1 rounded ${accentCol}`} />
        </div>
      );
  }
};

const GenericMiniThumbnail: React.FC<{ variant: number; isSelected: boolean }> = ({ variant, isSelected }) => {
  const borderCol = isSelected ? 'border-sky-500' : 'border-slate-300 dark:border-slate-700';
  const fillCol = isSelected ? 'bg-sky-500/20' : 'bg-slate-200 dark:bg-slate-800/60';
  const accentCol = isSelected ? 'bg-sky-500' : 'bg-slate-400 dark:bg-slate-600';

  if (variant === 0) {
    // Left sidebar + content grid
    return (
      <div className={`w-full h-11 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
        <div className={`w-1/4 h-full rounded-xs ${fillCol}`} />
        <div className="w-3/4 h-full flex flex-col gap-1">
          <div className="flex gap-1 h-1/2">
            <div className={`flex-1 rounded-xs ${fillCol}`} />
            <div className={`flex-1 rounded-xs ${fillCol}`} />
          </div>
          <div className={`w-full h-1/2 rounded-xs ${accentCol}`} />
        </div>
      </div>
    );
  } else if (variant === 1) {
    // Header + full body cards
    return (
      <div className={`w-full h-11 rounded border ${borderCol} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
        <div className={`w-full h-2 rounded-xs ${accentCol}`} />
        <div className="flex-1 flex gap-1">
          <div className={`flex-1 rounded-xs ${fillCol}`} />
          <div className={`flex-1 rounded-xs ${fillCol}`} />
          <div className={`flex-1 rounded-xs ${fillCol}`} />
        </div>
      </div>
    );
  } else if (variant === 2) {
    // Multi-column or analytical matrix
    return (
      <div className={`w-full h-11 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
        <div className={`flex-1 rounded-xs ${fillCol}`} />
        <div className={`flex-1 rounded-xs ${fillCol}`} />
        <div className={`flex-1 rounded-xs ${accentCol}`} />
      </div>
    );
  } else {
    // Split feed focus
    return (
      <div className={`w-full h-11 rounded border ${borderCol} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
        <div className={`w-2/3 h-full rounded-xs flex flex-col gap-0.5`}>
          <div className={`w-full h-2 rounded-xs ${fillCol}`} />
          <div className={`w-full h-2 rounded-xs ${fillCol}`} />
          <div className={`w-full h-2 rounded-xs ${fillCol}`} />
        </div>
        <div className={`w-1/3 h-full rounded-xs ${accentCol}`} />
      </div>
    );
  }
};

/* ==========================================================================
   Main Component: PageLayoutSection
   ========================================================================== */

export const PageLayoutSection: React.FC = () => {
  const { state, dispatch, activePreview, setActivePreview } = useDesign();

  const pageLayouts = state.pageLayouts ?? {
    auth: 'split',
    authSocialButtons: true,
    authCardStyle: 'elevated',
    error: 'giant-hero',
    errorCode: '404',
    errorShowTrace: true,
    dashboard: 'sidebar-grid',
    landing: 'hero-split',
    pricing: 'cards-3col',
    kanban: 'board-columns',
    chat: 'split-pane',
    settings: 'tabbed',
    detail: 'split-sidepanel',
    onboarding: 'wizard-stepper',
    emptyState: 'centered-action',
    success: 'celebration-card',
  };

  const currentDef = getPreviewDefinition(activePreview);
  const currentIndex = getPreviewIndex(activePreview);

  const handlePrev = () => {
    setActivePreview(getPrevPreview(activePreview));
  };

  const handleNext = () => {
    setActivePreview(getNextPreview(activePreview));
  };

  const getPageIcon = (id: PreviewComponentType) => {
    switch (id) {
      case 'auth':
        return <Lock className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'dashboard':
        return <LayoutDashboard className="w-4 h-4 text-sky-500" />;
      case 'landing':
        return <Globe className="w-4 h-4 text-indigo-500" />;
      case 'pricing':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'kanban':
        return <Kanban className="w-4 h-4 text-purple-500" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-cyan-500" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-slate-500" />;
      case 'onboarding':
        return <Sparkles className="w-4 h-4 text-violet-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'empty-state':
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Header & Preview Navigation Toolbar */}
      <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
              {getPageIcon(activePreview)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {currentDef.shortLabel}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold border border-sky-200 dark:border-sky-800">
                  {currentDef.category}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {currentDef.description}
              </p>
            </div>
          </div>

          {/* Navigation Controls: Prev / Next */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus-ring cursor-pointer"
              title="Previous Preview Screen"
              aria-label="Previous Preview Screen"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 px-1">
              {currentIndex + 1}/{PREVIEW_REGISTRY.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus-ring cursor-pointer"
              title="Next Preview Screen"
              aria-label="Next Preview Screen"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Page Archetype Jump Switcher */}
        <div className="flex items-center gap-1 overflow-x-auto pt-1 no-scrollbar text-[11px]">
          {[
            { id: 'auth', label: 'Auth' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'landing', label: 'Landing' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'kanban', label: 'Kanban' },
            { id: 'chat', label: 'Chat' },
            { id: 'settings', label: 'Settings' },
            { id: 'error', label: 'Error' },
          ].map((item) => {
            const isActive = activePreview === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePreview(item.id as PreviewComponentType)}
                className={`px-2 py-0.8 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          Layout Options specifically tailored to the current selected preview
         ===================================================================== */}

      {/* 1. AUTH PAGE LAYOUTS */}
      {activePreview === 'auth' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Authentication Layout Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'split', label: 'Split Showcase', desc: 'Hero brand banner + form' },
                { id: 'centered-card', label: 'Centered Card', desc: 'Floating elevated modal' },
                { id: 'minimal', label: 'Minimalist', desc: 'Clean single column' },
                { id: 'glassmorphism', label: 'Glassmorphism', desc: 'Frosted glass with glow' },
              ].map((layout) => {
                const isSelected = pageLayouts.auth === layout.id;
                return (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { auth: layout.id as PageLayouts['auth'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <AuthMiniThumbnail layout={layout.id as PageLayouts['auth']} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {layout.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {layout.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Styling Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Card Surface Treatment
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {(['elevated', 'bordered', 'flat', 'glass'] as const).map((style) => {
                const isSelected = pageLayouts.authCardStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { authCardStyle: style } })}
                    className={`py-1 text-[11px] font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Login Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Social Sign-On (SSO)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Display GitHub & Google one-click buttons
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={pageLayouts.authSocialButtons}
              onClick={() =>
                dispatch({
                  type: 'SET_PAGE_LAYOUT',
                  updates: { authSocialButtons: !pageLayouts.authSocialButtons },
                })
              }
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 border ${
                pageLayouts.authSocialButtons
                  ? 'bg-sky-500 border-sky-600'
                  : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pageLayouts.authSocialButtons ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* 2. ERROR & STATUS PAGE LAYOUTS */}
      {activePreview === 'error' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Error Page Layout Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'giant-hero', label: 'Giant Hero', desc: 'Bold typography & illustration' },
                { id: 'split-terminal', label: 'Split Debugger', desc: 'Simulated CLI trace logs' },
                { id: 'dialog-card', label: 'Dialog Card', desc: 'In-app alert modal card' },
                { id: 'minimal', label: 'Minimal Clean', desc: 'Editorial documentation link' },
              ].map((layout) => {
                const isSelected = pageLayouts.error === layout.id;
                return (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { error: layout.id as PageLayouts['error'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <ErrorMiniThumbnail layout={layout.id as PageLayouts['error']} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {layout.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {layout.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* HTTP Code Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Active HTTP Status Target
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {[
                { code: '404', label: '404 Not Found' },
                { code: '403', label: '403 Forbidden' },
                { code: '500', label: '500 Server' },
              ].map((item) => {
                const isSelected = pageLayouts.errorCode === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { errorCode: item.code as PageLayouts['errorCode'] } })}
                    className={`py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostics Stack Trace Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Diagnostic Trace & Endpoint
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Include technical debugging metadata box
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={pageLayouts.errorShowTrace}
              onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { errorShowTrace: !pageLayouts.errorShowTrace } })}
              className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer p-0.5 border ${
                pageLayouts.errorShowTrace
                  ? 'bg-sky-500 border-sky-600'
                  : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pageLayouts.errorShowTrace ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD PAGE LAYOUTS */}
      {activePreview === 'dashboard' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Dashboard Architecture Layout
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'sidebar-grid', label: 'Sidebar & Grid', desc: 'Standard edge nav + stat cards', variant: 0 },
                { id: 'header-compact', label: 'Header Compact', desc: 'Top nav + wide telemetry cards', variant: 1 },
                { id: 'analytical', label: 'Analytical Matrix', desc: 'Dense multi-metric analytics', variant: 2 },
                { id: 'feed-focus', label: 'Feed & Telemetry', desc: 'Live event stream + gauges', variant: 3 },
              ].map((item) => {
                const isSelected = (pageLayouts.dashboard ?? 'sidebar-grid') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { dashboard: item.id as PageLayouts['dashboard'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. LANDING PAGE LAYOUTS */}
      {activePreview === 'landing' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Landing Page Hero Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'hero-split', label: 'Hero Split', desc: 'Mockup split card', variant: 0 },
                { id: 'hero-centered', label: 'Centered', desc: 'Center headline & CTA', variant: 1 },
                { id: 'feature-grid', label: 'Feature Grid', desc: 'Grid-first showcase', variant: 2 },
              ].map((item) => {
                const isSelected = (pageLayouts.landing ?? 'hero-split') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { landing: item.id as PageLayouts['landing'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. PRICING PAGE LAYOUTS */}
      {activePreview === 'pricing' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Pricing Structure Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'cards-3col', label: '3-Card Tier', desc: 'Side-by-side tier cards', variant: 2 },
                { id: 'table-matrix', label: 'Matrix Table', desc: 'Feature comparison grid', variant: 1 },
                { id: 'compact-toggle', label: 'Compact List', desc: 'Toggleable tier list', variant: 0 },
              ].map((item) => {
                const isSelected = (pageLayouts.pricing ?? 'cards-3col') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { pricing: item.id as PageLayouts['pricing'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. KANBAN PAGE LAYOUTS */}
      {activePreview === 'kanban' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Kanban Board Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'board-columns', label: 'Columns Board', desc: 'Multi-column pipeline', variant: 2 },
                { id: 'timeline-list', label: 'Roadmap List', desc: 'Progress bar milestones', variant: 0 },
                { id: 'compact-grid', label: 'Compact Grid', desc: 'Dense task cards matrix', variant: 1 },
              ].map((item) => {
                const isSelected = (pageLayouts.kanban ?? 'board-columns') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { kanban: item.id as PageLayouts['kanban'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 7. CHAT & INBOX PAGE LAYOUTS */}
      {activePreview === 'chat' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Chat & Inbox Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'split-pane', label: 'Master Split', desc: 'Side list + conversation', variant: 0 },
                { id: 'compact-feed', label: 'Floating Feed', desc: 'Single thread composer', variant: 1 },
                { id: 'minimal-bubble', label: 'Minimal Bubbles', desc: 'Streamlined bubbles', variant: 3 },
              ].map((item) => {
                const isSelected = (pageLayouts.chat ?? 'split-pane') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { chat: item.id as PageLayouts['chat'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 8. SETTINGS PAGE LAYOUTS */}
      {activePreview === 'settings' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Settings & Preferences Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tabbed', label: 'Horizontal Tabs', desc: 'Tabbed panel switcher', variant: 1 },
                { id: 'stacked-cards', label: 'Stacked Cards', desc: 'Vertical section cards', variant: 0 },
                { id: 'sidebar-nav', label: 'Sidebar Nav', desc: 'Left sub-navigation link', variant: 3 },
              ].map((item) => {
                const isSelected = (pageLayouts.settings ?? 'tabbed') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { settings: item.id as PageLayouts['settings'] } })}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-xs ring-1 ring-sky-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <GenericMiniThumbnail variant={item.variant} isSelected={isSelected} />
                    <div className="mt-2">
                      <div className={`text-xs font-semibold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 9. ONBOARDING, EMPTY STATE, SUCCESS, ETC. */}
      {['onboarding', 'empty-state', 'success', 'detail'].includes(activePreview) && (
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Interactive Page Simulation
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            This {currentDef.shortLabel} view dynamically responds to your primary and surface tokens. Click interactive controls directly on canvas to test transitions.
          </p>
        </div>
      )}

      {/* 10. COMPONENT PRIMITIVES CALLOUT */}
      {!currentDef.hasCustomLayouts && !['onboarding', 'empty-state', 'success', 'detail'].includes(activePreview) && (
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-sky-500" />
              Previewing Component Primitive
            </span>
            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
              {currentDef.shortLabel}
            </span>
          </div>
          <p className="text-[11px] text-sky-800/80 dark:text-sky-300/80 leading-relaxed">
            Primitives test isolated atom tokens in the canvas. To customize full responsive layout architectures, select any page archetype below:
          </p>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => setActivePreview('auth')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-800 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-sky-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Auth Page</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('dashboard')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-800 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-sky-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('landing')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-800 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-sky-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>Landing</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('error')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-300 dark:border-sky-800 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-sky-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Status & Error</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
