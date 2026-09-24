import Reveal from '@/components/motion/learn-reveal'

export default function HowWeBuild() {
  const principles = [
    {
      id: 1,
      title: 'Open standards first',
      description: 'We prioritize established formats and protocols so records can remain portable and less dependent on a single platform.',
    },
    {
      id: 2,
      title: 'Interoperability by design',
      description: 'The architecture is being designed to work alongside existing preservation and collection systems. Specific integrations will be validated through pilot work.',
    },
    {
      id: 3,
      title: 'Transparency in practice',
      description: 'We aim to document the reasoning behind data models, workflows, and infrastructure decisions as the platform develops.',
    },
    {
      id: 4,
      title: 'Durability over features',
      description: 'We prioritize long-term resilience over short-term convenience, while recognizing that no software system can guarantee permanent preservation.',
    },
    {
      id: 5,
      title: 'Community-centered design',
      description: 'Pilot work and feedback from organizations and communities will help guide priorities as the product develops.',
    },
    {
      id: 6,
      title: 'Sustainable operations',
      description: 'We are designing with organizational sustainability in mind so long-term preservation work is not dependent on short-lived product decisions.',
    },
  ]

  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 py-16 md:py-20">
          <Reveal>
            <div>
              <h2 className="mb-4 text-balance text-2xl font-light text-foreground md:text-3xl">
                How we aim to build
              </h2>

              <p className="font-light text-muted-foreground">
                Principles guiding current product decisions as TopoStitch develops.
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
                <div className="space-y-3">
                  <h3 className="text-lg font-light text-foreground">
                    {principle.title}
                  </h3>

                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {principle.description}
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
