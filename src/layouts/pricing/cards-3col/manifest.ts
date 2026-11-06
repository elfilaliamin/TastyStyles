import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "cards-3col",
  pageType: "pricing",
  label: "3-Card Tier",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "pricing", 'footer'],
  description: "Side-by-side tier cards (Starter, Pro, Enterprise) with highlighted recommended plan.",
  tags: ["pricing", "cards-3col"],
};
