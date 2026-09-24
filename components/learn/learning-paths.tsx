'use client'

import Reveal from '@/components/motion/learn-reveal'

export default function LearningPaths() {
  const paths = [
    {
      id: 1,
      role: 'Curators & Archivists',
      description: 'Planned focus: preservation workflows, metadata standards, and collection management strategies.',
      modules: [
        'Preservation fundamentals',
        'Metadata best practices',
        'Collection organization',
        'Long-term stewardship',
      ],
    },
    {
      id: 2,
      role: 'Researchers & Scholars',
      description: 'Planned focus: research documentation, data integrity, and connections between related knowledge.',
      modules: [
        'Research documentation',
        'Data preservation strategies',
        'Knowledge graphs and connections',
        'Open access principles',
      ],
    },
    {
      id: 3,
      role: 'Developers & Technologists',
      description: 'Planned focus: preservation infrastructure, system integration, and scalability.',
      modules: [
        'API and integration patterns',
        'Architecture for longevity',
        'Data format considerations',
        'System scaling',
      ],
    },
    {
      id: 4,
      role: 'Project Leaders',
      description: 'Planned focus: preservation planning, team coordination, resource allocation, and impact measurement.',
      modules: [
        'Project planning and scope',
        'Team coordination',
        'Resource allocation',
        'Impact measurement',
      ],
    },
  ]

  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 py-16 md:py-20">
          <Reveal>
            <div>
              <h2 className="mb-4 text-balance text-2xl font-light text-foreground md:text-3xl">
                Planned learning paths by role
              </h2>

              <p className="font-light text-muted-foreground">
                These planned sequences show the topics TopoStitch Learn is intended to cover for different roles.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {paths.map((path, index) => (
              <Reveal
                key={path.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
              >
                <div className="h-full space-y-4 rounded-lg border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                  <h3 className="text-lg font-light text-foreground">
                    {path.role}
                  </h3>

                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {path.description}
                  </p>

                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                      Modules
                    </div>

                    <ul className="space-y-2">
                      {path.modules.map((module, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm font-light text-foreground"
                        >
                          <span className="text-accent">→</span>
                          {module}
                        </li>
                      ))}
                    </ul>
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
