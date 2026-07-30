'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export type Property = {
  id: string
  title: string
  propertyType: 'house' | 'land'
  status: 'available' | 'sold'
  price?: string
  location?: string
  specs?: { value?: string }[]
  imageUrl?: string
}

type Tab = 'house' | 'land' | 'sold'

export function GalleryGrid({ properties }: { properties: Property[] }) {
  const t = useTranslations('gallery')
  const [tab, setTab] = useState<Tab>('house')

  const houseItems = properties.filter((p) => p.propertyType === 'house' && p.status !== 'sold')
  const landItems  = properties.filter((p) => p.propertyType === 'land'  && p.status !== 'sold')
  const soldItems  = properties.filter((p) => p.status === 'sold')

  const shown = tab === 'house' ? houseItems : tab === 'land' ? landItems : soldItems

  return (
    <>
      <div className="tabs">
        <button className={`tab ${tab === 'house' ? 'active' : ''}`} onClick={() => setTab('house')}>
          <span>{t('tabHouse')}</span><span className="cnt">{houseItems.length}</span>
        </button>
        <button className={`tab ${tab === 'land' ? 'active' : ''}`} onClick={() => setTab('land')}>
          <span>{t('tabLand')}</span><span className="cnt">{landItems.length}</span>
        </button>
        <button className={`tab ${tab === 'sold' ? 'active' : ''}`} onClick={() => setTab('sold')}>
          <span>{t('tabSold')}</span><span className="cnt">{soldItems.length}</span>
        </button>
      </div>

      <div className="gwrap">
        <div className="grid">
          {shown.map((p) => {
            const isSold = p.status === 'sold'
            const tagLabel = p.propertyType === 'land' ? 'Land · For Sale' : 'House · For Sale'
            return (
              <article className="gcard in" key={p.id}>
                <div className="gimg">
                  <div className="ph" style={{ backgroundImage: p.imageUrl ? `url('${p.imageUrl}')` : undefined }} />
                  {isSold
                    ? <span className="sold-stamp">{t('sold')}</span>
                    : <span className="gtag">{tagLabel}</span>}
                </div>
                <div className="gbody">
                  <div className="gloc">
                    <svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    <span>{p.location}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <div className={`gprice ${isSold ? '' : 'gold-text'}`} style={isSold ? { color: 'var(--text-dim)', textDecoration: 'line-through' } : undefined}>
                    {p.price}
                  </div>
                  {p.specs && p.specs.length > 0 && (
                    <div className="gspecs">
                      {p.specs.map((s, i) => <span key={i}>{s.value}</span>)}
                    </div>
                  )}
                  <Link href={`/gallery/${p.id}`} className="gcard-link">
                    {t('viewDetails')}
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
