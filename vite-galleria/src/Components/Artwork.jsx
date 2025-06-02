import React, { useState } from 'react'
import { motion } from 'framer-motion'; 
import data from '../data.json';
import { useArtwork } from './context/ArtworkContext';
import viewIcon from '../assets/shared/icon-view-image.svg';
import Modal from './Modal';
import NextandPrevous from './UI/NextandPrevous';

const Artwork = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { currentIndex, isSlideshowOpen } = useArtwork()
  const currentArtwork = data[currentIndex];

  if (!isSlideshowOpen) return null

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      key={currentIndex}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Modal open={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} img={currentArtwork.images.gallery}/>
      <div className='max-w-[375px] md:max-w-[768px] 1440:max-w-[1360px] mx-auto flex flex-col 1440:flex-row 1440:items-center gap-[8rem] 1440:gap-[23rem] px-6 pt-6 pb-[74px] 1440:pt-[96px]'>

        <div className='relative md:max-w-[625px]'>
          <picture>
            <source 
              media="(min-width: 768px)"
              srcSet={currentArtwork.images.hero.large}
            />
            <img src={currentArtwork.images.hero.small} alt="Currentartwork Image" className='md:max-w-[475px]'/>
          </picture>
          <div className='absolute bottom-[-4.5rem] md:bottom-0 md:top-0 md:right-0 1440:right-[-14rem] w-[18rem] z-50 flex flex-col 1440:justify-between items-start md:items-end 1440:items-start'>
            <div className='flex flex-col gap-[8px] bg-white p-6 md:p-0 md:pl-[65px] md:pb-[65px]'>
              <h2 className='TextPreset2'>{currentArtwork.name}</h2>
              <h4 className='TextPreset4 text-Slate400'>{currentArtwork.artist.name}</h4>
            </div>
            <img src={currentArtwork.artist.image} alt="Artist Image" className='1440:relative 1440:bottom-[-4rem] ml-4 1440:ml-[6rem] w-[64px] md:w-[128px]' />
          </div>
          <button onClick={() => setIsImageModalOpen(true)} className='flex gap-3 items-center justify-between absolute top-0 md:top-auto md:bottom-0 left-0 m-4 p-3 bg-black '>
            <img src={viewIcon} alt="View Icon Image" className='w-[12px]'/>
            <p className="TextPreset7 text-white">VIEW IMAGE</p>
          </button>
        </div>

        <div className='relative '>
          <h1 className='TextPreset1 text-Slate100 absolute top-[-4rem] right-0 md:right-auto md:left-[0.5rem] 1440:left-[1rem]'>{currentArtwork.year}</h1>
          <div className='grid gap-[64px] md:gap-[40px] md:max-w-[43ch] 1440:max-w-[31ch] md:mx-auto 1440:gap-[108px] relative z-50'>
            <p className='TextPreset3Mobile text-Slate400 1440:mt-[3rem]'>{currentArtwork.description}</p>
            <a href={currentArtwork.source} target='_blank' className='text-[9px] leading-[125%] tracking-[2px] font-normal text-Slate400'>GO TO SOURCE</a>
          </div>
        </div>
      </div>

      <div>
        <div className='px-6 py-4 md:px-10 flex items-center justify-between'>
          <div className='grid'>
            <h3 className="TextPreset3">{currentArtwork.name}</h3>
            <h5 className='text-[10px] md:text-[13px] text-black'>{currentArtwork.artist.name}</h5>
          </div>

          <NextandPrevous data={data} />
        </div>
      </div>
    </motion.div>
  )
}

export default Artwork