import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "case-study",
  label: "In-Depth Case Study & Telemetry",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "case-study", 'footer'],
  description: "Deep architectural dive with problem/solution narrative, client quotes, and before/after metrics.",
  tags: ["case-study", "default"],
};
