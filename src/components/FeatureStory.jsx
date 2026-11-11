import { useEffect, useRef, useState } from 'react'
import ponchoBlue from '../assets/poncho/bommie-blue.png'
import ponchoDark from '../assets/poncho/bommie-dark.png'
import ponchoRed from '../assets/poncho/bommie-red.png'
import { Reveal, Topo } from './Art'

/*
  "Built for the session": the ribbon's features as a scroll story.
  One pinned image, four short features; the one in the middle of the screen
  is active, and the image moves to show what it's talking about.
  zoom/origin frame the relevant part of the photo (placeholder until there are
  dedicated detail shots: folded pouch, pocket, fabric close-up).
*/
const FEATURES = [
  {
    kicker: 'Fully waterproof',
    title: 'Car seats stay dry.',
    body: 'Jump in the car straight after a session, pop into a café, walk the car park, all without dripping on anything.',
    img: ponchoBlue,
    tint: 'bg-[#d6e6e0]',
    zoom: 1,
    origin: '50% 50%',
  },
  {
    kicker: 'Folds into its own bag',
    title: 'No bag required.',
    body: 'It folds into its own built-in pouch. Sling it over a shoulder, chuck it in the boot, hang it off the handlebars.',
    img: ponchoDark,
    tint: 'bg-sand-dark',
    zoom: 1.08,
    origin: '50% 40%',
  },
  {
    kicker: 'Zipped waterproof pockets',
    title: 'Keys, phone, wallet. Sorted.',
    body: 'Oversized zipped pockets, fully waterproof-lined, keep your things dry, sand-free and secure while you’re in the lineup.',
    img: ponchoRed,
    tint: 'bg-[#f3d5c2]',
    zoom: 2.3,
    origin: '50% 52%',
  },
  {
    kicker: 'Quick-dry cotton',
    title: 'Soft on salty skin.',
    body: 'Quick-drying cotton that feels good straight out of the surf, and is ready again for the next session.',
    img: ponchoBlue,
    tint: 'bg-[#d6e6e0]',
    zoom: 3.2,
    origin: '38% 30%',
  },
]

function FeatureImage({ active }) {
  const f = FEATURES[active]
  return (
    <div className={`relative w-full h-full rounded-t-full rounded-b-[2.5rem] overflow-hidden ${f.tint} transition-colors duration-700`}>
      {FEATURES.map((item, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex items-end justify-center ${item.tint} transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: `scale(${item.zoom})`, transformOrigin: item.origin }}
          aria-hidden={i !== active}
        >
          <img
            src={item.img}
            alt=""
            className="h-[94%] object-contain mix-blend-multiply brightness-[1.07] contrast-[1.04] [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]"
          />
        </div>
      ))}
    </div>
  )
}

export default function FeatureStory() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  // The feature crossing the reading line becomes active. On phones the pinned image
  // fills the top half, so the line sits lower, just below it.
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 767px)').matches
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { rootMargin: phone ? '-62% 0px -30% 0px' : '-45% 0px -45% 0px' },
    )
    itemRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative bg-ocean-deep pt-16 pb-24 md:pb-32 px-6 lg:px-8">
      <Topo className="absolute inset-0 w-full h-full opacity-15" color="#8fb9a8" variant={1} />
      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center mb-16 md:mb-24">
          <p className="font-hand text-seaglass text-2xl md:text-[1.7rem] mb-2">built for the session</p>
          <h2 className="font-display text-4xl md:text-6xl text-sand font-medium leading-tight">
            Every detail designed
            <br />
            for life <em className="italic text-seaglass">beyond</em> the water
          </h2>
        </Reveal>

        <div className="md:grid md:grid-cols-2 md:gap-20">
          {/* Pinned image (sticky on every screen size; on phones it gets a backing so text slides under cleanly) */}
          <div className="sticky top-16 md:top-[18vh] z-10 h-[calc(38svh+1.5rem)] md:h-[64vh] self-start bg-ocean-deep md:bg-transparent pt-2 pb-4 md:p-0 -mx-6 px-6 md:mx-0">
            <div className="h-full aspect-[4/5] max-w-full mx-auto">
              <FeatureImage active={active} />
            </div>
          </div>

          {/* Feature list */}
          <ol className="relative">
            {FEATURES.map((f, i) => (
              <li
                key={f.kicker}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                data-index={i}
                className={`flex items-center min-h-[52svh] md:min-h-[64vh] transition-opacity duration-500 ${
                  i === active ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div className="max-w-md">
                  <p className="flex items-center gap-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-seaglass mb-5">
                    <span className="tabular-nums">0{i + 1}</span>
                    <span className="w-8 h-px bg-seaglass/50"></span>
                    {f.kicker}
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl text-sand font-medium leading-[1.05] mb-5">{f.title}</h3>
                  <p className="text-sand/70 leading-[1.8] text-base md:text-lg">{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
