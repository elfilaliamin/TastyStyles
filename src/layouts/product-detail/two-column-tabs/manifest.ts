import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "two-column-tabs",
  pageType: "product-detail",
  label: "Spec-Dense Two-Column",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "product-detail", 'footer'],
  description: "Top compact gallery and buy box; bottom wide technical specs and review histogram.",
  tags: ["product-detail", "two-column-tabs"],
};
