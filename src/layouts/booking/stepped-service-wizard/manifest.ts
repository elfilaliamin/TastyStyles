import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "stepped-service-wizard",
  pageType: "booking",
  label: "Stepped Service Wizard",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "booking", 'footer'],
  description: "Linear 4-step wizard: Service Selection -> Staff Provider -> Date & Time -> Deposit.",
  tags: ["booking", "stepped-service-wizard"],
};
