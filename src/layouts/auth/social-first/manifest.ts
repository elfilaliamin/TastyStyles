import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "social-first",
  pageType: "auth",
  label: "Social-Login-First",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "High-prominence Google, Apple & GitHub OAuth buttons placed above secondary email divider.",
  tags: ["auth", "social-first"],
};
