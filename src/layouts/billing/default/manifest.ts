import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "billing",
  label: "Billing, Plans & Invoices",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "billing", 'footer'],
  description: "Subscription usage meters, payment card details, and downloadable PDF invoices.",
  tags: ["billing", "default"],
};
