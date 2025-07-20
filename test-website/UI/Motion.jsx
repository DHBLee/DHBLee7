'use client'

import { motion } from "framer-motion"

const animationProps = {
    initial:{ opacity: 0, y: 20 },
    whileInView:{ opacity: 1, y: 0 },
    viewport:{ once: true },
    transition:{ duration: 0.6 },
}
export function MotionH2({ children, ClassName }) {
  return <motion.h2 {...animationProps} className={ClassName}>{children}</motion.h2>
}

export function MotionH3({ children, ClassName }) {
  return <motion.h3 {...animationProps} className={ClassName}>{children}</motion.h3>
}

export function MotionDiv({ children, ClassName }) {
  return <motion.div {...animationProps} className={ClassName}>{children}</motion.div>
}

export function MotionSpan({ children, ClassName }) {
  return <motion.span {...animationProps} className={ClassName}>{children}</motion.span>
}