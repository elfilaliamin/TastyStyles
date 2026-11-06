import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "slide-over-cart",
  pageType: "checkout",
  label: "Slide-Over Cart Drawer",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "checkout", 'footer'],
  description: "Shopify standard: off-canvas drawer overlaying active view with instant 1-tap checkout.",
  tags: ["checkout", "slide-over-cart"],
};
