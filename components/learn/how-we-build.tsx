export default function HowWeBuild() {
  const principles = [
    {
      id: 1,
      title: 'Open standards first',
      description: 'We build on established formats and protocols to ensure knowledge portability and prevent vendor lock-in.',
    },
    {
      id: 2,
      title: 'Interoperability by design',
      description: 'Knowledge systems must work together. Our architecture supports seamless integration with existing preservation infrastructure.',
    },
    {
      id: 3,
      title: 'Transparency in practice',
      description: 'Our processes, data models, and infrastructure decisions are documented and open to community review.',
    },
    {
      id: 4,
      title: 'Durability over features',
      description: 'We prioritize long-term resilience over short-term convenience, making decisions that ensure knowledge survives.',
    },
    {
      id: 5,
      title: 'Community-centered design',
      description: 'The organizations and communities we serve guide our priorities. We listen, iterate, and adapt based on real needs.',
    },
    {
      id: 6,
      title: 'Sustainable operations',
      description: 'We design for organizational sustainability so preservation work can continue regardless of market trends or funding cycles.',
    },
  ]

  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-balance">
              How we build
            </h2>
            <p className="text-muted-foreground font-light">
              Engineering principles that guide our development and design decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle) => (
              <div key={principle.id} className="space-y-3">
                <h3 className="text-lg font-light text-foreground">
                  {principle.title}
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
