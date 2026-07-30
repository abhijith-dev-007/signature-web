import type { CollectionConfig } from 'payload'

// DYNAMIC HERO CAROUSEL. Each slide = one admin-uploaded image + text.
export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
    group: 'Content',
  },
  access: { read: () => true },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: 'Headline' },
    { name: 'eyebrow', type: 'text', localized: true, label: 'Eyebrow (small line above headline)' },
    { name: 'subtitle', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'ctaLabel', type: 'text', localized: true, label: 'Button text (optional)' },
    { name: 'ctaLink', type: 'text', label: 'Button link (optional)' },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
