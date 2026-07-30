import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { MAIL, WA_NUMBER } from '@/lib/site'
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
          <p>Palakkad, Kerala, India</p>
          <a href={`tel:+${WA_NUMBER}`}>+{WA_NUMBER}</a>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  )
}
