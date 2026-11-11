import { useState } from 'react'
import { INBOX, sendToInbox } from '../lib/formsubmit'

/*
  Footer contact form: name, email, message. Delivered to the Bommie inbox;
  replying to the email goes straight to the sender (_replyto).
*/
const field =
  'w-full px-5 py-3.5 rounded-2xl bg-sand/[0.06] border border-sand/15 text-sand placeholder-sand/45 focus:outline-none focus:border-seaglass focus:bg-sand/10 transition-colors text-base'

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (e.currentTarget.elements._honey?.value) return // bot
    setStatus('sending')
    try {
      await sendToInbox({
        name: values.name,
        email: values.email,
        message: values.message,
        _replyto: values.email,
        _subject: `New message from ${values.name || 'the website'}`,
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl border border-sand/15 bg-sand/[0.06] p-8">
        <p className="font-display text-2xl text-sand mb-2">Thanks{values.name ? `, ${values.name.split(' ')[0]}` : ''}!</p>
        <p className="text-sand/70">We’ve got your message and will get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input id="contact-name" name="name" autoComplete="name" placeholder="Name" value={values.name} onChange={set('name')} className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={values.email}
            onChange={set('email')}
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Your message"
          value={values.message}
          onChange={set('message')}
          className={`${field} resize-none`}
        />
      </div>
      {/* Honeypot: hidden from people, tempting for bots */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-3.5 rounded-full bg-sand text-ocean-dark text-base font-semibold hover:bg-seaglass transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <a href={`mailto:${INBOX}`} className="text-sm text-sand/50 hover:text-seaglass transition-colors">
          or email {INBOX}
        </a>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm text-[#f3b39a]">
          That didn’t go through. Please try again, or email us at{' '}
          <a href={`mailto:${INBOX}`} className="underline">{INBOX}</a>.
        </p>
      )}
    </form>
  )
}
