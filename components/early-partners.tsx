'use client'

export default function EarlyPartners() {
  const needs = [
    {
      description:
        'Pilot projects explore how to keep the knowledge behind an artifact, place, or process from becoming separated across files, temporary projects, and individual memory.',
      label: 'Knowledge preservation',
    },
    {
      description:
        'The product direction is to let one connected record support multiple outputs over time. Public records work today; broader reuse across embeds, exhibitions, education, AR, and other experiences is still being developed.',
      label: 'One record, many experiences',
    },
    {
      description:
        'Role-based contribution and review workflows are part of the roadmap. Pilot work will help define how organizations need contributions, review, and publishing permissions to work.',
      label: 'Governed contributions',
    },
    {
      description:
        'Pilot work is intended to test whether connected records can help research, interpretation, and digital assets remain useful after a project, exhibit, class, or original team changes.',
      label: 'Durable project outcomes',
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
            Needs shaping early pilot conversations
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            The problems TopoStitch is being designed to explore with early collaborators
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((need) => (
            <div
              key={need.label}
              className="flex flex-col justify-between gap-6 p-6 bg-background border border-border rounded-lg hover:border-accent/50 transition-colors duration-300"
            >
              <p className="text-base text-muted-foreground leading-relaxed font-light">
                {need.description}
              </p>
              <p className="text-sm font-medium text-foreground">{need.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
