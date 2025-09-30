'use client';

import { motion } from 'framer-motion'
import Image from "next/image";
import { testimonials2 } from '@/util/data'
import React, { useState, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '@/util/useMediaQuery';

const Section5 = () => {
  const [slidePosition, setSlidePosition] = useState(0);
  
  // Replace useEffect with useMediaQuery hook for better performance
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  
  const screenSize = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  // Memoize navigation handlers
  const nextTestimonial = useCallback(() => {
    setSlidePosition(prev => prev + 1);
  }, []);

  const prevTestimonial = useCallback(() => {
    setSlidePosition(prev => prev - 1);
  }, []);

  // Memoize infinite array - only recreate if testimonials2 changes
  const infiniteTestimonials = useMemo(() => {
    const repetitions = 5; // Reduced from 20 to 5
    return Array.from({ length: repetitions }, () => testimonials2).flat();
  }, []);

  const startingIndex = testimonials2.length * 2; // Adjusted for smaller array

  // Memoize responsive configuration
  const config = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return { cardWidth: 320, visibleCards: 1, containerPadding: 24 };
      case 'tablet':
        return { cardWidth: 300, visibleCards: 2, containerPadding: 32 };
      default:
        return { cardWidth: 400, visibleCards: 3, containerPadding: 0 };
    }
  }, [screenSize]);

  const { cardWidth, visibleCards, containerPadding } = config;
  
  // Memoize calculated values
  const containerWidth = useMemo(() => 
    (cardWidth * visibleCards) + containerPadding, 
    [cardWidth, visibleCards, containerPadding]
  );
  
  const currentPosition = startingIndex + slidePosition;
  
  const offset = useMemo(() => 
    -(currentPosition * cardWidth) + containerWidth / 2 - cardWidth / 2,
    [currentPosition, cardWidth, containerWidth]
  );

  return (
    <section className='relative min-h-screen flex items-center justify-center'>
      <Image 
        src="/images/background/variety-meets-craft-bg.webp" 
        fill 
        alt="Background Image for Testimonials" 
        className="object-cover"
        priority={false}
        quality={75}
        sizes="100vw"
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 ${
            screenSize === 'mobile' ? 'left-2' : 'left-4'
          }`}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 ${
            screenSize === 'mobile' ? 'right-2' : 'right-4'
          }`}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Container */}
        <div 
          className="overflow-hidden py-20 mx-auto"
          style={{ 
            width: `${containerWidth}px`,
            maxWidth: '100vw'
          }}
        >
          <motion.div
            className="flex"
            animate={{ x: offset }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              width: `${infiniteTestimonials.length * cardWidth}px`,
              willChange: 'transform'
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => {
              const isCenter = index === currentPosition;
              
              return (
                <div
                  key={`${testimonial.id || testimonial.name}-${index}`}
                  className={`flex-shrink-0 transition-all duration-500 ease-out ${
                    screenSize === 'mobile' ? 'px-2' : 'px-4'
                  } ${
                    isCenter 
                      ? 'scale-100 z-10 opacity-100' 
                      : `${screenSize === 'mobile' ? 'scale-100 opacity-60' : 'scale-75 opacity-50'} z-0`
                  }`}
                  style={{ width: `${cardWidth}px` }}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    isActive={isCenter}
                    screenSize={screenSize}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Memoized TestimonialCard
const TestimonialCard = React.memo(({ testimonial, isActive, screenSize }) => {
  // Memoize styles calculation
  const styles = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return {
          containerHeight: isActive ? 'h-[400px]' : 'h-[380px]',
          padding: isActive ? 'p-4 pt-10' : 'p-3 pt-9',
          profileSize: isActive ? 'w-16 h-16' : 'w-14 h-14',
          profileTop: isActive ? '-top-8' : '-top-7',
          imageSize: isActive ? 64 : 56,
          titleSize: isActive ? 'Body' : 'text-sm',
          textSize: isActive ? 'Body' : 'text-xs',
          sourceSize: 'text-xs'
        };
      case 'tablet':
        return {
          containerHeight: isActive ? 'h-[380px]' : 'h-[360px]',
          padding: isActive ? 'p-5 pt-11' : 'p-4 pt-10',
          profileSize: isActive ? 'w-18 h-18' : 'w-16 h-16',
          profileTop: isActive ? '-top-9' : '-top-8',
          imageSize: isActive ? 72 : 64,
          titleSize: isActive ? 'Body' : 'text-base',
          textSize: isActive ? 'Body' : 'text-sm',
          sourceSize: 'BodySmall'
        };
      default:
        return {
          containerHeight: isActive ? 'h-[420px]' : 'h-[380px]',
          padding: isActive ? 'p-6 pt-12' : 'p-4 pt-10',
          profileSize: isActive ? 'w-20 h-20' : 'w-16 h-16',
          profileTop: isActive ? '-top-10' : '-top-8',
          imageSize: isActive ? 80 : 64,
          titleSize: isActive ? 'Body' : 'text-base',
          textSize: isActive ? 'Body' : 'text-sm',
          sourceSize: 'BodySmall'
        };
    }
  }, [screenSize, isActive]);

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center transition-all duration-500 ${styles.containerHeight} ${styles.padding} ${
      !isActive ? 'cursor-pointer hover:bg-white/15' : ''
    } w-full flex flex-col mx-auto relative will-change-transform`}>
      
      {/* Profile Picture */}
      {testimonial.profile && (
        <div className={`rounded-full overflow-hidden border-2 border-white/30 absolute left-1/2 -translate-x-1/2 ${styles.profileSize} ${styles.profileTop} z-10`}>
          <Image 
            src={testimonial.profile} 
            alt={testimonial.name}
            width={styles.imageSize}
            height={styles.imageSize}
            className="object-cover w-full h-full"
            loading="lazy"
            quality={75}
          />
        </div>
      )}

      {/* Author Info */}
      <div className="flex flex-col gap-1 flex-shrink-0 mb-4">
        <h4 className={`text-white font-semibold ${styles.titleSize}`}>
          {testimonial.name}
        </h4>
        <a 
          href={testimonial.link} 
          target='_blank' 
          rel="noopener noreferrer"
          className={`underline hover:text-white/80 transition-colors ${styles.sourceSize}`}
        >
          {testimonial.source}
        </a>
      </div>

      {/* Text content */}
      <div className="w-full overflow-y-auto scrollbar-none flex-grow">
        <p className={`text-white leading-relaxed text-justify ${styles.textSize}`}>
          {testimonial.text}
        </p>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default Section5;
