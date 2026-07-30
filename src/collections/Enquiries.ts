import type { CollectionConfig } from 'payload'

// Optional: records contact-form / enquiry leads in the admin so the
// client has a lead history (WhatsApp/mail buttons still work without this).
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'service', 'createdAt'],
    group: 'Leads',
  },
  access: {
    create: () => true, // public form can create
    read: ({ req }) => Boolean(req.user), // only logged-in admins can read
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'service', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'propertyRef', type: 'text', label: 'Property / listing referenced' },
  ],
}
