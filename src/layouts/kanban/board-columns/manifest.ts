import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "board-columns",
  pageType: "kanban",
  label: "Columns Board",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "kanban", 'footer'],
  description: "Multi-stage sprint pipeline columns (Backlog, In Progress, Review, Done).",
  tags: ["kanban", "board-columns"],
};
