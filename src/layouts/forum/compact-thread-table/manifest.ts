import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "compact-thread-table",
  pageType: "forum",
  label: "Compact Discussion Table",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "forum", 'footer'],
  description: "HackerNews standard: dense 1-line table rows displaying title, reply count, and author avatars.",
  tags: ["forum", "compact-thread-table"],
};
