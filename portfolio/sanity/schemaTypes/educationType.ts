import { defineField, defineType } from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string' }),
    defineField({ name: 'short', title: 'Short name', type: 'string' }),
    defineField({ name: 'degree', title: 'Degree / Program', type: 'string' }),
    defineField({ name: 'period', title: 'Period', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo path (e.g. /Logos/insa.png)', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'period' } },
})
