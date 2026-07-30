# Signature — Next.js + Payload CMS + MongoDB

The dynamic build of the Signature site. Next.js 15 (App Router) with Payload 3 embedded in the same app, MongoDB for storage, `next-intl` for the EN/ML routing, and local disk for media (S3-ready).

---

## What changed from the static mockup

| Static mockup | Dynamic build (this project) |
|---|---|
| Hardcoded hero slides | `HeroSlides` collection — client uploads image + text per slide in the admin |
| Hardcoded property cards | `Properties` collection — client adds/edits/marks-sold; 3 gallery sections are filters on it |
| Hardcoded service rows | `Services` collection — client adds more; they auto-appear |
| `data-en` / `data-ml` + JS toggle | Real `/en` and `/ml` routes (`next-intl`); UI strings in `messages/*.json`, content via Payload `localized` fields |
| Images in the file | `Media` collection → `/public/media` (local now), S3 later with zero code change |
| `wa.me` / `mailto` links | Same — built at render time with the property/service name pre-filled |
| No admin | Payload admin at `/admin`, auto-generated from the collections |

---

## First-time setup

This folder contains the **content + frontend layer**. Payload's admin route files
(`src/app/(payload)/...`) are auto-generated, so generate a base once and drop these in:

```bash
# 1. Generate a Payload 3 base (blank template) in a temp folder
npx create-payload-app@latest signature-base --template blank --db mongodb
#    → pick MongoDB, TypeScript

# 2. Copy the generated  src/app/(payload)/  folder into THIS project
#    (that's the admin + api routes; everything else here overrides the base)

# 3. Install deps in THIS project
npm install --legacy-peer-deps
npm install next-intl

# 4. Env
cp .env.example .env
#    → fill DATABASE_URI (Mongo Atlas) and PAYLOAD_SECRET (openssl rand -base64 32)

# 5. Run
npm run dev
```

Then:
- Admin: <http://localhost:3000/admin> (create the first user)
- Site: <http://localhost:3000/en> and <http://localhost:3000/ml>

> Payload requires all `@payloadcms/*` packages to share the exact same version.
> After `npm install`, pin them together (replace the `latest` entries in package.json).

---

## Mongo Atlas connection (your pain point, pre-solved)

Payload holds a persistent connection. On Atlas free tier this is fine. The `mongoose`
adapter uses the standard `mongodb+srv` URI — no pooler gymnastics like the Supabase/Prisma
case. Just make sure your Atlas **Network Access** allows your IP (or `0.0.0.0/0` for dev),
and that the DB name in the URI is `signature`.

---

## Adding content (what the client does)

1. **Hero slides** → Content → Hero Slides → *Add New* → upload image, type headline/subtitle
   in EN, switch the field to **മലയാളം**, type the ML version, set order, save.
2. **Properties** → Content → Properties → *Add New* → type, status, price, images, EN+ML text.
   Mark `featured` to surface on the homepage. Flip `status` to **Sold** when it sells.
3. **Services** → Content → Services → *Add New* → name, description, image, features, order.

All localized fields show an **EN / മലയാളം** switcher automatically.

---

## Media: local now → S3 later

Uploads land in `/public/media` (served at `/media/...`). To move to S3:
1. `npm i @payloadcms/storage-s3`
2. Uncomment the `s3Storage` plugin block in `src/payload.config.ts`, fill the `S3_*` env vars.
3. Copy existing `/public/media` files into the bucket once.
Collections and frontend need no changes.

> Deploy to a host with a **persistent disk** (Lightsail, Railway w/ volume, Render w/ disk).
> On ephemeral filesystems, local uploads vanish on redeploy — attach a volume or go S3.

---

## Still to build

- **About** and **Contact** pages are placeholders (`/about`, `/contact`) — port the approved
  mockups + wire the contact form to POST into the `Enquiries` collection.
- Swap `WA_NUMBER` and `MAIL` in `src/lib/site.ts` for the real values before launch.

## Structure

```
src/
  payload.config.ts        # localization (en/ml), mongo, collections, storage
  collections/             # Properties, Services, HeroSlides, Media, Users, Enquiries
  i18n/                    # next-intl routing + request config
  middleware.ts            # /en /ml routing
  components/              # Nav, Footer, HeroCarousel, GalleryGrid, BrandMark
  lib/site.ts              # WhatsApp/mail helpers + numbers
  app/(frontend)/[locale]/ # home, gallery, services, about, contact + globals.css
  app/(payload)/           # ← generate with create-payload-app, then drop in
messages/                  # en.json, ml.json (static UI strings)
```
