export default function PlatformArchitecture() {
  const steps = [
    { step: '01', title: 'Capture', description: 'Start with photos, video, scans, existing models, documents, or structured records.' },
    { step: '02', title: 'Process', description: 'Create or ingest digital representations while retaining the source material and processing context.' },
    { step: '03', title: 'Organize', description: 'Connect identity, place, metadata, contributors, provenance, versions, and relationships.' },
    { step: '04', title: 'Review', description: 'Understand what is complete, what changed, and what is ready to become a trusted published representation.' },
    { step: '05', title: 'Publish & reuse', description: 'Share through public records and future embeds or experiences without rebuilding the underlying knowledge each time.' },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Workflow</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground text-balance">A record that grows with the work.</h2>
            <p className="text-lg text-muted-foreground font-light">TopoStitch is designed around the lifecycle of physical-to-digital documentation rather than a single export format.</p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {steps.map((item) => (
              <li key={item.step} className="rounded-xl border border-border bg-muted/35 p-5">
                <span className="text-xs font-medium tracking-wider text-muted-foreground">{item.step}</span>
                <h3 className="mt-4 text-lg font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
