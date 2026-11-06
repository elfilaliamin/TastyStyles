import type { ProjectGoal, PageLayouts } from '../config/schema';
import type { PreviewComponentType } from '../types';

export interface PreviewDefinition {
  id: PreviewComponentType;
  label: string;
  shortLabel: string;
  category: 'Public' | 'Commerce' | 'Community' | 'Auth' | 'Core' | 'Account' | 'System';
  description: string;
  hasCustomLayouts: boolean;
}

export const PREVIEW_REGISTRY: PreviewDefinition[] = [
  // 1. Commerce & Domain Archetypes
  { id: 'ecommerce-catalog', label: 'E-Commerce Product Catalog', shortLabel: 'Catalog', category: 'Commerce', description: 'Faceted sidebar search, top filter chips, and bento product editorial showcase', hasCustomLayouts: true },
  { id: 'product-detail', label: 'Product Detail & SKU Showcase', shortLabel: 'Product Detail', category: 'Commerce', description: 'Split sticky buy box, vertical scroll brand narrative, and two-column tabs specs', hasCustomLayouts: true },
  { id: 'checkout', label: 'Cart Drawer & Multi-Step Checkout', shortLabel: 'Checkout', category: 'Commerce', description: 'Slide-over slide drawer, one-page accordion checkout, and split order rail', hasCustomLayouts: true },
  { id: 'marketplace', label: 'Two-Sided Marketplace Directory', shortLabel: 'Marketplace', category: 'Commerce', description: '50/50 split map view, category hero cards, and supplier directory matrix', hasCustomLayouts: true },
  { id: 'booking', label: 'Booking & Scheduling Engine', shortLabel: 'Booking', category: 'Commerce', description: 'Split calendar time-slots, stepped service wizard, and horizontal timeline roster', hasCustomLayouts: true },

  // 2. Content & Community Archetypes
  { id: 'editorial', label: 'Media, News & Editorial', shortLabel: 'Editorial', category: 'Community', description: 'Masonry frontpage, focused prose with sticky TOC rail, and paywall meter overlay', hasCustomLayouts: true },
  { id: 'portfolio', label: 'Personal Portfolio & Resume', shortLabel: 'Portfolio', category: 'Community', description: 'Developer bento, chronological narrative, split card, and interactive console', hasCustomLayouts: true },
  { id: 'portfolio-project', label: 'Project Case Study & Blog', shortLabel: 'Project Case Study', category: 'Community', description: 'Deep architectural writeup, challenges, solutions, and benchmark metrics', hasCustomLayouts: true },
  { id: 'portfolio-dashboard', label: 'Portfolio Owner CMS & Analytics', shortLabel: 'Owner CMS', category: 'Account', description: 'Visitor analytics metrics, section visibility toggles, and project publishing controls', hasCustomLayouts: true },
  { id: 'charity', label: 'Non-Profit & Campaign Fundraising', shortLabel: 'Charity', category: 'Community', description: 'Goal thermometer hero, split cause impact calculator, and transparent donor wall', hasCustomLayouts: true },
  { id: 'forum', label: 'Community Forum & Q&A', shortLabel: 'Forum', category: 'Community', description: 'Three-column Reddit feed, Q&A solved code inspector, and compact thread table', hasCustomLayouts: true },
  { id: 'streaming', label: 'Entertainment & Live Streaming', shortLabel: 'Streaming', category: 'Community', description: 'Cinema theater video canvas, live stream with docked chat, and hi-res audio queue', hasCustomLayouts: true },

  // 3. Public Pages
  { id: 'landing', label: 'Marketing Landing Page', shortLabel: 'Landing Page', category: 'Public', description: 'High-conversion SaaS hero, feature grids, social proof, and value proposition cards', hasCustomLayouts: true },
  { id: 'pricing', label: 'Pricing & Subscription Tiers', shortLabel: 'Pricing', category: 'Public', description: 'Three-column tier comparison, matrix feature comparison, and compact view', hasCustomLayouts: true },
  { id: 'blog', label: 'Blog Article & Editorial', shortLabel: 'Article', category: 'Public', description: 'Longform typography, author bylines, pull quotes, and related posts', hasCustomLayouts: false },
  { id: 'contact', label: 'Contact & Sales Inquiry', shortLabel: 'Contact', category: 'Public', description: 'Multi-field conversion form with office details and live support banner', hasCustomLayouts: false },

  // 4. Auth & Onboarding
  { id: 'auth', label: 'Authentication & Sign In', shortLabel: 'Auth & Login', category: 'Auth', description: 'Centered card, split screen, and minimal login with social authentication', hasCustomLayouts: true },
  { id: 'onboarding', label: 'Multi-Step Onboarding', shortLabel: 'Onboarding', category: 'Auth', description: 'Wizard stepper, card stack, and minimal modal workspace setup flows', hasCustomLayouts: true },

  // 5. Core Application
  { id: 'dashboard', label: 'Application Dashboard', shortLabel: 'Dashboard', category: 'Core', description: 'Telemetry charts, KPI stat cards, dynamic navigation shells, and recent activities', hasCustomLayouts: true },
  { id: 'detail', label: 'Entity Detail & Diagnostics', shortLabel: 'Entity Detail', category: 'Core', description: 'Split sidepanel, full document, and tabbed resource metrics', hasCustomLayouts: true },
  { id: 'kanban', label: 'Kanban Sprint Board', shortLabel: 'Kanban', category: 'Core', description: 'Multi-column workflow board, timeline list, and compact task grid', hasCustomLayouts: true },
  { id: 'chat', label: 'Autonomous Chat & Inbox', shortLabel: 'Chat & Inbox', category: 'Core', description: 'Split pane, compact feed, and minimal bubble conversation views', hasCustomLayouts: true },

  // 6. Account & Workspace
  { id: 'settings', label: 'Account & Workspace Settings', shortLabel: 'Settings', category: 'Account', description: 'Tabbed preferences, profile forms, API tokens, and danger zone actions', hasCustomLayouts: true },
  { id: 'billing', label: 'Billing & Invoices', shortLabel: 'Billing', category: 'Account', description: 'Active plan details, payment methods, usage metrics, and invoice history', hasCustomLayouts: false },
  { id: 'team', label: 'Team Members & Permissions', shortLabel: 'Team', category: 'Account', description: 'Role-based access management, invitations, and member audit list', hasCustomLayouts: false },

  // 7. System States
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
    recommendedPreviews: ['dashboard', 'auth', 'kanban', 'chat', 'settings', 'billing', 'team'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'classic-grouped',
  },
  ecommerce: {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    emoji: '🛒',
    tagline: 'Faceted product catalog, SKU detail & frictionless checkout',
    recommendedPages: ['ecommerce-catalog', 'product-detail', 'checkout', 'auth', 'success'],
    recommendedPreviews: ['ecommerce-catalog', 'product-detail', 'checkout', 'auth', 'success'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'compact-rail',
  },
  marketplace: {
    id: 'marketplace',
    label: 'Two-Sided Marketplace',
    emoji: '🤝',
    tagline: 'Dual-persona supplier & guest booking with escrow deposits',
    recommendedPages: ['marketplace', 'product-detail', 'checkout', 'booking', 'chat', 'auth'],
    recommendedPreviews: ['marketplace', 'product-detail', 'checkout', 'booking', 'chat', 'auth'],
    defaultNavbar: 'ecommerce-action',
    defaultSidebar: 'workspace-shell',
  },
  booking: {
    id: 'booking',
    label: 'Booking & Scheduling',
    emoji: '📅',
    tagline: 'Time-slot availability, staff provider rosters & calendar sync',
    recommendedPages: ['booking', 'checkout', 'detail', 'contact', 'auth', 'success'],
    recommendedPreviews: ['booking', 'checkout', 'detail', 'contact', 'auth', 'success'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'dual-pane',
  },
  editorial: {
    id: 'editorial',
    label: 'Media, News & Editorial',
    emoji: '📰',
    tagline: 'Frontpage masonry, paywall overlays & reading typography',
    recommendedPages: ['editorial', 'blog', 'pricing', 'contact', 'auth'],
    recommendedPreviews: ['editorial', 'blog', 'pricing', 'contact', 'auth'],
    defaultNavbar: 'tabbed-nav',
    defaultSidebar: 'compact-rail',
  },
  charity: {
    id: 'charity',
    label: 'Non-Profit & Campaign',
    emoji: '🎗️',
    tagline: 'Goal thermometer progress, cause calculators & donor walls',
    recommendedPages: ['charity', 'checkout', 'landing', 'contact', 'success'],
    recommendedPreviews: ['charity', 'checkout', 'landing', 'contact', 'success'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'floating-card',
  },
  forum: {
    id: 'forum',
    label: 'Community Forum & Q&A',
    emoji: '💬',
    tagline: 'Reddit-style vote sorting, verified answers & member leaderboards',
    recommendedPages: ['forum', 'chat', 'auth', 'settings', 'detail'],
    recommendedPreviews: ['forum', 'chat', 'auth', 'settings', 'detail'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
  streaming: {
    id: 'streaming',
    label: 'Entertainment & Live Stream',
    emoji: '🎬',
    tagline: 'Cinema mode canvas, docked real-time chat & audio queues',
    recommendedPages: ['streaming', 'chat', 'pricing', 'auth', 'success'],
    recommendedPreviews: ['streaming', 'chat', 'pricing', 'auth', 'success'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'compact-rail',
  },
  lms: {
    id: 'lms',
    label: 'Learning Management System',
    emoji: '🎓',
    tagline: 'Curriculum rosters, quiz assessments & credential certs',
    recommendedPages: ['streaming', 'detail', 'dashboard', 'pricing', 'onboarding', 'auth', 'success'],
    recommendedPreviews: ['streaming', 'detail', 'dashboard', 'pricing', 'onboarding', 'auth', 'success'],
    defaultNavbar: 'tabbed-nav',
    defaultSidebar: 'dual-pane',
  },
  devtools: {
    id: 'devtools',
    label: 'Developer Tools & API Portal',
    emoji: '⚡',
    tagline: 'API console terminals, telemetry diagnostics & webhook logs',
    recommendedPages: ['dashboard', 'detail', 'settings', 'auth', 'error'],
    recommendedPreviews: ['dashboard', 'detail', 'settings', 'auth', 'error'],
    defaultNavbar: 'saas-header',
    defaultSidebar: 'compact-rail',
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio & Creative Studio',
    emoji: '🎨',
    tagline: 'Case study hero metrics, editorial grid galleries & contact',
    recommendedPages: ['portfolio', 'contact', 'detail', 'pricing'],
    recommendedPreviews: ['portfolio', 'contact', 'detail', 'pricing'],
    defaultNavbar: 'floating-pill',
    defaultSidebar: 'floating-card',
  },
  agency: {
    id: 'agency',
    label: 'Agency & Marketing',
    emoji: '🌐',
    tagline: 'High-conversion acquisition hero, client proof & pricing',
    recommendedPages: ['landing', 'pricing', 'contact', 'portfolio', 'auth'],
    recommendedPreviews: ['landing', 'pricing', 'contact', 'portfolio', 'auth'],
    defaultNavbar: 'minimal-center',
    defaultSidebar: 'classic-grouped',
  },
};

export function getPreviewsForGoal(goal?: ProjectGoal): PreviewDefinition[] {
  if (!goal || !GOAL_DEFINITIONS[goal]) return PREVIEW_REGISTRY;
  const def = GOAL_DEFINITIONS[goal];
  const filtered = def.recommendedPages
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  return filtered.length > 0 ? filtered : PREVIEW_REGISTRY;
}

export function getGoalPreviewGroups(goal?: ProjectGoal): {
  pages: PreviewDefinition[];
} {
  if (!goal || !GOAL_DEFINITIONS[goal]) {
    return {
      pages: PREVIEW_REGISTRY,
    };
  }
  const def = GOAL_DEFINITIONS[goal];
  const pages = def.recommendedPages
    .map((id) => PREVIEW_REGISTRY.find((p) => p.id === id))
    .filter((p): p is PreviewDefinition => Boolean(p));
  return { pages };
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
