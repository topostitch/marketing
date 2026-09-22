'use client'

export default function EarlyPartners() {
  const needs = [
    {
      description:
        'Preserve the knowledge behind an artifact, place, or process before it disappears into disconnected files, temporary projects, or individual memory.',
      label: 'Knowledge preservation',
    },
    {
      description:
        'Create trusted content once, then reuse it across exhibitions, websites, self-guided experiences, research, education, AR, and future formats.',
      label: 'One record, many experiences',
    },
    {
      description:
        'Let staff, researchers, students, and communities contribute while authorized reviewers control what becomes part of the trusted record.',
      label: 'Governed contributions',
    },
    {
      description:
        'Keep grant-funded research, interpretation, and digital assets useful after the exhibit closes, the class ends, or the original team moves on.',
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
