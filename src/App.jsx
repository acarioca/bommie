import { useState } from 'react'
import heroImg from './assets/hero.png'
import ponchoBlue from './assets/poncho/bommie-blue.png'
import ponchoDark from './assets/poncho/bommie-dark.png'
import ponchoRed from './assets/poncho/bommie-red.png'
import './App.css'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-sand-dark/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-sans text-2xl font-semibold text-charcoal tracking-tight">
              bommie <span className="text-[10px] font-normal uppercase tracking-[0.35em] text-warm-gray ml-1">surf co</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#collection" className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray hover:text-charcoal transition-colors">Collection</a>
              <a href="#about" className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray hover:text-charcoal transition-colors">About</a>
              <a href="#lifestyle" className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray hover:text-charcoal transition-colors">Lifestyle</a>
              <a href="#contact" className="text-xs font-medium uppercase tracking-[0.15em] text-warm-gray hover:text-charcoal transition-colors">Contact</a>
              <a href="#collection" className="bg-charcoal text-ivory px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] hover:bg-ocean-dark transition-colors">
                Shop Now
              </a>
            </div>
            <button
              type="button"
              className="md:hidden text-ocean-dark"
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
          <div className="md:hidden bg-ivory border-t border-sand-dark/30 px-6 py-6 space-y-4">
            <a href="#collection" className="block text-xs font-medium uppercase tracking-[0.15em] text-warm-gray" onClick={() => setMobileMenuOpen(false)}>Collection</a>
            <a href="#about" className="block text-xs font-medium uppercase tracking-[0.15em] text-warm-gray" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#lifestyle" className="block text-xs font-medium uppercase tracking-[0.15em] text-warm-gray" onClick={() => setMobileMenuOpen(false)}>Lifestyle</a>
            <a href="#contact" className="block text-xs font-medium uppercase tracking-[0.15em] text-warm-gray" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#collection" className="block bg-charcoal text-ivory px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-center" onClick={() => setMobileMenuOpen(false)}>Shop Now</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1502680390049-dc4466855e04?w=1920&q=80"
        >
          <source src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-charcoal/60"></div>
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg className="relative block w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z" fill="rgba(253,252,250,0.08)" className="animate-[wave_8s_ease-in-out_infinite]" />
            <path d="M0,80 C150,40 350,100 600,70 C850,40 1050,100 1200,80 L1200,120 L0,120 Z" fill="rgba(253,252,250,0.05)" className="animate-[wave_6s_ease-in-out_infinite_reverse]" />
            <path d="M0,90 C300,110 500,70 700,90 C900,110 1100,70 1200,90 L1200,120 L0,120 Z" fill="rgba(253,252,250,0.03)" className="animate-[wave_10s_ease-in-out_infinite]" />
          </svg>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* <p className="text-aqua/80 uppercase tracking-[0.4em] text-[11px] mb-10 font-medium">Australian Surf Lifestyle</p> */}
          <h1 className="font-sans text-7xl md:text-[10rem] lg:text-[12rem] text-white font-semibold mb-4 leading-[0.85] tracking-tight animate-[fadeInUp_1s_ease-out]">
            bommie
          </h1>
          <p className="text-white/50 uppercase tracking-[0.5em] text-sm md:text-base mb-16 font-normal animate-[fadeInUp_1s_ease-out_0.2s_both]">surf co</p>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-16 leading-relaxed font-light">
            Premium surf gear crafted for those who live between the tides. Born on the Australian coast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#collection" className="bg-ivory text-charcoal px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-aqua/20 transition-colors">
              Shop Collection
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30"></div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-aqua-dark uppercase tracking-[0.4em] text-[11px] mb-4 font-medium">Our Products</p>
          <h2 className="font-display text-5xl md:text-7xl text-charcoal font-light">The Line-up</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="aspect-[3/4] bg-[#e8e8e8] relative overflow-hidden flex items-center justify-center">
              <img src={ponchoBlue} alt="The Classic Poncho" className="w-3/4 object-contain group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
              <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="bg-ivory text-charcoal px-8 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-normal text-charcoal mb-1">The Classic Poncho</h3>
              <p className="text-warm-gray text-xs uppercase tracking-wider mb-3">Ocean Blue / One Size</p>
              <p className="text-charcoal font-medium text-lg">$89.00</p>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="aspect-[3/4] bg-[#e8e8e8] relative overflow-hidden flex items-center justify-center">
              <img src={ponchoDark} alt="Midnight Poncho" className="w-3/4 object-contain group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
              <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="bg-ivory text-charcoal px-8 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-normal text-charcoal mb-1">Midnight Poncho</h3>
              <p className="text-warm-gray text-xs uppercase tracking-wider mb-3">Charcoal / One Size</p>
              <p className="text-charcoal font-medium text-lg">$89.00</p>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="group bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="aspect-[3/4] bg-[#e8e8e8] relative overflow-hidden flex items-center justify-center">
              <img src={ponchoRed} alt="Crimson Poncho" className="w-3/4 object-contain group-hover:scale-110 transition-transform duration-700 cursor-zoom-in" />
              <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="bg-ivory text-charcoal px-8 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-normal text-charcoal mb-1">Crimson Poncho</h3>
              <p className="text-warm-gray text-xs uppercase tracking-wider mb-3">Red / One Size</p>
              <p className="text-charcoal font-medium text-lg">$89.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Story */}
      <section className="bg-charcoal py-32 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-aqua uppercase tracking-[0.4em] text-[11px] mb-6 font-medium text-center">Built for the Session</p>
          <h2 className="font-display text-4xl md:text-6xl text-white font-light text-center mb-20 leading-tight">Every detail designed<br />for life beyond the water</h2>

          <div className="space-y-24">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-aqua text-[13px] font-medium uppercase tracking-[0.2em] mb-4">01</p>
                <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-6 leading-snug">Waterproof from the inside out</h3>
                <p className="text-white/40 leading-[1.8] text-[15px]">
                  Jump straight in the car after a session without wrecking the seats. Pop into a café still wearing it. Walk through the car park without dripping everywhere. Our fully waterproof layer means you're protected from the outside in — so you can go wherever the day takes you, straight from the water.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ponchoBlue} alt="Waterproof lining" className="w-full h-full object-cover object-[center_60%] scale-125" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/3] overflow-hidden md:order-1">
                <img src={ponchoDark} alt="Folds into a bag" className="w-full h-full object-cover object-[center_40%] scale-125" />
              </div>
              <div className="md:order-2">
                <p className="text-aqua text-[13px] font-medium uppercase tracking-[0.2em] mb-4">02</p>
                <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-6 leading-snug">Your poncho is also your bag</h3>
                <p className="text-white/40 leading-[1.8] text-[15px]">
                  We hated carrying extra stuff to the beach. So we made the poncho fold into its own built-in pouch. Throw it over your shoulder, chuck it in the boot, sling it on the handlebars — it goes where you go, no bag required.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-aqua text-[13px] font-medium uppercase tracking-[0.2em] mb-4">03</p>
                <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-6 leading-snug">Pockets that actually protect your stuff</h3>
                <p className="text-white/40 leading-[1.8] text-[15px]">
                  Keys, phone, wallet — the things you stress about while you're out in the lineup. Our oversized zipped pockets are fully waterproof-lined, so your gear stays dry, sand free, and secure while you focus on catching waves.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ponchoRed} alt="Waterproof pockets" className="w-full h-full object-cover object-[center_50%] scale-150" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 lg:px-8 bg-sand-light">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-aqua-dark uppercase tracking-[0.4em] text-[11px] mb-4 font-medium">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light mb-10 leading-tight">Born on the Coast</h2>
            <p className="text-warm-gray leading-[1.8] mb-6 text-[15px]">
              Bommie Surf Co was born from early morning sessions and the simple need for a better way to change at the beach. Named after the submerged reef breaks that create perfect waves along the Australian coastline, we craft premium surf ponchos that are as functional as they are stylish.
            </p>
            <p className="text-warm-gray leading-[1.8] mb-10 text-[15px]">
              Every poncho is designed with the surfer in mind — quick-drying microfibre, full-zip convenience, and a fit that actually lets you move. From dawn patrols to sunset sessions, Bommie has you covered.
            </p>
            <a href="#collection" className="inline-flex items-center gap-3 text-charcoal text-xs font-medium uppercase tracking-[0.2em] hover:text-aqua-dark transition-colors group">
              Explore the range
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <div className="bg-sand p-16 flex items-center justify-center aspect-square">
            <div className="text-center">
              <p className="font-sans text-7xl text-charcoal font-semibold tracking-tight mb-4">bommie</p>
              <p className="uppercase tracking-[0.5em] text-warm-gray text-[11px] font-medium">surf co</p>
              <svg className="mt-10 mx-auto" width="80" height="8" viewBox="0 0 80 8" fill="none">
                <path d="M0 4 Q10 0 20 4 T40 4 T60 4 T80 4" stroke="currentColor" strokeWidth="1.5" className="text-aqua-dark/60" fill="none" />
              </svg>
              <p className="mt-10 text-warm-gray text-[11px] uppercase tracking-[0.2em]">Est. 2026 — Noosa, Australia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section id="lifestyle" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-aqua-dark uppercase tracking-[0.4em] text-[11px] mb-4 font-medium">The Lifestyle</p>
            <h2 className="font-display text-5xl md:text-7xl text-charcoal font-light">Live Between the Tides</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-b from-ocean to-ocean-dark aspect-square flex items-end p-8">
              <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">Dawn Patrol</p>
            </div>
            <div className="bg-gradient-to-b from-ocean-light to-ocean-deep aspect-square flex items-end p-8 lg:col-span-2 lg:row-span-2">
              <p className="text-white font-display text-3xl font-light">Salt. Sun. Surf.</p>
            </div>
            <div className="bg-gradient-to-b from-aqua to-aqua-dark aspect-square flex items-end p-8">
              <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">Golden Hour</p>
            </div>
            <div className="bg-gradient-to-b from-[#5a8a8f] to-ocean aspect-square flex items-end p-8">
              <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">Crystal Clear</p>
            </div>
            <div className="bg-gradient-to-b from-[#2a2a2a] to-charcoal aspect-square flex items-end p-8">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">After Dark</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-8 bg-ocean-dark">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-aqua uppercase tracking-[0.4em] text-[11px] mb-4 font-medium">Expression of Interest</p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-6">Want a Bommie?</h2>
          <p className="text-white/40 mb-12 leading-relaxed text-[15px]">
            We're putting the finishing touches on our first drop. Register your interest to get 10% OFF and be the first to know when Bommie hits the lineup.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-aqua/50 text-sm tracking-wide"
            />
            <button type="submit" className="bg-ivory text-charcoal px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-aqua/20 transition-colors whitespace-nowrap">
              I'm Interested
            </button>
          </form>
          <p className="text-white/20 text-xs mt-6 uppercase tracking-[0.1em]">No spam, just surf. We'll only email you when it matters.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-dark border-t border-white/5 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <p className="font-sans text-2xl font-semibold text-white tracking-tight mb-3">
                bommie <span className="text-[10px] font-normal uppercase tracking-[0.35em] text-white/40 ml-1">surf co</span>
              </p>
              <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                Premium surf gear crafted on the Australian coast. Designed for surfers, by surfers.
              </p>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] font-medium mb-6 uppercase tracking-[0.2em]">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#collection" className="text-white/30 text-sm hover:text-aqua transition-colors">All Products</a></li>
                <li><a href="#" className="text-white/30 text-sm hover:text-aqua transition-colors">Ponchos</a></li>
                <li><a href="#" className="text-white/30 text-sm hover:text-aqua transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 text-[11px] font-medium mb-6 uppercase tracking-[0.2em]">Company</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-white/30 text-sm hover:text-aqua transition-colors">About Us</a></li>
                <li><a href="#" className="text-white/30 text-sm hover:text-aqua transition-colors">Sustainability</a></li>
                <li><a href="#contact" className="text-white/30 text-sm hover:text-aqua transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs uppercase tracking-[0.1em]">&copy; 2026 Bommie Surf Co. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 hover:text-aqua transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-white/20 hover:text-aqua transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-white/20 hover:text-aqua transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
