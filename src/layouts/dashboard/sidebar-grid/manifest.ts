import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "sidebar-grid",
  pageType: "dashboard",
  label: "Sidebar + Content",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "dashboard", 'footer'],
  description: "Left sidebar navigation with stat KPI cards and telemetry charts.",
  tags: ["dashboard", "sidebar-grid"],
};
