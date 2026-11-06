import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-pane",
  pageType: "chat",
  label: "Master Split",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "chat", 'footer'],
  description: "Left conversation threads list alongside active active message stream and composer.",
  tags: ["chat", "split-pane"],
};
