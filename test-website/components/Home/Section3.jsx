import React from 'react'
import Button from "@/UI/Button";
import Image from "next/image";
import { MotionDiv } from '@/UI/Motion';
import Link from 'next/link';


const texts = [
    "Located in the landmark 1920s Melbourne Building on leafy west row, Mezzalira brings classic italian charisma to the heart of Canberra's CBD.",
    "Since 1996, Mezzalira has established itself as Canberra’s iconic Italian restaurant. It’s a space for all seasons and reasons, from casual catch-ups at the bar to the ‘cognoscenti’ business lunch crowd.",
    "At night it is an elegant dining stage framed by the art deco architecture overlooking the city streets. The menu, like the space, suits any occasion, from aperitivi and snacks to premium wood-fired meats and seafood."
]

const Section3 = () => {
  return (
    <div className="relative w-full h-screen">
        <Image src="/images/background/landmark-bg.webp" fill  alt="Picture of Mezzalira outside" className="object-cover "/>
         
        <MotionDiv
            ClassName='px-[24px] md:px-[32px] 1440:px-[86px] mx-auto lg:mx-0 lg:ml-auto min-w-[300px] w-full md:max-w-[70%] lg:max-w-[40%] h-screen flex items-center gap-[74px] backdrop-blur-xs'
        >

            <div className="flex flex-col items-center lg:items-start gap-7">
              {texts.map((text, idx) => (
                <p key={idx} className='Body text-center lg:text-left'>{text}</p>
              ))}

              <Link href="/location">
                <Button>
                    View Our Location
                </Button>
              </Link>
            </div>
        </MotionDiv>
      </div>
  )
}

export default Section3






// import React from 'react'
// import { workSans } from '@/app/fonts';
// import { lora } from '@/app/fonts';
// import Button from "@/UI/Button";
// import Image from "next/image";
// import { MotionDiv } from '@/UI/Motion';
// import Link from 'next/link';

// const Section6 = () => {
//   return (
//     <>
//      <section className="px-[24px] md:px-[32px] 1440:px-[86px] py-[78px] relative w-full aspect-[2/1]">
//         <Image src="/images/background/wood-fire.webp" fill alt="A Background Picure of a Fire-wood Oven" className="object-cover"/>

//         <MotionDiv
//           ClassName='relative z-20'
//         >
//             <img src="/brighter-images-of-places.webp" alt="Images of the interior of Mezzalira Ristorante" />
//         </MotionDiv>
//       </section>
      
//       <section className='bg-[#333333]'>
//         <MotionDiv
//           transition={{ duration: 0.6 }}
//           ClassName=' py-[41px] 1440:py-[70px] grid place-items-center gap-6 px-[24px] md:px-[32px] 1440:px-[86px] w-full text-center'
//         >
//           <h2 className={`${lora.className} HeadingM`}>Memorable Meals, Together</h2>
//           <p className={`Body ${workSans.className} max-w-[90ch]`}>Our function menu, perfect for private events and group dining, our curated function menus feature seasonal produce and a choice of set, shared, or tasting experiences—crafted for memorable celebrations.</p>
//           <Link href="/menu">
//             <Button>
//                 Function Menu
//             </Button>
//           </Link>
//         </MotionDiv>
//       </section>
//     </>
//   )
// }

// export default Section6