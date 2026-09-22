export default function GuidesAndArticles() {
  const guides = [
    { title: 'How to photograph an object for photogrammetry', description: 'A practical capture checklist covering coverage, overlap, lighting, reflections, and common failure points.', category: 'Capture', status: 'Planned guide' },
    { title: 'Photogrammetry vs. Gaussian splats', description: 'Understand how the two approaches differ, where each is useful, and what they preserve well.', category: '3D methods', status: 'Planned guide' },
    { title: 'What metadata belongs with a 3D record?', description: 'A plain-language introduction to identity, source media, provenance, processing, rights, and spatial context.', category: 'Metadata', status: 'Planned guide' },
    { title: 'Publishing 3D objects without losing provenance', description: 'Why a model file alone is not the whole record, and how source and version context can travel with it.', category: 'Publishing', status: 'Planned guide' },
    { title: 'Documenting historic places in 3D', description: 'Questions to answer before field capture so geometry, context, attribution, and later interpretation stay useful.', category: 'Preservation', status: 'Planned guide' },
    { title: 'How many photos do you need?', description: 'A practical explanation of capture density, missing coverage, and why more images are not always better images.', category: 'Capture', status: 'Planned guide' },
  ]

  return (
    <section id="guides" className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-10">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Practical learning library</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-medium text-foreground text-balance">Teach the workflow, not just the software.</h2>
            <p className="mt-4 text-muted-foreground font-light leading-relaxed">TopoStitch Learn is being shaped around the questions people ask before, during, and after physical-to-digital capture. The first guides are still being prepared.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guides.map((guide) => (
              <article key={guide.title} className="p-6 border border-border rounded-xl bg-muted/25">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{guide.category}</span>
                  <span className="text-xs text-muted-foreground">{guide.status}</span>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{guide.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
