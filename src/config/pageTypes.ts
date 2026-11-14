import { PageTypeDefinitionSchema, type PageTypeDefinition } from './schema';

export const PAGE_TYPES: PageTypeDefinition[] = [
  // Public & Marketing Pages
  {
    id: 'landing',
    label: 'Marketing Landing Page',
    description: 'High-conversion hero, feature grids, social proof, and value proposition cards.',
    category: 'public',
    defaultLayout: 'hero-split',
    scope: 'feature',
  },
  {
    id: 'pricing',
    label: 'Pricing & Subscription Tiers',
    description: 'Tier cards, billing toggles, feature matrix, and enterprise contact callout.',
    category: 'public',
    defaultLayout: 'cards-3col',
    scope: 'feature',
  },
  {
    id: 'blog',
    label: 'Blog Article & Editorial',
    description: 'Longform reading typography, author bylines, pull quotes, and related posts.',
    category: 'public',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'contact',
    label: 'Contact & Sales Inquiry',
    description: 'Multi-field conversion form with office details, map preview, and live support banner.',
    category: 'public',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'about',
    label: 'About & Company Narrative',
    description: 'Mission statement, leadership executive team, company milestones, and culture values.',
    category: 'public',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'services',
    label: 'Services & Capabilities',
    description: 'Service packages, deliverables matrix, client engagement workflow, and SLAs.',
    category: 'public',
    defaultLayout: 'default',
    scope: 'feature',
  },

  // E-Commerce & Commerce Archetypes
  {
    id: 'ecommerce-catalog',
    label: 'Product Catalog & Filters',
    description: 'Faceted search sidebar, product cards grid, sorting controls, and quick filters.',
    category: 'commerce',
    defaultLayout: 'faceted-sidebar',
    scope: 'feature',
  },
  {
    id: 'product-detail',
    label: 'Product Detail & SKU Showcase',
    description: 'Split sticky buy box, image gallery carousel, specification tabs, and stock badge.',
    category: 'commerce',
    defaultLayout: 'split-sticky-buy',
    scope: 'feature',
  },
  {
    id: 'cart',
    label: 'Shopping Cart & Summary',
    description: 'Slide-over cart drawer, item counters, promotional code input, and checkout summary.',
    category: 'commerce',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'checkout',
    label: 'Checkout & Order Finalization',
    description: 'Multi-step shipping, billing address, payment tokenization, and order overview.',
    category: 'commerce',
    defaultLayout: 'slide-over-cart',
    scope: 'feature',
  },
  {
    id: 'marketplace',
    label: 'Two-Sided Marketplace Directory',
    description: 'Map and list dual split view, vendor cards, filter pills, and verified badges.',
    category: 'commerce',
    defaultLayout: 'split-map-list',
    scope: 'feature',
  },
  {
    id: 'booking',
    label: 'Booking & Scheduling Engine',
    description: 'Calendar date selection, available slot pickers, provider details, and confirmation.',
    category: 'commerce',
    defaultLayout: 'split-calendar-slots',
    scope: 'feature',
  },

  // Core Application Archetypes
  {
    id: 'dashboard',
    label: 'Application Dashboard & Analytics',
    description: 'KPI metric stat cards, real-time telemetry charts, quick actions, and audit logs.',
    category: 'core',
    defaultLayout: 'sidebar-grid',
    scope: 'feature',
  },
  {
    id: 'detail',
    label: 'Entity Detail & Diagnostics',
    description: 'Inspector split sidepanel, metadata summary, action toolbar, and telemetry tabs.',
    category: 'core',
    defaultLayout: 'split-sidepanel',
    scope: 'feature',
  },
  {
    id: 'kanban',
    label: 'Kanban Sprint Board',
    description: 'Multi-column drag-and-drop workflow lanes, task priority cards, and progress bars.',
    category: 'core',
    defaultLayout: 'board-columns',
    scope: 'feature',
  },
  {
    id: 'chat',
    label: 'Chat & Collaboration Inbox',
    description: 'Split-pane channel list, real-time message feed, attachment preview, and typing prompt.',
    category: 'core',
    defaultLayout: 'split-pane',
    scope: 'feature',
  },

  // Creative & Community Archetypes
  {
    id: 'portfolio',
    label: 'Personal Portfolio & Resume',
    description: 'Developer/designer profile, career experiences, education, projects, skills, languages, and contact.',
    category: 'community',
    defaultLayout: 'bento-developer',
    scope: 'feature',
  },
  {
    id: 'portfolio-project',
    label: 'Project Case Study & Blog',
    description: 'Project story deep dive, architecture breakdown, challenge/solution narrative, and live preview.',
    category: 'community',
    defaultLayout: 'case-study-narrative',
    scope: 'feature',
  },
  {
    id: 'portfolio-dashboard',
    label: 'Portfolio Owner CMS & Analytics',
    description: 'Owner traffic analytics, landing section visibility toggles, and project publishing manager.',
    category: 'account',
    defaultLayout: 'analytics-cms-split',
    scope: 'feature',
  },
  {
    id: 'case-study',
    label: 'In-Depth Case Study & Telemetry',
    description: 'Deep architectural dive with problem/solution narrative, client quotes, and before/after metrics.',
    category: 'community',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'editorial',
    label: 'Media, News & Publication',
    description: 'Masonry editorial grid, featured headline banner, category index, and subscription banner.',
    category: 'community',
    defaultLayout: 'masonry-frontpage',
    scope: 'feature',
  },
  {
    id: 'charity',
    label: 'Non-Profit & Campaign Fundraising',
    description: 'Goal thermometer hero, donation tier selectors, impact breakdown, and donor leaderboard.',
    category: 'community',
    defaultLayout: 'hero-impact-thermometer',
    scope: 'feature',
  },
  {
    id: 'forum',
    label: 'Community Forum & Q&A',
    description: 'Thread list with vote counts, badge highlights, solved answer markers, and tags.',
    category: 'community',
    defaultLayout: 'three-column-reddit',
    scope: 'feature',
  },
  {
    id: 'streaming',
    label: 'Entertainment & Live Streaming',
    description: 'Cinema theater canvas, live stream dock with chat overlay, and media queues.',
    category: 'community',
    defaultLayout: 'cinema-theater',
    scope: 'feature',
  },

  // Authentication & Onboarding
  {
    id: 'auth',
    label: 'Authentication & Sign In',
    description: 'Single-sign-on providers, email/password form, MFA challenge, and recovery flows.',
    category: 'auth',
    defaultLayout: 'centered-card',
    scope: 'system',
  },
  {
    id: 'onboarding',
    label: 'Multi-Step Onboarding Wizard',
    description: 'Role selection, profile completion, organization setup, and initial invite stepper.',
    category: 'auth',
    defaultLayout: 'wizard-stepper',
    scope: 'feature',
  },

  // Account & Administration
  {
    id: 'settings',
    label: 'Account & Workspace Settings',
    description: 'Tabbed organization preferences, API credentials, webhooks, and security settings.',
    category: 'account',
    defaultLayout: 'tabbed',
    scope: 'feature',
  },
  {
    id: 'billing',
    label: 'Billing, Plans & Invoices',
    description: 'Subscription usage meters, payment card details, and downloadable PDF invoices.',
    category: 'account',
    defaultLayout: 'default',
    scope: 'feature',
  },
  {
    id: 'team',
    label: 'Team Members & Permissions',
    description: 'Role-based access matrix, member invite dialog, and user status badges.',
    category: 'account',
    defaultLayout: 'default',
    scope: 'feature',
  },

  // System States & Feedback
  {
    id: 'error',
    label: 'System Error & HTTP Status',
    description: 'Polymorphic 404/500 recovery screens with diagnostics, retry button, and help links.',
    category: 'system',
    defaultLayout: 'giant-hero',
    scope: 'system',
  },
  {
    id: 'empty-state',
    label: 'Empty State (No Data)',
    description: 'Zero-data placeholder with explanatory illustration, helpful tips, and CTA button.',
    category: 'system',
    defaultLayout: 'centered-action',
    scope: 'feature',
  },
  {
    id: 'success-confirm',
    label: 'Success & Confirmation',
    description: 'Transaction confirmation, order reference number, receipt view, and next steps.',
    category: 'system',
    defaultLayout: 'celebration-card',
    scope: 'feature',
  },
];

