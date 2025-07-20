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
    <div className="px-[24px] md:px-[32px] 1440:px-[86px] py-[27px] relative w-full min-h-[300px] h-full 1440:h-[755px]">
        <Image src="/landmark-bg.webp" fill  alt="Picture of Mezzalira outside" className="absolute object-cover"/>
         
        <MotionDiv
            ClassName='mx-auto lg:mx-0 lg:ml-auto min-w-[300px] w-full max-w-[505px]  right-0 h-full flex items-center gap-[74px] backdrop-blur-xs rounded-[5px]'
        >

            <div className="flex flex-col items-center lg:items-start gap-7">
              {texts.map((text, idx) => (
                <p key={idx} className='Body text-center lg:text-left '>{text}</p>
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