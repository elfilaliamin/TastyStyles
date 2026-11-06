import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-image",
  pageType: "auth",
  label: "Split Screen 2 (Image)",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "Editorial workspace photograph with glass quote badge on left; authentication card on right.",
  tags: ["auth", "split-image"],
};
