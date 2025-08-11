'use client'

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderPickupButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="https://orders.wowapps.com/order/mezzalira?src=web"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order Pick-up"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-Yellow text-black rounded-full shadow-lg flex items-center justify-center overflow-hidden"
      style={{ 
        width: isHovered ? '180px' : '64px', 
        height: '64px',
        transition: 'width 0.4s ease-in-out'
      }}
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.span
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-semibold whitespace-nowrap text-center HeadingXS md:text-base"
          >
            Order Pick-Up
          </motion.span>
        ) : (
          <motion.div
            key="icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingBag className="w-7 h-7" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default OrderPickupButton;
