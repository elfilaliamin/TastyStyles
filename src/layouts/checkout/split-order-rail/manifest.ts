import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-order-rail",
  pageType: "checkout",
  label: "Split Order Rail",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "checkout", 'footer'],
  description: "60% left checkout inputs; 40% right sticky itemized summary rail with trust badges.",
  tags: ["checkout", "split-order-rail"],
};
