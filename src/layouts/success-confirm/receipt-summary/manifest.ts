import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "receipt-summary",
  pageType: "success-confirm",
  label: "Receipt Summary",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "success-confirm", 'footer'],
  description: "Itemized transaction breakdown with next steps and audit trail details.",
  tags: ["success-confirm", "receipt-summary"],
};
