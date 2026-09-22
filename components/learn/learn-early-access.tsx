import Link from 'next/link'

export default function LearnEarlyAccess() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground text-balance">Have a capture or preservation question you want us to cover?</h2>
          <p className="text-muted-foreground font-light">The Learn library will grow around practical questions from people doing real documentation work.</p>
          <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Suggest a topic</Link>
        </div>
      </div>
    </section>
  )
}
