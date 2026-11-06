import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "tabbed",
  pageType: "settings",
  label: "Horizontal Tabs",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "settings", 'footer'],
  description: "Horizontal top tab bar switching between Profile, Preferences, Security, and Integrations.",
  tags: ["settings", "tabbed"],
};
