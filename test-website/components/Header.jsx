'use client'


import MobileNav from '@/UI/MobileNav'
import { AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import OrderPickupButton from './OrderPickupButton';
import { ShoppingBag } from 'lucide-react';

const links = [
    {
        name: "ITALIANS & SONS",
        ref: "https://italianandsons.com.au/",
        external: true
    },
    {
        name: "MENU",
        ref: "/menu"
    },
    {
        name: "GALLERY",
        ref: "/gallery"
    },
    {
        name: "EVENTS",
        ref: "/events"
    },
    {
        name: "CONTACT",
        ref: "#footer"
    },
    {
        name: "FAQ",
        ref: "/faq"
    },
    {
        name: "VOUCHERS",
        ref: "/vouchers"
    },
    {
        name: "LOCATION",
        ref: "/location"
    },
    {
        name: "ORDER PICK-UP",
        ref: "https://orders.wowapps.com/order/mezzalira?src=web",
        external: true
    }
]

// const moreLinks = [
//     {
//         name: "FAQ",
//         ref: "/faq"
//     },
//     {
//         name: "VOUCHERS",
//         ref: "/vouchers"
//     },
//     {
//         name: "LOCATION",
//         ref: "/location"
const Header = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  return (
    <header className='fixed w-full top-0 z-50 bg-black/10 backdrop-blur-xs flex justify-between items-center py-[12px] 1440:py-[24px] px-[24px] md:px-[32px] 1440:px-[86px]'>
        <a href="https://orders.wowapps.com/order/mezzalira?src=web" target="_blank" rel="noopener noreferrer" className='lg:hidden' alt="Order Pick-up">
            <ShoppingBag />
        </a>
        <Link href="/" className='HeadingS'>
            <Image 
              src="/mezzaliralogo.png" 
              alt="Mezzalira Logo" 
              width={200} 
              height={40} 
              priority
              className='w-[4rem] h-auto'
            />
        </Link>
        <nav className='hidden lg:block'>
            <ul className='flex items-center gap-5 BodySmall'>
                {links.map(link => (
                    <li key={link.name} className='list-none animated-underline'>
                        {link.external ? (
                            <a href={link.ref} target="_blank" rel="noopener noreferrer">{link.name}</a>
                        ) : (
                            <Link href={link.ref}>    
                                {link.name}
                            </Link>
                        )}
                    </li>
                ))}
                {/* <li className="relative group list-none">
                    <button className="cursor-pointer">MORE</button>
                    <ul className="absolute top-full left-0 bg-[#333333] text-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 min-w-[160px] z-50">
                        {moreLinks.map(link => (
                            <li key={link.name} className='block px-4 py-2 hover:bg-white/20'>
                                <Link href={link.ref}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li> */}
                <li>
                    <Link href="/reservations">
                        <button className='px-[27px] py-[7px] bg-Black hover:text-Black hover:bg-Yellow transition-colors duration-300 rounded-[5px]'>
                            RESERVATIONS
                        </button>
                    </Link>
                </li>
            </ul>
                
        </nav>

        <button
            onClick={() => setMobileNavIsOpen(prev => !prev)}
            aria-label='Menu Button'
            className='lg:hidden'
        >
            <Menu />
        </button>

        <AnimatePresence>
            {mobileNavIsOpen && <MobileNav handleClose={setMobileNavIsOpen} links={links} />}
        </AnimatePresence>
    </header>
  )
}

export default Header