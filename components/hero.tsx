import Link from 'next/link'
import { Box, Camera, FileText, MapPinned } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

const sources = [
  { icon: Camera, label: 'Photos & video' },
  { icon: Box, label: '3D captures' },
  { icon: FileText, label: 'Documents' },
  { icon: MapPinned, label: 'Spatial context' },
]

export default function Hero() {
  return (
    <section className="w-full bg-background pt-16 md:pt-24 lg:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-7 text-center">
          <Reveal delay={0.02}>
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Digital records for physical objects and places
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-balance text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Preserve what matters.
              <br />
              Build understanding in context.
              <br />
              Share knowledge that endures.
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="max-w-3xl text-base font-light leading-relaxed text-muted-foreground md:text-xl">
              TopoStitch helps museums, historic sites, researchers, and organizations turn photos,
              video, 3D captures, documents, and metadata into structured digital records that can
              be understood, traced, and shared.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Link
                href="/platform"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                See how TopoStitch works
              </Link>

              <Link
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-7 py-3 text-base font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/60"
              >
                Discuss a pilot
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 md:mt-16" delay={0.24}>
          <div className="rounded-2xl border border-border bg-muted/35 p-5 md:p-8">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
              <div className="grid grid-cols-2 gap-3">
                {sources.map(({ icon: Icon, label }, index) => (
                  <Reveal key={label} delay={0.28 + index * 0.06}>
                    <div className="flex min-h-24 flex-col justify-between rounded-xl border border-border bg-background p-4 transition-transform duration-300 hover:-translate-y-1">
                      <Icon
                        className="h-5 w-5 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal direction="none" delay={0.48}>
                <div
                  className="hidden text-2xl text-muted-foreground md:block"
                  aria-hidden="true"
                >
                  →
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.52}>
                <div className="rounded-xl border border-border bg-background p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    TopoStitch record
                  </p>

                  <h2 className="mt-3 text-2xl font-medium text-foreground md:text-3xl">
                    One connected record, built to keep context with the thing itself.
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Organize identity, location, capture sources, processing history,
                    metadata, provenance, versions, and published representations in one place.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
