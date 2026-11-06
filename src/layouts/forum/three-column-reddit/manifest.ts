import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "three-column-reddit",
  pageType: "forum",
  label: "Three-Column Community",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "forum", 'footer'],
  description: "Reddit standard: left channels rail (220px) + center thread stream + right community rules.",
  tags: ["forum", "three-column-reddit"],
};
