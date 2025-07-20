import React from 'react'
import Gallery from './Gallery'

export const metadata = {
  title: "Gallery | Mezzalira Ristorante",
  description: "A visual showcase of Mezzalira's Italian dining experience. Explore our dishes, ambiance, and interior.",
  alternates: {
    canonical: "https://mezzalira.com.au/gallery",
  },
  openGraph: {
    title: "Gallery – Mezzalira Ristorante",
    description: "Explore images of Mezzalira's cuisine and dining space.",
    images: [
      {
        url: "/gallery (5).webp",
        width: 1200,
        height: 630,
        alt: "Interior photo of Mezzalira Ristorante",
      },
    ],
  },
}

const gallery = () => {
  return (
    <section className='bg-black'><Gallery /></section>
  )
}

export default gallery