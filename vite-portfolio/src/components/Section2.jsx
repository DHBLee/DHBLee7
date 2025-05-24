import React from 'react'
import dongPicture from '../assets/dong-pic.png';
import AnimatedSection from './UI/AnimatedSection';

const Section2 = ({padding}) => {
  return (
    <section id="about" className={`items-center ${padding} py-5 md:py-[65px] bg-Slate100 overflow-hidden`}>
      <AnimatedSection>
          <div className='mx-auto max-w-[1320px] flex flex-col  gap-6 md:gap-0 md:flex-row md:items-start'>
              <div className='md:mt-8 flex flex-col gap-[17px] text-center md:text-left md:w-[55%]'>
                  <h2 className="HeadingM text-Slate500">ABOUT ME</h2>
                  <p className="Body1 text-justify mx-auto md:mx-0 max-w-[40ch]">Fresh out of high school, I am a self-taught front-end developer with a passion for building clean, interactive web experiences. My curiosity for technology drives me to explore beyond the surface—currently expanding my skills into back-end development with the goal of becoming a full-stack developer.</p>
              </div>
              <img src={dongPicture} alt="Personal Picture" className='mx-auto md:mx-0 md:relative right-[-3rem] w-[50%]' loading="lazy" />
          </div>
      </AnimatedSection>
    </section>
  )
}

export default Section2