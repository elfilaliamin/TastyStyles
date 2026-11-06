import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "supplier-operator-dashboard",
  pageType: "marketplace",
  label: "Supplier Host Hub",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "marketplace", 'footer'],
  description: "Host workspace console with occupancy metrics, booking requests, and payout tables.",
  tags: ["marketplace", "supplier-operator-dashboard"],
};
