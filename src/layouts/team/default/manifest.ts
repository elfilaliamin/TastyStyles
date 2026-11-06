import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "team",
  label: "Team Members & Permissions",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "team", 'footer'],
  description: "Role-based access matrix, member invite dialog, and user status badges.",
  tags: ["team", "default"],
};
