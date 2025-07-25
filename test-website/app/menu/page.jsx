import React from 'react'
import Menu from '../../components/Menu'
import Image from 'next/image'
import { fetchSheetData } from '@/util/fetchSheetData'

export const metadata = {
  title: "Menu | Mezzalira Ristorante",
  description: "Explore our curated Italian menu featuring handmade pasta, premium wines, and seasonal specialties.",
  alternates: {
    canonical: "https://mezzalira.com.au/menu"
  },
  openGraph: {
    title: "Menu – Mezzalira Ristorante",
    description: "Award-winning fine dining Italian menu in Canberra.",
    images: [
      {
        url: "/menu-bg.webp",
        width: 1200,
        height: 630,
        alt: "A snapshot of Mezzalira's Italian menu"
      }
    ]
  }
}



export default async function menu() {
  const initialMenu = await fetchSheetData('menu');
  return (
    <section className=''>
       <div className='grid place-items-center relative min-h-[200px] md:h-[450px] 1440:h-[700px] max-h-[700px]'>
         <Image src="/images/background/menu-bg.webp" fill alt="Menu BG Img of Mezzalira" className="object-cover" />
         <h1 className='absolute z-20 HeadingM tracking-[3px]'>MENU</h1>
       </div>
        <Menu initialMenu={initialMenu} />
     </section>
  )
}


// const menu = () => {
//   return (
//     <div className=''>
//       <div className='grid place-items-center relative h-[700px]'>
//         <Image src="/menu-bg.png" fill alt="Menu BG Img of Mezzalira" className="object-cover" />
//         <h2 className='absolute z-20 text-[48px] tracking-[3px]'>MENU</h2>
//       </div>
//       <Menu />
//     </div>
//   )
// }

// export default menu