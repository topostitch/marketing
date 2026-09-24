import Link from 'next/link'
import Reveal from '@/components/motion/reveal'

export default function PlatformCTA() {
  return (
    <section className="w-full border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="flex flex-col items-center justify-center space-y-7 text-center">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Have a collection, object, or place worth documenting?
              </h2>

              <p className="text-lg font-light text-muted-foreground">
                TopoStitch is looking for pilot projects that can help shape the capture,
                record, and publishing workflow around real institutional needs.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Discuss a pilot
              </Link>

              <Link
                href="/stories"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-7 py-3 text-base font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background"
              >
                See use cases
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
