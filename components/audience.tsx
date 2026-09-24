'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reveal from '@/components/motion/reveal'

const audiences = [
  {
    title: 'Museums & historic sites',
    description:
      'Keep interpretation, provenance, media, and spatial context connected to the things visitors experience.',
  },
  {
    title: 'Archives & collections',
    description:
      'Create durable digital records that remain useful beyond an exhibition, project, or individual staff member.',
  },
  {
    title: 'Universities & researchers',
    description:
      'Connect physical evidence, observations, imagery, and 3D representations to the research built around them.',
  },
  {
    title: 'Preservation teams',
    description:
      'Document places and objects in context so future work begins with what is already known instead of starting over.',
  },
  {
    title: 'Public institutions',
    description:
      'Make important physical records easier to preserve, discover, share, and reuse across teams and audiences.',
  },
]

export default function Audience() {
  return (
    <section className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal direction="left">
            <div className="space-y-6">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Audience
              </p>

              <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
                Built for those who cannot afford to lose what they know
              </h2>

              <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                TopoStitch is being built for organizations responsible for physical objects,
                places, collections, and the knowledge attached to them. The goal is to keep
                that context connected so it can be trusted, reused, and passed forward.
              </p>

              <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer rounded-lg border-muted-foreground px-8 py-6 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
                >
                  See use cases
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-6 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
                >
                  Discuss a pilot
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="divide-y divide-border border-y border-border">
            {audiences.map((audience, index) => (
              <Reveal
                key={audience.title}
                direction="right"
                delay={index * 0.07}
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 py-6 transition-transform duration-300 hover:translate-x-1 md:grid-cols-[3rem_1fr]">
                  <span className="pt-1 text-sm text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-foreground">
                      {audience.title}
                    </h3>

                    <p className="text-base font-light leading-relaxed text-muted-foreground">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
