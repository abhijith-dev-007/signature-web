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
                  <a href={wa} className="btn-whatsapp" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
                    {t('enquireWa')}
                  </a>
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
