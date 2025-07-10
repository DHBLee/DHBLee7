
import Link from 'next/link'
import React from 'react'

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
]

const moreLinks = [
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
]
const Header = () => {
  return (
    <header className='fixed w-full top-0 z-50 bg-black/10 backdrop-blur-xs flex justify-between items-center py-[24px] px-[86px]'>
        <Link href="/" className='text-[24px]'>MEZZALIRA RISTORANTE</Link>
        <nav>
            <ul className='flex items-center gap-5 text-[12px]'>
                {links.map(link => (
                    <li key={link.name} className='list-none'>
                        {link.external ? (
                            <a href={link.ref} target="_blank" rel="noopener noreferrer">{link.name}</a>
                        ) : (
                            <Link href={link.ref}>    
                                {link.name}
                            </Link>
                        )}
                    </li>
                ))}
                <li className="relative group list-none">
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
                </li>
                <button className='px-[27px] py-[7px] bg-[#333333] rounded-[5px]'>
                    <Link href="/reservations">
                        RESERVATIONS
                    </Link>
                </button>
            </ul>
                
        </nav>
    </header>
  )
}

export default Header