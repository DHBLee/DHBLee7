import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import closeIcon from '../../assets/close-icon.png';

const MobileNav = ({ handleClose }) => {
  const navAnimation = {
    hidden: { 
      x: '100%',
      opacity: 0.3,
       
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: 'tween',
        stiffness: 300,
        damping: 30,
        when: "beforeChildren"
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.3
      }
    }
  };

  return createPortal(
      <motion.div
        className='z-100 fixed inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div 
          className="fixed inset-0 bg-black/50"
          onClick={() => handleClose(false)}
        />
        
        <motion.div
          className='fixed h-screen w-[40%] right-0 top-0 flex flex-col gap-[55px] px-7 py-[16px] bg-Slate500'
          variants={navAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button 
            onClick={() => handleClose(false)} 
            aria-label='Close Button'
            className='ml-auto'
          >
            <img src={closeIcon} alt="Close Icon" loading='lazy'/>
          </button>

          <nav className='z-50 grid gap-5 text-white font-bold text-[12px]'>
            <a href="#about" onClick={() => handleClose(false)}>About</a>
            <a href="#project" onClick={() => handleClose(false)}>My Project</a>
            <a href="#contact" onClick={() => handleClose(false)}>Contact</a>
          </nav>
        </motion.div>
      </motion.div>,
    document.getElementById('mobile-nav')
  );
};

export default MobileNav;