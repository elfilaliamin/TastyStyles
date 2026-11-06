import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimal",
  pageType: "auth",
  label: "Minimal Clean",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "Stripped-back editorial auth layout with pure typography and minimal distraction.",
  tags: ["auth", "minimal"],
};
