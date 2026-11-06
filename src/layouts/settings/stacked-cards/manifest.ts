import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "stacked-cards",
  pageType: "settings",
  label: "Stacked Cards",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "settings", 'footer'],
  description: "Vertical stacked section cards on a single scrollable page with individual save actions.",
  tags: ["settings", "stacked-cards"],
};
