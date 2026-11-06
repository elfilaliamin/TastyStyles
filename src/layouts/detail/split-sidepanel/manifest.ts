import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-sidepanel",
  pageType: "detail",
  label: "Split Sidepanel",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "detail", 'footer'],
  description: "Main entity summary with right-hand metadata panel and action inspector.",
  tags: ["detail", "split-sidepanel"],
};
