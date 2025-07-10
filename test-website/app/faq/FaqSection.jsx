'use client'

import React, { useState } from 'react'
import {Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'


const faqs = [
    {
        question: "Can we BYO ( Bring Your Own) ?",
        answer: "BYO is not available. You can choose from our carefully curated wine list featuring wines from Australia and Italy. The wines have been hand picked to suit all palates and price points. Consisting of over 300 wines to choose from by the bottle and 16 wines by the glass. The list is the current holder for 2019 Gourmet Traveller Wine Australian Wine List of the Year awards.",
    },
    {
        question: "Are there any surcharges or credit card charges?",
        answer: "No. There are no surcharges or credit card charges.",
    },
    {
        question: "Can we book a private room?",
        answer: "We have a private room for up to 14 guests, along with media facilities. Please call us on 02 6230 0025 or email us for menu options.",
    },
    {
        question: "Do you cater to allergies and dietary requirements?",
        answer: "Our kitchen can modify the menu to suit your needs. Be it Vegetarian, Pescetarian, Vegan or any other requests or food allergies.",
    },
    {
        question: "Do you offer gluten free options ?",
        answer: "We do have our house made egg pasta that is gluten free and available with any of the pasta menu dishes. You also, have many other options to choose from our menu and daily specials board.",
    },
    {
        question: "Do you cater for children?",
        answer: "We do cater for children. However, we do not have a specific child menu or any child furniture. Please advise us should you wish to bring in any additional prams and other furniture for children. This would help us best allocate you a table with more room.",
    },
]

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

  const toggle =(index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className='flex justify-center pt-[7rem] relative h-[800px]'>
        <Image priority src="/faq-bg.png" alt="BG Image for Faq page " fill className="object-cover" />
        <div className='text-[#333333] absolute flex flex-col max-w-[700px] w-full gap-4'>
                <h2 className='text-[48px] text-center text-white'>FAQ</h2>
                {faqs.map((faq, i) => (
                    <div key={i} className="overflow-hidden rounded-md">
                        <button
                        onClick={() => toggle(i)}
                        className="w-full px-[13px] py-[21px] bg-[#CFAE74] flex justify-between items-center"
                        >
                            <span>{faq.question}</span>
                            {openIndex === i ? <Minus /> : <Plus />}
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === i && (
                            <motion.div
                                key="content"
                                initial={{ maxHeight: 0, opacity: 0 }}
                                animate={{ 
                                    maxHeight: openIndex === i ? "500px" : "0px",
                                    opacity: openIndex === i ? 1 : 0
                                }}
                                exit={{ maxHeight: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-[#333333]/40 text-white p-4 overflow-hidden will-change-[maxHeight,opacity]"
                            >
                                {faq.answer}
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default FaqSection