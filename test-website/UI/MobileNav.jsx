import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';


const MobileNav = ({ links, handleClose }) => {
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
          className='fixed h-screen w-[50%] right-0 top-0 flex flex-col gap-[55px] px-7 py-[16px] bg-Black'
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
            <X />
          </button>

          <nav className='z-50 grid gap-5 text-white font-normal text-[12px]'>
            <ul className='flex flex-col items-start gap-5 Body'>
                {links.map(link => (
                    <li key={link.name} className='list-none'>
                        {link.external ? (
                            <a onClick={() => handleClose(false)} href={link.ref} target="_blank" rel="noopener noreferrer">{link.name}</a>
                        ) : (
                            <Link href={link.ref} onClick={() => handleClose(false)}>    
                                {link.name}
                            </Link>
                        )}
                    </li>
                ))}
                <Link href="/reservations" onClick={() => handleClose(false)}>
                    <button className='text-Black px-[27px] py-[7px] bg-Yellow rounded-[5px]'>
                        RESERVATIONS
                    </button>
                </Link>
            </ul>
          </nav>
        </motion.div>
      </motion.div>,
    document.getElementById('mobile-nav')
  );
};

export default MobileNav;