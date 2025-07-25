import React from 'react'
import Button from "@/UI/Button";
import Image from "next/image";
import { lora, workSans } from '@/app/fonts';
import Link from 'next/link';
import { MotionDiv, MotionH3 } from '@/UI/Motion';


const texts = [
    {
        title: 'Handmade Pastas',
        description: 'Fresh pasta made daily with premium ingredients',
    },
    {
        title: 'Wood-Fired Flavors',
        description: 'Authentic taste from our traditional wood-fired oven',
    },
    {
        title: 'Seasonal Produce',
        description: 'Locally sourced, seasonal ingredients in every dish',
    }
]
const Section2 = () => {
  return (
    <div className="py-[58px] relative grid place-items-center w-full h-auto max-h-[855px] aspect-[2/1]">
        <Image src="/images/background/variety-meets-craft-bg.webp" fill alt="A background picture of the kitchen" quality={100} className="object-cover"/>

        <div className="flex flex-col items-center justify-center gap-[30px] relative px-[24px] md:px-[32px] 1440:px-[86px]">
          <MotionH3
            ClassName={`${lora.className} HeadingL text-center leading-[44px] 1440:leading-[70px]`}
          >
              <span className='HeadingXS'>WHERE</span><br /> VARIETY<br /> <span className='HeadingXS'>MEETS</span><br /> CRAFT
          </MotionH3>

          <MotionDiv
              ClassName='flex flex-col gap-10 items-center'
          >
            <h4 className={`HeadingXS leading-[36px] max-w-[46ch] ${workSans.className}`}>
              Experience modern Italian dining with a focus on - 
            </h4>
            <div className={`flex gap-[31px] flex-wrap justify-center ${workSans.className}`}>
              {texts.map((text, idx) => (
                <div key={idx} className='flex flex-col gap-1 md:gap-3 justify-center text-center rounded-2xl border-[1px] border-white/30 bg-white/15 backdrop-blur-[2px] w-full max-w-[364px] h-auto max-h-[239px] p-[18px] md:p-[24px]'>
                    <h4 className='font-bold HeadingXS'>{text.title}</h4>
                    <p className='Body'>{text.description}</p>
                </div>
              ))}
            </div>
            <Link href="/menu">
              <Button>
                  View Our Menu                
              </Button>
            </Link>

          </MotionDiv>
        </div>
    </div>
  )
}

export default Section2