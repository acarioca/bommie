import { useEffect, useState } from 'react'
import { Reveal } from './Art'

/*
  Instagram grid, kept up to date from the @bommienoosa account.

  Live feed: set VITE_INSTAGRAM_FEED_URL (see .env.example) to a Behold JSON feed
  (behold.so). Behold holds the Instagram connection, refreshes the token and hosts
  resized images, so new posts show up here without touching the code.

  Fallback: photos dropped into src/assets/instagram/ are used if there's no feed
  URL or the feed can't be reached. With neither, the section renders nothing.
*/
const INSTAGRAM_URL = 'https://www.instagram.com/bommienoosa/'
const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL
const MAX_PHOTOS = 6

const localFiles = import.meta.glob('../assets/instagram/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})
const LOCAL_PHOTOS = Object.entries(localFiles)
  .sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }))
  .slice(0, MAX_PHOTOS)
  .map(([, src]) => ({ src, href: INSTAGRAM_URL, alt: '' }))

// Behold feeds come as { posts: [...] } (current) or a bare array (older feeds)
function fromBehold(data) {
  const posts = Array.isArray(data) ? data : data?.posts
  if (!Array.isArray(posts)) return []
  return posts
    .map((p) => {
      const isVideo = p.mediaType === 'VIDEO'
      const src = p.sizes?.medium?.mediaUrl || (isVideo ? p.thumbnailUrl : p.mediaUrl)
      const caption = (p.prunedCaption || p.caption || '').trim()
      return src ? { src, href: p.permalink || INSTAGRAM_URL, alt: caption.slice(0, 120) } : null
    })
    .filter(Boolean)
    .slice(0, MAX_PHOTOS)
}

function useInstagramPhotos() {
  const [live, setLive] = useState(null) // null = not loaded (or no feed)

  useEffect(() => {
    if (!FEED_URL) return
    const controller = new AbortController()
    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => setLive(fromBehold(data)))
      .catch(() => setLive(null)) // fall back to local photos
    return () => controller.abort()
  }, [])

  const photos = live && live.length > 0 ? live : LOCAL_PHOTOS
  return { photos }
}

export default function InstagramGrid() {
  const { photos } = useInstagramPhotos()
  // Nothing to show (no feed/photos yet, or the feed is still loading): render nothing rather than an empty grid
  if (photos.length === 0) return null

  return (
    <section id="instagram" className="pt-4 pb-28 px-6 lg:px-8 bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-seaglass-dark mb-4">Instagram</p>
            <h2 className="font-display text-5xl md:text-6xl text-driftwood font-medium tracking-tight">@bommienoosa</h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-driftwood hover:text-seaglass-dark transition-colors group w-fit"
          >
            Follow along
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 80}>
              <a
                href={photo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden rounded-2xl bg-sand-dark"
                aria-label={photo.alt ? `Instagram post: ${photo.alt}` : `Bommie on Instagram, post ${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
