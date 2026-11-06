import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "tabbed-media",
  pageType: "detail",
  label: "Tabbed Inspector",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "detail", 'footer'],
  description: "Tabbed inspector with specs, live code previews, and history logs.",
  tags: ["detail", "tabbed-media"],
};
