import { defineField, defineType } from 'sanity'

export const siteConfigType = defineType({
  name: 'siteConfig',
  title: 'Site Config',
  type: 'document',
  fields: [
    defineField({ name: 'logo', title: 'Logo text', type: 'string' }),
    defineField({ name: 'statusLabel', title: 'Status label', type: 'string' }),
    defineField({
      name: 'navItems',
      title: 'Nav items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'logo' } },
})
