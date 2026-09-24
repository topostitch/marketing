'use client'

import type { ReactNode } from 'react'
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from 'motion/react'
import { useEffect, useRef } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const reduceMotion = useReducedMotion()

  const isInView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: '0px 0px -15% 0px',
  })

  const hidden =
    direction === 'left'
      ? { opacity: 0, x: -24, y: 0 }
      : direction === 'right'
        ? { opacity: 0, x: 24, y: 0 }
        : direction === 'none'
          ? { opacity: 0, x: 0, y: 0 }
          : { opacity: 0, x: 0, y: 24 }

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  }

  useEffect(() => {
    if (reduceMotion) {
      controls.set(visible)
      return
    }

    controls.set(hidden)

    if (isInView) {
      controls.start({
        ...visible,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      })
    }
  }, [isInView, reduceMotion, controls, delay, direction])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={controls}
    >
      {children}
    </motion.div>
  )
}
