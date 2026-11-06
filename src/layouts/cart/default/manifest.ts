import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "cart",
  label: "Shopping Cart & Summary",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "cart", 'footer'],
  description: "Slide-over cart drawer, item counters, promotional code input, and checkout summary.",
  tags: ["cart", "default"],
};
