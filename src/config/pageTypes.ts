import { PageTypeDefinitionSchema, type PageTypeDefinition } from './schema';

export const PAGE_TYPES: PageTypeDefinition[] = [
  // Public & Marketing Pages
  {
    id: 'landing',
    label: 'Marketing Landing Page',
    description: 'High-conversion hero, feature grids, social proof, and value proposition cards.',
    category: 'public',
    defaultLayout: 'hero-split',
  },
  {
    id: 'pricing',
    label: 'Pricing & Subscription Tiers',
    description: 'Tier cards, billing toggles, feature matrix, and enterprise contact callout.',
    category: 'public',
    defaultLayout: 'cards-3col',
  },
  {
    id: 'blog',
    label: 'Blog Article & Editorial',
    description: 'Longform reading typography, author bylines, pull quotes, and related posts.',
    category: 'public',
    defaultLayout: 'default',
  },
  {
    id: 'contact',
    label: 'Contact & Sales Inquiry',
    description: 'Multi-field conversion form with office details, map preview, and live support banner.',
    category: 'public',
    defaultLayout: 'default',
  },
  {
    id: 'about',
    label: 'About & Company Narrative',
    description: 'Mission statement, leadership executive team, company milestones, and culture values.',
    category: 'public',
    defaultLayout: 'default',
  },
  {
    id: 'services',
    label: 'Services & Capabilities',
    description: 'Service packages, deliverables matrix, client engagement workflow, and SLAs.',
    category: 'public',
    defaultLayout: 'default',
  },

  // E-Commerce & Commerce Archetypes
  {
    id: 'ecommerce-catalog',
    label: 'Product Catalog & Filters',
    description: 'Faceted search sidebar, product cards grid, sorting controls, and quick filters.',
    category: 'commerce',
    defaultLayout: 'faceted-sidebar',
  },
  {
    id: 'product-detail',
    label: 'Product Detail & SKU Showcase',
    description: 'Split sticky buy box, image gallery carousel, specification tabs, and stock badge.',
    category: 'commerce',
    defaultLayout: 'split-sticky-buy',
  },
  {
    id: 'cart',
    label: 'Shopping Cart & Summary',
    description: 'Slide-over cart drawer, item counters, promotional code input, and checkout summary.',
    category: 'commerce',
    defaultLayout: 'default',
  },
  {
    id: 'checkout',
    label: 'Checkout & Order Finalization',
    description: 'Multi-step shipping, billing address, payment tokenization, and order overview.',
    category: 'commerce',
    defaultLayout: 'slide-over-cart',
  },
  {
    id: 'marketplace',
    label: 'Two-Sided Marketplace Directory',
    description: 'Map and list dual split view, vendor cards, filter pills, and verified badges.',
    category: 'commerce',
    defaultLayout: 'split-map-list',
  },
  {
    id: 'booking',
    label: 'Booking & Scheduling Engine',
    description: 'Calendar date selection, available slot pickers, provider details, and confirmation.',
    category: 'commerce',
    defaultLayout: 'split-calendar-slots',
  },

  // Core Application Archetypes
  {
    id: 'dashboard',
    label: 'Application Dashboard & Analytics',
    description: 'KPI metric stat cards, real-time telemetry charts, quick actions, and audit logs.',
    category: 'core',
    defaultLayout: 'sidebar-grid',
  },
  {
    id: 'detail',
    label: 'Entity Detail & Diagnostics',
    description: 'Inspector split sidepanel, metadata summary, action toolbar, and telemetry tabs.',
    category: 'core',
    defaultLayout: 'split-sidepanel',
  },
  {
    id: 'kanban',
    label: 'Kanban Sprint Board',
    description: 'Multi-column drag-and-drop workflow lanes, task priority cards, and progress bars.',
    category: 'core',
    defaultLayout: 'board-columns',
  },
  {
    id: 'chat',
    label: 'Chat & Collaboration Inbox',
    description: 'Split-pane channel list, real-time message feed, attachment preview, and typing prompt.',
    category: 'core',
    defaultLayout: 'split-pane',
  },

  // Creative & Community Archetypes
  {
    id: 'portfolio',
    label: 'Personal Portfolio & Resume',
    description: 'Developer/designer profile, career experiences, education, projects, skills, languages, and contact.',
    category: 'community',
    defaultLayout: 'bento-developer',
  },
  {
    id: 'portfolio-project',
    label: 'Project Case Study & Blog',
    description: 'Project story deep dive, architecture breakdown, challenge/solution narrative, and live preview.',
    category: 'community',
    defaultLayout: 'case-study-narrative',
  },
  {
    id: 'portfolio-dashboard',
    label: 'Portfolio Owner CMS & Analytics',
    description: 'Owner traffic analytics, landing section visibility toggles, and project publishing manager.',
    category: 'account',
    defaultLayout: 'analytics-cms-split',
  },
  {
    id: 'case-study',
    label: 'In-Depth Case Study & Telemetry',
    description: 'Deep architectural dive with problem/solution narrative, client quotes, and before/after metrics.',
    category: 'community',
    defaultLayout: 'default',
  },
  {
    id: 'editorial',
    label: 'Media, News & Publication',
    description: 'Masonry editorial grid, featured headline banner, category index, and subscription banner.',
    category: 'community',
    defaultLayout: 'masonry-frontpage',
  },
  {
    id: 'charity',
    label: 'Non-Profit & Campaign Fundraising',
    description: 'Goal thermometer hero, donation tier selectors, impact breakdown, and donor leaderboard.',
    category: 'community',
    defaultLayout: 'hero-impact-thermometer',
  },
  {
    id: 'forum',
    label: 'Community Forum & Q&A',
    description: 'Thread list with vote counts, badge highlights, solved answer markers, and tags.',
    category: 'community',
    defaultLayout: 'three-column-reddit',
  },
  {
    id: 'streaming',
    label: 'Entertainment & Live Streaming',
    description: 'Cinema theater canvas, live stream dock with chat overlay, and media queues.',
    category: 'community',
    defaultLayout: 'cinema-theater',
  },

  // Authentication & Onboarding
  {
    id: 'auth',
    label: 'Authentication & Sign In',
    description: 'Single-sign-on providers, email/password form, MFA challenge, and recovery flows.',
    category: 'auth',
    defaultLayout: 'centered-card',
  },
  {
    id: 'onboarding',
    label: 'Multi-Step Onboarding Wizard',
    description: 'Role selection, profile completion, organization setup, and initial invite stepper.',
    category: 'auth',
    defaultLayout: 'wizard-stepper',
  },

  // Account & Administration
  {
    id: 'settings',
    label: 'Account & Workspace Settings',
    description: 'Tabbed organization preferences, API credentials, webhooks, and security settings.',
    category: 'account',
    defaultLayout: 'tabbed',
  },
  {
    id: 'billing',
    label: 'Billing, Plans & Invoices',
    description: 'Subscription usage meters, payment card details, and downloadable PDF invoices.',
    category: 'account',
    defaultLayout: 'default',
  },
  {
    id: 'team',
    label: 'Team Members & Permissions',
    description: 'Role-based access matrix, member invite dialog, and user status badges.',
    category: 'account',
    defaultLayout: 'default',
  },

  // System States & Feedback
  {
    id: 'error',
    label: 'System Error & HTTP Status',
    description: 'Polymorphic 404/500 recovery screens with diagnostics, retry button, and help links.',
    category: 'system',
    defaultLayout: 'giant-hero',
  },
  {
    id: 'empty-state',
    label: 'Empty State (No Data)',
    description: 'Zero-data placeholder with explanatory illustration, helpful tips, and CTA button.',
    category: 'system',
    defaultLayout: 'centered-action',
  },
  {
    id: 'success-confirm',
    label: 'Success & Confirmation',
    description: 'Transaction confirmation, order reference number, receipt view, and next steps.',
    category: 'system',
    defaultLayout: 'celebration-card',
  },
];

export const PAGE_TYPES_BY_ID = new Map<string, PageTypeDefinition>(
  PAGE_TYPES.map((pt) => [pt.id, pt])
);

export function getPageTypeDefinition(id: string): PageTypeDefinition | undefined {
  return PAGE_TYPES_BY_ID.get(id);
}

export function validatePageTypes(): boolean {
  for (const page of PAGE_TYPES) {
    PageTypeDefinitionSchema.parse(page);
  }
  return true;
}

