import Link from 'next/link'
import Reveal from '@/components/motion/reveal'

export default function StoriesEarlyAccess() {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20">
          <Reveal direction="up">
            <div className="mx-auto max-w-2xl space-y-6 text-center">
              <h2 className="text-balance text-3xl font-medium text-foreground md:text-4xl">
                Have a project that could become a TopoStitch pilot story?
              </h2>

              <p className="text-lg font-light text-muted-foreground">
                We would rather document a small number of real projects well than fill this page with fictional case studies.
              </p>

              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Discuss a pilot
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
