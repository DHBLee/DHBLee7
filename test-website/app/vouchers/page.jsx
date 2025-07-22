import Voucheriframe from '@/components/Voucheriframe'
import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: "Vouchers",
    description: "Inquire a voucher at Mezzalira Ristorante",
    alternates: {
    canonical: "https://mezzalira.com.au/vouchers",
  },
  openGraph: {
    title: "Vouchers – Mezzalira Ristorante",
    description: "Inquire a voucher at Mezzalira Ristorante",
    images: [
      {
        url: "/vouchers-bg.webp",
        width: 1200,
        height: 630,
        alt: "Interior photo of Mezzalira Ristorante",
      },
    ],
  },
}

const vouchers = () => {
  return (
    <section className='w-full relative min-h-screen grid place-items-center'>
        <Image src="/vouchers-bg.webp" alt="BG Picture for Vouchers Page" priority fill className="absolute object-cover" placeholder="blur"
  blurDataURL="/blur/vouchers-bg-blur.webp"  />

        <div className='relative pt-[8rem] pb-[5rem] z-20 px-[24px] md:px-[32px] 1440:px-[86px] flex flex-col lg:flex-row gap-10 items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <h1 className='HeadingM'>VOUCHERS</h1>
                <p className='text-center lg:text-left Body max-w-[50ch]'>Gift vouchers are not redeemable for cash and are for a one time use only. All vouchers must be presented at time of use in original format. We reserve the right to a refuse any voucher that does not match our purchase registration or has been recorded as previously redeemed.</p>
                <Image unoptimized width={600} height={500} src="/vouchers-gif.gif" alt="A Gif of a Mezzalira Voucher" />
            </div>
            <Voucheriframe />
        </div>
        
    </section>
  )
}

export default vouchers