import { defineType, defineField } from 'sanity';

/**
 * Guides Page - Page-level content for guides (Singleton)
 * Contains title, subtitle, section titles, and bundle info
 */
export default defineType({
  name: 'guidesPage',
  title: 'Guides Page',
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

    // Quick Access Labels
    defineField({
      name: 'quickAccess',
      title: 'Quick Access Buttons',
      type: 'object',
      fields: [
        { name: 'preSurgery', title: 'Pre-Surgery', type: 'localizedString' },
        { name: 'postSurgery', title: 'Post-Surgery', type: 'localizedString' },
        { name: 'ptExercises', title: 'PT Exercises', type: 'localizedString' },
        { name: 'recoveryTimeline', title: 'Recovery Timeline', type: 'localizedString' },
      ],
    }),

    // Section Titles
    defineField({
      name: 'preSurgerySectionTitle',
      title: 'Pre-Surgery Section Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'postSurgerySectionTitle',
      title: 'Post-Surgery Section Title',
      type: 'localizedString',
    }),

    // Bundle Section
    defineField({
      name: 'bundle',
      title: 'Download Bundle',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'localizedString' },
        { name: 'description', title: 'Description', type: 'localizedString' },
        { name: 'ctaText', title: 'CTA Text', type: 'localizedString' },
        {
          name: 'file',
          title: 'Bundle File (ZIP)',
          type: 'file',
          options: { accept: '.zip' },
        },
      ],
    }),

    // FAQ Section Title
    defineField({
      name: 'faqSectionTitle',
      title: 'FAQ Section Title',
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
        title: 'Guides Page',
        subtitle: 'Page settings',
      };
    },
  },
});
