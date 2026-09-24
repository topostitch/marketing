import Reveal from '@/components/motion/learn-reveal'

const beliefs = [
  {
    title: 'Knowledge is collective heritage',
    description:
      'The knowledge we create—cultural practices, scientific discoveries, institutional wisdom—belongs to communities, not individuals. Preservation infrastructure should serve the public good and enable equitable access.',
  },
  {
    title: 'Context determines meaning',
    description:
      'Raw data without relationship has little value. Effective preservation captures not just information, but the connections, metadata, and stories that give it meaning for future users.',
  },
  {
    title: 'Systems must adapt, not just data',
    description:
      'Longevity requires infrastructure that evolves gracefully. Rather than locking knowledge into formats, preservation systems must enable transformation while maintaining authenticity and provenance.',
  },
  {
    title: 'Accessibility is non-negotiable',
    description:
      'Preserved knowledge has no value if it cannot be discovered and used. Systems must be designed with multiple audiences in mind and respect the diverse ways knowledge is understood and accessed.',
  },
]

export default function WhatWeBelieve() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 py-16 md:py-20">
          <Reveal>
            <div>
              <h2 className="mb-4 text-balance text-2xl font-light text-foreground md:text-3xl">
                What we believe
              </h2>

              <p className="font-light text-muted-foreground">
                Our philosophy on knowledge preservation and why it matters.
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl space-y-8">
            {beliefs.map((belief, index) => (
              <Reveal
                key={belief.title}
                direction="right"
                delay={index * 0.06}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-light text-foreground">
                    {belief.title}
                  </h3>

                  <p className="text-base font-light leading-relaxed text-muted-foreground">
                    {belief.description}
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
