import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "donor-wall-transparency",
  pageType: "charity",
  label: "Donor Wall & Audited Pie",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "charity", 'footer'],
  description: "Financial allocation pie chart breakdown + live chronological donor tribute feed.",
  tags: ["charity", "donor-wall-transparency"],
};
