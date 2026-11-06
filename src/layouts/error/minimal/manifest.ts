import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimal",
  pageType: "error",
  label: "Minimal Clean",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "error", 'footer'],
  description: "Editorial documentation link layout with subtle monochrome status badge.",
  tags: ["error", "minimal"],
};
