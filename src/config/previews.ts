import type { ProjectGoal, PageLayouts } from '../config/schema';
import type { PreviewComponentType } from '../types';

export interface PreviewDefinition {
  id: PreviewComponentType;
  label: string;
  shortLabel: string;
  category: 'Primitives' | 'Public' | 'Commerce' | 'Community' | 'Auth' | 'Core' | 'Account' | 'System';
  description: string;
  hasCustomLayouts: boolean;
}

export const PREVIEW_REGISTRY: PreviewDefinition[] = [
  // 1. Component Primitives
  { id: 'buttons', label: 'Buttons & Action Controls', shortLabel: 'Buttons', category: 'Primitives', description: 'Interactive button states, sizes, icons, and variants', hasCustomLayouts: false },
  { id: 'forms', label: 'Form Controls & Inputs', shortLabel: 'Forms', category: 'Primitives', description: 'Inputs, selects, checkboxes, toggles, and form groups', hasCustomLayouts: false },
  { id: 'cards', label: 'Cards & Surfaces', shortLabel: 'Cards', category: 'Primitives', description: 'Surface containers, elevation, borders, and interactive card patterns', hasCustomLayouts: false },
  { id: 'feedback', label: 'Feedback & Status Indicators', shortLabel: 'Feedback', category: 'Primitives', description: 'Alert banners, badges, chips, progress indicators, and status tags', hasCustomLayouts: false },
  { id: 'popups', label: 'Popups, Modals & Overlays', shortLabel: 'Overlays', category: 'Primitives', description: 'Dialogs, slide-overs, confirmation sheets, and toasts', hasCustomLayouts: false },
  { id: 'table', label: 'Data Tables & Lists', shortLabel: 'Tables', category: 'Primitives', description: 'High-density data tables with sorting, selection, and responsive scrolling', hasCustomLayouts: false },
  { id: 'navbar', label: 'Navbar & Navigation Header', shortLabel: 'Navbar', category: 'Primitives', description: 'Application header bar with search, brand mark, navigation links, and actions', hasCustomLayouts: true },
  { id: 'sidebar', label: 'Sidebar Navigation & Rails', shortLabel: 'Sidebar', category: 'Primitives', description: 'Vertical navigation sidebars, icon rails, dual-pane shells, and floating cards', hasCustomLayouts: true },

  // 2. Commerce & Domain Archetypes
  { id: 'ecommerce-catalog', label: 'E-Commerce Product Catalog', shortLabel: 'Catalog', category: 'Commerce', description: 'Faceted sidebar search, top filter chips, and bento product editorial showcase', hasCustomLayouts: true },
  { id: 'product-detail', label: 'Product Detail & SKU Showcase', shortLabel: 'Product Detail', category: 'Commerce', description: 'Split sticky buy box, vertical scroll brand narrative, and two-column tabs specs', hasCustomLayouts: true },
  { id: 'checkout', label: 'Cart Drawer & Multi-Step Checkout', shortLabel: 'Checkout', category: 'Commerce', description: 'Slide-over slide drawer, one-page accordion checkout, and split order rail', hasCustomLayouts: true },
  { id: 'marketplace', label: 'Two-Sided Marketplace Directory', shortLabel: 'Marketplace', category: 'Commerce', description: '50/50 split map view, category hero cards, and supplier directory matrix', hasCustomLayouts: true },
  { id: 'booking', label: 'Booking & Scheduling Engine', shortLabel: 'Booking', category: 'Commerce', description: 'Split calendar time-slots, stepped service wizard, and horizontal timeline roster', hasCustomLayouts: true },

  // 3. Content & Community Archetypes
  { id: 'editorial', label: 'Media, News & Editorial', shortLabel: 'Editorial', category: 'Community', description: 'Masonry frontpage, focused prose with sticky TOC rail, and paywall meter overlay', hasCustomLayouts: true },
  { id: 'portfolio', label: 'Portfolio & Creative Studio', shortLabel: 'Portfolio', category: 'Community', description: 'Case study hero metrics, minimalist editorial timeline, and interactive grid gallery', hasCustomLayouts: true },
  { id: 'charity', label: 'Non-Profit & Campaign Fundraising', shortLabel: 'Charity', category: 'Community', description: 'Goal thermometer hero, split cause impact calculator, and transparent donor wall', hasCustomLayouts: true },
  { id: 'forum', label: 'Community Forum & Q&A', shortLabel: 'Forum', category: 'Community', description: 'Three-column Reddit feed, Q&A solved code inspector, and compact thread table', hasCustomLayouts: true },
  { id: 'streaming', label: 'Entertainment & Live Streaming', shortLabel: 'Streaming', category: 'Community', description: 'Cinema theater video canvas, live stream with docked chat, and hi-res audio queue', hasCustomLayouts: true },

  // 4. Public Pages
  { id: 'landing', label: 'Marketing Landing Page', shortLabel: 'Landing Page', category: 'Public', description: 'High-conversion SaaS hero, feature grids, social proof, and value proposition cards', hasCustomLayouts: true },
  { id: 'pricing', label: 'Pricing & Subscription Tiers', shortLabel: 'Pricing', category: 'Public', description: 'Three-column tier comparison, matrix feature comparison, and compact view', hasCustomLayouts: true },
  { id: 'blog', label: 'Blog Article & Editorial', shortLabel: 'Article', category: 'Public', description: 'Longform typography, author bylines, pull quotes, and related posts', hasCustomLayouts: false },
  { id: 'contact', label: 'Contact & Sales Inquiry', shortLabel: 'Contact', category: 'Public', description: 'Multi-field conversion form with office details and live support banner', hasCustomLayouts: false },

  // 5. Auth & Onboarding
  { id: 'auth', label: 'Authentication & Sign In', shortLabel: 'Auth & Login', category: 'Auth', description: 'Centered card, split screen, and minimal login with social authentication', hasCustomLayouts: true },
  { id: 'onboarding', label: 'Multi-Step Onboarding', shortLabel: 'Onboarding', category: 'Auth', description: 'Wizard stepper, card stack, and minimal modal workspace setup flows', hasCustomLayouts: true },

  // 6. Core Application
  { id: 'dashboard', label: 'Application Dashboard', shortLabel: 'Dashboard', category: 'Core', description: 'Telemetry charts, KPI stat cards, dynamic navigation shells, and recent activities', hasCustomLayouts: true },
  { id: 'detail', label: 'Entity Detail & Diagnostics', shortLabel: 'Entity Detail', category: 'Core', description: 'Split sidepanel, full document, and tabbed resource metrics', hasCustomLayouts: true },
  { id: 'kanban', label: 'Kanban Sprint Board', shortLabel: 'Kanban', category: 'Core', description: 'Multi-column workflow board, timeline list, and compact task grid', hasCustomLayouts: true },
  { id: 'chat', label: 'Autonomous Chat & Inbox', shortLabel: 'Chat & Inbox', category: 'Core', description: 'Split pane, compact feed, and minimal bubble conversation views', hasCustomLayouts: true },

  // 7. Account & Workspace
  { id: 'settings', label: 'Account & Workspace Settings', shortLabel: 'Settings', category: 'Account', description: 'Tabbed preferences, profile forms, API tokens, and danger zone actions', hasCustomLayouts: true },
  { id: 'billing', label: 'Billing & Invoices', shortLabel: 'Billing', category: 'Account', description: 'Active plan details, payment methods, usage metrics, and invoice history', hasCustomLayouts: false },
  { id: 'team', label: 'Team Members & Permissions', shortLabel: 'Team', category: 'Account', description: 'Role-based access management, invitations, and member audit list', hasCustomLayouts: false },

  // 8. System States
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
  recommendedPages: PreviewComponentType[];
  recommendedPrimitives: PreviewComponentType[];
  defaultNavbar: PageLayouts['navbar'];
  defaultSidebar: PageLayouts['sidebar'];
}

