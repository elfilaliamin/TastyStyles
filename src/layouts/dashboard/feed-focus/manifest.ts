import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "feed-focus",
  pageType: "dashboard",
  label: "Feed & Telemetry",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "dashboard", 'footer'],
  description: "Realtime streaming event logs alongside system diagnostic gauges.",
  tags: ["dashboard", "feed-focus"],
};
