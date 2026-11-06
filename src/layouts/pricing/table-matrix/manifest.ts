import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "table-matrix",
  pageType: "pricing",
  label: "Matrix Table",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "pricing", 'footer'],
  description: "Detailed feature matrix table comparing 30+ capabilities across all subscription tiers.",
  tags: ["pricing", "table-matrix"],
};
