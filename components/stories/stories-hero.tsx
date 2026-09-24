'use client'

import Reveal from '@/components/motion/reveal'

export default function StoriesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-accent opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 py-16 md:py-24">
          <div className="max-w-3xl space-y-4">
            <Reveal>
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-light text-muted-foreground">
                Field notes & use cases
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="block text-balance">
                  Stories of preservation
                </span>
                <span className="mt-2 block text-balance">
                  in action.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                Follow the real objects, places, capture experiments, and pilot opportunities
                helping shape how TopoStitch preserves context from capture through publishing.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="pt-8">
              <p className="text-sm font-light text-muted-foreground">
                Early-stage fieldwork and product exploration · More stories as real projects develop
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
