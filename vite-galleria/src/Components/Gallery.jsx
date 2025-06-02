import React from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import { useArtwork } from './context/ArtworkContext';


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

const Gallery = () => {
  const { isSlideshowOpen, setIsSlideshowOpen, setCurrentIndex } = useArtwork();

  if (isSlideshowOpen) return null;

  return (
    <motion.div 
      className='1440:relative 1440:max-h-[1440px] mx-auto 1440:mx-0 grid place-items-center auto-rows-auto grid-cols-1 md:grid-cols-2 1440:grid-cols-4 gap-10 px-8 md:px-[54px] 1440:px-10 pt-[24px] pb-[55px] md:py-10'
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data.map((artwork, index) => (
        <motion.button 
          key={artwork.name}
          variants={item}
          onClick={() => { 
            setCurrentIndex(index); 
            setIsSlideshowOpen(true); 
          }} 
          className='group artwork relative w-full h-full' 
          aria-label='Image of a Certain Artwork'
          whileHover={{ scale: 1.03 }} 
        >
          <img 
            src={artwork.images.thumbnail} 
            alt={`Artwork of ${artwork.artist.name}`} 
            className='w-full h-full'
          />
          <div className='hidden group-hover:grid transition-all duration-300 w-full text-left gap-[8px] p-8 absolute z-50 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent'>
            <h2 className="TextPreset2Mobile text-white">{artwork.name}</h2>
            <p className='text-[13px] leading-[125%] font-normal text-white'>{artwork.artist.name}</p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Gallery;