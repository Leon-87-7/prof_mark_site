import { defineType, defineField } from 'sanity';

/**
 * Clinic - Clinic location information (Collection)
 * Represents physical clinics and virtual consultation
 */
export default defineType({
  name: 'clinic',
  title: 'Clinic',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Internal ID (e.g., "haifa", "kiryat_motzkin", "virtual")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      initialValue: '🏥',
    }),
    defineField({
      name: 'title',
      title: 'Clinic Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
      description: 'Optional subtitle or description',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Location Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'location',
      title: 'Address',
      type: 'localizedString',
    }),
    defineField({
      name: 'hoursLabel',
      title: 'Hours Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'hours',
      title: 'Working Hours',
      type: 'localizedString',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'services',
      title: 'Available Services',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Full iframe src URL from Google Maps',
    }),
    defineField({
      name: 'visibleForLocales',
      title: 'Visible For Languages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hebrew', value: 'he' },
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
        ],
      },
      initialValue: ['he', 'en', 'ru'],
      description: 'Which languages should display this clinic',
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
      identifier: 'identifier',
      emoji: 'emoji',
    },
    prepare({ title, identifier, emoji }) {
      return {
        title: title || identifier || 'Untitled Clinic',
        subtitle: identifier,
        media: () => emoji || '🏥',
      };
    },
  },
});
