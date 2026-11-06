import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "wizard-stepper",
  pageType: "onboarding",
  label: "Wizard Stepper",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "onboarding", 'footer'],
  description: "Horizontal multi-step progress stepper with next/back buttons and field cards.",
  tags: ["onboarding", "wizard-stepper"],
};
