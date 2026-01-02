import { defineType, defineField } from 'sanity';

/**
 * Testimonial - Patient testimonials (Collection)
 */
export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'localizedString',
      description: 'Name and location (e.g., "Sarah M., Canada")',
    }),
    defineField({
      name: 'rating',
      title: 'Rating Display',
      type: 'string',
      description: 'Star rating display (e.g., "★★★★★")',
      initialValue: '★★★★★',
    }),
    defineField({
      name: 'ratingNumber',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'localizedText',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
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
      author: 'author.en',
      rating: 'rating',
      image: 'image',
    },
    prepare({ author, rating, image }) {
      return {
        title: author || 'Anonymous',
        subtitle: rating,
        media: image,
      };
    },
  },
});
