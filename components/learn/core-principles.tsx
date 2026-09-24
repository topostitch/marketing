import Reveal from '@/components/motion/learn-reveal'

export default function CorePrinciples() {
  const principles = [
    {
      id: 1,
      icon: '🔗',
      title: 'Context is everything',
      description: 'Knowledge without context loses meaning. Preserve relationships, connections, and the story behind the information.',
    },
    {
      id: 2,
      icon: '⏳',
      title: 'Think in decades',
      description: 'Build with longevity in mind. Technology changes, formats evolve, but preserved knowledge should remain accessible.',
    },
    {
      id: 3,
      icon: '📖',
      title: 'Accessibility enables discovery',
      description: 'Preserved knowledge must be findable, understandable, and usable by future researchers, communities, and systems.',
    },
    {
      id: 4,
      icon: '✓',
      title: 'Integrity through verification',
      description: 'Preserve provenance, source references, and change history so future users have evidence for evaluating where a record came from and how it changed.',
    },
  ]

  return (
    <section id="principles" className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 py-16 md:py-20">
          <Reveal>
            <div>
              <h2 className="mb-4 text-balance text-2xl font-light text-foreground md:text-3xl">
                Core principles
              </h2>

              <p className="font-light text-muted-foreground">
                Principles that guide how TopoStitch approaches preservation work.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal
                key={principle.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">
                      {principle.icon}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-light text-foreground">
                        {principle.title}
                      </h3>

                      <p className="text-base font-light leading-relaxed text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
