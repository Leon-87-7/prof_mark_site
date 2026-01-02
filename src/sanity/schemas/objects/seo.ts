import { defineType } from 'sanity';

/**
 * SEO - Search Engine Optimization metadata
 * Used on pages for meta tags and Open Graph
 */
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'localizedString',
      description: 'Title shown in browser tab and search results (50-60 characters)',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localizedString',
      description: 'Description shown in search results (150-160 characters)',
    },
    {
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when shared on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
  ],
  options: {
    collapsed: true,
    collapsible: true,
  },
});
