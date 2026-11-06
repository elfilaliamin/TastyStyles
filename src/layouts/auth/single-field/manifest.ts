import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "single-field",
  pageType: "auth",
  label: "Minimal Multi-Step",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "Progressive disclosure (Google/Notion style): single input per step with progress indicators.",
  tags: ["auth", "single-field"],
};
