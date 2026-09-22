import Link from 'next/link'

export default function PlatformHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 md:pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 space-y-8">
          <div className="space-y-5 max-w-3xl">
            <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground">
              Platform overview
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground text-balance">
              From capture files to a record people can trust.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              TopoStitch is being built to connect source imagery, 3D representations, metadata, place, provenance, processing history, and published outputs around the same physical object or site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-4xl">
            {[
              ['Capture', 'Bring together photos, video, scans, and existing 3D data.'],
              ['Record', 'Keep identity, context, provenance, processing, and versions connected.'],
              ['Publish', 'Prepare trusted representations for the web, research, education, and immersive experiences.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-xl border border-border bg-muted/35 p-5">
                <h2 className="font-medium text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="#capabilities" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Explore current capabilities
            </Link>
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors">
              Discuss a pilot
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
