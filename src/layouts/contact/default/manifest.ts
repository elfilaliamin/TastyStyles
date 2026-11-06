import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "contact",
  label: "Contact & Sales Inquiry",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "contact", 'footer'],
  description: "Multi-field conversion form with office details, map preview, and live support banner.",
  tags: ["contact", "default"],
};
