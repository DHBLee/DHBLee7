
import Image from 'next/image'
import React from 'react'



export default function page()  {
  return (
     <div className=''>
       <div className='grid place-items-center relative h-[700px]'>
         <Image src="/events-bg.png" fill alt="Menu BG Img of Mezzalira" className="object-cover" />
         <div className='flex flex-col items-center gap-10 absolute z-20 '>
          <h2 className='text-[48px] tracking-[3px]'>EVENTS</h2>
            <p>There are no events as of the moment.</p>
         </div>
       </div>
     </div>
  )
}

