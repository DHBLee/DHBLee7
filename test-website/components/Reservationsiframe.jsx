'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const Reservationsiframe = dynamic(() => Promise.resolve(() => (
  <iframe
    src="https://obee.com.au/mezzalira"
    frameBorder="0"
    width="100%"
    height="700px"
    scrolling="yes"
    allowtransparency="true"
    style={{ minHeight: '450px' }}
    className="obee-iframe-widget bg-white overflow-visible"
    title="Mezzalira Booking"
>
    Your browser cannot load the Online Booking Widget.{' '}
    <a href="https://obee.com.au/mezzalira">Click here to make a booking instead.</a>
  </iframe>
)), { ssr: false })

export default Reservationsiframe