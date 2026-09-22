export default function LearnIntro() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6 text-balance">
              Knowledge preservation is both art and science.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-4">
              Effective knowledge preservation requires understanding principles, applying proven methods, and thinking deeply about what endures. Whether you're documenting cultural heritage, safeguarding scientific data, or building institutional memory, this learning hub provides frameworks and practical guidance.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              From foundational concepts to advanced implementation strategies, explore how to build preservation initiatives that last.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
            <div className="space-y-2">
              <div className="text-sm font-light text-muted-foreground uppercase tracking-wide">Guides</div>
              <p className="text-base font-light text-foreground">
                Practical walkthroughs for common preservation patterns
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-light text-muted-foreground uppercase tracking-wide">Principles</div>
              <p className="text-base font-light text-foreground">
                Core concepts that guide preservation work
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-light text-muted-foreground uppercase tracking-wide">Pathways</div>
              <p className="text-base font-light text-foreground">
                Curated learning sequences by role and goal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
