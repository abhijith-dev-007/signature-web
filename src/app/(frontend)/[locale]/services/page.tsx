import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { waLink, mailLink } from '@/lib/site'

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('services')

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'services',
    locale: locale as 'en' | 'ml',
    depth: 1,
    where: { active: { equals: true } },
    sort: 'order',
    limit: 50,
  })

  return (
    <>
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('eyebrow')}</span></span>
          <h1 className="display">{t('title')}</h1>
        </div>
      </header>

      <section className="swrap">
        {docs.map((s: any, i: number) => {
          const img = s.image?.sizes?.card?.url || s.image?.url
          const wa = waLink(`Hi Signature, I'd like to enquire about your ${s.name} service.`)
          const mail = mailLink(`Enquiry: ${s.name}`, `Hi Signature,\n\nI'd like to enquire about your ${s.name} service.\n\nThanks,`)
          return (
            <div className="srow" key={s.id}>
              <div className="simg-wrap">
                <span className="snum">{String(i + 1).padStart(2, '0')}</span>
                <div className="simg" style={img ? { backgroundImage: `url('${img}')` } : undefined} />
              </div>
              <div className="stext">
                <span className="eyebrow">{s.name}</span>
                <h2>{s.name}</h2>
                <p>{s.fullDesc || s.shortDesc}</p>
                {s.features?.length > 0 && (
                  <ul className="sfeat">
                    {s.features.map((f: any, fi: number) => <li key={fi}>{f.value}</li>)}
                  </ul>
                )}
                <div className="srow-cta">
                  <a href={wa} className="btn-gold" target="_blank" rel="noopener">{t('enquireWa')}</a>
                  <a href={mail} className="enq-mailbtn">
                    <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                    <span>{t('email')}</span>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
