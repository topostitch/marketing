'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'

const outputs = [
  '3D presentation',
  'Public record',
  'AR experience · planned',
  'Research',
  'Embed · planned',
]

export default function Framework() {
  return (
    <section className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/10 p-8 sm:p-12">
              <div
                className="absolute left-1/2 top-1/2 h-[72%] w-px -translate-x-1/2 -translate-y-1/2 bg-border"
                aria-hidden="true"
              />

              <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
                <Reveal direction="none" delay={0.08} className="w-full">
                  <div className="w-full rounded-2xl border border-border bg-background p-6 text-center shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      TopoStitch record
                    </p>

                    <h3 className="mt-3 text-2xl font-medium text-foreground">
                      One connected source of truth
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Evidence, metadata, provenance, spatial context, interpretation,
                      and representations stay connected.
                    </p>
                  </div>
                </Reveal>

                <Reveal direction="none" delay={0.14}>
                  <div
                    className="h-10 w-px bg-border"
                    aria-hidden="true"
                  />
                </Reveal>

                <div className="grid w-full grid-cols-2 gap-3">
                  {outputs.map((output, index) => (
                    <Reveal
                      key={output}
                      direction="up"
                      delay={0.18 + index * 0.06}
                      className={
                        index === outputs.length - 1 ? 'col-span-2' : ''
                      }
                    >
                      <div className="rounded-xl border border-border bg-background px-4 py-4 text-center text-sm text-foreground transition-transform duration-300 hover:-translate-y-1">
                        {output}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-sm font-medium tracking-wide text-muted-foreground">
                  Framework
                </span>

                <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
                  One record, built to serve many experiences
                </h2>

                <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                  TopoStitch connects knowledge directly to the objects and places it
                  describes. Institutions can preserve sources, interpretations, media,
                  and spatial context once, then review and publish that knowledge
                  wherever it is needed.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer rounded-lg border-muted-foreground px-8 py-6 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
                >
                  Explore the platform
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-6 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
                >
                  Read the guides
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Reveal delay={0.18}>
                <div className="space-y-3 border-t border-border pt-6">
                  <h3 className="text-xl font-medium text-foreground">
                    Steward
                  </h3>

                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    Preserve not only the object, but the knowledge surrounding it.
                    Stewardship means protecting evidence, interpretation, relationships,
                    and context so future generations can build on trusted understanding.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
