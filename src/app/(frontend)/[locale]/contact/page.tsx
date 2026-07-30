import { setRequestLocale, getTranslations } from 'next-intl/server'
import { WA_NUMBER, MAIL, waLink } from '@/lib/site'

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <>
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('eyebrow')}</span></span>
          <h1 className="display">{t('title')}</h1>
          <p>{t('intro')}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            <a href={waLink('Hi Signature, I have an enquiry.')} className="btn-gold" target="_blank" rel="noopener">{t('whatsapp')}</a>
            <a href={`tel:+${WA_NUMBER}`} className="btn-ghost">{t('call')}</a>
            <a href={`mailto:${MAIL}`} className="btn-ghost">{t('email')}</a>
          </div>
        </div>
      </header>
    </>
  )
}
