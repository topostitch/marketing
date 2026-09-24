import Reveal from '@/components/motion/learn-reveal'

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
    <section id="guides" className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Practical learning library
              </p>

              <h2 className="mt-3 text-balance text-2xl font-medium text-foreground md:text-3xl">
                Teach the workflow, not just the software.
              </h2>

              <p className="mt-4 font-light leading-relaxed text-muted-foreground">
                TopoStitch Learn is being shaped around the questions people ask before, during, and after physical-to-digital capture. The first guides are still being prepared.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {guides.map((guide, index) => (
              <Reveal
                key={guide.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
              >
                <article className="h-full rounded-xl border border-border bg-muted/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-muted-foreground/50">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {guide.category}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {guide.status}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-medium text-foreground">
                    {guide.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
