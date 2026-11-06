import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "analytical",
  pageType: "dashboard",
  label: "Analytical Matrix",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "dashboard", 'footer'],
  description: "Dense multi-metric KPI matrix and dual comparative analytics graphs.",
  tags: ["dashboard", "analytical"],
};
