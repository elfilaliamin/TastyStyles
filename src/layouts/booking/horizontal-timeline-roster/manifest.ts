import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "horizontal-timeline-roster",
  pageType: "booking",
  label: "Multi-Staff Day Roster",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "booking", 'footer'],
  description: "Day-view horizontal time-block grid for multi-doctor clinics and salons.",
  tags: ["booking", "horizontal-timeline-roster"],
};
