import { useState } from 'react'
import ponchoBlue from '../assets/poncho/bommie-blue.png'
import ponchoDark from '../assets/poncho/bommie-dark.png'
import ponchoRed from '../assets/poncho/bommie-red.png'
import { Reveal, Topo } from './Art'
import InterestModal from './InterestModal'

const BASE_PRICE = 89
// Embroidered initials are built but hidden for now; flip to true to bring them back
const INITIALS_ENABLED = false
const INITIALS_PRICE = 10 // placeholder: confirm real personalisation price

const colours = [
  { id: 'ocean', name: 'Ocean Blue', img: ponchoBlue, swatch: 'bg-[#1d4a5c]', tint: 'bg-[#d6e6e0]', note: 'our first love' },
  { id: 'midnight', name: 'Midnight', img: ponchoDark, swatch: 'bg-[#3a3a38]', tint: 'bg-sand-dark', note: 'dawn patrol pick' },
  { id: 'crimson', name: 'Crimson', img: ponchoRed, swatch: 'bg-[#c4161c]', tint: 'bg-[#f3d5c2]', note: 'sunset session' },
]

// Placeholder sizes: confirm the real size range before launch
const sizes = [
  { id: 'sm', label: 'S / M', fit: 'Up to 175 cm' },
  { id: 'lxl', label: 'L / XL', fit: '175 cm and up' },
]

const perks = ['Fully waterproof outer', 'Folds into its own pouch', 'Zipped waterproof pockets', 'Quick-dry cotton lining']

function OptionLabel({ children, value }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <p className="text-sm font-semibold text-driftwood">{children}</p>
      {value && <p className="text-sm text-driftwood-light">{value}</p>}
    </div>
  )
}

