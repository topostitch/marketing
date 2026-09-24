'use client'

import Link from 'next/link'
import { MapPin, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

export default function Problem() {
  const points = [
    {
      title: 'Context disappears first',
      description:
        'The artifact remains, but the decisions, relationships, provenance, and reasoning behind it are scattered or lost. What survives is the object—not the understanding.',
      icon: MapPin,
    },
    {
      title: 'Expertise leaves with people',
      description:
        'Curators retire. Researchers move on. Project teams dissolve. Without a shared system, decades of knowledge often leave with them.',
      icon: Users,
    },
    {
      title: 'Knowledge compounds or it decays',
      description:
        'When knowledge stays connected to the objects and places it describes, every contribution builds on the last. Without that connection, organizations repeat work instead of advancing it.',
      icon: TrendingUp,
    },
  ]

  return (
    <section className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Reveal>
            <span className="text-sm font-medium tracking-wide text-muted-foreground">
              Problem
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
              Knowledge disappears long before the objects do
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              Objects may endure for centuries while the knowledge around them becomes scattered
              across files, systems, people, and one-off projects. When experts leave or projects
              end, institutions are often forced to reconstruct context from fragments.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
              <Link
                href="/platform"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-8 py-3 text-base text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Explore the platform
              </Link>

              <Link
                href="/stories"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg px-6 py-3 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
              >
                See use cases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-border bg-muted/20 p-6 sm:p-10">
              <div className="absolute left-6 top-8 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground sm:left-10">
                Files
              </div>

              <div className="absolute right-6 top-16 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground sm:right-10">
                People
              </div>

              <div className="absolute bottom-16 left-8 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground sm:left-14">
                Projects
              </div>

              <div className="absolute bottom-8 right-8 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground sm:right-14">
                Systems
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 rounded-2xl border border-border bg-background p-6 text-center shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Physical object
                  </p>

                  <p className="mt-3 text-xl font-medium text-foreground">
                    Still here
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    But the knowledge around it is drifting apart.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {points.map((point, index) => {
              const Icon = point.icon

              return (
                <Reveal
                  key={point.title}
                  direction="right"
                  delay={index * 0.08}
                >
                  <div className="space-y-2 border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-5 w-5 flex-shrink-0 text-accent"
                        aria-hidden="true"
                      />

                      <h3 className="text-xl font-medium text-foreground">
                        {point.title}
                      </h3>
                    </div>

                    <p className="text-base font-light leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
