import Image from 'next/image'
import Link from 'next/link'
import { GitBranch, MapPinned } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

export default function FeaturedStory() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <Reveal direction="left">
              <div className="group overflow-hidden rounded-2xl border border-border bg-muted/20">
                <Image
                  src="/product/global-spatial-discovery-results.webp"
                  alt="TopoStitch public discovery results showing published records for real captured objects and places."
                  width={1600}
                  height={1000}
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.012]"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                    Field notes
                  </div>

                  <h2 className="text-balance text-3xl font-medium text-foreground md:text-4xl">
                    Building the workflow with real objects and places
                  </h2>
                </div>

                <p className="text-lg font-light leading-relaxed text-muted-foreground">
                  TopoStitch is being developed through hands-on capture, reconstruction,
                  metadata, publishing, and provenance experiments. Real records help expose
                  where context gets lost and what needs to stay connected.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4">
                    <MapPinned
                      className="mt-1 h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">
                        Physical context
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Keep an object or site connected to place, collection, and the surrounding context needed to understand it.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <GitBranch
                      className="mt-1 h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">
                        From capture to published record
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Preserve the relationship between source captures, processing, versions, metadata, and the records people eventually discover.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/platform"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Explore the platform
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
