import React from 'react';
import { motion } from 'framer-motion';


const colors = {
      'react': '#58C4DC',
      'tailwindcss': '#00BCFF',
      'vite': '#3C2757',
      'html': '#E94736',
      'css': '#236FAE',
      'javascript': '#A3952A',
      'scss': '#D16EA2'
};

const Project = ({img, name, description, link, codelink, reverse, techstack, customAnimation}) => {
  const variants = customAnimation || {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants} 
      className={`flex flex-col  ${reverse ? '1024:flex-row-reverse' : '1024:flex-row'} h-max 1024:items-start gap-4 md:gap-6 1024:gap-[80px]`}>
      <img src={img} alt={img} className='1024:w-[45%] 1024:h-max object-contain' loading='lazy'/>
      <div className='flex flex-col text-center gap-4 md:gap-5 1024:text-left'>
          <div className='flex flex-col gap-1'>
            <h3 className='HeadingS text-Slate100'>{name}</h3>
            <ul className='text-[10px] md:text-[16px] flex justify-center 1024:justify-start gap-4 text-Slate100'>
              {techstack.map((stack, index) => (
                <li 
                  key={index} 
                  className='rounded-[5px] px-4'
                  style={{ backgroundColor: colors[stack.toLowerCase()] }}  
                >{stack}</li>
              ))}
              
            </ul>
          </div>
          
          <p className='Body2 text-Slate100'>{description}</p>
          <div className='flex justify-center 1024:justify-start gap-[23px] Body2'>
            <button className='px-4 py-1.5 font-bold rounded-[10px] bg-Slate500 text-Slate100'>
              <a target="_blank" rel="noopener noreferer" href={link}>View Project</a>
            </button>
            <button className='px-4 py-1.5 font-bold rounded-[10px] bg-Slate300 text-Slate500'>
              <a target="_blank" rel="noopener noreferer" href={codelink}>View Code</a>
            </button>
          </div>
      </div>
    </motion.div>
  )
}

export default Project