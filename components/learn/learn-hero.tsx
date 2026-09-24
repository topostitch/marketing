import Link from 'next/link'
import Reveal from '@/components/motion/learn-reveal'

export default function LearnHero() {
  return (
    <section className="w-full border-b border-border bg-background pb-12 pt-20 md:pb-16 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="max-w-4xl space-y-6">
            <Reveal>
              <div className="inline-block rounded-full border border-border bg-muted px-3 py-1">
                <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                  Learning hub
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="text-balance text-4xl font-light text-foreground md:text-5xl">
                Understanding knowledge preservation
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
                Build meaningful preservation projects. Learn the principles, practices, and technologies behind effective knowledge infrastructure.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="#guides"
                className="rounded-lg bg-primary px-6 py-3 text-center font-light text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Read the guides
              </Link>

              <Link
                href="#principles"
                className="rounded-lg border border-border bg-secondary px-6 py-3 text-center font-light text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
              >
                Core principles
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
