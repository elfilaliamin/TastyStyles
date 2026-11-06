import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-calendar-slots",
  pageType: "booking",
  label: "Split Calendar & Slots",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "booking", 'footer'],
  description: "Calendly standard: monthly calendar on left, 30-min time pills on right with timezone converter.",
  tags: ["booking", "split-calendar-slots"],
};
