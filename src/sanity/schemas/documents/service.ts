import { defineType, defineField } from 'sanity';

/**
 * Service - Medical services offered (Collection)
 * Includes both service cards and featured service content
 */
export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info' },
    { name: 'featured', title: 'Featured Content' },
  ],
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "cosmetic_lengthening")',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
      group: 'basic',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localizedString',
      group: 'basic',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured Service',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to show expanded featured content',
      group: 'basic',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      group: 'basic',
    }),

    // Featured Content (shown only when isFeatured is true)
    defineField({
      name: 'featuredContent',
      title: 'Featured Content',
      type: 'object',
      group: 'featured',
      hidden: ({ parent }) => !parent?.isFeatured,
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'localizedString' },
        {
          name: 'what',
          title: 'What Is It',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'description', title: 'Description', type: 'localizedText' },
          ],
        },
        {
          name: 'who',
          title: 'Who Is It For',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'localizedString' }] },
          ],
        },
        {
          name: 'outcomes',
          title: 'Expected Outcomes',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'localizedString' }] },
          ],
        },
        {
          name: 'timeline',
          title: 'Timeline',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'localizedString' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'localizedString' }] },
          ],
        },
        { name: 'ctaText', title: 'CTA Text', type: 'localizedString' },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      emoji: 'emoji',
      isFeatured: 'isFeatured',
    },
    prepare({ title, emoji, isFeatured }) {
      return {
        title: `${emoji || '🔧'} ${title || 'Untitled Service'}`,
        subtitle: isFeatured ? '⭐ Featured' : undefined,
      };
    },
  },
});
