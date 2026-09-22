'use client'

import { ImageIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Placeholder({ className }: { className?: string }) {
  return (
    <div className={`bg-muted rounded-lg flex items-center justify-center ${className ?? ''}`}>
      <ImageIcon className="w-12 h-12 text-muted-foreground/40" aria-hidden="true" />
      <span className="sr-only">Image placeholder</span>
    </div>
  )
}

export default function Audience() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: heading + large media */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-medium tracking-wide text-muted-foreground">Audience</span>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
                Built for those who cannot afford to lose what they know
              </h2>
            </div>
            <Placeholder className="w-full aspect-[4/3]" />
          </div>

          {/* Right column: staggered media + copy */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Placeholder className="aspect-square mt-8" />
              <Placeholder className="aspect-square" />
            </div>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                Museums, historic sites, universities, preservation teams, and public institutions all face the
                same challenge: keeping knowledge connected to the objects and places they care for. TopoStitch
                helps preserve that context so it can be trusted, reused, and shared with the people who need it
                next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base border-muted-foreground text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Explore use cases
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="px-6 py-6 text-base text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                >
                  Apply for early access
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
