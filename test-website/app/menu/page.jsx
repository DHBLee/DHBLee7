import React from 'react'
import Menu from '../../components/Menu'
import Image from 'next/image'

export const metadata = {
    title: "Menu",
    description: "Discover Mezzalira Italian Dining Menu",
}



async function getMenu() {
  try {
    const res = await fetch(
      'http://test-react-integration-with-wordpress.local/wp-json/wp/v2/menu_item?per_page=100&_embed',
      { next: { revalidate: 600 } } 
    )
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Failed to fetch menu:', err)
    return []
  }
}

export default async function menu() {
  const initialMenu = await getMenu()
  return (
    <div className=''>
       <div className='grid place-items-center relative h-[700px]'>
         <Image src="/menu-bg.png" fill alt="Menu BG Img of Mezzalira" className="object-cover" />
         <h2 className='absolute z-20 text-[48px] tracking-[3px]'>MENU</h2>
       </div>
        <Menu initialMenu={initialMenu} />
     </div>
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