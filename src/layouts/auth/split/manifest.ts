import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split",
  pageType: "auth",
  label: "Split Showcase",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "Brand marketing graphic and testimonial on the left half; credentials form on the right half.",
  tags: ["auth", "split"],
};
