import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "about",
  label: "About & Company Narrative",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "about", 'footer'],
  description: "Mission statement, leadership executive team, company milestones, and culture values.",
  tags: ["about", "default"],
};
