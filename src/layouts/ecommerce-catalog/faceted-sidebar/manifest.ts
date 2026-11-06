import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "faceted-sidebar",
  pageType: "ecommerce-catalog",
  label: "Faceted Sidebar (Baymard Std)",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "ecommerce-catalog", 'footer'],
  description: "Standard desktop e-commerce with 240px left facet tree and responsive 3/4-column product grid.",
  tags: ["ecommerce-catalog", "faceted-sidebar"],
};
