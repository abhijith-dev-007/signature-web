import type { CollectionConfig } from 'payload'

// GALLERY listings. The 3 gallery sections are just filters on this one
// collection: propertyType=house, propertyType=land, status=sold.
export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'propertyType', 'status', 'price'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'propertyType',
      type: 'select',
      required: true,
      defaultValue: 'house',
      options: [
        { label: 'House for Sale', value: 'house' },
        { label: 'Land for Sale', value: 'land' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
      ],
    },
    { name: 'price', type: 'text', localized: true, admin: { description: 'e.g. ₹ 1.8 Cr' } },
    { name: 'location', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'specs',
      type: 'array',
      labels: { singular: 'Spec', plural: 'Specs' },
      admin: { description: 'e.g. "4 Beds", "2400 sqft"' },
      fields: [{ name: 'value', type: 'text', localized: true }],
    },
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'featured', type: 'checkbox', label: 'Show on homepage', defaultValue: false },
  ],
}