export const GOAL_DEFINITIONS: Record<ProjectGoal, GoalDefinition> = {
  saas: {
    id: 'saas',
    label: 'B2B SaaS Platform',
    emoji: '🏢',
    tagline: 'Multi-tenant analytics, permissions & subscription operations',
    recommendedPages: ['dashboard', 'auth', 'kanban', 'chat', 'settings', 'billing', 'team'],
    recommendedPrimitives: ['table', 'forms', 'buttons', 'cards', 'feedback', 'popups', 'sidebar', 'navbar'],
    recommendedPreviews: ['dashboard', 'auth', 'kanban', 'chat', 'settings', 'billing', 'team', 'table', 'forms', 'buttons', 'cards', 'feedback', 'popups', 'sidebar', 'navbar'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'classic-grouped',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    emoji: '🛒',
    tagline: 'Faceted product catalog, SKU detail & frictionless checkout',
    recommendedPages: ['ecommerce-catalog', 'product-detail', 'checkout', 'auth', 'success'],
    recommendedPrimitives: ['cards', 'forms', 'buttons', 'popups', 'feedback', 'navbar'],
    recommendedPreviews: ['ecommerce-catalog', 'product-detail', 'checkout', 'auth', 'success', 'cards', 'forms', 'buttons', 'popups', 'feedback', 'navbar'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'compact-rail',
  },
  marketplace: {
    id: 'marketplace',
    label: 'Two-Sided Marketplace',
    emoji: '🤝',
    tagline: 'Dual-persona supplier & guest booking with escrow deposits',
    recommendedPages: ['marketplace', 'product-detail', 'checkout', 'booking', 'chat', 'auth'],
    recommendedPrimitives: ['cards', 'table', 'forms', 'buttons', 'feedback', 'navbar', 'sidebar'],
    recommendedPreviews: ['marketplace', 'product-detail', 'checkout', 'booking', 'chat', 'auth', 'cards', 'table', 'forms', 'buttons', 'feedback', 'navbar', 'sidebar'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'workspace-shell',
  },
  booking: {
    id: 'booking',
    label: 'Booking & Scheduling',
    emoji: '📅',
    tagline: 'Time-slot availability, staff provider rosters & calendar sync',
    recommendedPages: ['booking', 'checkout', 'detail', 'contact', 'auth', 'success'],
    recommendedPrimitives: ['forms', 'buttons', 'cards', 'popups', 'feedback', 'navbar'],
    recommendedPreviews: ['booking', 'checkout', 'detail', 'contact', 'auth', 'success', 'forms', 'buttons', 'cards', 'popups', 'feedback', 'navbar'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'dual-pane',
  },
  editorial: {
    id: 'editorial',
    label: 'Media, News & Editorial',
    emoji: '📰',
    tagline: 'Content publishing, longform reader, TOC & paywall meters',
    recommendedPages: ['editorial', 'blog', 'pricing', 'contact', 'auth'],
    recommendedPrimitives: ['cards', 'forms', 'buttons', 'popups', 'navbar'],
    recommendedPreviews: ['editorial', 'blog', 'pricing', 'contact', 'auth', 'cards', 'forms', 'buttons', 'popups', 'navbar'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
  charity: {
    id: 'charity',
    label: 'Non-Profit & Charity',
    emoji: '🎗️',
    tagline: 'Campaign cause heroes, donation tier sliders & donor impact walls',
    recommendedPages: ['charity', 'checkout', 'landing', 'contact', 'success'],
    recommendedPrimitives: ['cards', 'buttons', 'feedback', 'forms', 'popups', 'navbar'],
    recommendedPreviews: ['charity', 'checkout', 'landing', 'contact', 'success', 'cards', 'buttons', 'feedback', 'forms', 'popups', 'navbar'],
    defaultNavbar: 'floating-pill',
    defaultSidebar: 'classic-grouped',
  },
  forum: {
    id: 'forum',
    label: 'Community Forum & Q&A',
    emoji: '💬',
    tagline: 'Thread channels, upvoting, accepted solutions & user karma',
    recommendedPages: ['forum', 'chat', 'auth', 'settings', 'detail'],
    recommendedPrimitives: ['cards', 'forms', 'buttons', 'feedback', 'popups', 'navbar'],
    recommendedPreviews: ['forum', 'chat', 'auth', 'settings', 'detail', 'cards', 'forms', 'buttons', 'feedback', 'popups', 'navbar'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'compact-rail',
  },
  streaming: {
    id: 'streaming',
    label: 'Entertainment & Streaming',
    emoji: '🎬',
    tagline: 'Cinema video player, live chat superchats & playlist queues',
    recommendedPages: ['streaming', 'chat', 'pricing', 'auth', 'success'],
    recommendedPrimitives: ['cards', 'buttons', 'popups', 'feedback', 'navbar'],
    recommendedPreviews: ['streaming', 'chat', 'pricing', 'auth', 'success', 'cards', 'buttons', 'popups', 'feedback', 'navbar'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'compact-rail',
  },
  lms: {
    id: 'lms',
    label: 'E-Learning & LMS',
    emoji: '🎓',
    tagline: 'Course video classroom, curriculum trees & completion quizzes',
    recommendedPages: ['streaming', 'detail', 'dashboard', 'pricing', 'onboarding', 'auth', 'success'],
    recommendedPrimitives: ['cards', 'forms', 'buttons', 'feedback', 'table', 'navbar', 'sidebar'],
    recommendedPreviews: ['streaming', 'detail', 'dashboard', 'pricing', 'onboarding', 'auth', 'success', 'cards', 'forms', 'buttons', 'feedback', 'table', 'navbar', 'sidebar'],
    defaultNavbar: 'tabbed-nav',
    defaultSidebar: 'dual-pane',
  },
  devtools: {
    id: 'devtools',
    label: 'DevTools & API Platform',
    emoji: '⚡',
    tagline: 'API key vaults, telemetry logs & developer docs',
    recommendedPages: ['dashboard', 'detail', 'settings', 'auth', 'error'],
    recommendedPrimitives: ['table', 'forms', 'buttons', 'cards', 'feedback', 'sidebar', 'navbar'],
    recommendedPreviews: ['dashboard', 'detail', 'settings', 'auth', 'error', 'table', 'forms', 'buttons', 'cards', 'feedback', 'sidebar', 'navbar'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'workspace-shell',
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio & Personal Brand',
    emoji: '🎨',
    tagline: 'Visual case study showcase, verified metrics & booking CTA',
    recommendedPages: ['portfolio', 'contact', 'detail', 'pricing'],
    recommendedPrimitives: ['cards', 'buttons', 'forms', 'popups', 'feedback', 'navbar'],
    recommendedPreviews: ['portfolio', 'contact', 'detail', 'pricing', 'cards', 'buttons', 'forms', 'popups', 'feedback', 'navbar'],
    defaultNavbar: 'floating-pill',
    defaultSidebar: 'classic-grouped',
  },
  agency: {
    id: 'agency',
    label: 'Agency & Marketing',
    emoji: '🌐',
    tagline: 'High-conversion acquisition hero, client proof & pricing',
    recommendedPages: ['landing', 'pricing', 'contact', 'portfolio', 'auth'],
    recommendedPrimitives: ['cards', 'buttons', 'forms', 'popups', 'navbar'],
    recommendedPreviews: ['landing', 'pricing', 'contact', 'portfolio', 'auth', 'cards', 'buttons', 'forms', 'popups', 'navbar'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
};

export function getPreviewsForGoal(goal?: ProjectGoal): PreviewDefinition[] {
  if (!goal || !GOAL_DEFINITIONS[goal]) return PREVIEW_REGISTRY;
  const def = GOAL_DEFINITIONS[goal];
  const combined = Array.from(new Set([...def.recommendedPages, ...def.recommendedPrimitives]));
  const filtered = combined
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  return filtered.length > 0 ? filtered : PREVIEW_REGISTRY;
}

export function getGoalPreviewGroups(goal?: ProjectGoal): {
  pages: PreviewDefinition[];
  primitives: PreviewDefinition[];
} {
  if (!goal || !GOAL_DEFINITIONS[goal]) {
    return {
      pages: PREVIEW_REGISTRY.filter((p) => p.category !== 'Primitives'),
      primitives: PREVIEW_REGISTRY.filter((p) => p.category === 'Primitives'),
    };
  }
  const def = GOAL_DEFINITIONS[goal];
  const pages = def.recommendedPages
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  const primitives = def.recommendedPrimitives
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  return { pages, primitives };
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
