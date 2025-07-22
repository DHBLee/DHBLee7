
import Events from '@/components/Events'
import { fetchSheetData } from '@/util/fetchSheetData'
import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: "Events",
    description: "Know more about events at Mezzalira Risotrante.",
    alternates: {
    canonical: "https://mezzalira.com.au/events",
  },
  openGraph: {
    title: "Events – Mezzalira Ristorante",
    description: "Know more about events at Mezzalira Ristorante.",
    images: [
      {
        url: "/events-bg.png",
        width: 1200,
        height: 630,
        alt: "Interior photo of Mezzalira Ristorante",
      },
    ],
  },
}




export default async function page()  {
  const initialEvents = await fetchSheetData('events')
  return (
     <section className=''>
       <div className='grid place-items-center relative py-[5rem]'>
         <Image src="/blur/events-bg-blur.webp" fill priority alt="Events BG Img of Mezzalira" className="object-cover" />
         <Events initialEvents={initialEvents}/>
       </div>
     </section>
  )
}

