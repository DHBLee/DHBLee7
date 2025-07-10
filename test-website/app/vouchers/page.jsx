import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: "Vouchers",
    description: "Inquire a voucher at Mezzalira Ristorante",
}

const vouchers = () => {
  return (
    <div className='relative min-h-screen grid place-items-center'>
        <Image src="/DSC01996.JPG" fill className="absolute object-cover" />

        <div className='relative pt-[8rem] pb-[5rem] z-20 px-[86px] flex gap-10 items-start justify-center'>
            <div className='flex flex-col items-center gap-4'>
                <h2 className='text-[48px]'>VOUCHERS</h2>
                <p className='max-w-[50ch]'>Gift vouchers are not redeemable for cash and are for a one time use only. All vouchers must be presented at time of use in original format. We reserve the right to a refuse any voucher that does not match our purchase registration or has been recorded as previously redeemed.</p>
                <img src="/vouchers-gif.gif" alt="A Gif of a Mezzalira Voucher" />
            </div>
            <iframe
                src="https://obee.com.au/mezzalira/gift-voucher"
                frameBorder="0"
                width="100%"
                height="700px"
                scrolling="no"
                allowtransparency="true"
                style={{
                minHeight: '450px',
                height: '826px',
                border: 'none',
                borderRadius: '0.5rem'
                }}
                className="bg-white w-[28rem] obee-iframe-widget"
                title="Mezzalira Gift Voucher Booking"
                loading="lazy"
            >
                <div className="p-4 text-center">
                <p className="mb-4">Your browser cannot load the Online Booking Widget.</p>
                <a 
                    href="https://obee.com.au/mezzalira/gift-voucher" 
                    className="inline-block px-6 py-2 bg-[#CFAE74] text-white rounded hover:bg-[#b89960] transition-colors"
                >
                    Click here to purchase gift vouchers instead
                </a>
                </div>
            </iframe>
        </div>
        
    </div>
  )
}

export default vouchers