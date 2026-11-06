import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "timeline-list",
  pageType: "kanban",
  label: "Roadmap List",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "kanban", 'footer'],
  description: "Milestone timeline list with task progress status bars and deliverable dates.",
  tags: ["kanban", "timeline-list"],
};
