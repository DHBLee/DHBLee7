import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styleLines, getAppliedClasses, getParentContainerClasses } from '../util/stylesLogic';
import AnimatedSection from './UI/AnimatedSection';
import arrow from '../assets/arrow.png';

const Section1 = ({ padding }) => {
  const [activeStyles, setActiveStyles] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const timeoutRef = useRef(null);

  const handleClick = (style) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setActiveStyles(style.split(' '));

    timeoutRef.current = setTimeout(() => {
      setActiveStyles(null);
    }, 2000);
  };

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  const handleHoverEnd = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className={`relative ${padding} pt-[20px] md:pt-[90px] 1440:pt-[84px] bg-Slate100`}>
          <div className='mx-auto max-w-[1320px]'>
            <AnimatedSection>
              <div className='grid'>
                <span className='Small text-Slate500'>HELLO, MY FRIEND. MY NAME IS</span>
                <h1 className='HeadingL text-Slate600 max-w-[20ch]'>
                  Dong Hee Lee, <br /> An <span className='border-b-8 border-Slate200 text-Slate500'>Aspiring</span> Web Developer
                </h1>
              </div>
            </AnimatedSection> 

            <motion.div
              className={`mt-[-3rem] 1440:mt-[-5rem] pt-[3rem] text-Slate500 text-[5px] w-[calc(116/375*100vw)] md:w-[calc(230/768*100vw)] h-[calc(259/375*100vw)] md:h-[calc(510/768*100vw)] 1440:h-[calc(766/1440*100vw)] bg-[#487EB0]/[19%] absolute right-[clamp(1rem,-1.684859154929577rem+11.455399061032862vw,8.625rem)] 1597:right-[clamp(16rem,10.914653784219002rem+5.152979066022544vw,18rem)] max-w-[439px] max-h-[779px] top-0 ${getParentContainerClasses(activeStyles)}`}
              layout 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
            >
              <div className='relative w-full h-full'>
                  <AnimatePresence>
                    {styleLines.map((line, index) => (
                          <motion.p
                            key={index}
                            onHoverStart={() => handleHover(index)}
                            onHoverEnd={handleHoverEnd}
                            onClick={() => handleClick(line.style)}
                            className={`transition-colors duration-300 ease-in-out ${activeStyles?.join(' ') === 'flex flex-col' || activeStyles?.join(' ') === 'absolute' ? 'relative' :  'absolute'} cursor-pointer ExtraSmall ${getAppliedClasses(line, activeStyles)}`}
                            variants={itemVariants}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            layout="position" 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              duration: 0.3
                            }}
                          >
                            {line.text}
                          <AnimatePresence>
                            {hoveredItem === index && (
                              <motion.span
                                className="absolute left-1/2 top-full mt-4 -translate-x-1/2 py-1 px-2 bg-Slate400 text-Slate500 ExtraSmall rounded whitespace-nowrap z-20"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                  {line.tooltip}
                                
                              </motion.span>
                            )}
                          </AnimatePresence>
                          </motion.p>

                    ))}
                  </AnimatePresence>
              </div>
            </motion.div>
            <AnimatedSection>
              <hr className='mt-[106px] md:mt-[252px] border-0 border-b-4 border-Slate300'/>
            </AnimatedSection>


            <motion.div 
              className='absolute left-[50%] translate-x-[-50%] bottom-[20%] translate-y-[-20%] flex flex-col-reverse items-center'
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,scale: 1,
                transition: {
                  delay: 1,
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }
              }}
            >
              <p className='ExtraSmall text-Slate500 '>Try out this interactive feature!</p>
              <img src={arrow} alt="An Arrow" className='w-8 rotate-[-80deg]'/>
            </motion.div>
          </div>
    </section>
  );
};

export default Section1;