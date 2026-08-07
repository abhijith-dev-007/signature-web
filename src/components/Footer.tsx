import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MAIL, WA_NUMBER, ALT_NUMBER } from '@/lib/site'
import { BrandMark } from './BrandMark'

export function Footer() {
  const t = useTranslations()
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <BrandMark />
            <div>
              <div className="brand-name gold-text">SIGNATURE</div>
              <div className="brand-sub" style={{ letterSpacing: '.24em', color: 'var(--gold-2)', fontSize: '.6rem', textTransform: 'uppercase', marginTop: 4 }}>
                Contractors &amp; Developers
              </div>
            </div>
          </div>
        </div>
        <div className="foot-col">
          <h4>{t('nav.gallery')}</h4>
          <Link href="/">{t('nav.home')}</Link>
          <Link href="/about">{t('nav.about')}</Link>
          <Link href="/gallery">{t('nav.gallery')}</Link>
          <Link href="/services">{t('nav.services')}</Link>
        </div>
        <div className="foot-col">
          <h4>{t('nav.contact')}</h4>
          <p>{t('footer.address')}</p>
          <a href={`tel:+${WA_NUMBER}`}>+{WA_NUMBER}</a>
          <a href={`tel:+${ALT_NUMBER}`}>+{ALT_NUMBER}</a>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
        </div>
        <div className="foot-col">
          <h4>{t('footer.followUs')}</h4>
          <div className="foot-social">
            <a href="https://www.facebook.com/Signaturewynd" target="_blank" rel="noopener" aria-label="Facebook" className="social-icon">
              <svg viewBox="0 0 24 24"  fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="social-icon social-icon-wa">
              <svg viewBox="0 0 24 24"  fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  )
}
