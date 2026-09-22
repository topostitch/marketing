'use client'

import { ImageIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Framework() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Media placeholder */}
          <div className="w-full aspect-[4/5] bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-muted-foreground/40" aria-hidden="true" />
            <span className="sr-only">Framework illustration placeholder</span>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-medium tracking-wide text-muted-foreground">Framework</span>
              <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
                One record, built to serve many experiences
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                TopoStitch connects knowledge directly to the objects and places it describes. Institutions can
                preserve sources, interpretations, media, and spatial context once, then review and publish that
                knowledge wherever it is needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base border-muted-foreground text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer"
              >
                Explore the platform
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="px-6 py-6 text-base text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
              >
                Learn the principles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Steward sub-section */}
            <div className="pt-6 border-t border-border space-y-3">
              <h3 className="text-xl font-medium text-foreground">Steward</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Preserve not only the object, but the knowledge surrounding it. Stewardship means protecting
                evidence, interpretation, relationships, and context so future generations can build on trusted
                understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
