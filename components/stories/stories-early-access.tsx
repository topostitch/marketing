import Link from 'next/link'

export default function StoriesEarlyAccess() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance">Have a project that could become a TopoStitch pilot story?</h2>
            <p className="text-lg text-muted-foreground font-light">We would rather document a small number of real projects well than fill this page with fictional case studies.</p>
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Start a conversation</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
