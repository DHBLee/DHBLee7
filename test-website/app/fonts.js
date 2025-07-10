import React from 'react'
import { Lora, Work_Sans, Michroma} from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export const michroma = Michroma({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});