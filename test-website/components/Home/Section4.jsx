'use client';

import { motion, AnimatePresence } from 'framer-motion'
import Button from "@/UI/Button";
import Image from "next/image";

import { wineImages } from '@/util/data'
import React, { useEffect, useState } from 'react'
import { workSans } from '@/app/fonts';
import Link from 'next/link';

const Section4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wineImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-[24px] md:px-[32px] 1440:px-[86px] py-[78px] relative w-full min-h-[350px] h-full max-h-[700px] aspect-[2/1]">
        <div className="absolute inset-0">
          <Image
            src={wineImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

      {/* Animated overlay image */}
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={wineImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
 

        <div className=' flex flex-col lg:flex-row items-start lg:items-end absolute bottom-[53px]'>
          <h4 className={`Body lg:text-[20px] ${workSans.className} max-w-[36ch]`}>Proudly recognised for our diverse wine list, featuring over 100 handpicked labels. -</h4>
          <Link href="/menu">
            <Button>Wine Menu</Button>
          </Link>
        </div>
      </div>
  )
}

export default Section4