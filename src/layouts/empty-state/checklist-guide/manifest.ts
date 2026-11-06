import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "checklist-guide",
  pageType: "empty-state",
  label: "Guided Checklist",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "empty-state", 'footer'],
  description: "Interactive onboarding setup checklist guiding the user to their first action.",
  tags: ["empty-state", "checklist-guide"],
};
