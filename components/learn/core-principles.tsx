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
      description: 'Maintain chains of custody, version histories, and provenance records to ensure knowledge authenticity.',
    },
  ]

  return (
    <section id="principles" className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-balance">
              Core principles
            </h2>
            <p className="text-muted-foreground font-light">
              Foundational concepts that guide all knowledge preservation work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle) => (
              <div key={principle.id} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{principle.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-light text-foreground">
                      {principle.title}
                    </h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
