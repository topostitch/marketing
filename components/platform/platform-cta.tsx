import Link from 'next/link'

export default function PlatformCTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-7">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground text-balance">
              Have a collection, object, or place worth documenting?
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              TopoStitch is looking for pilot projects that can help shape the capture, record, and publishing workflow around real institutional needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Talk about a pilot
            </Link>
            <Link href="/stories" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-7 py-3 text-base font-medium text-foreground hover:bg-background transition-colors">
              See what we are exploring
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
