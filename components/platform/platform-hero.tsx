import Link from 'next/link'
import Reveal from '@/components/motion/reveal'

const stages = [
  ['Capture', 'Bring together photos, video, scans, and existing 3D data.'],
  ['Record', 'Keep identity, context, provenance, processing, and versions connected.'],
  ['Publish', 'Publish public records today while additional embeds and spatial experiences continue to be developed.'],
]

export default function PlatformHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 md:pt-24">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 py-16 md:py-24">
          <div className="max-w-3xl space-y-5">
            <Reveal>
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                Platform overview
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="text-balance text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
                From capture files to a record people can trust.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
                TopoStitch is being built to connect source imagery, 3D representations,
                metadata, place, provenance, processing history, and published outputs
                around the same physical object or site.
              </p>
            </Reveal>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
            {stages.map(([title, copy], index) => (
              <Reveal
                key={title}
                direction="up"
                delay={0.18 + index * 0.08}
              >
                <div className="h-full rounded-xl border border-border bg-muted/35 p-5 transition-transform duration-300 hover:-translate-y-1">
                  <h2 className="font-medium text-foreground">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.42}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#capabilities"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Explore the platform
              </Link>

              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/60"
              >
                Discuss a pilot
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
