import React, { useState } from 'react';
import menuIcon from '../assets/menu-icon.png';
import MobileNav from './UI/MobileNav';

const Header = ({padding}) => {
    const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  return (
    <header className={`flex justify-between items-center ${padding} py-[12.5px] md:py-[13.5px] 1440:py-[21px] bg-Slate200 text-Slate500`}>
        <h6 className='text-[14px] md:text-[15px] 1440:text-[24px] font-bold'>DHBLee</h6>


        <nav aria-label='Main menu' className='hidden md:flex gap-5 md:gap-7 1440:gap-11'>
            <a href="">About</a>
            <a href="">My Project</a>
            <a href="">Contact</a>
        </nav>

        {!mobileNavIsOpen && (
            <button onClick={() => setMobileNavIsOpen(prev => !prev)} aria-label='Menu Button' className='md:hidden'>
                <img src={menuIcon} alt="Menu Icon" />
            </button>
        )}

        {mobileNavIsOpen && <MobileNav handleClose={setMobileNavIsOpen} />}
    </header>
  )
}

export default Header