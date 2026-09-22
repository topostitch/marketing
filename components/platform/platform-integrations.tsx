import Link from 'next/link'

export default function PlatformIntegrations() {
  const categories = [
    { title: 'Capture & reconstruction', description: 'Import workflows should accommodate common image, video, mesh, point-cloud, and Gaussian-splat outputs rather than forcing a single capture tool.' },
    { title: 'Institutional metadata', description: 'The record model is being designed to coexist with existing collection and content systems instead of replacing every system around it.' },
    { title: 'Web publishing', description: 'Published representations can become public records and, over time, embeddable experiences connected to the same underlying object data.' },
    { title: 'Analytics & observability', description: 'Usage and publishing analytics are part of the roadmap so organizations can understand how digital records are being discovered and used.' },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Interoperability</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground text-balance">Fit into the tools institutions already depend on.</h2>
            <p className="text-lg text-muted-foreground font-light">TopoStitch is being designed as connective infrastructure. Specific integrations will be prioritized through pilot work rather than advertised before they exist.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-6">
                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-background p-6 md:p-8 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-medium text-foreground">Have an existing CMS, DAM, collection system, or capture workflow?</h3>
              <p className="mt-2 text-sm text-muted-foreground">That is exactly the kind of integration requirement the pilot program should surface early.</p>
            </div>
            <Link href="/#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">Discuss your workflow</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
