import { defineField, defineType } from 'sanity'

export const jobType = defineType({
  name: 'job',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job title', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'type', title: 'Type (e.g. Internship)', type: 'string' }),
    defineField({ name: 'period', title: 'Period', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'logo', title: 'Logo path (e.g. /Logos/company.png)', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'company' } },
})
