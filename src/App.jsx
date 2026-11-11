import { useEffect, useState } from 'react'
import {
  Marquee,
  Reveal,
  Topo,
} from './components/Art'
import ContactView from './components/ContactView'
import FeatureStory from './components/FeatureStory'
import Hero from './components/Hero'
import InstagramGrid from './components/InstagramGrid'
import InterestForm from './components/InterestForm'
import OurStory from './components/OurStory'
import ProductConfigurator from './components/ProductConfigurator'
import './App.css'

const navLinks = [
  { href: '#collection', label: 'The poncho' },
  { href: '#about', label: 'Our story' },
  { href: '#get-in-touch', label: 'Contact' },
]

// Ribbon: the poncho's features, all taken from the product copy
const ribbonWords = ['Fully waterproof', 'Folds into its own bag', 'Zipped waterproof pockets', 'Quick-dry cotton', 'Car seats stay dry', 'Born in Noosa']

/* Organic wave used to blend one section into the next.
   Sits on the colour of the section above and fills with the colour below. */
function Wave({ from, to, flip = false }) {
  return (
    <div className={`${from} leading-[0] relative z-10`} aria-hidden="true">
      <svg
        className={`block w-full h-12 md:h-20 ${flip ? '-scale-x-100' : ''}`}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C150,75 300,10 480,35 C660,60 780,15 960,30 C1080,40 1140,55 1200,45 L1200,80 L0,80 Z"
          className={to}
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

function Wordmark({ light = false, size = 'text-3xl' }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`font-logo ${size} font-semibold tracking-[-0.04em] ${light ? 'text-sand' : 'text-driftwood'}`}>
        bommie
      </span>
      {/* <span className={`font-hand text-lg ${light ? 'text-seaglass' : 'text-sunset-dark'}`}>Noosa</span> */}
    </span>
  )
}

function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p className={`font-hand text-2xl md:text-[1.7rem] mb-2 ${light ? 'text-seaglass' : 'text-sunset-dark'} ${className}`}>
      {children}
    </p>
  )
}


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Contact opens as a view over the page; links to #get-in-touch (or that URL hash) open it
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = (e) => {
    e?.preventDefault()
    setMobileMenuOpen(false)
    setContactOpen(true)
  }
  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === '#get-in-touch') {
        setContactOpen(true)
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const linkProps = (href) => (href === '#get-in-touch' ? { onClick: openContact, 'aria-haspopup': 'dialog' } : {})

  // Keep the nav out of the way until the hero has scrolled past
  const [navVisible, setNavVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('[data-hero]')
      setNavVisible(!hero || hero.getBoundingClientRect().bottom <= 64)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-sand overflow-x-clip">
      {/* Navigation */}
      <nav
        inert={!navVisible}
        className={`nav-wave fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-md transition-[translate,opacity] duration-500 ease-out ${
          navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="px-8 md:px-12 lg:px-[3.25rem]">
          <div className="flex items-center justify-between h-16">
            <a href="#" aria-label="Bommie Surf Co home">
              <Wordmark size="text-2xl" />
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} {...linkProps(link.href)} className="relative text-[15px] font-medium text-driftwood-light hover:text-driftwood transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-sunset after:rounded-full after:transition-all hover:after:w-full">
                  {link.label}
                </a>
              ))}
              <a href="#collection" className="bg-driftwood text-sand px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-sunset-dark transition-colors">
                Shop now
              </a>
            </div>
            <button
              type="button"
              className="md:hidden text-driftwood"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-sand border-t border-sand-dark/60 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block text-base font-medium text-driftwood-light" onClick={() => setMobileMenuOpen(false)} {...linkProps(link.href)}>
                {link.label}
              </a>
            ))}
            <a href="#collection" className="block bg-driftwood text-sand px-6 py-3 rounded-full text-sm font-semibold text-center" onClick={() => setMobileMenuOpen(false)}>
              Shop now
            </a>
          </div>
        )}
      </nav>

      <Hero />

      {/* Ribbon laid across the seam between the hero and the page */}
      <section className="relative z-20 -mt-5 md:-mt-6" aria-label="Poncho features">
        <div className="-rotate-[1.25deg] scale-x-110 shadow-md shadow-ocean-dark/15">
          <Marquee items={ribbonWords} separator="✺" className="bg-sand-dark text-driftwood text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] py-2.5 md:py-3" />
        </div>
      </section>

      {/* The poncho, with customisation */}
      <ProductConfigurator />

      <Wave from="bg-sand" to="text-ocean-deep" />

      {/* Features: scroll story built on the ribbon */}
      <FeatureStory />

      <Wave from="bg-ocean-deep" to="text-sand-light" flip />

      {/* Our story */}
      <OurStory />

      {/* Instagram (hidden until photos are added to src/assets/instagram/) */}
      <InstagramGrid />

      <Wave from="bg-sand-light" to="text-ocean-dark" flip />

      {/* Contact */}
      <section id="contact" className="relative pt-20 pb-24 md:pb-32 px-6 lg:px-8 bg-ocean-dark overflow-hidden">
        <Topo className="absolute inset-0 w-full h-full opacity-15" color="#8fb9a8" variant={3} />
        <Reveal className="relative max-w-2xl mx-auto text-center">
          <Eyebrow light>expression of interest</Eyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-sand font-medium mb-6">Want a Bommie?</h2>
          <p className="text-sand/75 mb-12 leading-relaxed text-base md:text-lg">
            We're putting the finishing touches on our first drop. Register your interest to get{' '}
            <span className="font-hand text-3xl text-sunset whitespace-nowrap">10% off</span> and be the first to know when Bommie hits the lineup.
          </p>
          <InterestForm variant="dark" source="Want a Bommie section" className="max-w-lg mx-auto" />
          <p className="font-hand text-sand/60 text-xl mt-6">No spam, just surf. We'll only email you when it matters.</p>
        </Reveal>
      </section>
      {/* Footer */}
      <footer className="relative bg-ocean-dark border-t border-sand/10 pt-16 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-14">
            <div>
              <p className="mb-3"><Wordmark light /></p>
              <p className="text-sand/60 text-base leading-relaxed max-w-sm">
                Surf gear made on the Australian coast. Designed for surfers, by surfers.
              </p>
            </div>
            <nav aria-label="Footer" className="md:justify-self-end">
              <h4 className="font-display text-sand text-lg font-medium mb-5">Explore</h4>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
                <li><a href="#collection" className="text-sand/60 hover:text-seaglass transition-colors">The poncho</a></li>
                <li><a href="#about" className="text-sand/60 hover:text-seaglass transition-colors">Our story</a></li>
                <li><a href="#contact" className="text-sand/60 hover:text-seaglass transition-colors">Register interest</a></li>
                <li><a href="#get-in-touch" {...linkProps('#get-in-touch')} className="text-sand/60 hover:text-seaglass transition-colors">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="border-t border-sand/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sand/50 text-sm">&copy; 2026 Bommie Surf Co. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/bommienoosa/" target="_blank" rel="noopener noreferrer" aria-label="Bommie on Instagram" className="text-sand/50 hover:text-seaglass transition-colors">
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
        {/* Giant cropped wordmark */}
        <p className="font-logo font-semibold text-[27vw] leading-[0.72] tracking-[-0.05em] text-center text-ocean/70 select-none pointer-events-none mt-10 -mb-[3vw]" aria-hidden="true">
          bommie
        </p>
      </footer>

      <ContactView open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}

export default App
