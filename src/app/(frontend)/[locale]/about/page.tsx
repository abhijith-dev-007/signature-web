import { setRequestLocale } from 'next-intl/server'

// Placeholder — port the approved About mockup here when ready.
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <header className="page-head">
      <div className="inner">
        <span className="eyebrow"><span className="rule" />&nbsp;&nbsp;<span>About Us</span></span>
        <h1 className="display">Built on Trust</h1>
        <p>About page content — story, milestones, credentials. To be designed & wired next.</p>
      </div>
    </header>
  )
}
