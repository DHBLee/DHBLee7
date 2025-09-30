'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollY } = useScroll();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  // Smoother clip-path with easing
  const clipPath = useTransform(
    scrollY,
    [0, 600],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 70% 0%)"]
  );
  
  const textOpacity = useTransform(scrollY, [150, 350], [1, 0]);
  
  // Preload and optimize video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Force GPU layer
      videoRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);
  
  return (
    <div className="relative h-screen">
      {/* Video section with optimized clip-path */}
      <motion.div 
        ref={containerRef}
        className="fixed top-0 left-0 h-screen w-full z-0"
        style={{
          clipPath: clipPath,
          willChange: 'clip-path',
          transform: 'translate3d(0, 0, 0)' // Force GPU layer
        }}
      >
        <video
          ref={videoRef}
          aria-label="A Compilation Video of Mezzalira"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/mezzalira-video-cover.webp"
          className="h-screen w-full object-cover"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <source src="/mezzalira-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 shadow-inset-mask" />
      </motion.div>

      <motion.div 
        className="px-[24px] md:px-[32px] 1440:px-[86px] z-20 flex flex-col lg:gap-4 items-center text-center fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none"
        style={{
          opacity: textOpacity,
          willChange: 'opacity'
        }}
      >
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
      </motion.div>
    </div>
  );
};

export default Section1;
