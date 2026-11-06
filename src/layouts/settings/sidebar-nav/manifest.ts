import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "sidebar-nav",
  pageType: "settings",
  label: "Sidebar Nav",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "settings", 'footer'],
  description: "Left sub-navigation link list paired with right-hand settings form body.",
  tags: ["settings", "sidebar-nav"],
};
