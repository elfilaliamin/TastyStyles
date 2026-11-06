import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimalist-editorial",
  pageType: "portfolio",
  label: "Minimalist Editorial",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "portfolio", 'footer'],
  description: "Substack standard: text-first chronological narrative of work, speaking engagements, and patents.",
  tags: ["portfolio", "minimalist-editorial"],
};
