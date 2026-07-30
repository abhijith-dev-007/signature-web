'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { BrandMark } from './BrandMark'
import { waLink } from '@/lib/site'

export function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // strip the /en or /ml prefix to know the active path
  const path = pathname.replace(/^\/(en|ml)/, '') || '/'
  const is = (p: string) => (path === p ? 'active' : '')
  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="brand" onClick={close}>
          <BrandMark />
          <div>
            <div className="brand-name">SIGNATURE</div>
            <div className="brand-sub">Contractors &amp; Developers</div>
          </div>
        </Link>

        <ul className="nav-links">
          <li><Link href="/" className={is('/')}>{t('home')}</Link></li>
          <li><Link href="/about" className={is('/about')}>{t('about')}</Link></li>
          <li><Link href="/gallery" className={is('/gallery')}>{t('gallery')}</Link></li>
          <li><Link href="/services" className={is('/services')}>{t('services')}</Link></li>
          <li><Link href="/contact" className={is('/contact')}>{t('contact')}</Link></li>
        </ul>

        <div className="nav-right">
          <div className="lang-toggle">
            <Link href={path} locale="en" className={locale === 'en' ? 'on' : ''}>EN</Link>
            <Link href={path} locale="ml" className={locale === 'ml' ? 'on' : ''}>മല</Link>
          </div>
          <a href={waLink('Hi Signature, I have an enquiry.')} className="wa-btn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
            <span>{t('whatsapp')}</span>
          </a>
          <button
            className={`burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          <li><Link href="/" className={is('/')} onClick={close}>{t('home')}</Link></li>
          <li><Link href="/about" className={is('/about')} onClick={close}>{t('about')}</Link></li>
          <li><Link href="/gallery" className={is('/gallery')} onClick={close}>{t('gallery')}</Link></li>
          <li><Link href="/services" className={is('/services')} onClick={close}>{t('services')}</Link></li>
          <li><Link href="/contact" className={is('/contact')} onClick={close}>{t('contact')}</Link></li>
        </ul>
        <div className="mobile-menu-wa">
          <a href={waLink('Hi Signature, I have an enquiry.')} target="_blank" rel="noopener" onClick={close}>
            <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4H8a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2.3 1 2.3.7 2.7.6a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" /></svg>
            {t('whatsapp')}
          </a>
        </div>
      </div>
    </>
  )
}
