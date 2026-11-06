import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "celebration-card",
  pageType: "success-confirm",
  label: "Celebration Card",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "success-confirm", 'footer'],
  description: "Centered confirmation modal with receipt badge, celebratory graphics, and next steps.",
  tags: ["success-confirm", "celebration-card"],
};
