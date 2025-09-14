'use client';
import React from 'react';
import { motion } from 'framer-motion';

const sentence = "Celebrating 30 Years of Refined Italian Dining";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 1.5 },
  },
};

const letter = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Section1 = () => {
  return (
    <div className="relative h-screen">
      {/* Wrapper that creates the inner shadow via pseudo-element */}
      <div className="video-wrap relative h-screen w-full">
        <video
          aria-label="A Compilation Video of Mezzalira"
          autoPlay
          muted
          loop
          playsInline
          fetchPriority="high"
          poster="/mezzalira-video-cover.webp"
          className="h-screen w-full object-cover"
        >
          <source src="/mezzalira-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Inner shadow overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 shadow-inset-mask" />
      </div>

      {/* Text above overlay so it “shines” */}
      <div className="px-[24px] md:px-[32px] 1440:px-[86px] z-20 flex flex-col lg:gap-4 items-center text-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="HeadingL 1860:text-[6rem] leading-[50px]"
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
    </div>
  );
};

export default Section1;
