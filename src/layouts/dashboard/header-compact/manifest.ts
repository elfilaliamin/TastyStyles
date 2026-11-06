import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "header-compact",
  pageType: "dashboard",
  label: "Header Compact",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "dashboard", 'footer'],
  description: "Top horizontal navigation bar with full-bleed metric strips and wide analytics graph.",
  tags: ["dashboard", "header-compact"],
};
