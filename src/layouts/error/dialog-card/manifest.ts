import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "dialog-card",
  pageType: "error",
  label: "Dialog Card",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "error", 'footer'],
  description: "In-app alert modal card with status badge and primary recovery actions.",
  tags: ["error", "dialog-card"],
};
