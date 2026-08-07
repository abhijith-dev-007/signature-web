import { setRequestLocale, getTranslations } from 'next-intl/server'
import { waLink } from '@/lib/site'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  return (
    <>
      {/* Hero */}
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('eyebrow')}</span></span>
          <h1 className="display">{t('title')}</h1>
          <p>{t('intro')}</p>
        </div>
      </header>

      {/* Stats */}
      <div className="stats">
        <div className="stat"><div className="num gold-text">{t('stat1Num')}</div><div className="lbl">{t('stat1Lbl')}</div></div>
        <div className="stat"><div className="num gold-text">{t('stat2Num')}</div><div className="lbl">{t('stat2Lbl')}</div></div>
        <div className="stat"><div className="num gold-text">{t('stat3Num')}</div><div className="lbl">{t('stat3Lbl')}</div></div>
        <div className="stat"><div className="num gold-text">{t('stat4Num')}</div><div className="lbl">{t('stat4Lbl')}</div></div>
      </div>

      {/* Story */}
      <section className="about-section" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('storyEyebrow')}</span></span>
          <h2>{t('storyTitle')}</h2>
          <div className="about-story">
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-section">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>{t('valEyebrow')}</span></span>
          <h2>{t('valTitle')}</h2>
          <div className="val-grid">
            <div className="val-card">
              <div className="val-icon">🤝</div>
              <div className="val-title">{t('v1Title')}</div>
              <p className="val-desc">{t('v1Desc')}</p>
            </div>
            <div className="val-card">
              <div className="val-icon">🏗️</div>
              <div className="val-title">{t('v2Title')}</div>
              <p className="val-desc">{t('v2Desc')}</p>
            </div>
            <div className="val-card">
              <div className="val-icon">⭐</div>
              <div className="val-title">{t('v3Title')}</div>
              <p className="val-desc">{t('v3Desc')}</p>
            </div>
            <div className="val-card">
              <div className="val-icon">💡</div>
              <div className="val-title">{t('v4Title')}</div>
              <p className="val-desc">{t('v4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid var(--line)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,64px)', textAlign: 'center' }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>SIGNATURE CONTRACTORS & DEVELOPERS</p>
        <h2 className="display" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', marginBottom: 32 }}>
          Ready to build your dream?
        </h2>
        <a href={waLink('Hi Signature, I have an enquiry about your services.')} className="btn-whatsapp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
          Enquire on WhatsApp
        </a>
      </section>
    </>
  )
}
