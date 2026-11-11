import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/*
  Hero: the ocean plays inside the letters of "bommie". Scrolling dives into the word
  until the water fills the screen, then a single line and a nudge to keep scrolling appear.
*/

const MAX_ZOOM = 90

// Hero footage: first matching source wins, so 4K only loads where it's visible
const HERO_POSTER = '/video/emerald-poster.jpg'
const HERO_SOURCES = [
  { src: '/video/emerald-2160.mp4', media: '(min-width: 1800px) and (min-resolution: 2dppx)' },
  { src: '/video/emerald-1440.mp4', media: '(min-width: 1200px) and (min-resolution: 1.5dppx), (min-width: 2200px)' },
  { src: '/video/emerald-1080.mp4', media: '(min-width: 769px)' },
  { src: '/video/emerald-720.mp4' },
]

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (p, start, end) => clamp((p - start) / (end - start))
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const maskId = `hero-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const overlayRef = useRef(null)
  const wordRef = useRef(null)
  const introRef = useRef(null)
  const finaleRef = useRef(null)
  const dryRef = useRef(null)
  const videoRef = useRef(null)
  const shadeRef = useRef(null)
  const originRef = useRef({ x: 0, y: 0 })

  const [stage, setStage] = useState({ w: 0, h: 0 })
  const [playing, setPlaying] = useState(false)
  // Track the stage size so the word always fills the width nicely
  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setStage({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const fontSize = Math.min(stage.w * 0.25, stage.h * 0.42)

  // Zoom origin: the middle of the "i" stem, so the dive lands inside a letter
  useLayoutEffect(() => {
    const measure = () => {
      const t = wordRef.current
      if (!t || !t.getExtentOfChar) return
      try {
        const box = t.getExtentOfChar(4)
        // The extent box includes negative letter-spacing, so nudge right onto the stem; aim mid x-height
        originRef.current = { x: box.x + box.width / 2 + fontSize * 0.02, y: box.y + box.height * 0.62 }
      } catch {
        /* not rendered yet */
      }
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [fontSize])

  // Scroll-driven dive (skipped entirely for reduced motion)
  useEffect(() => {
    if (reduced) return
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const p = clamp(-rect.top / (rect.height - window.innerHeight))

      const zoomT = easeInOut(range(p, 0.04, 0.62))
      const scale = Math.pow(MAX_ZOOM, zoomT)
      const { x, y } = originRef.current
      if (overlayRef.current) {
        // Drift the "i" toward the centre as we zoom so the water fills the screen evenly
        const centre = Math.min(1, zoomT * 1.8)
        const tx = (window.innerWidth / 2 - x) * centre
        const ty = (window.innerHeight / 2 - y) * centre
        overlayRef.current.style.transformOrigin = `${x}px ${y}px`
        overlayRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
        overlayRef.current.style.opacity = String(1 - range(p, 0.5, 0.64))
      }
      if (videoRef.current) videoRef.current.style.transform = `scale(${1.18 - 0.18 * zoomT})`
      if (introRef.current) {
        const t = range(p, 0, 0.12)
        introRef.current.style.opacity = String(1 - t)
        introRef.current.style.transform = `translateY(${t * 24}px)`
      }
      const f = range(p, 0.66, 0.84)
      if (finaleRef.current) {
        finaleRef.current.style.opacity = String(f)
        finaleRef.current.style.transform = `translateY(${(1 - f) * 28}px)`
        finaleRef.current.style.pointerEvents = f > 0.5 ? 'auto' : 'none'
      }
      if (shadeRef.current) shadeRef.current.style.opacity = String(range(p, 0.55, 0.8))
      // "Drive home dry." arrives soft and blurred (wet), then sharpens as it dries
      if (dryRef.current) {
        const d = range(p, 0.7, 0.92)
        dryRef.current.style.filter = d < 1 ? `blur(${(1 - d) * 10}px)` : 'none'
        dryRef.current.style.opacity = String(0.25 + 0.75 * d)
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced, fontSize])

  // Autoplay unless reduced motion; browsers can still refuse (e.g. Low Power Mode)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reduced) v.pause()
    else v.play().catch(() => setPlaying(false))
  }, [reduced])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <section
      ref={sectionRef}
      data-hero
      className={`relative bg-sand ${reduced ? 'h-svh' : 'h-[260vh]'}`}
      aria-label="Bommie Noosa"
    >
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover object-[center_45%] saturate-[1.05] scale-[1.18] motion-reduce:scale-100"
          aria-hidden="true"
        >
          {HERO_SOURCES.map(({ src, media }) => (
            <source key={src} src={src} type="video/mp4" media={media} />
          ))}
        </video>

        {/* Shading that fades in behind the final line */}
        <div
          ref={shadeRef}
          className="absolute inset-0 bg-gradient-to-t from-ocean-dark/70 via-ocean-dark/10 to-transparent opacity-0 motion-reduce:opacity-100"
        ></div>

        {/* Sand overlay with the word cut out of it */}
        {!reduced && stage.w > 0 && (
          <svg ref={overlayRef} className="absolute inset-0 w-full h-full origin-center" aria-hidden="true">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={stage.w} height={stage.h}>
                <rect width={stage.w} height={stage.h} fill="#fff" />
                <text
                  x={stage.w / 2}
                  y={stage.h * 0.47}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize,
                    letterSpacing: '-0.05em',
                  }}
                >
                  bommie
                </text>
              </mask>
            </defs>
            <rect width={stage.w} height={stage.h} fill="#f3ebdd" mask={`url(#${maskId})`} />
            {/* Invisible copy used only to measure glyph positions (masked text isn't measurable) */}
            <text
              ref={wordRef}
              x={stage.w / 2}
              y={stage.h * 0.47}
              textAnchor="middle"
              dominantBaseline="central"
              fill="transparent"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize,
                letterSpacing: '-0.05em',
              }}
            >
              bommie
            </text>
          </svg>
        )}

        {/* Intro caption under the word + scroll cue (fade out together) */}
        {!reduced && (
          <div ref={introRef} className="absolute inset-0 pointer-events-none">
            <p
              className="absolute inset-x-0 text-center font-hand text-2xl md:text-3xl text-driftwood-light"
              style={{ top: stage.h * 0.47 + fontSize * 0.42 }}
            >
              the ultimate surf poncho, born in Noosa
            </p>
          <div className="absolute bottom-7 inset-x-0 flex flex-col items-center gap-3 text-driftwood-light">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
            <span className="relative block w-px h-10 bg-driftwood/15 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-driftwood-light animate-[scrollcue_2.2s_ease-in-out_infinite]"></span>
            </span>
          </div>
          </div>
        )}

        {/* Finale: one line, then a nudge to keep scrolling */}
        <div
          ref={finaleRef}
          className="absolute inset-x-0 bottom-0 px-6 md:px-12 lg:px-16 pb-14 md:pb-20 opacity-0 motion-reduce:opacity-100"
          style={{ pointerEvents: reduced ? 'auto' : 'none' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-8xl leading-[0.98] tracking-tight">
              {/* Wet vs dry: the first line is washed out, the promise lands solid */}
              <span className="text-sand/55">Change on the sand.</span>
              <br />
              <em ref={dryRef} className="italic text-sand inline-block">Drive home dry.</em>
            </h1>
            {/* Quiet prompt to keep scrolling, matching the intro cue */}
            <div className="shrink-0 flex md:flex-col items-center gap-3 text-sand/80" aria-hidden="true">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
              <span className="relative block w-10 h-px md:w-px md:h-10 bg-sand/25 overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-1/2 md:inset-x-0 md:inset-y-auto md:top-0 md:w-auto md:h-1/2 bg-sand animate-[scrollcue-x_2.2s_ease-in-out_infinite] md:animate-[scrollcue_2.2s_ease-in-out_infinite]"></span>
              </span>
            </div>
          </div>
        </div>

        {/* Quiet video control (WCAG: moving content can be paused) */}
        <button
          type="button"
          onClick={togglePlay}
          className="absolute z-10 top-6 right-6 w-9 h-9 rounded-full bg-sand/80 backdrop-blur-md text-driftwood shadow-sm hover:bg-sand transition-colors flex items-center justify-center"
          aria-label={playing ? 'Pause background video' : 'Play background video'}
        >
          {playing ? (
            <svg className="w-3 h-3" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" /></svg>
          ) : (
            <svg className="w-3 h-3 translate-x-px" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 3 1.5z" /></svg>
          )}
        </button>
      </div>
    </section>
  )
}
