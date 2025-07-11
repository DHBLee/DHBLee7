import React from 'react'
import { Facebook, X, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="footer" className='relative px-[86px] py-[60px] bg-[#333333] flex items-start justify-between'>
        <h2 className='text-[24px]'>MEZZALIRA RISTORANTE</h2>
        <div className='flex flex-col justify-between items-end gap-[3rem]'>
            <div className='flex gap-[2rem]'>
                <div className='flex flex-col gap-[3rem] items-start'>
                    <h3 className='text-[20px]'>ADDRESS/CONTACT</h3>
                    <p>55 London Circuit<br /> Canberra ACT 2601<br />(02) 6230 0025</p>
                </div>
                <div className='flex flex-col gap-[3rem] items-start'>
                    <h3 className='text-[20px]'>OPENING HOURS</h3>
                    <p>LUNCH 12pm-2:30pm.<br />Tue to Fri<br />DINNER 6pm-10pm,<br />Tue to Sat</p>
                </div>
                <div className='flex flex-col gap-[3rem] items-start'>
                    <h3 className='text-[20px]'>ALSO VISIT</h3>
                    <a href="https://italianandsons.com.au/" target='_blank'>Italians and sons</a>
                </div>
                <div className='flex flex-col gap-[3rem] items-start'>
                    <h3 className='text-[20px]'>BOOK ONLINE</h3>
                    <div className='grid'>
                        <Link href={"/reservations"}>
                            Make a reservation
                        </Link>
                        <Link href={"/vouchers"}>
                                Buy voucher    
                        </Link>
                    </div>
                </div>
            </div>

            <ul className='flex gap-2 items-center'>
                <li>
                    <Facebook />
                </li>
                <li>
                    <X />
                </li>
                <li>
                    <Instagram />
                </li>
                <li>
                    <Linkedin />
                </li>
            </ul>
        </div>
        <span className='absolute bottom-0 left-[50%] translate-x-[-50%] text-[10px]'>© Mezzalira Ristorante. All rights reserved. Privacy Policy.</span>
    </footer>
  )
}

export default Footer