import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "hero-split",
  pageType: "landing",
  label: "Marketing Landing",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "landing", 'footer'],
  description: "Split hero with product mockup card on right, customer trust badges, and feature grid.",
  tags: ["landing", "hero-split"],
};
