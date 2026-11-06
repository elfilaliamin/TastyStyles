import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimal-modal",
  pageType: "onboarding",
  label: "Minimal Modal",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "onboarding", 'footer'],
  description: "Centered focused dialog with clear single-task checklist and skip action.",
  tags: ["onboarding", "minimal-modal"],
};
