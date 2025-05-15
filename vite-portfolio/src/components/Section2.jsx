import React from 'react'
import dongPicture from '../assets/dong-pic.png';

const Section2 = ({padding}) => {
  return (
    <section className={`relative flex flex-col gap-6 md:flex-row items-center ${padding} py-5 md:py-[65px] bg-Slate100 overflow-x-hidden`}>
        <div className='grid gap-[17px] text-center md:text-left md:w-[55%]'>
            <h2 className="HeadingM text-Slate500">ABOUT ME</h2>
            <p className="Body1 text-justify">Recently graduated from High School, I am a self-taught front-end developer who is aspiring to become a professional web developer. I like working with computers, thus my motivation in entering the IT industry. I plan to go beyond web development and become someone who works on the back end, mainly cyber security.</p>
        </div>
        <img src={dongPicture} alt="Personal Picture" className='md:absolute right-[-3rem] top-[5rem] w-[50%]' />
    </section>
  )
}

export default Section2