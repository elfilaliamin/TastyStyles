import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "modal-overlay",
  pageType: "auth",
  label: "Modal Overlay",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "auth", 'footer'],
  description: "In-app dialog overlay over dimmed operational dashboard with close button.",
  tags: ["auth", "modal-overlay"],
};
