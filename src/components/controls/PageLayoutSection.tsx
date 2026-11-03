import React, { useState } from 'react';
import { useDesign } from '../../context/DesignContext';
import type { PageLayouts } from '../../config/schema';
import {
  Lock,
  AlertTriangle,
  ExternalLink,
  Eye,
} from 'lucide-react';

// Mini visual thumbnail for Auth layout options
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

// Mini visual thumbnail for Error layout options
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

export const PageLayoutSection: React.FC = () => {
  const { state, dispatch, activePreview, setActivePreview } = useDesign();
  const [selectedPageTab, setSelectedPageTab] = useState<'auth' | 'error'>('auth');

  const pageLayouts = state.pageLayouts ?? {
    auth: 'split',
    authSocialButtons: true,
    authCardStyle: 'elevated',
    error: 'giant-hero',
    errorCode: '404',
    errorShowTrace: true,
  };

  const handleAuthLayoutChange = (layout: PageLayouts['auth']) => {
    dispatch({
      type: 'SET_PAGE_LAYOUT',
      updates: { auth: layout },
    });
    // Auto-focus the preview pane on auth page to provide instant visual feedback
    if (activePreview !== 'auth') {
      setActivePreview('auth');
    }
  };

  const handleErrorLayoutChange = (layout: PageLayouts['error']) => {
    dispatch({
      type: 'SET_PAGE_LAYOUT',
      updates: { error: layout },
    });
    // Auto-focus the preview pane on error page
    if (activePreview !== 'error') {
      setActivePreview('error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Category Tabs */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => {
            setSelectedPageTab('auth');
            if (activePreview !== 'auth') setActivePreview('auth');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            selectedPageTab === 'auth'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Auth & Login</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedPageTab('error');
            if (activePreview !== 'error') setActivePreview('error');
          }}
          className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            selectedPageTab === 'error'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Status & Error</span>
        </button>
      </div>

      {/* Active Preview Sync Indicator */}
      <div className="flex items-center justify-between text-[11px] px-1 text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-sky-500" />
          <span>Previewing:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase">
            {activePreview}
          </span>
        </div>
        {((selectedPageTab === 'auth' && activePreview !== 'auth') ||
          (selectedPageTab === 'error' && activePreview !== 'error')) && (
          <button
            type="button"
            onClick={() => setActivePreview(selectedPageTab === 'auth' ? 'auth' : 'error')}
            className="text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>Focus Preview</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Auth Settings Panel */}
      {selectedPageTab === 'auth' && (
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
                    onClick={() => handleAuthLayoutChange(layout.id as PageLayouts['auth'])}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-sm ring-1 ring-sky-500'
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
                    className={`py-1 text-[11px] font-semibold rounded-lg capitalize transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
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

      {/* Error Settings Panel */}
      {selectedPageTab === 'error' && (
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
                    onClick={() => handleErrorLayoutChange(layout.id as PageLayouts['error'])}
                    className={`p-2 rounded-xl border text-left transition-all min-h-[44px] flex flex-col justify-between focus-ring ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/20 shadow-sm ring-1 ring-sky-500'
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
                    onClick={() =>
                      dispatch({
                        type: 'SET_PAGE_LAYOUT',
                        updates: { errorCode: item.code as PageLayouts['errorCode'] },
                      })
                    }
                    className={`py-1 text-[11px] font-semibold rounded-lg transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs'
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
              onClick={() =>
                dispatch({
                  type: 'SET_PAGE_LAYOUT',
                  updates: { errorShowTrace: !pageLayouts.errorShowTrace },
                })
              }
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
    </div>
  );
};