export default function ProductConfigurator() {
  const [colourId, setColourId] = useState(colours[0].id)
  const [sizeId, setSizeId] = useState(sizes[1].id)
  const [addInitials, setAddInitials] = useState(false)
  const [initials, setInitials] = useState('')
  const [interestOpen, setInterestOpen] = useState(false)

  const colour = colours.find((c) => c.id === colourId)
  const size = sizes.find((s) => s.id === sizeId)
  const showInitials = addInitials && initials.length > 0
  const price = BASE_PRICE + (addInitials ? INITIALS_PRICE : 0)

  const summary = [colour.name, size.label, showInitials ? `initials “${initials}”` : null].filter(Boolean).join(' · ')

  return (
    <section id="collection" className="pt-24 md:pt-28 pb-28 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-start">
        {/* Live preview */}
        <Reveal className="lg:sticky lg:top-24">
          <div className={`relative aspect-[4/5] ${colour.tint} rounded-t-full rounded-b-[2.5rem] overflow-hidden flex items-end justify-center transition-colors duration-700`}>
            <Topo className="absolute inset-0 w-full h-full opacity-25" color="#3b2f26" variant={colours.indexOf(colour)} zoom={2} />

            <div className="relative h-[92%] aspect-[992/1586]">
              {colours.map((c) => (
                <img
                  key={c.id}
                  src={c.img}
                  alt={c.id === colourId ? `The Bommie Poncho in ${c.name}` : ''}
                  aria-hidden={c.id !== colourId}
                  className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply brightness-[1.07] contrast-[1.04] [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)] transition-all duration-700 ease-out ${
                    c.id === colourId ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
                  }`}
                />
              ))}
              {/* Embroidered initials preview, on the left chest */}
              <span
                className={`absolute left-[37%] top-[30%] -translate-x-1/2 font-display font-semibold italic text-sand-light text-lg sm:text-2xl tracking-wide [text-shadow:0_1px_0_rgba(0,0,0,0.35)] transition-all duration-500 ${
                  showInitials ? 'opacity-90 scale-100' : 'opacity-0 scale-75'
                }`}
                aria-hidden="true"
              >
                {initials}
              </span>
            </div>

            {/* <span key={colour.id} className="absolute top-[20%] left-6 font-hand text-2xl md:text-3xl text-driftwood/80 animate-[bob_5s_ease-in-out_infinite]">
              {colour.note}
            </span> */}
          </div>

          {/* Colour thumbnails */}
          <div className="mt-5 grid grid-cols-3 gap-3" aria-hidden="true">
            {colours.map((c) => (
              <button
                key={c.id}
                type="button"
                tabIndex={-1}
                onClick={() => setColourId(c.id)}
                className={`${c.tint} rounded-2xl h-24 overflow-hidden flex items-end justify-center transition-all ${
                  c.id === colourId ? 'ring-2 ring-driftwood ring-offset-2 ring-offset-sand' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img src={c.img} alt="" className="h-[90%] object-contain mix-blend-multiply brightness-[1.07] contrast-[1.04] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Options */}
        <Reveal delay={120}>
          <p className="font-hand text-sunset-dark text-2xl md:text-[1.7rem] mb-2">the one &amp; only</p>
          <h2 className="font-display text-5xl md:text-6xl text-driftwood font-medium leading-[1.05] mb-4">The Bommie</h2>
          <div className="flex items-baseline gap-3 mb-6">
            <p className="font-display text-3xl font-semibold text-driftwood tabular-nums">${price}</p>
            {addInitials && <p className="text-sm text-driftwood-light">includes initials +${INITIALS_PRICE}</p>}
          </div>
          <p className="text-driftwood-light leading-[1.8] mb-10 max-w-lg">
            One poncho, made properly. Change in the car park, drive home dry, then fold it into its own pouch. Make it yours below.
          </p>

          <div className="space-y-9">
            {/* Colour */}
            <fieldset>
              <legend className="sr-only">Colour</legend>
              <OptionLabel value={colour.name}>Colour</OptionLabel>
              <div className="flex gap-4" role="radiogroup" aria-label="Colour">
                {colours.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={c.id === colourId}
                    aria-label={c.name}
                    onClick={() => setColourId(c.id)}
                    className={`w-11 h-11 rounded-full ${c.swatch} transition-all ring-offset-[3px] ring-offset-sand ${
                      c.id === colourId ? 'ring-2 ring-driftwood scale-110' : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset>
              <legend className="sr-only">Size</legend>
              <OptionLabel value={size.fit}>Size</OptionLabel>
              <div className="grid grid-cols-2 gap-3 max-w-sm" role="radiogroup" aria-label="Size">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={s.id === sizeId}
                    onClick={() => setSizeId(s.id)}
                    className={`py-3 rounded-full border-2 text-sm font-semibold transition-colors ${
                      s.id === sizeId ? 'bg-driftwood border-driftwood text-sand' : 'border-driftwood/25 text-driftwood hover:border-driftwood'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Initials (hidden until INITIALS_ENABLED is true) */}
            {INITIALS_ENABLED && (
            <fieldset>
              <legend className="sr-only">Personalise</legend>
              <OptionLabel value={`+$${INITIALS_PRICE}`}>Embroidered initials</OptionLabel>
              <label className="flex items-center gap-3 cursor-pointer w-fit mb-4">
                <span className="relative inline-flex">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={addInitials}
                    onChange={(e) => setAddInitials(e.target.checked)}
                  />
                  <span className="w-12 h-7 rounded-full bg-driftwood/20 peer-checked:bg-seaglass-dark transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-driftwood peer-focus-visible:ring-offset-2"></span>
                  <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-sand-light shadow transition-transform peer-checked:translate-x-5"></span>
                </span>
                <span className="text-sm text-driftwood">Add initials to the chest</span>
              </label>
              <div className={`grid transition-all duration-500 ${addInitials ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-4 pt-1">
                    <input
                      type="text"
                      inputMode="text"
                      maxLength={3}
                      value={initials}
                      onChange={(e) => setInitials(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                      placeholder="ABC"
                      aria-label="Initials, up to 3 letters"
                      tabIndex={addInitials ? 0 : -1}
                      className="w-32 px-5 py-3 rounded-full bg-sand-light border-2 border-driftwood/20 focus:border-driftwood focus:outline-none font-display text-xl tracking-[0.3em] text-driftwood placeholder-driftwood/30 uppercase"
                    />
                    <p className="font-hand text-xl text-driftwood-light">← up to 3 letters, see it on the left</p>
                  </div>
                </div>
              </div>
            </fieldset>
            )}
          </div>

          {/* Summary + CTA */}
          <div className="mt-10 pt-8 border-t border-driftwood/15">
            <p className="text-sm text-driftwood-light mb-4">
              Your pick: <span className="text-driftwood font-semibold">{summary}</span>
            </p>
            <button
              type="button"
              onClick={() => setInterestOpen(true)}
              aria-haspopup="dialog"
              className="w-full flex items-center justify-between gap-3 bg-driftwood text-sand pl-8 pr-3 py-3 rounded-full text-base font-semibold hover:bg-sunset-dark transition-colors group max-w-md"
            >
              Register interest · ${price}
              <span className="w-10 h-10 rounded-full bg-sand text-driftwood flex items-center justify-center group-hover:-rotate-45 transition-transform duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </button>
            <InterestModal open={interestOpen} onClose={() => setInterestOpen(false)} details={`${summary} · $${price}`} />
            <p className="font-hand text-xl text-sunset-dark mt-3">first drop: 10% off for early sign-ups</p>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-driftwood">
                <svg className="w-5 h-5 shrink-0 text-seaglass-dark" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M2 10 Q5 6 8 10 T14 10 T20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
