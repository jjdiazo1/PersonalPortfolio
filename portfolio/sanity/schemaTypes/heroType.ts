import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', title: 'First name', type: 'string' }),
    defineField({ name: 'lastName', title: 'Last name', type: 'string' }),
    defineField({ name: 'typewriterText', title: 'Typewriter text', type: 'string' }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile photo (desktop)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'profilePhotoMobile',
      title: 'Profile photo (mobile)',
      description: 'Optional. If not set, the desktop photo is used on mobile.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Stats strip',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'tickerItems',
      title: 'Ticker items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: { select: { title: 'firstName', subtitle: 'lastName' } },
})
