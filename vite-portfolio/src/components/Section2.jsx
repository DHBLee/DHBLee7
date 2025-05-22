import React from 'react'
import dongPicture from '../assets/dong-pic.png';
import AnimatedSection from './UI/AnimatedSection';

const Section2 = ({padding}) => {
  return (
    <section id="about" className={`items-center ${padding} py-5 md:py-[65px] bg-Slate100 overflow-hidden`}>
      <AnimatedSection>
          <div className='mx-auto max-w-[1320px] flex flex-col  gap-6 md:gap-0 md:flex-row md:items-center'>
              <div className='flex flex-col gap-[17px] text-center md:text-left md:w-[55%]'>
                  <h2 className="HeadingM text-Slate500">ABOUT ME</h2>
                  <p className="Body1 text-justify">Recently graduated from High School, I am a self-taught front-end developer who is aspiring to become a professional web developer. I like working with computers, thus my motivation in entering the IT industry. I plan to go beyond web development and become someone who works on the back end, mainly cyber security.</p>
              </div>
              <img src={dongPicture} alt="Personal Picture" className='mx-auto md:mx-0 md:relative right-[-3rem] w-[50%]' loading="lazy" />
          </div>
      </AnimatedSection>
    </section>
  )
}

export default Section2