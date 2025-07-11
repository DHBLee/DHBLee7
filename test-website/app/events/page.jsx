import Event from '@/components/Event'
import Image from 'next/image'
import React from 'react'


async function getMenu() {
  try {
    const res = await fetch(
      'https://api.sheetbest.com/sheets/6b54a76a-271c-4df0-9126-5c7481bcd075',
      { next: { revalidate: 600 } } 
    )
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Failed to fetch menu:', err)
    return []
  }
}

export default async function page()  {
  const initialMenu = await getMenu()
  return (
     <div className=''>
       <div className='grid place-items-center relative h-[700px]'>
         <Image src="/menu-bg.png" fill alt="Menu BG Img of Mezzalira" className="object-cover" />
         <h2 className='absolute z-20 text-[48px] tracking-[3px]'>MENU</h2>
       </div>
        <Event initialMenu={initialMenu} />
     </div>
  )
}

