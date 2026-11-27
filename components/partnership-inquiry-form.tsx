'use client'

import { useRef, useState, type FormEvent } from 'react'
import { capturePostHogEvent } from '@/lib/posthog-events'
import styles from '@/app/marketing-layout.module.css'

export default function PartnershipInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const inquiryId = useRef<string | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending' || status === 'done') return
    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    const partnerType = String(fields.partnerType || 'other')
    const query = new URLSearchParams(window.location.search)
    const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].map(key => [key, (query.get(key) || '').slice(0, 200)]))
    inquiryId.current ??= crypto.randomUUID()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, interest: 'partnership', intake: 'short', inquiryId: inquiryId.current, attribution }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) throw new Error(result?.error || 'We could not send your inquiry. Please try again.')
      setStatus('done')
      capturePostHogEvent('partnership_inquiry_submitted', { partner_type: partnerType })
    } catch (issue) {
      setStatus('error')
      setError(issue instanceof Error ? issue.message : 'Please try again or email hello@topostitch.dev.')
    }
  }

  if (status === 'done') return <div className={`${styles.card} ${styles.requestSuccess}`} role="status">
    <h2>Inquiry received</h2>
    <p>Thanks for sharing your project. We’ll review the fit and follow up by email. Any production scope, terms, and timing are agreed before work begins.</p>
  </div>

  return <form id="inquiry" className={`${styles.form} ${styles.partnershipForm}`} onSubmit={submit} aria-busy={status === 'sending'}>
    <fieldset disabled={status === 'sending'}>
      <legend>Tell us about the collaboration</legend>
      <div className={styles.partnershipFields}>
        <label>Your name<input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label>Organization<input name="organization" autoComplete="organization" maxLength={200} required /></label>
        <label>Organization website <span className={styles.note}>Optional</span><input name="storeUrl" type="url" autoComplete="url" placeholder="https://example.com" maxLength={1000} /></label>
        <label>How do you work with 3D?
          <select name="partnerType" defaultValue="agency" required>
            <option value="agency">Agency or studio</option>
            <option value="developer">Developer or integrator</option>
            <option value="manufacturer">Brand or manufacturer</option>
            <option value="provider">3D production provider</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>Approximate product volume <span className={styles.note}>Optional</span>
          <select name="skuVolume" defaultValue="">
            <option value="">Not sure yet</option>
            <option value="1-5">1–5 products</option>
            <option value="6-25">6–25 products</option>
            <option value="26-100">26–100 products</option>
            <option value="100+">More than 100 products</option>
          </select>
        </label>
        <label>Possible timeline <span className={styles.note}>Optional</span>
          <select name="timeline" defaultValue="">
            <option value="">To be discussed</option>
            <option value="soon">Within 30 days</option>
            <option value="quarter">Within 1–3 months</option>
            <option value="later">More than 3 months</option>
          </select>
        </label>
      </div>
      <label>What kind of support are you exploring?
        <textarea name="message" rows={5} maxLength={4000} placeholder="For example: white-label product modeling, a catalog pilot, asset optimization, or a developer handoff." required />
      </label>
      <div hidden><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required />
        <span>TopoStitch may email me to respond to this partnership inquiry. This does not subscribe me to marketing updates. <a href="/privacy">Privacy notice</a>.</span>
      </label>
    </fieldset>
    {status === 'error' && <p role="alert">{error}</p>}
    <button className={styles.button} type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send partnership inquiry'}</button>
  </form>
}
