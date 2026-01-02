import { defineType, defineField } from 'sanity';

/**
 * FAQ - Frequently Asked Questions (Collection)
 */
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "recovery_time")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedText',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Recovery', value: 'recovery' },
          { title: 'Risks', value: 'risks' },
          { title: 'Travel', value: 'travel' },
          { title: 'Results', value: 'results' },
          { title: 'General', value: 'general' },
        ],
      },
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
      question: 'question.en',
      category: 'category',
    },
    prepare({ question, category }) {
      return {
        title: question || 'Untitled FAQ',
        subtitle: category,
      };
    },
  },
});
