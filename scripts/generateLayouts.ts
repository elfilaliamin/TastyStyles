import fs from 'fs';
import path from 'path';
import { LAYOUT_CATALOG } from '../src/config/layoutCatalog';
import { PAGE_TYPES } from '../src/config/pageTypes';

const layoutsRoot = path.resolve('src/layouts');

// Component mapping for each pageType
const COMPONENT_IMPORTS: Record<string, { path: string; exportName: string }> = {
  landing: { path: '../../../components/preview/pages/public/LandingPage', exportName: 'LandingPage' },
  pricing: { path: '../../../components/preview/pages/public/PricingPage', exportName: 'PricingPage' },
  blog: { path: '../../../components/preview/pages/public/BlogArticlePage', exportName: 'BlogArticlePage' },
  contact: { path: '../../../components/preview/pages/public/ContactPage', exportName: 'ContactPage' },
  about: { path: '../../../components/preview/pages/public/LandingPage', exportName: 'LandingPage' },
  services: { path: '../../../components/preview/pages/public/PricingPage', exportName: 'PricingPage' },
  'ecommerce-catalog': { path: '../../../components/preview/pages/commerce/ProductCatalogPage', exportName: 'ProductCatalogPage' },
  'product-detail': { path: '../../../components/preview/pages/commerce/ProductDetailPage', exportName: 'ProductDetailPage' },
  cart: { path: '../../../components/preview/pages/commerce/CheckoutPage', exportName: 'CheckoutPage' },
  checkout: { path: '../../../components/preview/pages/commerce/CheckoutPage', exportName: 'CheckoutPage' },
  marketplace: { path: '../../../components/preview/pages/commerce/MarketplacePage', exportName: 'MarketplacePage' },
  booking: { path: '../../../components/preview/pages/commerce/BookingPage', exportName: 'BookingPage' },
  dashboard: { path: '../../../components/preview/pages/core/DashboardPage', exportName: 'DashboardPage' },
  detail: { path: '../../../components/preview/pages/core/ItemDetailPage', exportName: 'ItemDetailPage' },
  kanban: { path: '../../../components/preview/pages/core/KanbanPage', exportName: 'KanbanPage' },
  chat: { path: '../../../components/preview/pages/core/ChatInboxPage', exportName: 'ChatInboxPage' },
  portfolio: { path: '../../../components/preview/pages/content/PortfolioPage', exportName: 'PortfolioPage' },
  'case-study': { path: '../../../components/preview/pages/content/PortfolioPage', exportName: 'PortfolioPage' },
  editorial: { path: '../../../components/preview/pages/content/EditorialPage', exportName: 'EditorialPage' },
  charity: { path: '../../../components/preview/pages/content/CharityPage', exportName: 'CharityPage' },
  forum: { path: '../../../components/preview/pages/content/CommunityForumPage', exportName: 'CommunityForumPage' },
  streaming: { path: '../../../components/preview/pages/content/StreamingPage', exportName: 'StreamingPage' },
  auth: { path: '../../../components/preview/pages/auth/AuthPage', exportName: 'AuthPage' },
  onboarding: { path: '../../../components/preview/pages/auth/OnboardingPage', exportName: 'OnboardingPage' },
  settings: { path: '../../../components/preview/pages/account/SettingsPage', exportName: 'SettingsPage' },
  billing: { path: '../../../components/preview/pages/account/BillingPage', exportName: 'BillingPage' },
  team: { path: '../../../components/preview/pages/account/TeamMembersPage', exportName: 'TeamMembersPage' },
  error: { path: '../../../components/preview/pages/system/ErrorPage', exportName: 'ErrorPage' },
  'empty-state': { path: '../../../components/preview/pages/system/EmptyStatePage', exportName: 'EmptyStatePage' },
  'success-confirm': { path: '../../../components/preview/pages/system/SuccessConfirmPage', exportName: 'SuccessConfirmPage' },
};

let createdCount = 0;

for (const pageType of PAGE_TYPES) {
  const pId = pageType.id;
  const catalogKey = pId === 'empty-state' ? 'emptyState' : pId === 'success-confirm' ? 'success' : pId;
  const catalogItems = LAYOUT_CATALOG[catalogKey] ?? [
    {
      page: pId,
      id: pageType.defaultLayout || 'default',
      title: pageType.label,
      description: pageType.description,
      variant: pageType.defaultLayout || 'default',
      ascii: '',
      mobile: '',
      tablet: '',
    },
  ];

  const compInfo = COMPONENT_IMPORTS[pId] || {
    path: '../../../components/preview/pages/public/LandingPage',
    exportName: 'LandingPage',
  };

  for (const item of catalogItems) {
    const layoutId = item.id;
    const targetDir = path.join(layoutsRoot, pId, layoutId);
    fs.mkdirSync(targetDir, { recursive: true });

    // 1. Write manifest.ts
    const manifestContent = `import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: ${JSON.stringify(layoutId)},
  pageType: ${JSON.stringify(pId)},
  label: ${JSON.stringify(item.title)},
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', ${JSON.stringify(pId)}, 'footer'],
  description: ${JSON.stringify(item.description)},
  tags: [${JSON.stringify(pId)}, ${JSON.stringify(layoutId)}],
};
`;
    fs.writeFileSync(path.join(targetDir, 'manifest.ts'), manifestContent, 'utf-8');

    // 2. Write Layout.tsx
    const layoutContent = `import React from 'react';
import { ${compInfo.exportName} } from '${compInfo.path}';

export const Layout: React.FC = () => {
  return <${compInfo.exportName} />;
};

export default Layout;
`;
    fs.writeFileSync(path.join(targetDir, 'Layout.tsx'), layoutContent, 'utf-8');
    createdCount++;
  }
}

console.log(`Generated ${createdCount} layout manifests and components in src/layouts/`);

