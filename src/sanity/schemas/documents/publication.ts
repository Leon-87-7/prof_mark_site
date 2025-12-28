import { defineType, defineField } from 'sanity';

/**
 * Publication - Research publications (Collection)
 */
export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'journal',
      title: 'Journal Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(2100),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
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
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      year: 'year',
      journal: 'journal.en',
    },
    prepare({ title, year, journal }) {
      return {
        title: title || 'Untitled Publication',
        subtitle: `${year || 'Year unknown'} - ${journal || ''}`,
      };
    },
  },
});
