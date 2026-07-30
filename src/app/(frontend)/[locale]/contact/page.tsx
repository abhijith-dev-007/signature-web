import { setRequestLocale } from 'next-intl/server'
import { WA_NUMBER, MAIL, waLink } from '@/lib/site'

// Minimal contact page. The full form can POST to the Enquiries collection.
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <header className="page-head">
        <div className="inner">
          <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>Contact Us</span></span>
          <h1 className="display">Let&apos;s talk</h1>
          <p>Reach us on WhatsApp, phone or email — or send an enquiry and we&apos;ll get back to you.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            <a href={waLink('Hi Signature, I have an enquiry.')} className="btn-gold" target="_blank" rel="noopener">WhatsApp</a>
            <a href={`tel:+${WA_NUMBER}`} className="btn-ghost">Call Us</a>
            <a href={`mailto:${MAIL}`} className="btn-ghost">Email Us</a>
          </div>
        </div>
      </header>
    </>
  )
}
