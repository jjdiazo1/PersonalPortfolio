'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const singletonTypes = ['siteConfig', 'hero', 'about']

export default defineConfig({
  name: 'default',
  title: 'JJD Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site Config').id('siteConfig')
              .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
            S.listItem().title('Hero').id('hero')
              .child(S.document().schemaType('hero').documentId('hero')),
            S.listItem().title('About').id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() && !singletonTypes.includes(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
