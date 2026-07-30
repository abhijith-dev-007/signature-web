import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { GalleryGrid, type Property } from '@/components/GalleryGrid'

type Media = { url?: string; sizes?: { card?: { url?: string } } }

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('gallery')

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'properties',
    locale: locale as 'en' | 'ml',
    depth: 1,
    limit: 200,
    sort: '-createdAt',
  })

  const properties: Property[] = docs.map((d: any) => {
    const first = Array.isArray(d.images) ? (d.images[0] as Media) : undefined
    return {
      id: String(d.id),
      title: d.title,
      propertyType: d.propertyType,
      status: d.status,
      price: d.price,
      location: d.location,
      specs: d.specs,
      imageUrl: first?.sizes?.card?.url || first?.url,
    }
  })

  return (
    <>
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('eyebrow')}</span></span>
          <h1 className="display">{t('title')}</h1>
          <p>{t('intro')}</p>
        </div>
      </header>
      <GalleryGrid properties={properties} />
    </>
  )
}
