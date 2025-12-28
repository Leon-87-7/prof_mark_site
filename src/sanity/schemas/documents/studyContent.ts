import { defineType, defineField } from 'sanity';

/**
 * Study Content - Educational content items (Collection)
 * Articles, case studies, lectures, and research papers
 */
export default defineType({
  name: 'studyContent',
  title: 'Study Content',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "article_1")',
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
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Case Study', value: 'case_study' },
          { title: 'Video Lecture', value: 'lecture' },
          { title: 'Research Paper', value: 'research' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'typeLabel',
      title: 'Type Label',
      type: 'localizedString',
      description: 'Display label for the content type',
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date Label',
      type: 'localizedString',
      description: 'Formatted date display (e.g., "Published January 2024")',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (for lectures)',
      type: 'localizedString',
      description: 'Video duration (e.g., "45 minutes")',
      hidden: ({ parent }) => parent?.contentType !== 'lecture',
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
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'cardColor',
      title: 'Card Header Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Red', value: 'red' },
          { title: 'Orange', value: 'orange' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Teal', value: 'teal' },
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
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      emoji: 'emoji',
      contentType: 'contentType',
    },
    prepare({ title, emoji, contentType }: { title?: string; emoji?: string; contentType?: string }) {
      const typeLabels: Record<string, string> = {
        article: 'Article',
        case_study: 'Case Study',
        lecture: 'Video Lecture',
        research: 'Research Paper',
      };
      return {
        title: title || 'Untitled Content',
        subtitle: contentType ? (typeLabels[contentType] || contentType) : 'Unknown',
        media: () => emoji || '📄',
      };
    },
  },
});
