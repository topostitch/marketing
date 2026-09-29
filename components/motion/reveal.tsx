'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  amount?: number
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.35,
  direction = 'up',
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const hidden = {
    opacity: 0,
    x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0,
    y: direction === 'up' ? 24 : 0,
  }
  const visible = { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      className={`scroll-reveal${className ? ` ${className}` : ''}`}
      // The server and first client render agree, avoiding a visible-to-hidden flash.
      initial={hidden}
      animate={reduceMotion ? visible : undefined}
      whileInView={visible}
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
