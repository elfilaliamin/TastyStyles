import React, { useState, Suspense, lazy } from 'react';
import { useDesign } from '../../context/DesignContext';
import { ViewportSwitcher } from './ViewportSwitcher';
import { MockCard } from './MockCard';
import { LayoutWireframe } from './LayoutWireframe';
import { ButtonsPreview } from './components/ButtonsPreview';
import { FormsPreview } from './components/FormsPreview';
import { CardsPreview } from './components/CardsPreview';
import { FeedbackPreview } from './components/FeedbackPreview';
import { TablePreview } from './components/TablePreview';

// Page Archetypes (Lazy Loaded for Optimal Bundle Splitting)
const LandingPage = lazy(() => import('./pages/public/LandingPage').then(m => ({ default: m.LandingPage })));
const PricingPage = lazy(() => import('./pages/public/PricingPage').then(m => ({ default: m.PricingPage })));
const BlogArticlePage = lazy(() => import('./pages/public/BlogArticlePage').then(m => ({ default: m.BlogArticlePage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then(m => ({ default: m.ContactPage })));
const AuthPage = lazy(() => import('./pages/auth/AuthPage').then(m => ({ default: m.AuthPage })));
const OnboardingPage = lazy(() => import('./pages/auth/OnboardingPage').then(m => ({ default: m.OnboardingPage })));
const DashboardPage = lazy(() => import('./pages/core/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ItemDetailPage = lazy(() => import('./pages/core/ItemDetailPage').then(m => ({ default: m.ItemDetailPage })));
const KanbanPage = lazy(() => import('./pages/core/KanbanPage').then(m => ({ default: m.KanbanPage })));
const ChatInboxPage = lazy(() => import('./pages/core/ChatInboxPage').then(m => ({ default: m.ChatInboxPage })));
const SettingsPage = lazy(() => import('./pages/account/SettingsPage').then(m => ({ default: m.SettingsPage })));
const BillingPage = lazy(() => import('./pages/account/BillingPage').then(m => ({ default: m.BillingPage })));
const TeamMembersPage = lazy(() => import('./pages/account/TeamMembersPage').then(m => ({ default: m.TeamMembersPage })));
const ErrorPage = lazy(() => import('./pages/system/ErrorPage').then(m => ({ default: m.ErrorPage })));
const EmptyStatePage = lazy(() => import('./pages/system/EmptyStatePage').then(m => ({ default: m.EmptyStatePage })));
const SuccessConfirmPage = lazy(() => import('./pages/system/SuccessConfirmPage').then(m => ({ default: m.SuccessConfirmPage })));

// Preloader for instant transition on hover/focus
const preloadComponent = (type: string) => {
  switch (type) {
    case 'landing': void import('./pages/public/LandingPage'); break;
    case 'pricing': void import('./pages/public/PricingPage'); break;
    case 'blog': void import('./pages/public/BlogArticlePage'); break;
    case 'contact': void import('./pages/public/ContactPage'); break;
    case 'auth': void import('./pages/auth/AuthPage'); break;
    case 'onboarding': void import('./pages/auth/OnboardingPage'); break;
    case 'dashboard': void import('./pages/core/DashboardPage'); break;
    case 'detail': void import('./pages/core/ItemDetailPage'); break;
    case 'kanban': void import('./pages/core/KanbanPage'); break;
    case 'chat': void import('./pages/core/ChatInboxPage'); break;
    case 'settings': void import('./pages/account/SettingsPage'); break;
    case 'billing': void import('./pages/account/BillingPage'); break;
    case 'team': void import('./pages/account/TeamMembersPage'); break;
    case 'error': void import('./pages/system/ErrorPage'); break;
    case 'empty-state': void import('./pages/system/EmptyStatePage'); break;
    case 'success': void import('./pages/system/SuccessConfirmPage'); break;
  }
};

import {
  getFontEntry,
  getRadiusEntry,
  getShadowEntry,
  getSpacingEntry,
} from '../../lib/registry';
import type { ViewportMode, PreviewComponentType } from '../../types';
import { Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { PREVIEW_REGISTRY, getPreviewIndex, getNextPreview, getPrevPreview } from '../../config/previews';

export const PreviewPane: React.FC = () => {
  const { state, activeColors, activePreview, setActivePreview } = useDesign();
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  const headingFont = getFontEntry(state.typography.headingFont) ?? {
    family: state.typography.headingFont,
    category: 'sans-serif',
  };
  const bodyFont = getFontEntry(state.typography.bodyFont) ?? {
    family: state.typography.bodyFont,
    category: 'sans-serif',
  };
  const radiusEntry = getRadiusEntry(state.radius) ?? { value: '8px' };
  const shadowEntry = getShadowEntry(state.shadow) ?? { value: 'none' };
  const spacingEntry = getSpacingEntry(state.spacing) ?? {
    scale: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
  };

  // Scoped CSS Custom Properties for the preview sandbox
  const cssVariables: Record<string, string> = {
    '--ts-color-primary': activeColors.primary,
    '--ts-color-secondary': activeColors.secondary,
    '--ts-color-accent': activeColors.accent,
    '--ts-color-background': activeColors.background,
    '--ts-color-surface': activeColors.surface,
    '--ts-color-text': activeColors.text,
    '--ts-color-border': activeColors.border,

    '--ts-font-heading': `'${headingFont.family}', ${headingFont.category}`,
    '--ts-font-body': `'${bodyFont.family}', ${bodyFont.category}`,
    '--ts-base-size': `${state.typography.baseSize}px`,
    '--ts-scale': `${state.typography.scale}`,

    '--ts-radius': radiusEntry.value,
    '--ts-shadow': shadowEntry.value,

    '--ts-space-xs': spacingEntry.scale.xs,
    '--ts-space-sm': spacingEntry.scale.sm,
    '--ts-space-md': spacingEntry.scale.md,
    '--ts-space-lg': spacingEntry.scale.lg,
    '--ts-space-xl': spacingEntry.scale.xl,
  };

  const currentIndex = getPreviewIndex(activePreview);

  const handlePrev = React.useCallback(() => {
    const prev = getPrevPreview(activePreview);
    preloadComponent(prev);
    setActivePreview(prev);
  }, [activePreview, setActivePreview]);

  const handleNext = React.useCallback(() => {
    const next = getNextPreview(activePreview);
    preloadComponent(next);
    setActivePreview(next);
  }, [activePreview, setActivePreview]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.shiftKey && (e.key === '{' || e.key === '[')) {
        e.preventDefault();
        handlePrev();
      } else if (e.shiftKey && (e.key === '}' || e.key === ']')) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Frame width for viewport simulator
  const viewportWidth =
    viewportMode === 'mobile'
      ? '375px'
      : viewportMode === 'tablet'
      ? '768px'
      : '100%';

  const isPageArchetype = [
    'layout',
    'landing',
    'pricing',
    'blog',
    'contact',
    'auth',
    'onboarding',
    'dashboard',
    'detail',
    'kanban',
    'chat',
    'settings',
    'billing',
    'team',
    'error',
    'empty-state',
    'success',
  ].includes(activePreview);

  const renderActivePreview = () => {
    switch (activePreview) {
      // Component Primitives
      case 'buttons':
        return <ButtonsPreview />;
      case 'forms':
        return <FormsPreview />;
      case 'cards':
        return <CardsPreview />;
      case 'feedback':
        return <FeedbackPreview />;
      case 'table':
        return <TablePreview />;
      case 'layout':
        return <LayoutWireframe />;

      // Public Pages
      case 'landing':
        return <LandingPage />;
      case 'pricing':
        return <PricingPage />;
      case 'blog':
        return <BlogArticlePage />;
      case 'contact':
        return <ContactPage />;

      // Auth & Onboarding
      case 'auth':
        return <AuthPage />;
      case 'onboarding':
        return <OnboardingPage />;

      // Core Application
      case 'dashboard':
        return <DashboardPage />;
      case 'detail':
        return <ItemDetailPage />;
      case 'kanban':
        return <KanbanPage />;
      case 'chat':
        return <ChatInboxPage />;

      // Account & Workspace
      case 'settings':
        return <SettingsPage />;
      case 'billing':
        return <BillingPage />;
      case 'team':
        return <TeamMembersPage />;

      // System States
      case 'error':
        return <ErrorPage />;
      case 'empty-state':
        return <EmptyStatePage />;
      case 'success':
        return <SuccessConfirmPage />;

      case 'overview':
      default:
        return <MockCard />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-100/50 dark:bg-slate-950 overflow-hidden transition-colors">
      {/* Top toolbar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm flex-shrink-0 z-10 transition-colors">
        {/* Component / Page Selector with Navigation Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <label
            htmlFor="preview-component-select"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-sky-500" />
            <span className="hidden sm:inline">Preview:</span>
          </label>

          {/* Navigation Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 sm:p-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors focus-ring cursor-pointer"
            title="Previous preview (Shift+[)"
            aria-label="Previous preview"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="relative">
            <select
              id="preview-component-select"
              value={activePreview}
              onMouseEnter={() => {
                preloadComponent('landing');
                preloadComponent('auth');
                preloadComponent('error');
              }}
              onFocus={() => {
                preloadComponent('landing');
                preloadComponent('dashboard');
                preloadComponent('auth');
                preloadComponent('error');
              }}
              onChange={(e) => {
                const val = e.target.value as PreviewComponentType;
                preloadComponent(val);
                setActivePreview(val);
              }}
              className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus-ring cursor-pointer transition-colors shadow-sm max-w-[220px] sm:max-w-none"
            >
              <optgroup label="Component Primitives">
                <option value="overview">Component Card (Overview)</option>
                <option value="buttons">Buttons & Actions</option>
                <option value="forms">Form Controls & Inputs</option>
                <option value="cards">Cards & Surfaces Showcase</option>
                <option value="feedback">Feedback, Badges & Alerts</option>
                <option value="table">Data Tables & Lists</option>
                <option value="layout">Home Page Wireframe</option>
              </optgroup>

              <optgroup label="Public Pages">
                <option value="landing">Landing / Homepage</option>
                <option value="pricing">Pricing & Plans</option>
                <option value="blog">Blog / Long Article</option>
                <option value="contact">Contact & Validation Form</option>
              </optgroup>

              <optgroup label="Auth & Onboarding">
                <option value="auth">Auth (Login / Signup / Reset)</option>
                <option value="onboarding">Onboarding Wizard (3 Steps)</option>
              </optgroup>

              <optgroup label="Core Application">
                <option value="dashboard">Dashboard & Telemetry</option>
                <option value="detail">Item Detail & Diagnostics</option>
                <option value="kanban">Kanban & Sprint Board</option>
                <option value="chat">Chat & Autonomous Inbox</option>
              </optgroup>

              <optgroup label="Account & Workspace">
                <option value="settings">Settings & Preferences</option>
                <option value="billing">Billing & Invoices</option>
                <option value="team">Team & Access Control</option>
              </optgroup>

              <optgroup label="System States">
                <option value="error">System Error & Status (404/500/403)</option>
                <option value="empty-state">Empty State (No Data)</option>
                <option value="success">Success & Confirmation</option>
              </optgroup>
            </select>
          </div>

          {/* Navigation Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 sm:p-2 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors focus-ring cursor-pointer"
            title="Next preview (Shift+])"
            aria-label="Next preview"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Step indicator */}
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden md:inline ml-0.5">
            {currentIndex + 1}/{PREVIEW_REGISTRY.length}
          </span>
        </div>

        {/* Viewport switcher */}
        <ViewportSwitcher currentMode={viewportMode} onChange={setViewportMode} />
      </div>

      {/* Preview Canvas Area - Fixed height to end of screen view height */}
      <div className="flex-1 overflow-hidden p-2.5 sm:p-3.5 lg:p-4 flex flex-col items-center justify-center bg-slate-200/60 dark:bg-slate-950/90 transition-colors min-h-0">
        <div
          className="transition-all duration-300 w-full h-full flex flex-col items-center justify-center min-h-0"
          style={{ maxWidth: viewportWidth }}
        >
          {/* Isolated sandbox frame fixed to container height with internal scrolling */}
          <div
            data-viewport={viewportMode}
            className="ts-preview-frame"
            style={
              {
                ...cssVariables,
                backgroundColor: 'var(--ts-color-background)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                border: '1px solid var(--ts-color-border)',
                borderRadius: 'calc(var(--ts-radius) + 4px)',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                containerType: 'inline-size',
              } as React.CSSProperties
            }
          >
            {/* Scrollable Viewport inside the preview frame */}
            <div
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: isPageArchetype ? '0' : 'var(--ts-space-lg)',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  minHeight: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: activePreview === 'overview' ? 'center' : 'stretch',
                  justifyContent: activePreview === 'overview' ? 'center' : 'flex-start',
                  width: '100%',
                }}
              >
                {isPageArchetype ? (
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '240px',
                          color: 'var(--ts-color-text)',
                          opacity: 0.6,
                          fontSize: 'calc(var(--ts-base-size) * 0.85)',
                        }}
                      >
                        Loading archetype simulation...
                      </div>
                    }
                  >
                    {renderActivePreview()}
                  </Suspense>
                ) : (
                  renderActivePreview()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
