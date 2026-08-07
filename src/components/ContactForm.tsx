'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-form-card">
      <h3 className="contact-form-title">{t('formTitle')}</h3>
      {status === 'success' ? (
        <div className="contact-success">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--gold-2)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p>{t('formSuccess')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            className="cf-input"
            type="text"
            placeholder={t('formName')}
            value={form.name}
            onChange={set('name')}
            required
          />
          <input
            className="cf-input"
            type="email"
            placeholder={t('formEmail')}
            value={form.email}
            onChange={set('email')}
          />
          <input
            className="cf-input"
            type="tel"
            placeholder={t('formPhone')}
            value={form.phone}
            onChange={set('phone')}
          />
          <textarea
            className="cf-input cf-textarea"
            placeholder={t('formMessage')}
            value={form.message}
            onChange={set('message')}
            rows={4}
          />
          {status === 'error' && <p className="cf-error">{t('formError')}</p>}
          <button type="submit" className="btn-gold cf-submit" disabled={status === 'sending'}>
            {status === 'sending' ? t('formSending') : t('formSubmit')}
          </button>
        </form>
      )}
    </div>
  )
}
