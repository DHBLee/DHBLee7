import React from 'react'
import { workSans } from '@/app/fonts';
import { lora } from '@/app/fonts';
import Button from "@/UI/Button";
import Image from "next/image";
import { MotionDiv } from '@/UI/Motion';
import Link from 'next/link';

const Section6 = () => {
  return (
    <>
     <section className="px-[24px] md:px-[32px] 1440:px-[86px] py-[78px] relative w-full aspect-[2/1]">
        <Image src="/wood-fire.webp" fill alt="A Background Picure of a Fire-wood Oven" className="object-cover"/>

        <MotionDiv
          ClassName='relative z-20'
        >
            <img src="/brighter-images-of-places.webp" alt="Images of the interior of Mezzalira Ristorante" />
        </MotionDiv>
      </section>
      
      <section className='bg-[#333333]'>
        <MotionDiv
          transition={{ duration: 0.6 }}
          ClassName=' py-[41px] grid place-items-center gap-6 px-[24px] md:px-[32px] 1440:px-[86px] w-full text-center'
        >
          <h2 className={`${lora.className} HeadingM`}>Memorable Meals, Together</h2>
          <p className={`Body ${workSans.className}`}>Our function menu, perfect for private events and group dining, our curated function menus feature seasonal produce and a choice of set, shared, or tasting experiences—crafted for memorable celebrations.</p>
          <Link href="/menu">
            <Button>
                Function Menu
            </Button>
          </Link>
        </MotionDiv>
      </section>
    </>
  )
}

export default Section6