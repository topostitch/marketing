'use client'

import { ImageIcon, MapPin, Users, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-wide text-muted-foreground">Problem</span>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
            Knowledge disappears long before the objects do
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Objects may endure for centuries while the knowledge around them becomes scattered across files,
            systems, people, and one-off projects. When experts leave or projects end, institutions are often
            forced to reconstruct context from fragments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
            <Button
              size="lg"
              className="px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 cursor-pointer"
            >
              Explore the platform
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="px-6 py-6 text-base text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              See real use cases
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content: media + points */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Media placeholder */}
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground/40" aria-hidden="true" />
            <span className="sr-only">Illustration placeholder</span>
          </div>

          {/* Points */}
          <div className="space-y-8">
            {points.map((point) => {
              const Icon = point.icon
              return (
                <div key={point.title} className="space-y-2 border-b border-border pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-medium text-foreground">{point.title}</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed font-light">
                    {point.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
