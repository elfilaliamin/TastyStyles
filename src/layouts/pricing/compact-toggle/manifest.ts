import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "compact-toggle",
  pageType: "pricing",
  label: "Compact List",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "pricing", 'footer'],
  description: "Horizontal compact plan tier rows with monthly/annual billing toggle.",
  tags: ["pricing", "compact-toggle"],
};
