import React from 'react'
import { Facebook, X, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="footer" className='relative px-[24px] md:px-[32px] 1440:px-[86px] py-[60px] bg-Black flex flex-col 1440:flex-row items-center 1440:items-start gap-[3rem] justify-between'>
        <h2 className='HeadingS'>MEZZALIRA RISTORANTE</h2>
        <section className='flex flex-col justify-between items-center 1440:items-end gap-[3rem]'>
            <div className='flex flex-wrap justify-center gap-[2rem]'>
                <div className='flex flex-col gap-[13px] 1440:gap-[3rem] items-start'>
                    <h4 className='HeadingXS'>ADDRESS/CONTACT</h4>
                    <p className='Body'>55 London Circuit<br /> Canberra ACT 2601<br />(02) 6230 0025</p>
                </div>
                <div className='flex flex-col gap-[13px] 1440:gap-[3rem] items-start'>
                    <h4 className='HeadingXS'>OPENING HOURS</h4>
                    <p className='Body'>LUNCH 12pm-2:30pm.<br />Tue to Fri<br />DINNER 6pm-10pm,<br />Tue to Sat</p>
                </div>
                <div className='flex flex-col gap-[13px] 1440:gap-[3rem] items-start'>
                    <h4 className='HeadingXS'>ALSO VISIT</h4>
                    <a className='Body' href="https://italianandsons.com.au/" target='_blank'>Italians and sons</a>
                </div>
                <div className='flex flex-col gap-[13px] 1440:gap-[3rem] items-start'>
                    <h4 className='HeadingXS'>BOOK ONLINE</h4>
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
        </section>
        <span className='absolute bottom-0 left-[50%] translate-x-[-50%] text-[10px]'>© Mezzalira Ristorante. All rights reserved. Privacy Policy.</span>
    </footer>
  )
}

export default Footer