'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type LearnRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function LearnReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: LearnRevealProps) {
  const reduceMotion = useReducedMotion()

  const hidden =
    direction === 'left'
      ? { opacity: 0, x: -28, y: 0 }
      : direction === 'right'
        ? { opacity: 0, x: 28, y: 0 }
        : direction === 'none'
          ? { opacity: 0, x: 0, y: 0 }
          : { opacity: 0, x: 0, y: 28 }

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : hidden}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.22,
        margin: '0px 0px -6% 0px',
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
