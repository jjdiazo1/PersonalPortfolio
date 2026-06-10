import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'JJD Portfolio',

  projectId: 'sdi477hx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => {
        const singletonTypes = ['siteConfig', 'hero', 'about']
        return S.list()
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
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
