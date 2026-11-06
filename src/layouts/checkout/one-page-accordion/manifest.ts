import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "one-page-accordion",
  pageType: "checkout",
  label: "One-Page Stepped Accordion",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "checkout", 'footer'],
  description: "Baymard benchmark: 1. Shipping Address -> 2. Payment Method -> 3. Final Review.",
  tags: ["checkout", "one-page-accordion"],
};
