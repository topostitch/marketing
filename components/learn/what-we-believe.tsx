export default function WhatWeBelieve() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-balance">
              What we believe
            </h2>
            <p className="text-muted-foreground font-light">
              Our philosophy on knowledge preservation and why it matters.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl">
            <div className="space-y-3">
              <h3 className="text-lg font-light text-foreground">
                Knowledge is collective heritage
              </h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                The knowledge we create—cultural practices, scientific discoveries, institutional wisdom—belongs to communities, not individuals. Preservation infrastructure should serve the public good and enable equitable access.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-light text-foreground">
                Context determines meaning
              </h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Raw data without relationship has little value. Effective preservation captures not just information, but the connections, metadata, and stories that give it meaning for future users.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-light text-foreground">
                Systems must adapt, not just data
              </h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Longevity requires infrastructure that evolves gracefully. Rather than locking knowledge into formats, preservation systems must enable transformation while maintaining authenticity and provenance.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-light text-foreground">
                Accessibility is non-negotiable
              </h3>
              <p className="text-base text-muted-foreground font-light leading-relaxed">
                Preserved knowledge has no value if it cannot be discovered and used. Systems must be designed with multiple audiences in mind and respect the diverse ways knowledge is understood and accessed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
