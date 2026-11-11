import { useEffect, useRef } from 'react'
import ContactForm from './ContactForm'
import { Topo } from './Art'

/*
  Contact view: a panel that slides in over the page when a "Contact" link is clicked.
  Native <dialog>, so focus is held inside, Esc closes it and the page behind is inert.
  Full screen on phones, a right-hand panel on larger screens.
*/
export default function ContactView({ open, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal focuses the first button (Close); start in the first field instead
      dialog.querySelector('input')?.focus()
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
        if (e.target === ref.current) onClose() // click on the backdrop
      }}
      aria-labelledby="contact-view-title"
      className="contact-view m-0 ml-auto h-dvh max-h-none w-full max-w-none sm:max-w-lg bg-ocean-dark p-0 overflow-y-auto backdrop:bg-ocean-dark/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative min-h-full px-6 sm:px-10 pt-20 pb-10 flex flex-col">
        <Topo className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" color="#8fb9a8" variant={3} />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full text-sand/70 hover:text-sand hover:bg-sand/10 flex items-center justify-center transition-colors"
          aria-label="Close contact form"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-seaglass mb-4">Contact</p>
          <h2 id="contact-view-title" className="font-display text-4xl sm:text-5xl text-sand font-medium leading-tight mb-3">
            Get in touch
          </h2>
          <p className="text-sand/65 mb-8 leading-relaxed">Questions, partnerships, or just want to say g’day? Drop us a line.</p>
          {/* Mounted only while open, so the form starts fresh each time */}
          {open && <ContactForm />}
        </div>

        <a
          href="https://www.instagram.com/bommienoosa/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-auto pt-12 inline-flex items-center gap-2 text-sm text-sand/50 hover:text-seaglass transition-colors w-fit"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          @bommienoosa
        </a>
      </div>
    </dialog>
  )
}
