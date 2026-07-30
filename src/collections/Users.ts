import type { CollectionConfig } from 'payload'

// Admin login accounts. Payload auto-builds the auth/login UI from this.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'name', type: 'text' },
  ],
}
