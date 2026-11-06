import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-map-list",
  pageType: "marketplace",
  label: "Split Map & Listings",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "marketplace", 'footer'],
  description: "Airbnb benchmark: 50% scrollable listing cards with price badges + 50% sticky vector map.",
  tags: ["marketplace", "split-map-list"],
};
