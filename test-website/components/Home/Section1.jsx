'use client';
import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'


const sentence = "Celebrating 30 Years of Refined Italian Dining";

const container = {
  hidden: { },
  visible: {
    transition: {
      staggerChildren: 0.035, 
      delayChildren: 1.5,
    },
  },
};

const letter = {
  hidden: { opacity: 0,  },
  visible: { opacity: 1,},
};

const Section1 = () => {
    
  return (
    <div className="relative max-h-[780px]">
        <video
          src="/mezzalira-video.mp4"
          autoPlay
          muted
          loop 
          playsInline
          poster="/mezzalira-video-cover.jpg"
          className="w-full min-h-[400px] h-auto object-cover"
        > 
        
        </video>
        <div className="z-20 flex flex-col gap-4 items-center text-center absolute top-[50%] left-[50%] translate-[-50%] w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="HeadingL leading-[50px]"
          >
            MEZZALIRA RISTORANTE
          </motion.h1>
          
          <motion.h2
            className="Body flex flex-wrap"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sentence.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[154px] bg-gradient-to-t from-black/100 to-transparent pointer-events-none" />
      </div>
  )
}

export default Section1