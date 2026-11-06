import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "split-terminal",
  pageType: "error",
  label: "Split Debugger",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "error", 'footer'],
  description: "Simulated CLI trace logs and endpoint diagnostics paired with friendly recovery actions.",
  tags: ["error", "split-terminal"],
};
