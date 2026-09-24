import Link from 'next/link'
import Reveal from '@/components/motion/reveal'

export default function PlatformIntegrations() {
  const categories = [
    { title: 'Capture & reconstruction', description: 'Import workflows should accommodate common image, video, mesh, point-cloud, and Gaussian-splat outputs rather than forcing a single capture tool.' },
    { title: 'Institutional metadata', description: 'The record model is being designed to coexist with existing collection and content systems instead of replacing every system around it.' },
    { title: 'Web publishing', description: 'Published representations can become public records and, over time, embeddable experiences connected to the same underlying object data.' },
    { title: 'Analytics & observability', description: 'Usage and publishing analytics are part of the roadmap so organizations can understand how digital records are being discovered and used.' },
  ]

  return (
    <section className="w-full border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Interoperability
              </p>

              <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Fit into the tools institutions already depend on.
              </h2>

              <p className="text-lg font-light text-muted-foreground">
                TopoStitch is being designed as connective infrastructure. Specific
                integrations will be prioritized through pilot work rather than advertised
                before they exist.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {categories.map((item, index) => (
              <Reveal
                key={item.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
              >
                <div className="h-full rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-medium text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="max-w-2xl">
                <h3 className="font-medium text-foreground">
                  Have an existing CMS, DAM, collection system, or capture workflow?
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  That is exactly the kind of integration requirement the pilot program
                  should surface early.
                </p>
              </div>

              <Link
                href="/#contact"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
              >
                Discuss your workflow
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
