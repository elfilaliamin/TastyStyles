import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "default",
  pageType: "services",
  label: "Services & Capabilities",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "services", 'footer'],
  description: "Service packages, deliverables matrix, client engagement workflow, and SLAs.",
  tags: ["services", "default"],
};
