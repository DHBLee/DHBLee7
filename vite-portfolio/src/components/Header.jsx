import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import menuIcon from '../assets/menu-icon.png';
import MobileNav from './UI/MobileNav';

const Header = ({ padding }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  
  return (
    <header className={`${padding} py-[12.5px] md:py-[13.5px] 1440:py-[21px] bg-Slate200 text-Slate500`}>
      <div className='mx-auto max-w-[1320px] flex justify-between items-center'>
        <h6 className='text-[14px] md:text-[15px] 1440:text-[24px] font-bold'>DHBLee</h6>

        <nav aria-label='Main menu' className='z-50 hidden md:flex gap-5 md:gap-7 1440:gap-11'>
          <a href="#about">About</a>
          <a href="#project">My Project</a>
          <a href="#contact">Contact</a>
        </nav>

        <button 
          onClick={() => setMobileNavIsOpen(prev => !prev)} 
          aria-label='Menu Button' 
          className='z-50 md:hidden'
        >
          <img src={menuIcon} alt="Menu Icon" />
        </button>

        <AnimatePresence>
          {mobileNavIsOpen && <MobileNav handleClose={setMobileNavIsOpen} key="mobile-nav" />}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;