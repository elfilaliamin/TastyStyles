import React, { useState, useEffect, useRef, useMemo, Suspense, lazy } from 'react';
import { useDesign } from '../../context/DesignContext';
import { ViewportSwitcher } from './ViewportSwitcher';
import { ButtonsPreview } from './components/ButtonsPreview';
import { FormsPreview } from './components/FormsPreview';
import { CardsPreview } from './components/CardsPreview';
import { FeedbackPreview } from './components/FeedbackPreview';
import { PopupsPreview } from './components/PopupsPreview';
import { TablePreview } from './components/TablePreview';
import { NavbarPreview } from './components/NavbarPreview';
import { SidebarPreview } from './components/SidebarPreview';
import { getPreviewCssVariables } from '../../lib/tokenModel';
import type { ViewportMode, PreviewComponentType } from '../../types';
import { ChevronLeft, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';
import {
  PREVIEW_REGISTRY,
  getPreviewIndex,
  getNextPreview,
  getPrevPreview,
  getPreviewsForGoal,
  getGoalPreviewGroups,
  GOAL_DEFINITIONS,
} from '../../config/previews';

const CATEGORY_LABELS: Record<string, string> = {
  Primitives: 'Component Primitives',
  Public: 'Public Pages',
  Commerce: 'Commerce & Transactions',
  Community: 'Community & Social',
  Auth: 'Auth & Onboarding',
  Core: 'Core Application',
  Account: 'Account & Workspace',
  System: 'System States',
};

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

// Commerce & Domain Archetypes (Lazy Loaded)
const ProductCatalogPage = lazy(() => import('./pages/commerce/ProductCatalogPage').then(m => ({ default: m.ProductCatalogPage })));
const ProductDetailPage = lazy(() => import('./pages/commerce/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CheckoutPage = lazy(() => import('./pages/commerce/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const MarketplacePage = lazy(() => import('./pages/commerce/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const BookingPage = lazy(() => import('./pages/commerce/BookingPage').then(m => ({ default: m.BookingPage })));

// Content & Community Archetypes (Lazy Loaded)
const EditorialPage = lazy(() => import('./pages/content/EditorialPage').then(m => ({ default: m.EditorialPage })));
const PortfolioPage = lazy(() => import('./pages/content/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const CharityPage = lazy(() => import('./pages/content/CharityPage').then(m => ({ default: m.CharityPage })));
const CommunityForumPage = lazy(() => import('./pages/content/CommunityForumPage').then(m => ({ default: m.CommunityForumPage })));
const StreamingPage = lazy(() => import('./pages/content/StreamingPage').then(m => ({ default: m.StreamingPage })));

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
    case 'ecommerce-catalog': void import('./pages/commerce/ProductCatalogPage'); break;
    case 'product-detail': void import('./pages/commerce/ProductDetailPage'); break;
    case 'checkout': void import('./pages/commerce/CheckoutPage'); break;
    case 'marketplace': void import('./pages/commerce/MarketplacePage'); break;
    case 'booking': void import('./pages/commerce/BookingPage'); break;
    case 'editorial': void import('./pages/content/EditorialPage'); break;
    case 'portfolio': void import('./pages/content/PortfolioPage'); break;
    case 'charity': void import('./pages/content/CharityPage'); break;
    case 'forum': void import('./pages/content/CommunityForumPage'); break;
    case 'streaming': void import('./pages/content/StreamingPage'); break;
  }
};

export const PreviewPane: React.FC = () => {
  const { state, activePreview, setActivePreview } = useDesign();
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [hasOverflow, setHasOverflow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scoped CSS Custom Properties derived canonically from tokenModel
  const cssVariables = getPreviewCssVariables(state);

  const [isGoalFocus, setIsGoalFocus] = useState<boolean>(true);
  const currentGoal = state.projectGoal ?? 'saas';
  const activeGoalDef = GOAL_DEFINITIONS[currentGoal] ?? GOAL_DEFINITIONS.saas;

  const goalGroups = useMemo(
    () => getGoalPreviewGroups(currentGoal),
    [currentGoal]
  );

  const scopedPreviews = useMemo(
    () => (isGoalFocus ? getPreviewsForGoal(currentGoal) : PREVIEW_REGISTRY),
    [isGoalFocus, currentGoal]
  );

  const currentIndex = getPreviewIndex(activePreview, scopedPreviews);

  // If in goal focus mode and active preview is outside current goal scope, switch to the first preview of the goal
  useEffect(() => {
    if (isGoalFocus && scopedPreviews.length > 0 && !scopedPreviews.some((p) => p.id === activePreview)) {
      setActivePreview(scopedPreviews[0].id);
    }
  }, [isGoalFocus, scopedPreviews, activePreview, setActivePreview]);

  const handlePrev = React.useCallback(() => {
    const prev = getPrevPreview(activePreview, scopedPreviews);
    preloadComponent(prev);
    setActivePreview(prev);
  }, [activePreview, setActivePreview, scopedPreviews]);

  const handleNext = React.useCallback(() => {
    const next = getNextPreview(activePreview, scopedPreviews);
    preloadComponent(next);
    setActivePreview(next);
  }, [activePreview, setActivePreview, scopedPreviews]);

  // Keyboard navigation
  useEffect(() => {
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

  // Overflow detection observer
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const overflowing = el.scrollWidth > el.clientWidth + 1;
      setHasOverflow(overflowing);
    };

    // Run after DOM render
    const frame = requestAnimationFrame(checkOverflow);

    const ro = new ResizeObserver(() => {
      checkOverflow();
    });

    ro.observe(el);
    if (el.firstElementChild) {
      ro.observe(el.firstElementChild);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [activePreview, viewportMode, state]);

  // Frame width for viewport simulator
  const viewportWidth =
    viewportMode === 'mobile'
      ? '375px'
      : viewportMode === 'tablet'
      ? '768px'
      : '100%';

  const isFullBleed = [
    // Navigation & Application Shells
    'sidebar',
    'navbar',
    // Commerce & Transactional
    'ecommerce-catalog',
    'product-detail',
    'checkout',
    'marketplace',
    'booking',
    // Community & Content
    'editorial',
    'portfolio',
    'charity',
    'forum',
    'streaming',
    // Public Pages
    'landing',
    'pricing',
    'blog',
    'contact',
    // Auth & Onboarding
    'auth',
    'onboarding',
    // Core Application
    'dashboard',
    'detail',
    'kanban',
    'chat',
    // Account & Workspace
    'settings',
    'billing',
    'team',
    // System States
    'error',
    'empty-state',
    'success',
  ].includes(activePreview);

  const isPageArchetype = isFullBleed;

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
      case 'popups':
        return <PopupsPreview />;
      case 'table':
        return <TablePreview />;
      case 'navbar':
        return <NavbarPreview />;
      case 'sidebar':
        return <SidebarPreview />;

      // Commerce & Transactional
      case 'ecommerce-catalog':
        return <ProductCatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'booking':
        return <BookingPage />;

      // Content & Community
      case 'editorial':
        return <EditorialPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'charity':
        return <CharityPage />;
      case 'forum':
        return <CommunityForumPage />;
      case 'streaming':
        return <StreamingPage />;

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

      default:
        return <ButtonsPreview />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-colors overflow-hidden min-h-0">
      {/* Top Preview Control Header */}
      <div className="h-14 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 shrink-0 gap-2">
        {/* Navigation Selector Bar */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
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

          {/* Quick Selection Dropdown */}
          <div className="relative min-w-0 flex items-center">
            <select
              value={activePreview}
              onChange={(e) => setActivePreview(e.target.value as PreviewComponentType)}
              aria-label="Select preview archetype"
              className="appearance-none bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm pl-2.5 sm:pl-3 pr-7 sm:pr-8 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700/80 focus-ring cursor-pointer max-w-[145px] sm:max-w-[210px] md:max-w-xs truncate"
            >
              {isGoalFocus ? (
                <>
                  <optgroup label={`${activeGoalDef.emoji} ${activeGoalDef.label} — Pages`}>
                    {goalGroups.pages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={`🧩 ${activeGoalDef.label} — Primitives`}>
                    {goalGroups.primitives.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                </>
              ) : (
                (['Primitives', 'Commerce', 'Community', 'Public', 'Auth', 'Core', 'Account', 'System'] as const).map((cat) => {
                  const items = PREVIEW_REGISTRY.filter((p) => p.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <optgroup key={cat} label={CATEGORY_LABELS[cat]}>
                      {items.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </optgroup>
                  );
                })
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Goal Focus Filter Pill Toggle */}
          <button
            type="button"
            onClick={() => setIsGoalFocus((prev) => !prev)}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg border flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
              isGoalFocus
                ? 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
            }`}
            title={
              isGoalFocus
                ? `Showing ${scopedPreviews.length} views for ${activeGoalDef.label}. Click to view all 26 previews.`
                : 'Showing all 26 views. Click to focus on goal views.'
            }
          >
            <span>{isGoalFocus ? `${activeGoalDef.emoji} Goal Focus` : '🌐 All Views'}</span>
          </button>

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
            {currentIndex >= 0 ? currentIndex + 1 : 1}/{scopedPreviews.length}
          </span>

          {/* Active icon spec pill */}
          <span
            className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hidden xl:inline-flex items-center gap-1 border border-slate-300 dark:border-slate-700"
            title="Active Icon Specification in Previews"
          >
            <span>Icon:</span>
            <strong className="text-slate-900 dark:text-slate-200 capitalize">
              {state.icons?.library ?? 'lucide'}
            </strong>
            <span>•</span>
            <span>{state.icons?.mode ?? 'outline'}</span>
            {state.icons?.duotone && <span>(duotone)</span>}
            <span>•</span>
            <span>{state.icons?.weight ?? 'regular'}</span>
          </span>

          {/* Overflow detection indicator */}
          {hasOverflow && (
            <span
              className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1 animate-pulse"
              title="Container content exceeds viewport width"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>↔ Overflow</span>
            </span>
          )}
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
            data-icon-library={state.icons?.library ?? 'lucide'}
            data-icon-mode={state.icons?.mode ?? 'outline'}
            data-icon-weight={state.icons?.weight ?? 'regular'}
            data-icon-duotone={state.icons?.duotone ? 'true' : 'false'}
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
                borderRadius: '12px',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                containerType: 'inline-size',
              } as React.CSSProperties
            }
          >
            {/* Scrollable Viewport inside the preview frame */}
            <div
              ref={scrollContainerRef}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: isFullBleed ? '0' : 'var(--ts-space-lg)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  minHeight: '100%',
                  height: '100%',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
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
