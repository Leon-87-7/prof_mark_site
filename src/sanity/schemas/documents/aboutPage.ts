import { defineType, defineField } from 'sanity';

/**
 * About Page - Professor biography and credentials (Singleton)
 */
export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'intro', title: 'Introduction' },
    { name: 'specializations', title: 'Specializations' },
    { name: 'academic', title: 'Academic' },
    { name: 'education', title: 'Education & Affiliations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localizedString',
      group: 'intro',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'localizedText',
      group: 'intro',
    }),

    // Expertise Section
    defineField({
      name: 'expertise',
      title: 'Pioneering Expertise',
      type: 'object',
      group: 'intro',
      fields: [
        { name: 'title', title: 'Title', type: 'localizedString' },
        { name: 'text', title: 'Text', type: 'localizedText' },
      ],
    }),

    // Specializations
    defineField({
      name: 'specializations',
      title: 'Key Specializations',
      type: 'object',
      group: 'specializations',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'items',
          title: 'Specialization Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Title', type: 'localizedString' },
                { name: 'description', title: 'Description', type: 'localizedString' },
              ],
              preview: {
                select: { title: 'title.en' },
              },
            },
          ],
        },
      ],
    }),

    // Academic Contributions
    defineField({
      name: 'academic',
      title: 'Academic Contributions',
      type: 'object',
      group: 'academic',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{ type: 'localizedText' }],
        },
      ],
    }),

    // Education & Affiliations
    defineField({
      name: 'educationAffiliations',
      title: 'Education & Affiliations',
      type: 'object',
      group: 'education',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'education',
          title: 'Education',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            {
              name: 'items',
              title: 'Education Items',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
          ],
        },
        {
          name: 'memberships',
          title: 'Professional Memberships',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            {
              name: 'items',
              title: 'Membership Items',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'Professor biography',
      };
    },
  },
});
