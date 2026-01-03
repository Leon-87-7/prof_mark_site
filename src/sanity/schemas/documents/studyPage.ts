import { defineType, defineField } from 'sanity';

/**
 * Study Page - Page-level content for study area (Singleton)
 */
export default defineType({
  name: 'studyPage',
  title: 'Study Page',
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

    // Search Section
    defineField({
      name: 'search',
      title: 'Search',
      type: 'object',
      fields: [
        { name: 'placeholder', title: 'Placeholder', type: 'localizedString' },
        {
          name: 'filters',
          title: 'Filter Labels',
          type: 'object',
          fields: [
            { name: 'all', title: 'All', type: 'localizedString' },
            { name: 'articles', title: 'Articles', type: 'localizedString' },
            { name: 'caseStudies', title: 'Case Studies', type: 'localizedString' },
            { name: 'lectures', title: 'Lectures', type: 'localizedString' },
            { name: 'research', title: 'Research', type: 'localizedString' },
          ],
        },
      ],
    }),

    // Subscribe Section
    defineField({
      name: 'subscribe',
      title: 'Subscribe Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'localizedString' },
        { name: 'description', title: 'Description', type: 'localizedString' },
        { name: 'placeholder', title: 'Email Placeholder', type: 'localizedString' },
        { name: 'ctaText', title: 'CTA Text', type: 'localizedString' },
      ],
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
        title: 'Study Page',
        subtitle: 'Page settings',
      };
    },
  },
});
