import React from 'react'
import logo from '../assets/shared/logo.svg';
import { useArtwork } from './context/ArtworkContext';
const Header = () => {
  const {setIsSlideshowOpen, isSlideshowOpen, setCurrentIndex} = useArtwork()
  return (
    <header className='flex justify-between items-center py-6 px-6 md:py-10 1440:p-10 border-b-2 text-Slate200'>
        <img src={logo} alt="Logo" className='w-[8rem] 1440:w-[14rem]' />
        <button onClick={() => { setCurrentIndex(0); setIsSlideshowOpen(prev => !prev); }} className='TextPreset5 md:text-[12px] md:leading-[125%] md:tracking-[2.5px] md:font-bold text-Slate400'>
          {isSlideshowOpen ? "STOP SLIDESHOW" : "START SLIDESHOW"}
        </button>
    </header>
  )
}

export default Header