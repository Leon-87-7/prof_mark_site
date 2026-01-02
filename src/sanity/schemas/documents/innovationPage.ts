import { defineType, defineField } from 'sanity';

/**
 * Innovation Page - Page-level content for innovations (Singleton)
 * Contains title, subtitle, and key innovations section
 */
export default defineType({
  name: 'innovationPage',
  title: 'Innovation Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'localizedString',
    }),

    // Key Innovations Section
    defineField({
      name: 'keyInnovations',
      title: 'Key Innovations',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'techniques',
          title: 'Advanced Surgical Techniques',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'localizedString' }] },
          ],
        },
        {
          name: 'researchFocus',
          title: 'Research Focus Areas',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'localizedString' }] },
          ],
        },
      ],
    }),

    // Publications Section Title
    defineField({
      name: 'publicationsTitle',
      title: 'Publications Section Title',
      type: 'localizedString',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Innovation Page',
        subtitle: 'Page settings',
      };
    },
  },
});
