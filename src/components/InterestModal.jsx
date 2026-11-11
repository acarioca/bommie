import { useEffect, useRef } from 'react'
import InterestForm from './InterestForm'

/*
  Register-interest pop-up. Uses the native <dialog> element, so focus is held inside,
  Esc closes it and the page behind is inert. Bottom sheet on phones, centred card above.
*/
export default function InterestModal({ open, onClose, details }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal focuses the first button (Close); put the cursor in the email field instead
      dialog.querySelector('input[type="email"]')?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prev
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose() // tap on the backdrop
      }}
      aria-labelledby="interest-modal-title"
      className="interest-modal m-0 mt-auto sm:m-auto w-full max-w-none sm:max-w-md bg-transparent p-0 backdrop:bg-ocean-dark/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative bg-sand-light rounded-t-[2rem] sm:rounded-[2rem] px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:p-10 shadow-2xl">
        <span className="sm:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-driftwood/20" aria-hidden="true"></span>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full text-driftwood-light hover:bg-driftwood/10 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-seaglass-dark mb-3">First drop</p>
        <h2 id="interest-modal-title" className="font-display text-3xl sm:text-4xl text-driftwood font-medium leading-tight mb-3 pr-8">
          Register your interest
        </h2>
        <p className="text-driftwood-light leading-relaxed mb-6">
          Be the first to know when Bommie drops, with <span className="font-semibold text-driftwood">10% off</span> for early
          sign-ups.
        </p>
        {details && (
          <p className="text-sm text-driftwood-light mb-4">
            Your pick: <span className="font-semibold text-driftwood">{details}</span>
          </p>
        )}
        {/* Mounted only while open, so the form starts fresh each time */}
        {open && <InterestForm key={details} variant="light" source="Poncho pop-up" details={details} buttonLabel="Register" />}
      </div>
    </dialog>
  )
}
