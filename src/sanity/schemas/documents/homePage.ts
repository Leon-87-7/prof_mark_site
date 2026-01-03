import { defineType, defineField } from 'sanity';

/**
 * Home Page - Main landing page content (Singleton)
 * Contains hero section, credentials, and testimonials
 */
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'credentials', title: 'Credentials' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'title', title: 'Title', type: 'localizedString' },
        { name: 'subtitle', title: 'Subtitle', type: 'localizedString' },
        { name: 'descriptionLine1', title: 'Description Line 1', type: 'localizedString' },
        { name: 'descriptionLine2', title: 'Description Line 2', type: 'localizedString' },
        { name: 'descriptionLine3', title: 'Description Line 3 (Highlighted)', type: 'localizedString' },
        { name: 'descriptionLine4', title: 'Description Line 4', type: 'localizedString' },
        { name: 'descriptionHighlighted', title: 'Highlighted Text', type: 'localizedString' },
        { name: 'descriptionClosing', title: 'Closing Text', type: 'localizedString' },
        {
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [{ type: 'stat' }],
          validation: (Rule) => Rule.max(4),
        },
        {
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{ type: 'ctaButton' }],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),

    // Credentials Section
    defineField({
      name: 'credentials',
      title: 'Credentials Section',
      type: 'object',
      group: 'credentials',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'education',
          title: 'Education & Training',
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
          name: 'specializations',
          title: 'Specializations',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            {
              name: 'items',
              title: 'Specialization Items',
              type: 'array',
              of: [{ type: 'localizedString' }],
            },
          ],
        },
      ],
    }),

    // Testimonials Section
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      fields: [
        { name: 'title', title: 'Section Title', type: 'localizedString' },
        {
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
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
        title: 'Home Page',
        subtitle: 'Main landing page',
      };
    },
  },
});
