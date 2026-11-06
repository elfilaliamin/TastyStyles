import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "compact-feed",
  pageType: "chat",
  label: "Floating Feed",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "chat", 'footer'],
  description: "Single focused conversation stream with collapsible metadata drawer and sticky bottom composer.",
  tags: ["chat", "compact-feed"],
};
