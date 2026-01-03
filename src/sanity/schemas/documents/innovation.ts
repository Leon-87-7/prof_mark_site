import { defineType, defineField } from 'sanity';

/**
 * Innovation - Innovation/research cards (Collection)
 */
export default defineType({
  name: 'innovation',
  title: 'Innovation',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "techniques", "research")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
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
    },
    prepare({ title, emoji }) {
      return {
        title: `${emoji || '🔬'} ${title || 'Untitled Innovation'}`,
      };
    },
  },
});
