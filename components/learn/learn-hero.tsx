import Link from 'next/link'

export default function LearnHero() {
  return (
    <section className="w-full bg-background pt-20 pb-12 md:pt-28 md:pb-16 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-6 max-w-4xl">
            <div className="inline-block px-3 py-1 bg-muted border border-border rounded-full">
              <span className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                Learning hub
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-foreground text-balance">
              Understanding knowledge preservation
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Build meaningful preservation projects. Learn the principles, practices, and technologies behind effective knowledge infrastructure.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#guides"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-light text-center hover:opacity-90 transition-opacity"
            >
              Explore guides
            </Link>
            <Link
              href="#principles"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-light text-center hover:bg-muted transition-colors border border-border"
            >
              Core principles
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
