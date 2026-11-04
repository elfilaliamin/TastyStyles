import type { PreviewComponentType } from '../types';
import type { ProjectGoal, PageLayouts } from '../config/schema';

export interface PreviewDefinition {
  id: PreviewComponentType;
  label: string;
  shortLabel: string;
  category: 'Primitives' | 'Public' | 'Commerce' | 'Community' | 'Auth' | 'Core' | 'Account' | 'System';
  description: string;
  hasCustomLayouts: boolean;
}

export const PREVIEW_REGISTRY: PreviewDefinition[] = [
  // Component Primitives
  { id: 'buttons', label: 'Buttons & Actions', shortLabel: 'Buttons', category: 'Primitives', description: 'Primary, secondary, outline, ghost and icon buttons', hasCustomLayouts: false },
  { id: 'forms', label: 'Form Controls & Inputs', shortLabel: 'Forms', category: 'Primitives', description: 'Text inputs, selects, toggles, checkboxes and validation states', hasCustomLayouts: false },
  { id: 'cards', label: 'Cards & Surfaces Showcase', shortLabel: 'Cards', category: 'Primitives', description: 'Card elevations, borders, glass surfaces, and badges', hasCustomLayouts: false },
  { id: 'feedback', label: 'Feedback & Status Chips', shortLabel: 'Feedback', category: 'Primitives', description: 'Status indicators, chips, pills, and inline badges', hasCustomLayouts: false },
  { id: 'popups', label: 'Notifications, Alerts & Confirmation Popups', shortLabel: 'Popups & Alerts', category: 'Primitives', description: 'Toast notifications, banner alerts, and confirmation dialog popups', hasCustomLayouts: false },
  { id: 'table', label: 'Data Tables & Lists', shortLabel: 'Tables', category: 'Primitives', description: 'Tabular data display, search filters, and pagination', hasCustomLayouts: false },
  { id: 'navbar', label: 'Navbar & Navigation Header', shortLabel: 'Navbar', category: 'Primitives', description: 'Application headers, top navigation bars, actions and breadcrumbs', hasCustomLayouts: true },
  { id: 'sidebar', label: 'Sidebar Navigation & Rails', shortLabel: 'Sidebar', category: 'Primitives', description: 'Left sidebar navigation, icon rails, dual pane and tree menus', hasCustomLayouts: true },

  // Commerce & Transactional (New Domain Suite)
  { id: 'ecommerce-catalog', label: 'Product Catalog & Faceted Grid', shortLabel: 'Catalog', category: 'Commerce', description: 'Faceted filter tree, responsive product grid, and quick add actions', hasCustomLayouts: true },
  { id: 'product-detail', label: 'Product Detail Page (PDP)', shortLabel: 'Product Detail', category: 'Commerce', description: 'Multi-image gallery, interactive variant matrix, and sticky buy box', hasCustomLayouts: true },
  { id: 'checkout', label: 'Cart Drawer & Multi-Step Checkout', shortLabel: 'Checkout', category: 'Commerce', description: 'Slide-over cart sheet, promo code validation, and order summary', hasCustomLayouts: true },
  { id: 'marketplace', label: 'Two-Sided Marketplace', shortLabel: 'Marketplace', category: 'Commerce', description: 'Split-map search, host verified profile, and escrow booking card', hasCustomLayouts: true },
  { id: 'booking', label: 'Booking & Scheduling Engine', shortLabel: 'Booking', category: 'Commerce', description: 'Time-slot availability grid, staff roster, and calendar sync', hasCustomLayouts: true },

  // Public & Content
  { id: 'landing', label: 'Landing / Homepage', shortLabel: 'Landing', category: 'Public', description: 'Hero section, feature matrix, customer testimonial, and CTA', hasCustomLayouts: true },
  { id: 'pricing', label: 'Pricing & Plans', shortLabel: 'Pricing', category: 'Public', description: 'Plan tier cards, feature comparison table, and billing toggle', hasCustomLayouts: true },
  { id: 'editorial', label: 'Media, News & Editorial', shortLabel: 'Editorial', category: 'Public', description: 'Lead story masonry, longform reader with sticky TOC, and paywall', hasCustomLayouts: true },
  { id: 'portfolio', label: 'Portfolio & Creative Brand', shortLabel: 'Portfolio', category: 'Public', description: 'High-impact statement hero, verified case study cards, and timeline', hasCustomLayouts: true },
  { id: 'blog', label: 'Blog / Long Article', shortLabel: 'Blog', category: 'Public', description: 'Editorial typography, reading time, callouts, and author card', hasCustomLayouts: false },
  { id: 'contact', label: 'Contact & Validation Form', shortLabel: 'Contact', category: 'Public', description: 'Input fields, validation states, office cards, and FAQ accordion', hasCustomLayouts: false },

  // Community & Social (New Suite)
  { id: 'forum', label: 'Community Forum & Q&A', shortLabel: 'Forum Q&A', category: 'Community', description: 'Channel rail, question cards with upvotes, and accepted solutions', hasCustomLayouts: true },
  { id: 'streaming', label: 'Entertainment & Live Stream', shortLabel: 'Streaming', category: 'Community', description: 'Cinema video canvas, timeline scrubbers, and live superchat stream', hasCustomLayouts: true },
  { id: 'charity', label: 'Non-Profit & NGO Fundraising', shortLabel: 'Charity', category: 'Community', description: 'Cause hero, live goal thermometer, donation chips, and donor wall', hasCustomLayouts: true },

  // Auth & Onboarding
  { id: 'auth', label: 'Auth (Login / Signup / Reset)', shortLabel: 'Auth & Login', category: 'Auth', description: 'Interactive multi-layout authentication interface', hasCustomLayouts: true },
  { id: 'onboarding', label: 'Onboarding Wizard (3 Steps)', shortLabel: 'Onboarding', category: 'Auth', description: 'Multi-step guided setup workflow with progress indicators', hasCustomLayouts: true },

  // Core Application
  { id: 'dashboard', label: 'Dashboard & Telemetry', shortLabel: 'Dashboard', category: 'Core', description: 'KPI cards, visual charts, telemetry meters, and activity logs', hasCustomLayouts: true },
  { id: 'detail', label: 'Item Detail & Diagnostics', shortLabel: 'Item Detail', category: 'Core', description: 'Single entity deep view with tabs, side info, and actions', hasCustomLayouts: true },
  { id: 'kanban', label: 'Kanban & Sprint Board', shortLabel: 'Kanban Board', category: 'Core', description: 'Multi-stage task workflow board with priority tags', hasCustomLayouts: true },
  { id: 'chat', label: 'Chat & Autonomous Inbox', shortLabel: 'Chat & Inbox', category: 'Core', description: 'Split-view conversation threads and message composer', hasCustomLayouts: true },

  // Account & Workspace
  { id: 'settings', label: 'Settings & Preferences', shortLabel: 'Settings', category: 'Account', description: 'User profile, appearance, notifications, and security tabs', hasCustomLayouts: true },
  { id: 'billing', label: 'Billing & Invoices', shortLabel: 'Billing', category: 'Account', description: 'Payment method, invoice history, and subscription details', hasCustomLayouts: false },
  { id: 'team', label: 'Team & Access Control', shortLabel: 'Team Members', category: 'Account', description: 'Role assignments, invites, member table, and permissions', hasCustomLayouts: false },

  // System States
  { id: 'error', label: 'System Error & Status (404/500/403)', shortLabel: 'Error & Status', category: 'System', description: 'Polymorphic HTTP error states with selectable layouts', hasCustomLayouts: true },
  { id: 'empty-state', label: 'Empty State (No Data)', shortLabel: 'Empty State', category: 'System', description: 'Zero-data screens with illustrations and quick-start actions', hasCustomLayouts: true },
  { id: 'success', label: 'Success & Confirmation', shortLabel: 'Success Confirm', category: 'System', description: 'Transaction confirmation, order summaries, and next steps', hasCustomLayouts: true },
];

