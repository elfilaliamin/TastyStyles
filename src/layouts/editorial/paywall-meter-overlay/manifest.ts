import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "paywall-meter-overlay",
  pageType: "editorial",
  label: "Metered Subscription Scrim",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "editorial", 'footer'],
  description: "Paragraphs 1-2 legible, then frosted gradient scrim leading into subscriber sign-up card.",
  tags: ["editorial", "paywall-meter-overlay"],
};
