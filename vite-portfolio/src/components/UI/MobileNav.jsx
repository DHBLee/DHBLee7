import React from 'react'
import { createPortal } from 'react-dom';
import closeIcon from '../../assets/close-icon.png';

const MobileNav = ({handleClose}) => {
    return createPortal (
        <div className='h-screen w-[40%] absolute right-0 top-0 flex flex-col gap-[55px] px-5 py-[16px] bg-Slate500'>
            <button onClick={() => handleClose(prev => !prev)} aria-label='Close Button'>
                <img src={closeIcon} alt="Close Icon" className='ml-auto'/>
            </button>

            <nav className='grid gap-5 text-white font-bold text-[12px]'>
                <a href="">About</a>
                <a href="">My Project</a>
                <a href="">Contact</a>
            </nav>
        </div>,
        document.getElementById('mobile-nav')
    )
}

export default MobileNav