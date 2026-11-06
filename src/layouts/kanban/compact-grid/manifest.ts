import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "compact-grid",
  pageType: "kanban",
  label: "Compact Grid",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "kanban", 'footer'],
  description: "Dense task cards matrix organized by priority badges and assignees.",
  tags: ["kanban", "compact-grid"],
};
