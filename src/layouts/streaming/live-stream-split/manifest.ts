import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "live-stream-split",
  pageType: "streaming",
  label: "Live Stream & Superchat",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "streaming", 'footer'],
  description: "Twitch standard: 70% video player on left; 30% live interactive chat stream on right with superchats.",
  tags: ["streaming", "live-stream-split"],
};
