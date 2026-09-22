export default function StoriesIntro() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6 text-balance">
              Knowledge doesn't disappear. It gets preserved.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-4">
              Every preservation project tells a story. From archiving endangered languages to documenting traditional crafts, from protecting scientific datasets to safeguarding institutional memory—these initiatives represent the commitment to ensure knowledge survives.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              These stories showcase how organizations transform raw preservation work into connected knowledge records that will endure.
            </p>
          </div>

          {/* Stats placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
            <div className="space-y-2">
              <div className="text-sm font-light text-muted-foreground uppercase tracking-wide">Early stage</div>
              <p className="text-base font-light text-foreground">
                Stories being collected and documented
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-light text-muted-foreground uppercase tracking-wide">Your story</div>
              <p className="text-base font-light text-foreground">
                Building knowledge preservation initiatives? Share your work with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
