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
        <Image src="/vouchers-bg.webp" alt="BG Picture for Vouchers Page" priority fill className="absolute object-cover" />

        <div className='relative pt-[8rem] pb-[5rem] z-20 px-[24px] md:px-[32px] 1440:px-[86px] flex flex-col lg:flex-row gap-10 items-center justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <h2 className='HeadingM'>VOUCHERS</h2>
                <p className='text-center lg:text-left Body max-w-[50ch]'>Gift vouchers are not redeemable for cash and are for a one time use only. All vouchers must be presented at time of use in original format. We reserve the right to a refuse any voucher that does not match our purchase registration or has been recorded as previously redeemed.</p>
                <img src="/vouchers-gif.gif" alt="A Gif of a Mezzalira Voucher" />
            </div>
            <iframe
              src="https://obee.com.au/mezzalira/gift-voucher"
              frameBorder="0"
              height="826px"
              width="100%"
              scrolling="yes"
              allowTransparency={true}
              className="bg-white  rounded-md"
              title="Mezzalira Gift Voucher Booking"
              loading="lazy"
            >
              <div className="p-4 text-center">
                <p className="Body mb-4">Your browser cannot load the Online Booking Widget.</p>
                <a
                  href="https://obee.com.au/mezzalira/gift-voucher"
                  className="inline-block px-6 py-2 bg-Yellow text-white rounded hover:bg-[#b89960] transition-colors"
                >
                  Click here to purchase gift vouchers instead
                </a>
              </div>
            </iframe>
        </div>
        
    </section>
  )
}

export default vouchers