import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimal-banner",
  pageType: "success-confirm",
  label: "Minimal Banner",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "success-confirm", 'footer'],
  description: "Clean top-flush notification bar with confirmation indicator.",
  tags: ["success-confirm", "minimal-banner"],
};
