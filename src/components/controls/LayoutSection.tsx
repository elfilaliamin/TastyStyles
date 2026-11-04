import React from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import type { PageLayouts } from '../../config/schema';
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
  Lock,
  AlertTriangle,
  LayoutDashboard,
  Globe,
  CreditCard,
  Kanban,
  MessageSquare,
  Settings,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Layers,
  PanelTop,
  PanelLeft,
} from 'lucide-react';

/* ==========================================================================
   Clean Visual Wireframe Mini Thumbnails (Matching Screenshot Style)
   ========================================================================== */

interface WireframeThumbnailProps {
  variant: string;
  isSelected: boolean;
}

const WireframeThumbnail: React.FC<WireframeThumbnailProps> = ({ variant, isSelected }) => {
  const border = isSelected ? 'border-sky-400 dark:border-sky-500' : 'border-slate-300 dark:border-slate-700';
  const fill = isSelected ? 'bg-sky-400/30 dark:bg-sky-400/25' : 'bg-slate-200 dark:bg-slate-800';
  const accent = isSelected ? 'bg-sky-500/80' : 'bg-slate-400 dark:bg-slate-600';

  switch (variant) {
    // 1. Sidebar + Content
    case 'sidebar-content':
    case 'sidebar-grid':
    case 'sidebar-nav':
    case 'split-pane':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex gap-1.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/4 h-full rounded-[2px] ${accent}`} />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className={`w-full h-2.5 rounded-[2px] ${fill}`} />
            <div className="flex-1 flex gap-1">
              <div className={`flex-1 rounded-[2px] ${fill}`} />
              <div className={`flex-1 rounded-[2px] ${fill}`} />
            </div>
          </div>
        </div>
      );

    // 2. Bento Grid / Multi-Cell
    case 'bento-grid':
    case 'analytical':
    case 'feature-grid':
    case 'compact-grid':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 grid grid-cols-3 gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`col-span-2 h-5 rounded-[2px] ${accent}`} />
          <div className={`col-span-1 h-5 rounded-[2px] ${fill}`} />
          <div className={`col-span-1 h-4 rounded-[2px] ${fill}`} />
          <div className={`col-span-2 h-4 rounded-[2px] ${fill}`} />
        </div>
      );

    // 3. Marketing Landing / Hero Split
    case 'landing':
    case 'hero-split':
    case 'split':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex gap-1.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="w-1/2 flex flex-col justify-center gap-1">
            <div className={`w-3/4 h-2.5 rounded-[2px] ${accent}`} />
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-1/2 h-2 rounded-[2px] ${accent}`} />
          </div>
          <div className={`w-1/2 h-full rounded-[2px] ${fill} border ${border} p-1 flex flex-col justify-center gap-1`}>
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-3/4 h-1.5 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 3b. Split Screen (Image Cover)
    case 'split-image':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex gap-1.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="w-1/2 h-full rounded-[2px] bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-950 flex flex-col justify-end p-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-sky-400 via-transparent to-transparent" />
            <div className="w-3/4 h-1 rounded-[2px] bg-white/90 z-10" />
            <div className="w-1/2 h-0.5 rounded-[2px] bg-white/60 z-10 mt-0.5" />
          </div>
          <div className={`w-1/2 h-full rounded-[2px] ${fill} border ${border} p-1 flex flex-col justify-center gap-1`}>
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-3/4 h-1.5 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 4. Centered Card / Modal Dialog
    case 'centered-card':
    case 'dialog-card':
    case 'celebration-card':
    case 'minimal-modal':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors`}>
          <div className={`w-7/12 h-5/6 rounded-md border ${border} bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center justify-center gap-1 p-1`}>
            <div className={`w-4 h-1.5 rounded-[2px] ${accent}`} />
            <div className={`w-full h-1 rounded-[2px] ${fill}`} />
            <div className={`w-2/3 h-1 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 4b. Social-Login-First
    case 'social-first':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors`}>
          <div className={`w-8/12 h-full rounded-md border ${border} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between p-1`}>
            <div className="flex gap-1 justify-center pt-0.5">
              <div className={`w-3.5 h-1.5 rounded-[2px] ${accent}`} />
              <div className={`w-3.5 h-1.5 rounded-[2px] ${accent}`} />
              <div className={`w-3.5 h-1.5 rounded-[2px] ${accent}`} />
            </div>
            <div className="w-full h-px bg-slate-300 dark:bg-slate-700 my-0.5" />
            <div className={`w-full h-1 rounded-[2px] ${fill}`} />
            <div className={`w-full h-1.5 rounded-[2px] ${accent}`} />
          </div>
        </div>
      );

    // 4c. Full-Page Background with Floating Form
    case 'full-background':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-gradient-to-tr from-sky-400/25 via-indigo-500/20 to-purple-400/25 dark:from-sky-900/40 dark:to-purple-900/40 transition-colors relative overflow-hidden`}>
          <div className={`w-7/12 h-5/6 rounded-md border border-white/50 dark:border-white/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center gap-1 p-1`}>
            <div className={`w-4 h-1.5 rounded-[2px] ${accent}`} />
            <div className={`w-full h-1 rounded-[2px] ${fill}`} />
            <div className={`w-2/3 h-1.5 rounded-[2px] ${accent}`} />
          </div>
        </div>
      );

    // 4c2. Full-Page Floating with Image Background
    case 'full-background-image':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-slate-900 transition-colors relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-700 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-sky-400/30 via-transparent to-transparent" />
          <div className={`w-7/12 h-5/6 rounded-md border border-white/40 dark:border-white/20 bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center gap-1 p-1 z-10`}>
            <div className={`w-4 h-1.5 rounded-[2px] ${accent}`} />
            <div className={`w-full h-1 rounded-[2px] ${fill}`} />
            <div className={`w-2/3 h-1.5 rounded-[2px] ${accent}`} />
          </div>
        </div>
      );

    // 4d. Minimal Single-Field / Multi-Step
    case 'single-field':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-7/12 h-5/6 rounded-md border ${border} bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center justify-center gap-1 p-1`}>
            <div className="flex gap-1 items-center">
              <div className={`w-1.5 h-1.5 rounded-full ${accent}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${fill}`} />
            </div>
            <div className={`w-full h-2 rounded-[2px] ${fill} border ${border}`} />
            <div className={`w-full h-2 rounded-[2px] ${accent}`} />
          </div>
        </div>
      );

    // 4e. Modal or Slide-Over Overlay
    case 'modal-overlay':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-colors relative`}>
          <div className="absolute inset-1 grid grid-cols-3 gap-0.5 opacity-20 pointer-events-none">
            <div className="h-2 rounded-[2px] bg-slate-400" />
            <div className="h-2 rounded-[2px] bg-slate-400" />
            <div className="h-2 rounded-[2px] bg-slate-400" />
          </div>
          <div className={`w-7/12 h-5/6 rounded-md border ${border} bg-white dark:bg-slate-900 shadow-lg flex flex-col items-center justify-center gap-1 p-1 z-10`}>
            <div className="w-full flex justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
            </div>
            <div className={`w-4/5 h-1 rounded-[2px] ${fill}`} />
            <div className={`w-full h-1.5 rounded-[2px] ${accent}`} />
          </div>
        </div>
      );

    // 5. Hero Centered
    case 'hero-centered':
    case 'giant-hero':
    case 'centered-action':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex flex-col items-center justify-center gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/2 h-2.5 rounded-[2px] ${accent}`} />
          <div className={`w-4/5 h-1.5 rounded-[2px] ${fill}`} />
          <div className="flex gap-1 mt-0.5">
            <div className={`w-6 h-2 rounded-[2px] ${accent}`} />
            <div className={`w-6 h-2 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 6. 3-Column Cards / Board Columns
    case 'cards-3col':
    case 'board-columns':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`flex-1 rounded-[2px] ${fill} flex flex-col gap-0.5 p-0.5`}>
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-full h-3 rounded-[2px] ${fill}`} />
          </div>
          <div className={`flex-1 rounded-[2px] ${accent} flex flex-col gap-0.5 p-0.5`}>
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-full h-3 rounded-[2px] ${fill}`} />
          </div>
          <div className={`flex-1 rounded-[2px] ${fill} flex flex-col gap-0.5 p-0.5`}>
            <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
            <div className={`w-full h-3 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 7. Matrix Table / Data Rows
    case 'table-matrix':
    case 'compact-toggle':
    case 'timeline-list':
    case 'stacked-cards':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-2 rounded-[2px] ${accent}`} />
          <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
          <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
          <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
        </div>
      );

    // 8. Header Compact / Top Nav
    case 'header-compact':
    case 'tabbed':
    case 'compact-feed':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-2.5 rounded-[2px] ${accent}`} />
          <div className="flex-1 flex gap-1">
            <div className={`flex-1 rounded-[2px] ${fill}`} />
            <div className={`flex-1 rounded-[2px] ${fill}`} />
            <div className={`flex-1 rounded-[2px] ${fill}`} />
          </div>
        </div>
      );

    // 8b. Navbar Variations
    case 'navbar-saas':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-3 rounded-[2px] border ${border} px-1 flex items-center justify-between bg-white dark:bg-slate-900`}>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-[1px] ${accent}`} />
              <div className={`w-5 h-1 rounded-[1px] ${fill}`} />
            </div>
            <div className={`w-10 h-1.5 rounded-[1px] ${fill}`} />
            <div className={`w-2 h-2 rounded-full ${accent}`} />
          </div>
          <div className="flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40 p-1 flex flex-col gap-1">
            <div className={`w-1/3 h-1.5 rounded-[1px] ${fill}`} />
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    case 'navbar-center':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-3 rounded-[2px] border ${border} px-1 flex items-center justify-between bg-white dark:bg-slate-900`}>
            <div className={`w-3 h-1.5 rounded-[1px] ${accent}`} />
            <div className="flex items-center gap-1">
              <div className={`w-4 h-1 rounded-[1px] ${fill}`} />
              <div className={`w-4 h-1 rounded-[1px] ${fill}`} />
              <div className={`w-4 h-1 rounded-[1px] ${fill}`} />
            </div>
            <div className={`w-4 h-1.5 rounded-[1px] ${accent}`} />
          </div>
          <div className="flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40 p-1 flex flex-col items-center justify-center gap-1">
            <div className={`w-1/2 h-1.5 rounded-[1px] ${accent}`} />
            <div className={`w-2/3 h-1 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    case 'navbar-floating':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors relative`}>
          <div className={`mx-auto w-4/5 h-2.5 rounded-full border ${border} px-1.5 flex items-center justify-between bg-white/90 dark:bg-slate-900/90 shadow-sm z-10`}>
            <div className={`w-2 h-1.5 rounded-full ${accent}`} />
            <div className="flex items-center gap-1">
              <div className={`w-3 h-0.5 rounded-[1px] ${fill}`} />
              <div className={`w-3 h-0.5 rounded-[1px] ${fill}`} />
            </div>
            <div className={`w-3 h-1 rounded-full ${accent}`} />
          </div>
          <div className="flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40 p-1 flex flex-col justify-end">
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    case 'navbar-tabbed':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex flex-col gap-0.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-2.5 rounded-t-[2px] border-b ${border} px-1 flex items-center justify-between bg-white dark:bg-slate-900`}>
            <div className={`w-3 h-1 rounded-[1px] ${accent}`} />
            <div className={`w-2 h-1 rounded-full ${fill}`} />
          </div>
          <div className="w-full flex gap-1 px-1 py-0.5 border-b border-slate-200 dark:border-slate-800">
            <div className={`w-4 h-1 rounded-[1px] ${accent}`} />
            <div className={`w-4 h-1 rounded-[1px] ${fill}`} />
            <div className={`w-4 h-1 rounded-[1px] ${fill}`} />
          </div>
          <div className="flex-1 rounded-b-[2px] bg-slate-200/50 dark:bg-slate-800/40 p-1 flex flex-col gap-1">
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    case 'navbar-command':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex flex-col gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-full h-3 rounded-[2px] border ${border} px-1 flex items-center justify-between bg-white dark:bg-slate-900`}>
            <div className={`w-2.5 h-2 rounded-[1px] ${accent}`} />
            <div className={`w-14 h-1.5 rounded-[1px] border ${border} bg-slate-100 dark:bg-slate-800`} />
            <div className="flex gap-0.5">
              <div className={`w-2 h-2 rounded-[1px] ${fill}`} />
              <div className={`w-2 h-2 rounded-[1px] ${accent}`} />
            </div>
          </div>
          <div className="flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40 p-1 flex flex-col gap-1">
            <div className={`w-2/3 h-1.5 rounded-[1px] ${fill}`} />
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    // 8c. Sidebar Variations
    case 'sidebar-rail':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex gap-1 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-3.5 h-full rounded-[2px] border ${border} bg-white dark:bg-slate-900 flex flex-col items-center py-1 gap-1`}>
            <div className={`w-2 h-2 rounded-[1px] ${accent}`} />
            <div className={`w-2 h-1.5 rounded-[1px] ${fill}`} />
            <div className={`w-2 h-1.5 rounded-[1px] ${fill}`} />
            <div className={`w-2 h-1.5 rounded-[1px] ${fill}`} />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
            <div className={`w-full flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40`} />
          </div>
        </div>
      );

    case 'sidebar-dual':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1 flex gap-0.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-3 h-full rounded-[2px] bg-slate-300 dark:bg-slate-800 flex flex-col items-center py-1 gap-1`}>
            <div className={`w-1.5 h-1.5 rounded-[1px] ${accent}`} />
            <div className={`w-1.5 h-1 rounded-[1px] ${fill}`} />
          </div>
          <div className={`w-1/4 h-full rounded-[2px] border ${border} bg-white dark:bg-slate-900 p-0.5 flex flex-col gap-1`}>
            <div className={`w-full h-1 rounded-[1px] ${accent}`} />
            <div className={`w-3/4 h-1 rounded-[1px] ${fill}`} />
            <div className={`w-full h-1 rounded-[1px] ${fill}`} />
          </div>
          <div className="flex-1 flex flex-col gap-1 pl-0.5">
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
            <div className={`w-full flex-1 rounded-[2px] bg-slate-200/50 dark:bg-slate-800/40`} />
          </div>
        </div>
      );

    case 'sidebar-floating':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex gap-1.5 bg-slate-100 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/3 h-full rounded-md border ${border} bg-white dark:bg-slate-900 shadow-sm p-1 flex flex-col gap-1`}>
            <div className={`w-3 h-1.5 rounded-[1px] ${accent}`} />
            <div className={`w-full h-1 rounded-[1px] ${fill}`} />
            <div className={`w-4/5 h-1 rounded-[1px] ${fill}`} />
          </div>
          <div className={`flex-1 h-full rounded-md border ${border} bg-white dark:bg-slate-900 p-1 flex flex-col gap-1`}>
            <div className={`w-1/2 h-1.5 rounded-[1px] ${accent}`} />
            <div className={`w-full h-2 rounded-[1px] ${fill}`} />
          </div>
        </div>
      );

    // 9. Minimalist Clean / Terminal
    case 'minimal':
    case 'split-terminal':
    case 'minimal-bubble':
    case 'minimal-banner':
    default:
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex flex-col justify-center gap-1.5 bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className={`w-1/3 h-2 rounded-[2px] ${accent}`} />
          <div className={`w-full h-1.5 rounded-[2px] ${fill}`} />
          <div className={`w-2/3 h-1.5 rounded-[2px] ${fill}`} />
        </div>
      );
  }
};

/* ==========================================================================
   Layout Option Definition Interface
   ========================================================================== */

interface LayoutOption {
  id: string;
  title: string;
  description: string;
  variant: string;
}

export const LayoutSection: React.FC = () => {
  const { state, dispatch, activePreview, setActivePreview } = useDesign();

  const previewDef = getPreviewDefinition(activePreview);
  const currentIndex = getPreviewIndex(activePreview);
  const pageLayouts: Partial<PageLayouts> = state.pageLayouts ?? {};

  const handlePrev = () => {
    setActivePreview(getPrevPreview(activePreview));
  };

  const handleNext = () => {
    setActivePreview(getNextPreview(activePreview));
  };

  const getPreviewIcon = () => {
    switch (activePreview) {
      case 'auth': return <Lock className="w-3.5 h-3.5 text-amber-500" />;
      case 'error': return <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />;
      case 'dashboard': return <LayoutDashboard className="w-3.5 h-3.5 text-sky-500" />;
      case 'landing': return <Globe className="w-3.5 h-3.5 text-indigo-500" />;
      case 'pricing': return <CreditCard className="w-3.5 h-3.5 text-emerald-500" />;
      case 'kanban': return <Kanban className="w-3.5 h-3.5 text-purple-500" />;
      case 'chat': return <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />;
      case 'settings': return <Settings className="w-3.5 h-3.5 text-slate-500" />;
      case 'onboarding': return <Sparkles className="w-3.5 h-3.5 text-violet-500" />;
      case 'success': return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case 'empty-state': return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />;
      case 'navbar': return <PanelTop className="w-3.5 h-3.5 text-indigo-500" />;
      case 'sidebar': return <PanelLeft className="w-3.5 h-3.5 text-sky-500" />;
      default: return <Layers className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  // Determine layouts list for the current active preview screen
  const getLayoutsForCurrentPreview = (): {
    options: LayoutOption[];
    selectedId: string;
    onSelect: (id: string) => void;
  } => {
    switch (activePreview) {
      case 'auth':
        return {
          options: [
            {
              id: 'centered-card',
              title: 'Centered Card (Default)',
              description: 'Single centered card, mobile-first and collapses seamlessly',
              variant: 'centered-card',
            },
            {
              id: 'split',
              title: 'Split Showcase',
              description: 'Brand marketing showcase on one half, form on the other',
              variant: 'split',
            },
            {
              id: 'split-image',
              title: 'Split Screen 2 (Image)',
              description: 'Editorial workspace photograph with glass overlay and form',
              variant: 'split-image',
            },
            {
              id: 'social-first',
              title: 'Social-Login-First',
              description: 'Prominent Google/Apple/GitHub buttons on top with email divider',
              variant: 'social-first',
            },
            {
              id: 'full-background',
              title: 'Full-Page Floating',
              description: 'Vibrant full-bleed gradient mesh with floating frosted-glass card',
              variant: 'full-background',
            },
            {
              id: 'full-background-image',
              title: 'Full-Page Floating 2 (Image)',
              description: 'Full-bleed atmospheric photography with floating frosted-glass card',
              variant: 'full-background-image',
            },
            {
              id: 'single-field',
              title: 'Minimal Multi-Step',
              description: 'Progressive single-field flow (Google/Notion style) with steps',
              variant: 'single-field',
            },
            {
              id: 'modal-overlay',
              title: 'Modal Overlay',
              description: 'In-app dialog overlay with blurred backdrop and close button',
              variant: 'modal-overlay',
            },
          ],
          selectedId: pageLayouts.auth ?? 'centered-card',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { auth: id as PageLayouts['auth'] } }),
        };

      case 'dashboard':
        return {
          options: [
            { id: 'sidebar-grid', title: 'Sidebar + Content', description: 'Left sidebar navigation with stat cards and chart', variant: 'sidebar-grid' },
            { id: 'header-compact', title: 'Header Compact', description: 'Top navbar with horizontal metric strips', variant: 'header-compact' },
            { id: 'analytical', title: 'Analytical Matrix', description: 'Dense multi-metric KPI matrix and dual graphs', variant: 'analytical' },
            { id: 'feed-focus', title: 'Feed & Telemetry', description: 'Realtime event stream alongside system gauges', variant: 'sidebar-content' },
          ],
          selectedId: pageLayouts.dashboard ?? 'sidebar-grid',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { dashboard: id as PageLayouts['dashboard'] } }),
        };

      case 'landing':
        return {
          options: [
            { id: 'hero-split', title: 'Marketing Landing', description: 'Split hero with product mockup card and features', variant: 'hero-split' },
            { id: 'hero-centered', title: 'Hero Centered', description: 'Centered headline with trust badges and CTA', variant: 'hero-centered' },
            { id: 'feature-grid', title: 'Feature Grid', description: 'Problem/solution ecosystem cards with live tokens', variant: 'feature-grid' },
          ],
          selectedId: pageLayouts.landing ?? 'hero-split',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { landing: id as PageLayouts['landing'] } }),
        };

      case 'pricing':
        return {
          options: [
            { id: 'cards-3col', title: '3-Card Tier', description: 'Side-by-side tier cards with highlighted popular plan', variant: 'cards-3col' },
            { id: 'table-matrix', title: 'Matrix Table', description: 'Feature comparison grid table with checkmarks', variant: 'table-matrix' },
            { id: 'compact-toggle', title: 'Compact List', description: 'Toggleable horizontal plan tier rows', variant: 'compact-toggle' },
          ],
          selectedId: pageLayouts.pricing ?? 'cards-3col',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { pricing: id as PageLayouts['pricing'] } }),
        };

      case 'kanban':
        return {
          options: [
            { id: 'board-columns', title: 'Columns Board', description: 'Multi-stage sprint pipeline columns', variant: 'board-columns' },
            { id: 'timeline-list', title: 'Roadmap List', description: 'Milestone timeline with progress status bars', variant: 'timeline-list' },
            { id: 'compact-grid', title: 'Compact Grid', description: 'Dense task cards matrix with priority tags', variant: 'compact-grid' },
          ],
          selectedId: pageLayouts.kanban ?? 'board-columns',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { kanban: id as PageLayouts['kanban'] } }),
        };

      case 'chat':
        return {
          options: [
            { id: 'split-pane', title: 'Master Split', description: 'Left thread list alongside active conversation', variant: 'split-pane' },
            { id: 'compact-feed', title: 'Floating Feed', description: 'Single focused conversation thread with composer', variant: 'compact-feed' },
            { id: 'minimal-bubble', title: 'Minimal Bubbles', description: 'Streamlined conversational bubble stream', variant: 'minimal-bubble' },
          ],
          selectedId: pageLayouts.chat ?? 'split-pane',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { chat: id as PageLayouts['chat'] } }),
        };

      case 'settings':
        return {
          options: [
            { id: 'tabbed', title: 'Horizontal Tabs', description: 'Tabbed panel switcher for account categories', variant: 'tabbed' },
            { id: 'stacked-cards', title: 'Stacked Cards', description: 'Vertical section cards on a scrollable page', variant: 'stacked-cards' },
            { id: 'sidebar-nav', title: 'Sidebar Nav', description: 'Left sub-navigation links with right settings body', variant: 'sidebar-nav' },
          ],
          selectedId: pageLayouts.settings ?? 'tabbed',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { settings: id as PageLayouts['settings'] } }),
        };

      case 'error':
        return {
          options: [
            { id: 'giant-hero', title: 'Giant Hero', description: 'Bold status typography and illustration', variant: 'giant-hero' },
            { id: 'split-terminal', title: 'Split Debugger', description: 'Simulated CLI trace logs and endpoint diagnostics', variant: 'split-terminal' },
            { id: 'dialog-card', title: 'Dialog Card', description: 'In-app alert modal card with action buttons', variant: 'dialog-card' },
            { id: 'minimal', title: 'Minimal Clean', description: 'Editorial documentation link layout', variant: 'minimal' },
          ],
          selectedId: pageLayouts.error ?? 'giant-hero',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { error: id as PageLayouts['error'] } }),
        };

      case 'onboarding':
        return {
          options: [
            { id: 'wizard-stepper', title: 'Wizard Stepper', description: 'Horizontal multi-step progress stepper', variant: 'header-compact' },
            { id: 'card-stack', title: 'Card Stack', description: 'Interactive stacked setup cards with actions', variant: 'cards-3col' },
            { id: 'minimal-modal', title: 'Minimal Modal', description: 'Centered focused dialog with task list', variant: 'minimal-modal' },
          ],
          selectedId: pageLayouts.onboarding ?? 'wizard-stepper',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { onboarding: id as PageLayouts['onboarding'] } }),
        };

      case 'empty-state':
        return {
          options: [
            { id: 'centered-action', title: 'Centered Action', description: 'Illustration with primary creation button', variant: 'centered-action' },
            { id: 'illustration-card', title: 'Illustrated Card', description: 'Elevated template starter card', variant: 'dialog-card' },
            { id: 'checklist-guide', title: 'Guided Checklist', description: 'Interactive onboarding setup checklist', variant: 'stacked-cards' },
          ],
          selectedId: pageLayouts.emptyState ?? 'centered-action',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { emptyState: id as PageLayouts['emptyState'] } }),
        };

      case 'success':
        return {
          options: [
            { id: 'celebration-card', title: 'Celebration Card', description: 'Centered confirmation modal with receipt badge', variant: 'celebration-card' },
            { id: 'receipt-summary', title: 'Receipt Summary', description: 'Itemized transaction breakdown with next steps', variant: 'table-matrix' },
            { id: 'minimal-banner', title: 'Minimal Banner', description: 'Clean top-flush notification bar', variant: 'minimal-banner' },
          ],
          selectedId: pageLayouts.success ?? 'celebration-card',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { success: id as PageLayouts['success'] } }),
        };

      case 'detail':
        return {
          options: [
            { id: 'split-sidepanel', title: 'Split Sidepanel', description: 'Main entity summary with right metadata panel', variant: 'sidebar-content' },
            { id: 'full-document', title: 'Full Document', description: 'Single column longform editorial view', variant: 'minimal' },
            { id: 'tabbed-media', title: 'Tabbed Inspector', description: 'Tabbed inspector with specs and logs', variant: 'tabbed' },
          ],
          selectedId: pageLayouts.detail ?? 'split-sidepanel',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { detail: id as PageLayouts['detail'] } }),
        };

      case 'navbar':
        return {
          options: [
            { id: 'saas-header', title: 'Modern SaaS Header', description: 'Brand breadcrumb, command search, quick actions & user menu', variant: 'navbar-saas' },
            { id: 'minimal-center', title: 'Minimalist Clean', description: 'Centered navigation links, brand logo, and primary CTA', variant: 'navbar-center' },
            { id: 'floating-pill', title: 'Floating Island Pill', description: 'Detached pill navbar with glassmorphism backdrop blur', variant: 'navbar-floating' },
            { id: 'tabbed-nav', title: 'Tabbed Subnav Header', description: 'Two-tier header with global context and tabbed navigation', variant: 'navbar-tabbed' },
            { id: 'ecommerce-action', title: 'Command & Actions Bar', description: 'Dense operational toolbar with search, metrics & quick tools', variant: 'navbar-command' },
          ],
          selectedId: pageLayouts.navbar ?? 'saas-header',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { navbar: id as PageLayouts['navbar'] } }),
        };

      case 'sidebar':
        return {
          options: [
            { id: 'classic-grouped', title: 'Classic Grouped', description: 'Categorized menu links with badges, user card & quick search', variant: 'sidebar-content' },
            { id: 'compact-rail', title: 'Compact Icon Rail', description: 'Space-saving slim icon rail with tooltips and flyout targets', variant: 'sidebar-rail' },
            { id: 'dual-pane', title: 'Dual-Pane Master Nav', description: 'Workspace switcher rail paired with contextual sub-menu', variant: 'sidebar-dual' },
            { id: 'floating-card', title: 'Floating Detached Card', description: 'Elevated floating card sidebar detached from screen edges', variant: 'sidebar-floating' },
            { id: 'workspace-shell', title: 'Enterprise App Shell', description: 'Full-bleed sidebar with org switcher, breadcrumb and footer', variant: 'sidebar-nav' },
          ],
          selectedId: pageLayouts.sidebar ?? 'classic-grouped',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { sidebar: id as PageLayouts['sidebar'] } }),
        };

      // Default: Component Primitives & System Wireframe (sets state.layout)
      default:
        return {
          options: registries.layouts.map((l) => ({
            id: l.id,
            title: l.label,
            description: l.description,
            variant: l.id,
          })),
          selectedId: state.layout,
          onSelect: (id) => dispatch({ type: 'SET_LAYOUT', id }),
        };
    }
  };

  const { options, selectedId, onSelect } = getLayoutsForCurrentPreview();

  return (
    <div className="space-y-3">
      {/* Top Navigation Header: Screen Name + Prev / Next Controls */}
      <div className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
            {getPreviewIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {previewDef.shortLabel}
              </span>
              <span className="text-[10px] px-1.5 py-[1px] rounded bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold border border-sky-200 dark:border-sky-800">
                {previewDef.category}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Prev / Next Screen Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus-ring cursor-pointer"
            title="Previous preview (Shift+[)"
            aria-label="Previous preview"
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
            title="Next preview (Shift+])"
            aria-label="Next preview"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of Layout Cards matching screenshot style */}
      <div className="grid grid-cols-2 gap-2.5">
        {options.map((layout) => {
          const isSelected = selectedId === layout.id;

          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => onSelect(layout.id)}
              className={`p-3 rounded-xl border text-left transition-all min-h-[114px] flex flex-col justify-between focus-ring group cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
              }`}
            >
              {/* Mini visual wireframe thumbnail */}
              <WireframeThumbnail variant={layout.variant} isSelected={isSelected} />

              <div className="mt-2.5">
                <div
                  className={`text-xs font-bold leading-tight ${
                    isSelected
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
                  }`}
                >
                  {layout.title}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                  {layout.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional contextual sub-controls for Auth and Error screens */}
      {activePreview === 'auth' && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Social Sign-On (SSO)</span>
          <button
            type="button"
            role="switch"
            aria-checked={pageLayouts.authSocialButtons !== false}
            onClick={() =>
              dispatch({
                type: 'SET_PAGE_LAYOUT',
                updates: { authSocialButtons: !pageLayouts.authSocialButtons },
              })
            }
            className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer p-0.5 border ${
              pageLayouts.authSocialButtons !== false
                ? 'bg-sky-500 border-sky-600'
                : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                pageLayouts.authSocialButtons !== false ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      )}

      {activePreview === 'error' && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1 text-xs">
          <span className="text-slate-600 dark:text-slate-400">HTTP Status:</span>
          <div className="flex gap-1">
            {(['404', '403', '500'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { errorCode: code } })}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  (pageLayouts.errorCode ?? '404') === code
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
