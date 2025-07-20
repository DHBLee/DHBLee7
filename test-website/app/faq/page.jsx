import React from 'react'
import FaqSection from './FaqSection';

export const metadata = {
    title: "FAQ",
    description: "See the most frequently asked questions with regards to dining at Mezzalira Risotrante.",
    alternates: {
    canonical: "https://mezzalira.com.au/faq",
  },
  openGraph: {
    title: "FAQ – Mezzalira Ristorante",
    description: "See the most frequently asked questions with regards to dining at Mezzalira Risotrante.",
    images: [
      {
        url: "/faq-bg.webp",
        width: 1200,
        height: 630,
        alt: "Interior photo of Mezzalira Ristorante",
      },
    ],
  },
}

const faq = () => {
  return (
    <FaqSection />
  )
}

export default faq