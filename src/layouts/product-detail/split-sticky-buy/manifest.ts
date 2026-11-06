import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-sticky-buy",
  pageType: "product-detail",
  label: "Split Sticky Buy Box",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "product-detail", 'footer'],
  description: "Baymard conversion benchmark: multi-image gallery on left, sticky buy box on right.",
  tags: ["product-detail", "split-sticky-buy"],
};
