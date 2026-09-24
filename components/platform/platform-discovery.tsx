'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from '@/components/motion/reveal'

export default function PlatformDiscovery() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="w-full border-b border-border bg-muted/20 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Global spatial discovery
            </p>

            <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              Explore published records across the Earth.
            </h2>

            <p className="text-lg font-light leading-relaxed text-muted-foreground">
              TopoStitch can surface published objects and places through an interactive
              3D Earth, then connect each spatial result back to its public record and
              supporting context.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.985,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
            margin: '0px 0px -12% 0px',
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 1.05,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-background"
        >
          <Image
            src="/product/global-spatial-discovery-hero.webp"
            alt="TopoStitch public discovery interface showing published object records positioned on an interactive 3D Earth alongside an introduction to spatial discovery."
            width={1600}
            height={1000}
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
