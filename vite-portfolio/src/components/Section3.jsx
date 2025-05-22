import React from 'react'
import viteIcon from '../assets/vite-icon.png';
import reactIcon from '../assets/react-icon.png';
import jsIcon from '../assets/js-icon.png';
import htmlIcon from '../assets/html-icon.png';
import cssIcon from '../assets/css-icon.png';
import tailwindIcon from '../assets/tailwind-icon.png';
import gitIcon from '../assets/git-icon.png';
import TechStack from './UI/TechStack';
import AnimatedSection from './UI/AnimatedSection';

const stacks = [
  { icon: viteIcon, name: "Vite"},
  { icon: reactIcon, name: "React"},
  { icon: jsIcon, name: "JavaScript"},
  { icon: htmlIcon, name: "HTML"},
  { icon: cssIcon, name: "CSS"},
  { icon: tailwindIcon, name: "TailwindCSS"},
  { icon: gitIcon, name: "Git"},
]

const Section3 = ({padding}) => {
  return (
    <section className={`${padding} text-center bg-Slate500 py-[17px] md:py-[35px] 1440:py-[82px] `}>
        <AnimatedSection>
          <div className='mx-auto max-w-[1320px] grid gap-[21px] md:gap-[56px] 1440:gap-[117px]'>
              <h2 className='HeadingM text-Slate100'>TECH STACK</h2>
              <ul className='flex flex-wrap items-center justify-center gap-10 pb-[30px] md:pb-[50px] 1440:pb-[131px]'>
                {stacks.map((stack, index) => (
                  <TechStack icon={stack.icon} name={stack.name} key={index}/>
                ))}
              </ul>
          </div>
        </AnimatedSection>
    </section>
  )
}

export default Section3