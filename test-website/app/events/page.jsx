
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
        url: "/images/background/events-bg.png",
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
     <section className='w-full relative min-h-screen grid place-items-center'>
       <div className="absolute inset-0">
         <Image 
           src="/images/background/events-bg.webp" 
           alt="BG Picture for Events Page" 
           priority 
           fill 
           className="object-cover"
           quality={90}
           sizes="100vw"
           placeholder="blur"
           blurDataURL="/images/blur/events-bg-blur.webp"
         />
       </div>
       <div className='relative z-10 w-full py-[5rem]'>
         <Events initialEvents={initialEvents}/>
       </div>
     </section>
  )
}