export interface GoalDefinition {
  id: ProjectGoal;
  label: string;
  emoji: string;
  tagline: string;
  recommendedPreviews: PreviewComponentType[];
  defaultNavbar: PageLayouts['navbar'];
  defaultSidebar: PageLayouts['sidebar'];
}

export const GOAL_DEFINITIONS: Record<ProjectGoal, GoalDefinition> = {
  saas: {
    id: 'saas',
    label: 'B2B SaaS Platform',
    emoji: '🏢',
    tagline: 'Multi-tenant analytics, permissions & subscription operations',
    recommendedPreviews: ['dashboard', 'kanban', 'chat', 'settings', 'billing', 'team'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'classic-grouped',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    emoji: '🛒',
    tagline: 'Faceted product catalog, SKU detail & frictionless checkout',
    recommendedPreviews: ['ecommerce-catalog', 'product-detail', 'checkout', 'navbar'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'compact-rail',
  },
  marketplace: {
    id: 'marketplace',
    label: 'Two-Sided Marketplace',
    emoji: '🤝',
    tagline: 'Dual-persona supplier & guest booking with escrow deposits',
    recommendedPreviews: ['marketplace', 'product-detail', 'checkout', 'booking', 'chat'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'workspace-shell',
  },
  booking: {
    id: 'booking',
    label: 'Booking & Scheduling',
    emoji: '📅',
    tagline: 'Time-slot availability, staff provider rosters & calendar sync',
    recommendedPreviews: ['booking', 'checkout', 'detail', 'contact'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'dual-pane',
  },
  editorial: {
    id: 'editorial',
    label: 'Media, News & Editorial',
    emoji: '📰',
    tagline: 'Content publishing, longform reader, TOC & paywall meters',
    recommendedPreviews: ['editorial', 'blog', 'pricing', 'navbar'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
  charity: {
    id: 'charity',
    label: 'Non-Profit & Charity',
    emoji: '🎗️',
    tagline: 'Campaign cause heroes, donation tier sliders & donor impact walls',
    recommendedPreviews: ['charity', 'checkout', 'landing', 'contact'],
    defaultNavbar: 'floating-pill',
    defaultSidebar: 'classic-grouped',
  },
  forum: {
    id: 'forum',
    label: 'Community Forum & Q&A',
    emoji: '💬',
    tagline: 'Thread channels, upvoting, accepted solutions & user karma',
    recommendedPreviews: ['forum', 'chat', 'auth', 'settings'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'compact-rail',
  },
  streaming: {
    id: 'streaming',
    label: 'Entertainment & Streaming',
    emoji: '🎬',
    tagline: 'Cinema video player, live chat superchats & playlist queues',
    recommendedPreviews: ['streaming', 'chat', 'pricing', 'auth'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'compact-rail',
  },
  lms: {
    id: 'lms',
    label: 'E-Learning & LMS',
    emoji: '🎓',
    tagline: 'Course video classroom, curriculum trees & completion quizzes',
    recommendedPreviews: ['detail', 'dashboard', 'pricing', 'onboarding'],
    defaultNavbar: 'tabbed-nav',
    defaultSidebar: 'dual-pane',
  },
  devtools: {
    id: 'devtools',
    label: 'DevTools & API Platform',
    emoji: '⚡',
    tagline: 'API key vaults, telemetry logs & developer docs',
    recommendedPreviews: ['dashboard', 'detail', 'settings', 'table'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'workspace-shell',
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio & Personal Brand',
    emoji: '🎨',
    tagline: 'Visual case study showcase, verified metrics & booking CTA',
    recommendedPreviews: ['portfolio', 'contact', 'navbar'],
    defaultNavbar: 'floating-pill',
    defaultSidebar: 'classic-grouped',
  },
  agency: {
    id: 'agency',
    label: 'Agency & Marketing',
    emoji: '🌐',
    tagline: 'High-conversion acquisition hero, client proof & pricing',
    recommendedPreviews: ['landing', 'pricing', 'contact', 'portfolio'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
};

export function getPreviewsForGoal(goal?: ProjectGoal): PreviewDefinition[] {
  if (!goal || !GOAL_DEFINITIONS[goal]) return PREVIEW_REGISTRY;
  const recommendedIds = GOAL_DEFINITIONS[goal].recommendedPreviews;
  const filtered = recommendedIds
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  return filtered.length > 0 ? filtered : PREVIEW_REGISTRY;
}

export function getPreviewIndex(
  id: PreviewComponentType,
  scopedList?: PreviewDefinition[]
): number {
  const list = scopedList && scopedList.length > 0 ? scopedList : PREVIEW_REGISTRY;
  return list.findIndex((p) => p.id === id);
}

export function getNextPreview(
  id: PreviewComponentType,
  scopedList?: PreviewDefinition[]
): PreviewComponentType {
  const list = scopedList && scopedList.length > 0 ? scopedList : PREVIEW_REGISTRY;
  const index = list.findIndex((p) => p.id === id);
  if (index === -1 || index >= list.length - 1) {
    return list[0].id;
  }
  return list[index + 1].id;
}

export function getPrevPreview(
  id: PreviewComponentType,
  scopedList?: PreviewDefinition[]
): PreviewComponentType {
  const list = scopedList && scopedList.length > 0 ? scopedList : PREVIEW_REGISTRY;
  const index = list.findIndex((p) => p.id === id);
  if (index <= 0) {
    return list[list.length - 1].id;
  }
  return list[index - 1].id;
}

export function getPreviewDefinition(id: PreviewComponentType): PreviewDefinition {
  return PREVIEW_REGISTRY.find((p) => p.id === id) ?? PREVIEW_REGISTRY[0];
}
