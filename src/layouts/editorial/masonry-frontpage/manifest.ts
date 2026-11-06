import type { LayoutManifest } from '../../../config/schema';

export const manifest: LayoutManifest = {
  id: "masonry-frontpage",
  pageType: "editorial",
  label: "Masonry News Frontpage",
  purposes: ['saas', 'ecommerce', 'portfolio', 'marketplace'],
  sections: ['navbar', "editorial", 'footer'],
  description: "NYT standard: 2-column lead story with headline + 1-column trending list + 3-col topic grid.",
  tags: ["editorial", "masonry-frontpage"],
};
