import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-map-view",
  pageType: "ecommerce-catalog",
  label: "Split Map & Local Stays",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "ecommerce-catalog", 'footer'],
  description: "50/50 desktop split view connecting physical inventory locations with responsive product list.",
  tags: ["ecommerce-catalog", "split-map-view"],
};
