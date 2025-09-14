'use client'
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Masonry from 'react-masonry-css'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Grid images (thumbnails use these same URLs via next/image optimization)
const gallery = [
  { src: '/images/gallery/gallery (1).webp', size: 'medium' },
  { src: '/images/gallery/gallery (2).webp', size: 'large' },
  { src: '/images/gallery/gallery (3).webp', size: 'small' },
  { src: '/images/gallery/gallery (4).webp', size: 'medium' },
  { src: '/images/gallery/gallery (5).webp', size: 'large' },
  { src: '/images/gallery/gallery (6).webp', size: 'small' },
  { src: '/images/gallery/gallery (7).webp', size: 'medium' },
  { src: '/images/gallery/gallery (8).webp', size: 'large' },
  { src: '/images/gallery/gallery (9).webp', size: 'small' },
  { src: '/images/gallery/gallery (10).webp', size: 'medium' },
  { src: '/images/gallery/gallery (11).webp', size: 'large' },
  { src: '/images/gallery/gallery (12).webp', size: 'small' },
  { src: '/images/gallery/gallery (13).webp', size: 'medium' },
  { src: '/images/gallery/gallery (14).webp', size: 'large' },
  { src: '/images/gallery/gallery (15).webp', size: 'small' },
  { src: '/images/gallery/gallery (16).webp', size: 'medium' },
  { src: '/images/gallery/gallery (17).webp', size: 'large' },
  { src: '/images/gallery/gallery (18).webp', size: 'small' },
  { src: '/images/gallery/gallery (19).webp', size: 'medium' },
  { src: '/images/gallery/gallery (20).webp', size: 'large' },
  { src: '/images/gallery/gallery (21).webp', size: 'small' },
  { src: '/images/gallery/gallery (22).webp', size: 'medium' },
  { src: '/images/background/menu-bg.webp', size: 'large' },
  { src: '/images/background/faq-bg.webp', size: 'small' },
]

// Phase-2 preloader: warm cache for full-size images after page load
function usePreloadFullImages(urls, batchSize = 6, delayMs = 150) {
  useEffect(() => {
    if (!urls?.length) return
    let cancelled = false
    const start = async () => {
      // Wait for full window load so we don’t compete with critical resources
      if (document.readyState !== 'complete') {
        await new Promise((r) => {
          const onLoad = () => {
            window.removeEventListener('load', onLoad)
            r()
          }
          window.addEventListener('load', onLoad, { once: true })
        })
      }
      for (let i = 0; i < urls.length && !cancelled; i += batchSize) {
        const slice = urls.slice(i, i + batchSize)
        slice.forEach((u) => {
          const img = new window.Image()
          img.decoding = 'async'
          img.loading = 'eager'
          // Hint: keep priority low since this is background warming
          // Some browsers support fetchPriority on Image elements
          try { img.fetchPriority = 'low' } catch {}
          img.src = u
        })
        // Small pause between batches to be network-friendly
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, delayMs))
      }
    }
    start()
    return () => { cancelled = true }
  }, [urls, batchSize, delayMs])
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null) // string | null
  const [isMobile, setIsMobile] = useState(false)

  // Prepare full-size URLs to preload (here they’re the same as grid URLs)
  const fullSizeUrls = useMemo(() => gallery.map((g) => g.src), [])

  // Start background preloading after initial page load
  usePreloadFullImages(fullSizeUrls) // warms cache for modal usage

  // Compute index + helpers
  const total = gallery.length
  const currentIndex = useMemo(
    () => (selectedImage ? gallery.findIndex((g) => g.src === selectedImage) : -1),
    [selectedImage]
  )

  const goNext = useCallback(() => {
    if (!total) return
    const nextIdx = currentIndex === -1 ? 0 : (currentIndex + 1) % total
    setSelectedImage(gallery[nextIdx].src)
  }, [currentIndex, total])

  const goPrev = useCallback(() => {
    if (!total) return
    const prevIdx = currentIndex === -1 ? 0 : (currentIndex - 1 + total) % total
    setSelectedImage(gallery[prevIdx].src)
  }, [currentIndex, total])

  const closeModal = useCallback(() => setSelectedImage(null), [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock scroll when modal open
  useEffect(() => {
    if (selectedImage) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!selectedImage) return
    const onKey = (e) => {
      if (e.code === 'ArrowRight') { e.preventDefault(); goNext() }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); goPrev() }
      else if (e.code === 'Escape') { e.preventDefault(); closeModal() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedImage, goNext, goPrev, closeModal])

  const breakpointColumnsObj = {
    default: 4,
    1440: 4,
    1024: 3,
    768: 2,
    640: 1,
  }

  const sizeClasses = {
    small: 'h-48 md:h-64',
    medium: 'h-64 md:h-80',
    large: 'h-80 md:h-96',
  }

  const pad2 = (n) => n.toString().padStart(2, '0')

  return (
    <>
      <motion.div
        className="bg-black px-8 md:px-[54px] 1440:px-[86px] pt-[24px] pb-[55px] md:py-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-3 md:-ml-4"
          columnClassName="pl-3 md:pl-4 bg-clip-padding"
        >
          {gallery.map((it, index) => {
            const sizeClass = sizeClasses[it.size] || sizeClasses.medium
            return (
              <motion.button
                key={index}
                variants={item}
                disabled={isMobile}
                onClick={() => setSelectedImage(it.src)}
                className="mb-3 md:mb-4 relative w-full overflow-hidden block group"
                aria-label={`Open image ${index + 1}`}
              >
                <div className={`relative w-full ${sizeClass} overflow-hidden rounded-lg`}>
                  <Image
                    src={it.src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="/blur-placeholder.png"
                    // Let offscreen grid images lazy-load as usual
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2 transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </Masonry>
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 pt-[4rem] bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative max-w-5xl w-[90vw] md:w-[80vw]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-10 right-0 text-white/90 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <X />
              </button>

              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="relative mx-auto aspect-[4/3] max-h-[80vh]">
                <Image
                  src={selectedImage}
                  alt="Modal Image"
                  fill
                  sizes="90vw"
                  fetchPriority="high"  // paint immediately when mounted
                  className="rounded-lg object-contain"
                  priority={false}
                />
              </div>

              <div className="mt-3 text-center text-white/90 text-sm">
                {String((currentIndex + 1)).padStart(2, '0')} of {String(total).padStart(2, '0')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
