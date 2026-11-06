import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "centered-action",
  pageType: "empty-state",
  label: "Centered Action",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "empty-state", 'footer'],
  description: "Minimalist illustration with bold headline, descriptive copy, and primary creation button.",
  tags: ["empty-state", "centered-action"],
};
