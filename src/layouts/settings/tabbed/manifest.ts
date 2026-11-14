import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "tabbed",
  pageType: "settings",
  label: "Horizontal Tabs",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['sidebar', 'settings'],
  description: "Horizontal top tab bar switching between General & Profile, Notifications & Alerts, and Security & Access.",
  tags: ["settings", "tabbed"],
};
