'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
import { X } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const gallery = [
    "/gallery (1).webp",
    "/gallery (2).webp",
    "/gallery (3).webp",
    "/gallery (4).webp",
    "/gallery (5).webp",
    "/gallery (6).webp",
    "/gallery (7).webp",
    "/gallery (8).webp",
    "/gallery (9).webp",
    "/gallery (10).webp",
    "/gallery (11).webp",
    "/gallery (12).webp",
    "/gallery (13).webp",
    "/gallery (14).webp",
    "/gallery (15).webp",
    "/gallery (16).webp",
    "/gallery (17).webp",
    "/gallery (18).webp",
    "/gallery (19).webp",
    "/gallery (20).webp",
    "/gallery (21).webp",
    "/gallery (22).webp",
]
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  return (
    <>
      <motion.div 
        className='mx-auto 1440:mx-0 grid place-items-center auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 1440:grid-cols-4 gap-6 px-8 md:px-[54px] 1440:px-[86px] pt-[24px] pb-[55px] md:py-10'
        variants={container}
        initial="hidden"
        animate="show"
      >
        {gallery.map((src, index) => (
          <motion.button
            key={index}
            variants={item}
            onClick={() => setSelectedImage(src)}
            className="relative w-full overflow-hidden"
            aria-label={`Open image ${src}`}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded transition-transform duration-300 hover:scale-105"
              placeholder="blur"
              blurDataURL="/blur-placeholder.png"
            />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 pt-[4rem] bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative max-w-4xl aspect-[4/3] w-[80vw] p-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedImage(null)} className=" absolute top-2 right-2 text-white"><X /></button>
              <Image src={selectedImage} alt="Modal Image" width={1000} height={800} className="rounded-lg object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

export default Gallery