'use client';

import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image";

import { slideshowImages, testimonials2 } from '@/util/data'
import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Section5 = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextTestimonial = () =>
    setTestimonialIndex((prev) => (prev + 1) % testimonials2.length);

  const prevTestimonial = () =>
    setTestimonialIndex((prev) => (prev - 1 + testimonials2.length) % testimonials2.length);

   useEffect(() => {
    if (slideshowImages.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  useEffect(() => {
    if (imageIndex === slideshowImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setImageIndex(0);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 600)
    }
  },[imageIndex, slideshowImages.length])

  const currentTestimonial = testimonials2[testimonialIndex];

  return (
     <section className="h-screen flex flex-col-reverse lg:flex-row relative">
      {/* Left Side: Testimonial */}
        <article className="grid place-items-center relative lg:w-1/2 h-full py-[32px]">

          <div className="px-[24px] md:px-[32px] 1440:px-[86px] py-[2rem]  z-20">
            <div className='w-full h-[250px] md:h-[350px] lg:h-[400px] max-w-[535px] 1440:max-h-[503px] relative text-justify flex flex-col gap-4 border-white/20 backdrop-blur-sm rounded-lg justify-center items-center border-[1px] px-[32px] md:px-[48px] 1440:px-[71px] py-[26px]'>
                <button
                    onClick={prevTestimonial}
                    className="absolute z-20 left-[-1.5rem] bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
                    aria-label='an arrow pointing towards the left'
                >
                    <ChevronLeft />
                </button>
                <img
                src={currentTestimonial.profile}
                alt="Reviewer"
                className="absolute top-[-2rem] z-20 left-[50%] translate-x-[-50%] w-[55px] lg:w-[75px] 1440:w-full max-w-[100px] h-auto rounded-full border-2 border-white"
                />
                <div className='relative h-auto max-h-[200px] overflow-y-auto scrollbar-none'>
                <p className="Body my-auto align-middle">{currentTestimonial.text}</p>
                </div>
                <div className="flex items-center gap-2">
                    <h5 className="Body">{currentTestimonial.name}, </h5>
                    <a href={currentTestimonial.link} target='_blank' rel="noopener noreferrer" >
                        <span className="BodySmall underline">{currentTestimonial.source}</span>
                    </a>
                </div>
                <button
                    onClick={nextTestimonial}
                    className="absolute z-20 right-[-1.5rem] bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
                    aria-label='an arrow pointing towards the right'
                >
                    <ChevronRight />
                </button>
            </div>

          </div>

          <Image
            src="/images/background/testimonials-bgi.webp"
            fill
            alt="Kitchen Background"
            className="w-full object-cover"
          />

        </article>

        {/* Right Side: Autoplay Image */}
       <figure className="relative lg:w-1/2 h-[100%] lg:h-full overflow-hidden">
          <motion.div
            animate={{ x: `-${imageIndex * (100 / (slideshowImages.length + 1))}%` }}
            transition={isTransitioning ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0 }}
            className="flex h-full"
            style={{ width: `${(slideshowImages.length + 1) * 100}%` }}
          >
            {slideshowImages.map((img, i) => (
              <div 
                key={i} 
                className="relative h-full flex-shrink-0"
                style={{ width: `${100 / (slideshowImages.length + 1)}%` }}
              >
                <Image src={img} fill alt={`Slide ${i}`} className="object-cover" />
              </div>
            ))}
            {/* Duplicate first image at the end */}
            <div 
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / (slideshowImages.length + 1)}%` }}
            >
              <Image src={slideshowImages[0]} fill alt="Slide duplicate" className="object-cover" />
            </div>
          </motion.div>
      </figure>

    </section>
  )
}

export default Section5