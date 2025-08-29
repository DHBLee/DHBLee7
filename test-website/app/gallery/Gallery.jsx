'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
import { X } from 'lucide-react';
import Masonry from 'react-masonry-css';

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

// Define images with different aspect ratios for more dynamic masonry effect
const gallery = [
    { src: "/images/gallery/gallery (1).webp", size: 'medium' },
    { src: "/images/gallery/gallery (2).webp", size: 'large' },
    { src: "/images/gallery/gallery (3).webp", size: 'small' },
    { src: "/images/gallery/gallery (4).webp", size: 'medium' },
    { src: "/images/gallery/gallery (5).webp", size: 'large' },
    { src: "/images/gallery/gallery (6).webp", size: 'small' },
    { src: "/images/gallery/gallery (7).webp", size: 'medium' },
    { src: "/images/gallery/gallery (8).webp", size: 'large' },
    { src: "/images/gallery/gallery (9).webp", size: 'small' },
    { src: "/images/gallery/gallery (10).webp", size: 'medium' },
    { src: "/images/gallery/gallery (11).webp", size: 'large' },
    { src: "/images/gallery/gallery (12).webp", size: 'small' },
    { src: "/images/gallery/gallery (13).webp", size: 'medium' },
    { src: "/images/gallery/gallery (14).webp", size: 'large' },
    { src: "/images/gallery/gallery (15).webp", size: 'small' },
    { src: "/images/gallery/gallery (16).webp", size: 'medium' },
    { src: "/images/gallery/gallery (17).webp", size: 'large' },
    { src: "/images/gallery/gallery (18).webp", size: 'small' },
    { src: "/images/gallery/gallery (19).webp", size: 'medium' },
    { src: "/images/gallery/gallery (20).webp", size: 'large' },
    { src: "/images/gallery/gallery (21).webp", size: 'small' },
    { src: "/images/gallery/gallery (22).webp", size: 'medium' },
    { src: "/images/background/menu-bg.webp", size: 'large' },
    { src: "/images/background/faq-bg.webp", size: 'small' },
]
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

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

  const breakpointColumnsObj = {
    default: 4,
    1440: 4,
    1024: 3,
    768: 2,
    640: 1
  };
  
  // Define size classes for different image sizes
  const sizeClasses = {
    small: 'h-48 md:h-64',
    medium: 'h-64 md:h-80',
    large: 'h-80 md:h-96'
  };

  return (
    <>
      <motion.div 
        className='px-8 md:px-[54px] 1440:px-[86px] pt-[24px] pb-[55px] md:py-10'
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-3 md:-ml-4"
          columnClassName="pl-3 md:pl-4 bg-clip-padding"
        >
          {gallery.map((item, index) => {
            const sizeClass = sizeClasses[item.size] || sizeClasses.medium;
            return (
              <motion.button
                key={index}
                variants={item}
                disabled={isMobile}
                onClick={() => setSelectedImage(item.src)}
                className={`mb-3 md:mb-4 relative w-full overflow-hidden block group`}
                aria-label={`Open image ${index + 1}`}
              >
                <div className={`relative w-full ${sizeClass} overflow-hidden rounded-lg`}>
                  <Image
                    src={item.src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="/blur-placeholder.png"
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
            );
          })}
        </Masonry>
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
              <Image 
                src={selectedImage} 
                alt="Modal Image" 
                width={1200} 
                height={800} 
                className="rounded-lg object-contain max-h-[80vh] w-auto" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

export default Gallery