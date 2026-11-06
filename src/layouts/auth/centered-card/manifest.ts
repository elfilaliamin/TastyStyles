import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "centered-card",
  pageType: "auth",
  label: "Centered Card (Default)",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "Single centered modal card with logo, credential inputs, primary button and account switch link.",
  tags: ["auth", "centered-card"],
};
