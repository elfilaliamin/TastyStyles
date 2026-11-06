import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "focused-prose-toc",
  pageType: "editorial",
  label: "Focused Reader & TOC",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "editorial", 'footer'],
  description: "Medium standard: centered 680px prose column with left sticky Table of Contents and progress line.",
  tags: ["editorial", "focused-prose-toc"],
};
