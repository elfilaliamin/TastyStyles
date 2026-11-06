import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "minimal-bubble",
  pageType: "chat",
  label: "Minimal Bubbles",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "chat", 'footer'],
  description: "Streamlined conversational bubble stream with avatar indicators and reactions.",
  tags: ["chat", "minimal-bubble"],
};
