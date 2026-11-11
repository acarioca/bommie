import { Reveal, Topo } from './Art'

/*
  Our story: the whole section is a reef chart. Faint contour lines run edge to edge,
  a marker pins "the bommie", and the name is explained as a dictionary entry.
*/
export default function OurStory() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand-light pt-24 pb-28 md:pt-32 md:pb-36 px-6 lg:px-8">
      {/* Chart texture */}
      <Topo className="absolute inset-0 w-full h-full opacity-[0.11]" color="#3b2f26" variant={2} zoom={1.4} />

      {/* Marker pinned in the margin */}
      <div className="hidden lg:block absolute left-[7%] top-[30%]" aria-hidden="true">
        <span className="absolute inset-0 -m-3 rounded-full border border-seaglass-dark/60 animate-[ping_3s_ease-out_infinite] motion-reduce:animate-none"></span>
        <span className="relative block w-2.5 h-2.5 rounded-full bg-seaglass-dark"></span>
        <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap leading-relaxed text-[11px] font-semibold uppercase tracking-[0.3em] text-seaglass-dark">
          the bommie
          <span className="block text-driftwood/40 tabular-nums">26.39° S · 153.09° E</span>
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-seaglass-dark mb-8">Our story</p>

          <h2 className="font-display text-7xl md:text-[9rem] text-driftwood font-semibold tracking-tight leading-[0.9]">bommie</h2>
          <p className="mt-4 text-driftwood-light font-display italic text-lg">
            /ˈbɒm.i/
            <span className="mx-3 text-driftwood/30 not-italic">·</span>
            noun
            <span className="mx-3 text-driftwood/30 not-italic">·</span>
            Australian
          </p>

          <ol className="mt-12 space-y-6 max-w-2xl mx-auto">
            <li>
              <p className="font-display text-2xl md:text-[2rem] text-driftwood leading-snug">
                <span className="text-seaglass-dark mr-3">1.</span>A reef hidden offshore, where the swell rises and breaks into a wave.
              </p>
            </li>
            <li>
              <p className="font-display text-2xl md:text-[2rem] text-driftwood leading-snug">
                <span className="text-seaglass-dark mr-3">2.</span>A surf poncho, <em className="italic">born in Noosa.</em>
              </p>
            </li>
          </ol>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 md:mt-16 pt-10 border-t border-driftwood/15 grid md:grid-cols-2 gap-6 md:gap-12 text-left text-driftwood-light leading-[1.8]">
            <p>
              Bommie started the way most good ideas do in Noosa: a few mates in a car park after a surf, all hopping
              around on one leg, trying to get changed under a towel that wouldn’t stay put.
            </p>
            <p>
              So we got together and made our own. A lot of sketches, a few prototypes and plenty of test sessions later,
              we had it: a poncho that keeps you dry, folds into its own bag and is comfy enough for the café after.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 text-sm font-semibold text-driftwood hover:text-seaglass-dark transition-colors group"
            >
              See the poncho
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
