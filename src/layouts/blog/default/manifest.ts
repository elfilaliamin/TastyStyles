import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "blog",
  label: "Blog Article & Editorial",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "blog", 'footer'],
  description: "Longform reading typography, author bylines, pull quotes, and related posts.",
  tags: ["blog", "default"],
};
