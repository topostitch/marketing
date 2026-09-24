import Reveal from '@/components/motion/learn-reveal'

export default function LearnIntro() {
  const items = [
    {
      label: 'Guides',
      description: 'Planned practical walkthroughs for common preservation workflows',
    },
    {
      label: 'Principles',
      description: 'Core concepts that guide preservation work',
    },
    {
      label: 'Pathways',
      description: 'Planned learning sequences organized by role and goal',
    },
  ]

  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="mb-6 text-balance text-2xl font-light text-foreground md:text-3xl">
                Knowledge preservation is both art and science.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-4 text-lg font-light leading-relaxed text-muted-foreground">
                Preservation work raises practical questions about context, longevity, access, and what needs to remain understandable over time. As TopoStitch Learn develops, this library will collect frameworks and practical guidance for cultural heritage, research, collections, and institutional documentation.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                From foundational concepts to practical implementation questions, the library is being built around preservation work that needs to remain useful over time.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-3">
            {items.map((item, index) => (
              <Reveal
                key={item.label}
                direction="up"
                delay={index * 0.08}
              >
                <div className="space-y-2">
                  <div className="text-sm font-light uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </div>

                  <p className="text-base font-light text-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
