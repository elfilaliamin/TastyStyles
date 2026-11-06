import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "cinema-theater",
  pageType: "streaming",
  label: "Cinema Theater Canvas",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "streaming", 'footer'],
  description: "Netflix standard: 16:9 full-width cinema viewport with ambient backdrop glow and lower episode tabs.",
  tags: ["streaming", "cinema-theater"],
};
