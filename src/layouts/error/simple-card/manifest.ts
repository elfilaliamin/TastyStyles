import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "simple-card",
  pageType: "error",
  label: "Simple Card",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ["error"],
  description: "Centered minimal card with status code gradient, clear error message, and primary recovery actions.",
  tags: ["error", "simple-card", "card"],
};
