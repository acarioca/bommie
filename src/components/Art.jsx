import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { TOPO_MAJOR, TOPO_MINOR, TOPO_VIEWBOX } from './topoPaths'

/* Fades and lifts children into view as they scroll on screen */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* Bathymetric contour lines, like a nautical chart of the reef ("bommie") below.
   variant flips/rotates the same chart so each section looks different. */
const TOPO_TRANSFORMS = [
  '',
  'translate(1500 0) scale(-1 1)',
  'translate(0 1000) scale(1 -1)',
  'translate(1500 1000) scale(-1 -1)',
]

export function Topo({ className = '', color = 'currentColor', variant = 0, zoom = 1 }) {
  const t = TOPO_TRANSFORMS[variant % TOPO_TRANSFORMS.length]
  const z = zoom === 1 ? '' : ` translate(750 500) scale(${zoom}) translate(-750 -500)`
  return (
    <svg className={className} viewBox={TOPO_VIEWBOX} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform={`${z} ${t}`.trim() || undefined} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d={TOPO_MINOR} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={TOPO_MAJOR} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

/* Endless ribbon of words that drifts on its own, speeds up as you scroll,
   and follows the scroll direction. Static for reduced motion; idle when off screen. */
export function Marquee({ items, className = '', separator = '✺', speed = 45 }) {
  const reduced = usePrefersReducedMotion()
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const rowRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const wrap = wrapRef.current
    const track = trackRef.current
    const row = rowRef.current
    if (!wrap || !track || !row) return

    let x = 0
    let dir = 1
    let boost = 0
    let lastT = performance.now()
    let lastY = window.scrollY
    let frame = 0
    let visible = false

    const tick = (t) => {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (dy !== 0) dir = dy > 0 ? 1 : -1
      // Scroll speed adds a boost that eases back to the base drift
      boost = boost * 0.92 + Math.min(Math.abs(dy) / Math.max(dt, 0.001), 4000) * 0.08
      x -= dir * (speed + boost * 0.35) * dt
      const w = row.offsetWidth || 1
      x = ((x % w) - w) % w
      track.style.transform = `translate3d(${x}px, 0, 0)`
      if (visible) frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        lastT = performance.now()
        lastY = window.scrollY
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(tick)
      }
    })
    io.observe(wrap)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced, speed])

  const row = (ref) => (
    <div ref={ref} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="opacity-60">{separator}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div ref={wrapRef} className={`flex overflow-hidden ${className}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <div ref={trackRef} className="flex will-change-transform" aria-hidden="true">
        {row(rowRef)}
        {row(null)}
      </div>
    </div>
  )
}
