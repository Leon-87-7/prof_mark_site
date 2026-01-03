import { defineType } from 'sanity';

/**
 * CTA Button - Call-to-action button component
 * Used throughout the site for navigation and actions
 */
export default defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'localizedString',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'URL path (e.g., "/clinics" or "https://...")',
    },
    {
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Tertiary', value: 'tertiary' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    },
  ],
  preview: {
    select: {
      text: 'text.en',
      variant: 'variant',
    },
    prepare({ text, variant }) {
      return {
        title: text || 'Untitled Button',
        subtitle: variant ? `Style: ${variant}` : undefined,
      };
    },
  },
});
