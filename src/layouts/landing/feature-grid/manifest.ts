import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "feature-grid",
  pageType: "landing",
  label: "Feature Grid",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "landing", 'footer'],
  description: "Bento box style modular cards showcasing distinct capabilities and integrations.",
  tags: ["landing", "feature-grid"],
};
