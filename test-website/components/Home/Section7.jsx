import React from 'react'

import Button from "@/UI/Button";
import Image from "next/image";
import { MotionDiv } from '@/UI/Motion';

const Section7 = () => {
  return (
    <section className=" py-[78px] grid place-content-center relative w-full h-auto max-h-[755px] aspect-[2/1]">
        <Image src="/newsletter-bg.webp" fill alt="A picture of a food" className="absolute object-cover"/>
        
         <MotionDiv
          ClassName='px-[24px] md:px-[32px] 1440:px-0 relative w-full max-w-[740px] flex flex-col items-center text-center gap-[2rem] 1440:gap-[4rem]'
        >
          <div>
              <h2 className='HeadingM'>SIGN UP TO OUR NEWSLETTER</h2>
              <p className='Body'>To receive regular updates on exciting news, mouth-watering food, award-winning wines and events from Mezzalira and Italian and Sons.</p>
          </div>
          <form action="" className='w-full flex flex-col gap-[1.7rem] items-start'>
                <fieldset className='Body flex flex-col items-start w-full gap-2'>
                  <label htmlFor="text">First Name*</label>
                  <input id="text" type="text"  className='text-black px-3 bg-white rounded-lg w-full py-1'/>
                </fieldset>
                <fieldset className='Body flex flex-col items-start w-full gap-2'>
                  <label htmlFor="text">Email*</label>
                  <input id="email" type="email"  className='text-black px-3 bg-white rounded-lg w-full py-1'/>
                </fieldset>
                <Button>
                  Subscribe
                </Button>
          </form>
          <span className='1440:mt-[-3rem] text-[10px]'>Your data is safe with us. View our full privacy policy here.</span>
        </MotionDiv>
       
      </section>
  )
}

export default Section7