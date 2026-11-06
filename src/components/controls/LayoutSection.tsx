import React, { useMemo } from 'react';
import { useDesign } from '../../context/DesignContext';
import { registries } from '../../lib/registry';
import type { PageLayouts } from '../../config/schema';
import { getLayoutsForPage } from '../../config/layoutCatalog';
import {
  PREVIEW_REGISTRY,
  type PreviewDefinition,
  getPreviewDefinition,
  getPreviewIndex,
  getNextPreview,
  getPrevPreview,
} from '../../config/previews';
import { getPurposeDefinition } from '../../config/purposes';
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

    // Component Primitives Showcase (Default)
    case 'default':
      return (
        <div className={`w-full h-14 rounded-lg border ${border} p-1.5 flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors`}>
          <div className="flex items-center gap-1.5">
            <div className={`w-3.5 h-2 rounded-[2px] ${accent}`} />
            <div className={`w-1/3 h-1.5 rounded-[2px] ${fill}`} />
          </div>
          <div className="flex gap-1.5">
            <div className={`flex-1 h-4 rounded-[2px] ${fill}`} />
            <div className={`flex-1 h-4 rounded-[2px] ${fill}`} />
          </div>
          <div className={`w-1/2 h-1.5 rounded-[2px] ${accent}`} />
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

  const currentPurposeDef = state.project?.purpose ? getPurposeDefinition(state.project.purpose) : null;
  const scopedPreviews = useMemo(() => {
    if (!currentPurposeDef) return PREVIEW_REGISTRY;
    const projectPages = state.project?.pages ?? [];
    if (projectPages.length > 0) {
      return projectPages
        .filter((p) => p.enabled)
        .map((p) => PREVIEW_REGISTRY.find((pr) => pr.id === p.pageType))
        .filter((p): p is PreviewDefinition => Boolean(p));
    }
    return currentPurposeDef.pages
      .map((p) => PREVIEW_REGISTRY.find((pr) => pr.id === p.pageType))
      .filter((p): p is PreviewDefinition => Boolean(p));
  }, [currentPurposeDef, state.project?.pages]);

  const previewDef = getPreviewDefinition(activePreview);
  const currentIndex = getPreviewIndex(activePreview, scopedPreviews);
  const pageLayouts: Partial<PageLayouts> = state.pageLayouts ?? {};

  const handlePrev = () => {
    setActivePreview(getPrevPreview(activePreview, scopedPreviews));
  };

  const handleNext = () => {
    setActivePreview(getNextPreview(activePreview, scopedPreviews));
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
      case 'portfolio': return <Globe className="w-3.5 h-3.5 text-sky-500" />;
      case 'portfolio-project': return <Sparkles className="w-3.5 h-3.5 text-cyan-500" />;
      case 'portfolio-dashboard': return <LayoutDashboard className="w-3.5 h-3.5 text-violet-500" />;
      case 'onboarding': return <Sparkles className="w-3.5 h-3.5 text-violet-500" />;
      case 'success': return <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />;
      case 'empty-state': return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />;
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
          options: getLayoutsForPage('auth'),
          selectedId: pageLayouts.auth ?? 'centered-card',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { auth: id as PageLayouts['auth'] } }),
        };

      case 'dashboard':
        return {
          options: getLayoutsForPage('dashboard'),
          selectedId: pageLayouts.dashboard ?? 'sidebar-grid',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { dashboard: id as PageLayouts['dashboard'] } }),
        };

      case 'landing':
        return {
          options: getLayoutsForPage('landing'),
          selectedId: pageLayouts.landing ?? 'hero-split',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { landing: id as PageLayouts['landing'] } }),
        };

      case 'pricing':
        return {
          options: getLayoutsForPage('pricing'),
          selectedId: pageLayouts.pricing ?? 'cards-3col',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { pricing: id as PageLayouts['pricing'] } }),
        };

      case 'kanban':
        return {
          options: getLayoutsForPage('kanban'),
          selectedId: pageLayouts.kanban ?? 'board-columns',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { kanban: id as PageLayouts['kanban'] } }),
        };

      case 'chat':
        return {
          options: getLayoutsForPage('chat'),
          selectedId: pageLayouts.chat ?? 'split-pane',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { chat: id as PageLayouts['chat'] } }),
        };

      case 'settings':
        return {
          options: getLayoutsForPage('settings'),
          selectedId: pageLayouts.settings ?? 'tabbed',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { settings: id as PageLayouts['settings'] } }),
        };

      case 'error':
        return {
          options: getLayoutsForPage('error'),
          selectedId: pageLayouts.error ?? 'giant-hero',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { error: id as PageLayouts['error'] } }),
        };

      case 'onboarding':
        return {
          options: getLayoutsForPage('onboarding'),
          selectedId: pageLayouts.onboarding ?? 'wizard-stepper',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { onboarding: id as PageLayouts['onboarding'] } }),
        };

      case 'empty-state':
        return {
          options: getLayoutsForPage('emptyState'),
          selectedId: pageLayouts.emptyState ?? 'centered-action',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { emptyState: id as PageLayouts['emptyState'] } }),
        };

      case 'success':
        return {
          options: getLayoutsForPage('success'),
          selectedId: pageLayouts.success ?? 'celebration-card',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { success: id as PageLayouts['success'] } }),
        };

      case 'detail':
        return {
          options: getLayoutsForPage('detail'),
          selectedId: pageLayouts.detail ?? 'split-sidepanel',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { detail: id as PageLayouts['detail'] } }),
        };

      case 'ecommerce-catalog':
        return {
          options: getLayoutsForPage('ecommerce-catalog'),
          selectedId: pageLayouts.ecommerceCatalog ?? 'faceted-sidebar',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { ecommerceCatalog: id as PageLayouts['ecommerceCatalog'] } }),
        };

      case 'product-detail':
        return {
          options: getLayoutsForPage('product-detail'),
          selectedId: pageLayouts.productDetail ?? 'split-sticky-buy',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { productDetail: id as PageLayouts['productDetail'] } }),
        };

      case 'checkout':
        return {
          options: getLayoutsForPage('checkout'),
          selectedId: pageLayouts.checkout ?? 'slide-over-cart',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { checkout: id as PageLayouts['checkout'] } }),
        };

      case 'marketplace':
        return {
          options: getLayoutsForPage('marketplace'),
          selectedId: pageLayouts.marketplace ?? 'split-map-list',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { marketplace: id as PageLayouts['marketplace'] } }),
        };

      case 'booking':
        return {
          options: getLayoutsForPage('booking'),
          selectedId: pageLayouts.booking ?? 'split-calendar-slots',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { booking: id as PageLayouts['booking'] } }),
        };

      case 'editorial':
        return {
          options: getLayoutsForPage('editorial'),
          selectedId: pageLayouts.editorial ?? 'masonry-frontpage',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { editorial: id as PageLayouts['editorial'] } }),
        };

      case 'charity':
        return {
          options: getLayoutsForPage('charity'),
          selectedId: pageLayouts.charity ?? 'hero-impact-thermometer',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { charity: id as PageLayouts['charity'] } }),
        };

      case 'forum':
        return {
          options: getLayoutsForPage('forum'),
          selectedId: pageLayouts.forum ?? 'three-column-reddit',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { forum: id as PageLayouts['forum'] } }),
        };

      case 'streaming':
        return {
          options: getLayoutsForPage('streaming'),
          selectedId: pageLayouts.streaming ?? 'cinema-theater',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { streaming: id as PageLayouts['streaming'] } }),
        };

      case 'portfolio':
        return {
          options: getLayoutsForPage('portfolio'),
          selectedId: pageLayouts.portfolio ?? 'bento-developer',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { portfolio: id as PageLayouts['portfolio'] } }),
        };

      case 'portfolio-project':
        return {
          options: getLayoutsForPage('portfolio-project'),
          selectedId: pageLayouts.portfolioProject ?? 'case-study-narrative',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { portfolioProject: id as PageLayouts['portfolioProject'] } }),
        };

      case 'portfolio-dashboard':
        return {
          options: getLayoutsForPage('portfolio-dashboard'),
          selectedId: pageLayouts.portfolioDashboard ?? 'analytics-cms-split',
          onSelect: (id) => dispatch({ type: 'SET_PAGE_LAYOUT', updates: { portfolioDashboard: id as PageLayouts['portfolioDashboard'] } }),
        };

      // Single-Layout Views: Always keep a single layout named 'Default'
      case 'blog':
      case 'contact':
      case 'billing':
      case 'team':
        return {
          options: [
            {
              id: 'default',
              title: 'Default',
              description: 'Standard responsive showcase layout for this view',
              variant: 'default',
            },
          ],
          selectedId: 'default',
          onSelect: () => {},
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

  // Check if current preview page features a navbar or sidebar
  const hasNavbar = useMemo(() => {
    if (activePreview === 'dashboard') {
      return (pageLayouts.dashboard ?? 'sidebar-grid') === 'header-compact';
    }
    if (activePreview === 'portfolio-dashboard') {
      return (pageLayouts.portfolioDashboard ?? 'analytics-cms-split') === 'compact-overview';
    }
    return [
      'landing',
      'pricing',
      'ecommerce-catalog',
      'product-detail',
      'checkout',
      'marketplace',
      'booking',
      'editorial',
      'portfolio',
      'portfolio-project',
      'charity',
      'forum',
      'streaming',
    ].includes(activePreview);
  }, [activePreview, pageLayouts.dashboard, pageLayouts.portfolioDashboard]);

  const hasSidebar = useMemo(() => {
    if (activePreview === 'dashboard') {
      return (pageLayouts.dashboard ?? 'sidebar-grid') === 'sidebar-grid';
    }
    if (activePreview === 'portfolio-dashboard') {
      return (pageLayouts.portfolioDashboard ?? 'analytics-cms-split') === 'analytics-cms-split';
    }
    return false;
  }, [activePreview, pageLayouts.dashboard, pageLayouts.portfolioDashboard]);

  const navbarOptions = useMemo(() => getLayoutsForPage('navbar'), []);
  const sidebarOptions = useMemo(() => getLayoutsForPage('sidebar'), []);

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
            {currentIndex >= 0 ? currentIndex + 1 : 1}/{scopedPreviews.length}
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

      {/* 1. Page Layout Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Page Layout
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {options.length} {options.length === 1 ? 'variant' : 'variants'}
          </span>
        </div>

        {/* Grid of Layout Cards */}
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
      </div>

      {/* Contextual sub-controls for Auth and Error screens */}
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

      {/* 2. Separate Navbar Layout Section (if this page features a navbar) */}
      {hasNavbar && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <PanelTop className="w-3.5 h-3.5 text-sky-500" />
              <span>Navbar Layout</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Header Shell</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {navbarOptions.map((layout) => {
              const isSelected = (pageLayouts.navbar ?? 'saas-header') === layout.id;

              return (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_PAGE_LAYOUT',
                      updates: { navbar: layout.id as PageLayouts['navbar'] },
                    })
                  }
                  className={`p-3 rounded-xl border text-left transition-all min-h-[114px] flex flex-col justify-between focus-ring group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
                  }`}
                >
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
        </div>
      )}

      {/* 3. Separate Sidebar Layout Section (if this page features a sidebar) */}
      {hasSidebar && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <PanelLeft className="w-3.5 h-3.5 text-sky-500" />
              <span>Sidebar Layout</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Sidebar Shell</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {sidebarOptions.map((layout) => {
              const isSelected = (pageLayouts.sidebar ?? 'classic-grouped') === layout.id;

              return (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'SET_PAGE_LAYOUT',
                      updates: { sidebar: layout.id as PageLayouts['sidebar'] },
                    })
                  }
                  className={`p-3 rounded-xl border text-left transition-all min-h-[114px] flex flex-col justify-between focus-ring group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70 dark:bg-sky-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/80 dark:hover:bg-slate-900'
                  }`}
                >
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
        </div>
      )}
    </div>
  );
};
