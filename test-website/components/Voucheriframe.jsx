'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const Voucheriframe = dynamic(() => Promise.resolve(() => (
  <iframe
    src="https://obee.com.au/mezzalira/gift-voucher"
    frameBorder="0"
    height="826px"
    width="100%"
    scrolling="yes"
    allowtransparency="true"
    className="bg-white rounded-md"
    title="Mezzalira Gift Voucher Booking"
    loading="lazy"
  />
)), { ssr: false })

export default Voucheriframe