import { defineType, defineField } from 'sanity';

/**
 * Guide - Patient guides (Collection)
 * Pre-surgery and post-surgery guides with downloadable PDFs
 */
export default defineType({
  name: 'guide',
  title: 'Patient Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "checklist", "first_week")',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pre-Surgery', value: 'pre_surgery' },
          { title: 'Post-Surgery', value: 'post_surgery' },
          { title: 'Quick Access', value: 'quick_access' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'downloadFile',
      title: 'Download File (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order within the category',
    }),
  ],
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      emoji: 'emoji',
      category: 'category',
    },
    prepare({ title, emoji, category }: { title?: string; emoji?: string; category?: string }) {
      const categoryLabels: Record<string, string> = {
        pre_surgery: 'Pre-Surgery',
        post_surgery: 'Post-Surgery',
        quick_access: 'Quick Access',
      };
      const categoryLabel = category ? (categoryLabels[category] || category) : 'Unknown';

      return {
        title: title || 'Untitled Guide',
        subtitle: categoryLabel,
        media: () => emoji || '📋',
      };
    },
  },
});
