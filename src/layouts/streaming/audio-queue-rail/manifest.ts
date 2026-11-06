import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "audio-queue-rail",
  pageType: "streaming",
  label: "Audio Player & Queue",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "streaming", 'footer'],
  description: "Spotify standard: left album art + center waveform progress player + right upcoming queue rail.",
  tags: ["streaming", "audio-queue-rail"],
};
