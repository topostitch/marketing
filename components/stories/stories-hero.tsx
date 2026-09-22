'use client'

export default function StoriesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 md:pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm font-light text-muted-foreground">
              Real-world Impact
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
              <span className="block text-balance">
                Stories of preservation
              </span>
              <span className="block text-balance mt-2">
                in action.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
              Discover how organizations worldwide are using TopoStitch to preserve knowledge, protect cultural heritage, and build lasting records.
            </p>
          </div>

          {/* Placeholder story count */}
          <div className="pt-8">
            <p className="text-sm font-light text-muted-foreground">
              Showcasing early preservation initiatives · More stories coming
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
