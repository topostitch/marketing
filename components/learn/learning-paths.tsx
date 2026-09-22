'use client'

export default function LearningPaths() {
  const paths = [
    {
      id: 1,
      role: 'Curators & Archivists',
      description: 'Master preservation workflows, metadata standards, and collection management strategies.',
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
      description: 'Learn how to document research, maintain data integrity, and build knowledge graphs.',
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
      description: 'Build preservation infrastructure, integrate systems, and design for scalability.',
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
      description: 'Plan preservation initiatives, coordinate teams, and measure impact.',
      modules: [
        'Project planning and scope',
        'Team coordination',
        'Resource allocation',
        'Impact measurement',
      ],
    },
  ]

  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-balance">
              Learning paths by role
            </h2>
            <p className="text-muted-foreground font-light">
              Curated sequences tailored to your role and preservation goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((path) => (
              <div key={path.id} className="p-6 border border-border rounded-lg space-y-4 hover:border-accent transition-colors">
                <h3 className="text-lg font-light text-foreground">
                  {path.role}
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  {path.description}
                </p>
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                    Modules
                  </div>
                  <ul className="space-y-2">
                    {path.modules.map((module, idx) => (
                      <li key={idx} className="text-sm font-light text-foreground flex items-center gap-2">
                        <span className="text-accent">→</span>
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
