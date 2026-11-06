import { PurposeDefinitionSchema, type PurposeDefinition } from './schema';
import { PAGE_TYPES_BY_ID } from './pageTypes';

export const PURPOSES: PurposeDefinition[] = [
  {
    id: 'saas',
    label: 'B2B SaaS Platform',
    description: 'Multi-tenant cloud application with dashboard telemetry, team administration, and subscription billing.',
    emoji: '🏢',
    tagline: 'Enterprise-grade software with subscription billing and workflows',
    pages: [
      { pageType: 'landing', required: true, defaultLayout: 'hero-split' },
      { pageType: 'pricing', required: true, defaultLayout: 'cards-3col' },
      { pageType: 'auth', required: true, defaultLayout: 'centered-card' },
      { pageType: 'dashboard', required: true, defaultLayout: 'sidebar-grid' },
      { pageType: 'settings', required: false, defaultLayout: 'tabbed' },
      { pageType: 'billing', required: false, defaultLayout: 'default' },
      { pageType: 'team', required: false, defaultLayout: 'default' },
      { pageType: 'contact', required: false, defaultLayout: 'default' },
    ],
  },
  {
    id: 'agency-studio',
    label: 'Creative Studio & Agency',
    description: 'Agency or studio portfolio highlighting client case studies, deliverables, team leadership, and service inquiry packages.',
    emoji: '🎨',
    tagline: 'High-impact agency showcase with case studies and client conversion',
    pages: [
      { pageType: 'landing', required: true, defaultLayout: 'hero-split' },
      { pageType: 'portfolio', required: true, defaultLayout: 'case-study-hero' },
      { pageType: 'services', required: false, defaultLayout: 'default' },
      { pageType: 'about', required: false, defaultLayout: 'default' },
      { pageType: 'contact', required: true, defaultLayout: 'default' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    description: 'Direct-to-consumer online store with visual product catalog, SKU detail views, and seamless checkout flow.',
    emoji: '🛒',
    tagline: 'High-converting storefront optimized for merchandise and transactions',
    pages: [
      { pageType: 'landing', required: true, defaultLayout: 'hero-split' },
      { pageType: 'ecommerce-catalog', required: true, defaultLayout: 'faceted-sidebar' },
      { pageType: 'product-detail', required: true, defaultLayout: 'split-sticky-buy' },
      { pageType: 'checkout', required: true, defaultLayout: 'slide-over-cart' },
      { pageType: 'success-confirm', required: false, defaultLayout: 'celebration-card' },
      { pageType: 'auth', required: false, defaultLayout: 'centered-card' },
      { pageType: 'contact', required: false, defaultLayout: 'default' },
    ],
  },
  {
    id: 'media-editorial',
    label: 'Media & Publication',
    description: 'Content-driven publishing platform with front-page magazine layout, rich typography, and community discussion.',
    emoji: '📰',
    tagline: 'Editorial publication with longform prose and reader engagement',
    pages: [
      { pageType: 'editorial', required: true, defaultLayout: 'masonry-frontpage' },
      { pageType: 'blog', required: true, defaultLayout: 'default' },
      { pageType: 'about', required: false, defaultLayout: 'default' },
      { pageType: 'contact', required: false, defaultLayout: 'default' },
    ],
  },
  {
    id: 'portfolio',
    label: 'Personal Portfolio & Resume',
    description: 'Developer, designer, or creator portfolio with profile bio, experiences timeline, education, projects, skills, languages, case study blogs, and owner CMS.',
    emoji: '👨‍💻',
    tagline: 'Showcase craftsmanship, career history, and published projects with owner controls',
    pages: [
      { pageType: 'portfolio', required: true, defaultLayout: 'bento-developer' },
      { pageType: 'portfolio-project', required: true, defaultLayout: 'case-study-narrative' },
      { pageType: 'portfolio-dashboard', required: false, defaultLayout: 'analytics-cms-split' },
      { pageType: 'auth', required: false, defaultLayout: 'centered-card' },
      { pageType: 'contact', required: false, defaultLayout: 'default' },
    ],
  },
  {
    id: 'marketplace',
    label: 'Two-Sided Marketplace',
    description: 'Directory platform connecting service buyers and providers with reviews and booking.',
    emoji: '🌐',
    tagline: 'Discovery directory with geolocation, listings, and scheduling',
    pages: [
      { pageType: 'landing', required: true, defaultLayout: 'hero-split' },
      { pageType: 'marketplace', required: true, defaultLayout: 'split-map-list' },
      { pageType: 'detail', required: true, defaultLayout: 'split-sidepanel' },
      { pageType: 'booking', required: false, defaultLayout: 'split-calendar-slots' },
      { pageType: 'auth', required: false, defaultLayout: 'centered-card' },
      { pageType: 'contact', required: false, defaultLayout: 'default' },
    ],
  },
];

export const PURPOSES_BY_ID = new Map<string, PurposeDefinition>(
  PURPOSES.map((p) => [p.id, p])
);

export function getPurposeDefinition(id: string): PurposeDefinition | undefined {
  return PURPOSES_BY_ID.get(id);
}

export function validatePurposes(): boolean {
  for (const purpose of PURPOSES) {
    PurposeDefinitionSchema.parse(purpose);
    for (const pageRef of purpose.pages) {
      if (!PAGE_TYPES_BY_ID.has(pageRef.pageType)) {
        throw new Error(
          `Purpose '${purpose.id}' references unknown pageType '${pageRef.pageType}'`
        );
      }
    }
  }
  return true;
}
