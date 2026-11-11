import { useState } from 'react'

/*
  Register-interest form: one email field. Submissions are relayed by FormSubmit
  (no backend needed) and arrive as an email at INTEREST_INBOX.
  The very first submission triggers a one-time activation email to that inbox;
  click the link in it and every submission after that is delivered.
*/
const INTEREST_INBOX = 'hello@bommienoosa.com'
const ENDPOINT = `https://formsubmit.co/ajax/${INTEREST_INBOX}`

const STYLES = {
  light: {
    form: 'bg-sand-light border-driftwood/15',
    input: 'text-driftwood placeholder-driftwood/45',
    button: 'bg-driftwood text-sand hover:bg-ocean',
    note: 'text-driftwood-light',
    error: 'text-sunset-dark',
  },
  dark: {
    form: 'bg-sand/10 border-sand/15 backdrop-blur-sm',
    input: 'text-sand placeholder-sand/50',
    button: 'bg-sand text-ocean-dark hover:bg-seaglass',
    note: 'text-sand/70',
    error: 'text-[#f3b39a]',
  },
}

export default function InterestForm({ variant = 'dark', source, details, buttonLabel = 'I’m interested', className = '' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const s = STYLES[variant]

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const honey = e.currentTarget.elements._honey?.value
    if (honey) return // bots fill the hidden field; silently ignore
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          _subject: 'New Bommie interest',
          _template: 'table',
          ...(source ? { 'Signed up from': source } : {}),
          ...(details ? { 'Their pick': details } : {}),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Request failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className={`text-base font-medium ${s.note} ${className}`} role="status">
        You’re on the list. We’ll be in touch when Bommie drops.
      </p>
    )
  }

  return (
    <div className={className}>
      <form
        onSubmit={submit}
        className={`flex flex-col sm:flex-row gap-2 p-2 rounded-[2rem] sm:rounded-full border ${s.form}`}
      >
        <label className="sr-only" htmlFor={`interest-email-${source || variant}`}>
          Email address
        </label>
        <input
          id={`interest-email-${source || variant}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={`flex-1 min-w-0 px-5 py-3 rounded-full bg-transparent focus:outline-none text-base ${s.input}`}
        />
        {/* Honeypot: hidden from people, tempting for bots */}
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`px-7 py-3 rounded-full text-base font-semibold transition-colors whitespace-nowrap disabled:opacity-60 ${s.button}`}
        >
          {status === 'sending' ? 'Sending…' : buttonLabel}
        </button>
      </form>
      {status === 'error' && (
        <p className={`mt-3 text-sm ${s.error}`} role="alert">
          That didn’t go through. Please try again, or email us at{' '}
          <a href={`mailto:${INTEREST_INBOX}`} className="underline">
            {INTEREST_INBOX}
          </a>
          .
        </p>
      )}
    </div>
  )
}
