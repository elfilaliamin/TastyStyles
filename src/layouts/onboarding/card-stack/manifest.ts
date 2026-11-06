import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "card-stack",
  pageType: "onboarding",
  label: "Card Stack",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "onboarding", 'footer'],
  description: "Interactive stacked setup cards where completing each card unlocks the next milestone.",
  tags: ["onboarding", "card-stack"],
};
