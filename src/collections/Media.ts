import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', localized: true, label: 'Alt text (EN/ML)' },
  ],
}
