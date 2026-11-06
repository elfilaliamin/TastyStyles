import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "full-document",
  pageType: "detail",
  label: "Full Document",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "detail", 'footer'],
  description: "Single column longform editorial view with complete specification properties.",
  tags: ["detail", "full-document"],
};
