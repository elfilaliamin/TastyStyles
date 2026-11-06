import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-qa-solved",
  pageType: "forum",
  label: "Q&A Solved with Upvoting",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "forum", 'footer'],
  description: "StackOverflow standard: question card with vertical vote counter + green pinned Accepted Solution box.",
  tags: ["forum", "split-qa-solved"],
};
