'use client'
import React, { useState } from 'react'
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
    "/beef.JPG",
    "/bread.JPG",
    "/brighter-images-of-places.png",
    "/faq-bg.png",
    "/fire-wood.png",
    "/fish.JPG",
    "/pasta.JPG",
    "/DSC01902.JPG",
    "/DSC01918.JPG",
    "/DSC01928.JPG",
    "/DSC01931.JPG",
    "/DSC01932.JPG",
    "/DSC01943.JPG",
    "/DSC01944.JPG",
    "/DSC01947.JPG",
    "/DSC01948.JPG",
    "/DSC01952.JPG",
    "/DSC01958.JPG",
    "/DSC01968.JPG",
    "/DSC02003.JPG",
    "/DSC02004.JPG",
    "/DSC02006.JPG",
    "/DSC02019.JPG",
    "/DSC02024.JPG",
    "/DSC01899.JPG",
    "/DSC01891.JPG",
    "/wine-picture1.png",
    "/wine-picture2.png",
    "/wine-picture3.png",
    "/wine-picture4.png",
]
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <motion.div 
        className='mx-auto 1440:mx-0 grid place-items-center auto-rows-auto grid-cols-1 md:grid-cols-2 1440:grid-cols-4 gap-6 px-8 md:px-[54px] 1440:px-[86px] pt-[24px] pb-[55px] md:py-10'
        variants={container}
        initial="hidden"
        animate="show"
      >
        {gallery.map((artwork, index) => (
          <motion.button 
            key={artwork}
            variants={item}
            onClick={() => setSelectedImage(artwork)}
            className='group relative w-full h-full' 
            aria-label='Image of a Certain Artwork'
            whileHover={{ scale: 1.03 }} 
          >
            <img 
              src={artwork} 
              alt={`Artwork of ${artwork}`} 
              className='w-full h-auto'
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