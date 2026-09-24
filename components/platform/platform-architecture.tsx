import Reveal from '@/components/motion/reveal'

export default function PlatformArchitecture() {
  const steps = [
    { step: '01', title: 'Capture', description: 'Start with photos, video, scans, existing models, documents, or structured records.' },
    { step: '02', title: 'Process', description: 'Create or ingest digital representations while retaining the source material and processing context.' },
    { step: '03', title: 'Organize', description: 'Connect identity, place, metadata, contributors, provenance, versions, and relationships.' },
    { step: '04', title: 'Review', description: 'Understand what is complete, what changed, and what is ready to become a trusted published representation.' },
    { step: '05', title: 'Publish & reuse', description: 'Publish public records today. Future embeds and additional reusable experiences are part of the developing workflow.' },
  ]

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Workflow
              </p>

              <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                A record that grows with the work.
              </h2>

              <p className="text-lg font-light text-muted-foreground">
                TopoStitch is designed around the lifecycle of physical-to-digital
                documentation rather than a single export format.
              </p>
            </div>
          </Reveal>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {steps.map((item, index) => (
              <Reveal
                key={item.step}
                direction="up"
                delay={index * 0.07}
              >
                <li className="h-full rounded-xl border border-border bg-muted/35 p-5 transition-all duration-300 hover:-translate-y-1">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground">
                    {item.step}
                  </span>

                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
