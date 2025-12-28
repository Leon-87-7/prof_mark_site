import { defineType } from 'sanity';

/**
 * Stat - Statistics display component
 * Used for hero section stats like "40+ Years Experience"
 */
export default defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number',
      type: 'localizedString',
      description: 'The statistic value (e.g., "40+", "3000+")',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'localizedString',
      description: 'The statistic label (e.g., "Years Experience")',
    },
  ],
  preview: {
    select: {
      number: 'number.en',
      label: 'label.en',
    },
    prepare({ number, label }) {
      return {
        title: `${number || '?'} - ${label || 'Untitled'}`,
      };
    },
  },
});