export const PAGE_TYPES_BY_ID = new Map<string, PageTypeDefinition>(
  PAGE_TYPES.map((pt) => [pt.id, pt])
);

export const PAGE_TYPE_TO_PAGE_LAYOUTS_KEY: Record<string, string> = {
  landing: 'landing',
  pricing: 'pricing',
  auth: 'auth',
  dashboard: 'dashboard',
  kanban: 'kanban',
  chat: 'chat',
  settings: 'settings',
  detail: 'detail',
  onboarding: 'onboarding',
  'empty-state': 'emptyState',
  'success-confirm': 'success',
  error: 'error',
  'ecommerce-catalog': 'ecommerceCatalog',
  'product-detail': 'productDetail',
  checkout: 'checkout',
  marketplace: 'marketplace',
  booking: 'booking',
  editorial: 'editorial',
  charity: 'charity',
  forum: 'forum',
  streaming: 'streaming',
  portfolio: 'portfolio',
  'portfolio-project': 'portfolioProject',
  'portfolio-dashboard': 'portfolioDashboard',
  navbar: 'navbar',
  sidebar: 'sidebar',
  footer: 'footer',
};

export const PAGE_LAYOUTS_KEY_TO_PAGE_TYPE: Record<string, string> = {
  landing: 'landing',
  pricing: 'pricing',
  auth: 'auth',
  dashboard: 'dashboard',
  kanban: 'kanban',
  chat: 'chat',
  settings: 'settings',
  detail: 'detail',
  onboarding: 'onboarding',
  emptyState: 'empty-state',
  success: 'success-confirm',
  error: 'error',
  ecommerceCatalog: 'ecommerce-catalog',
  productDetail: 'product-detail',
  checkout: 'checkout',
  marketplace: 'marketplace',
  booking: 'booking',
  editorial: 'editorial',
  charity: 'charity',
  forum: 'forum',
  streaming: 'streaming',
  portfolio: 'portfolio',
  portfolioProject: 'portfolio-project',
  portfolioDashboard: 'portfolio-dashboard',
  navbar: 'navbar',
  sidebar: 'sidebar',
  footer: 'footer',
};

export function getPageTypeDefinition(id: string): PageTypeDefinition | undefined {
  return PAGE_TYPES_BY_ID.get(id);
}

export function validatePageTypes(): boolean {
  for (const page of PAGE_TYPES) {
    PageTypeDefinitionSchema.parse(page);
  }
  return true;
}

