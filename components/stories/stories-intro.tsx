import Reveal from '@/components/motion/reveal'

export default function StoriesIntro() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="mb-6 text-balance text-2xl font-light text-foreground md:text-3xl">
                Preservation starts with keeping context attached.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-4 text-lg font-light leading-relaxed text-muted-foreground">
                Physical-to-digital work creates more than a model. It creates source imagery,
                processing decisions, metadata, spatial relationships, interpretation, and
                publishing choices that can easily become separated over time.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                These field notes and use cases explore how TopoStitch can keep those pieces
                connected around the object or place they describe.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2">
            <Reveal direction="left">
              <div className="space-y-2">
                <div className="text-sm font-light uppercase tracking-wide text-muted-foreground">
                  Early stage
                </div>
                <p className="text-base font-light text-foreground">
                  Real objects, places, and workflows are being used to shape the product.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.08}>
              <div className="space-y-2">
                <div className="text-sm font-light uppercase tracking-wide text-muted-foreground">
                  Your project
                </div>
                <p className="text-base font-light text-foreground">
                  Have a documentation challenge worth exploring? Tell us what you are working on.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
