import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "hero-centered",
  pageType: "landing",
  label: "Hero Centered",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "landing", 'footer'],
  description: "Centered headline with trust badges, dual primary CTAs, and wide central product preview.",
  tags: ["landing", "hero-centered"],
};
