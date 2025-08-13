
import React from 'react'
import Menu from '../../components/Menu'
import { fetchSheetData } from '@/util/fetchSheetData'
import Image from 'next/image'
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



export default async function MenuPage() {
  const initialMenu = await fetchSheetData('menu');
  return (
    <section className='flex flex-col'>
      <div className="relative hidden lg:block h-[400px] w-full">
        <Image
          src="/images/background/wood-fire.webp"
          fill
          alt="A dining table setup at Mezzalira"
          className="object-cover absolute inset-0"
          priority
        />
        <h1 className="absolute top-[50%] left-[50%] translate-[-50%] z-20 HeadingM tracking-[3px]">MENU</h1>
      </div>
      <div className="lg:grid lg:grid-cols-2 ">
          <div className='lg:sticky lg:top-0 lg:h-screen'>
              <div className="relative h-[600px] lg:h-screen">
                  <Image
                    src="/images/background/menu-bg.webp"
                    fill
                    alt="A selection of dishes from Mezzalira's menu"
                    className="object-cover"
                    priority
                  />
                  <h1 className="absolute top-[50%] left-[50%] translate-[-50%] z-20 HeadingL tracking-[3px] lg:hidden">MENU</h1>
              </div>
          </div>
          <Menu initialMenu={initialMenu} />
      </div>
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