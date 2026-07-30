import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { HeroCarousel, type Slide } from '@/components/HeroCarousel'
import { waLink, mailLink } from '@/lib/site'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()

  const payload = await getPayload({ config })

  const [{ docs: slideDocs }, { docs: featured }, { docs: featuredServices }] = await Promise.all([
    payload.find({
      collection: 'hero-slides',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { active: { equals: true } },
      sort: 'order',
    }),
    payload.find({
      collection: 'properties',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { featured: { equals: true } },
      limit: 3,
    }),
    payload.find({
      collection: 'services',
      locale: locale as 'en' | 'ml',
      depth: 1,
      where: { and: [{ active: { equals: true } }, { featured: { equals: true } }] },
      sort: 'order',
      limit: 4,
    }),
  ])

  const slides: Slide[] = slideDocs.map((s: any) => ({
    id: String(s.id),
    title: s.title,
    eyebrow: s.eyebrow,
    subtitle: s.subtitle,
    ctaLabel: s.ctaLabel,
    ctaLink: s.ctaLink,
    imageUrl: s.image?.sizes?.hero?.url || s.image?.url,
  }))

  const divisions = [
    t('divisions.realEstate'),
    t('divisions.construction'),
    t('divisions.fire'),
    t('divisions.transport'),
  ]

  return (
    <>
      <HeroCarousel slides={slides} scrollLabel={t('hero.scroll')} />

      {/* DIVISIONS */}
      <section id="divisions">
        <div className="wrap">
          <div className="sec-head reveal in">
            <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('divisions.eyebrow')}</span></span>
            <h2 className="display">{t('divisions.title')}</h2>
          </div>
          <div className="divisions">
            {divisions.map((d, i) => (
              <div className="division reveal in" key={i}>
                <span className="dnum">{String(i + 1).padStart(2, '0')}</span>
                <h3>{d}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      {featured.length > 0 && (
        <section style={{ background: 'linear-gradient(180deg,var(--black),var(--graphite))' }}>
          <div className="wrap">
            <div className="sec-head reveal in">
              <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('featured.eyebrow')}</span></span>
              <h2 className="display">{t('featured.title')}</h2>
            </div>
            <div className="feat-grid">
              {featured.map((p: any) => {
                const img = p.images?.[0]?.sizes?.card?.url || p.images?.[0]?.url
                return (
                  <article className="pcard reveal in" key={p.id}>
                    <div className="pcard-img">
                      <div className="ph" style={img ? { backgroundImage: `url('${img}')` } : undefined} />
                      <span className="pcard-tag">{p.propertyType === 'land' ? 'Land · For Sale' : 'House · For Sale'}</span>
                    </div>
                    <div className="pcard-body">
                      <div className="pcard-loc">
                        <svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                        <span>{p.location}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <div className="pcard-price gold-text">{p.price}</div>
                    </div>
                  </article>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 52 }}>
              <Link href="/gallery" className="btn-ghost">{t('featured.viewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES PREVIEW */}
      {featuredServices.length > 0 && (
        <section id="services">
          <div className="wrap">
            <div className="sec-head reveal in">
              <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('servicesPreview.eyebrow')}</span></span>
              <h2 className="display">{t('servicesPreview.title')}</h2>
            </div>
            <div className="svc-grid">
              {featuredServices.map((s: any, i: number) => {
                const imgUrl = s.image?.sizes?.card?.url || s.image?.url
                const wa = waLink(`Hi Signature, I'd like to enquire about your ${s.name} service.`)
                const mail = mailLink(`Enquiry: ${s.name}`, `Hi Signature,\n\nI'd like to enquire about your ${s.name} service.\n\nThanks,`)
                return (
                  <div className="svc-card reveal in" key={s.id}>
                    <div
                      className="svc-card-img"
                      style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : undefined}
                    >
                      <span className="svc-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="svc-card-body">
                      <span className="eyebrow">{s.name}</span>
                      <h3 className="svc-card-title">{s.name}</h3>
                      {s.shortDesc && <p className="svc-card-desc">{s.shortDesc}</p>}
                      <div className="svc-card-cta">
                        <a className="btn-gold" href={wa} target="_blank" rel="noopener">
                          {t('servicesPreview.enquire')}
                        </a>
                        <a className="enq-mailbtn" href={mail}>
                          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                          <span>{t('services.email')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <Link href="/services" className="btn-ghost">{t('servicesPreview.viewAll')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="glow" />
        <div className="cta-inner reveal in">
          <div className="tag">{t('cta.tag')}</div>
          <h2 className="display">{t('cta.title')}</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <Link href="/services" className="btn-gold">{t('servicesPreview.viewAll')}</Link>
            <Link href="/gallery" className="btn-ghost">{t('featured.viewAll')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
