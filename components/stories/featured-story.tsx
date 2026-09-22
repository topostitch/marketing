import Link from 'next/link'
import { Camera, GitBranch, MapPinned } from 'lucide-react'

export default function FeaturedStory() {
  return (
    <section className="w-full bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full min-h-[360px] md:min-h-[500px] bg-muted rounded-xl border border-border flex items-center justify-center p-8">
              <div className="max-w-sm text-center">
                <Camera className="w-10 h-10 mx-auto text-muted-foreground" aria-hidden="true" />
                <p className="mt-4 text-sm font-medium text-foreground">Field capture → digital record</p>
                <p className="mt-2 text-sm text-muted-foreground">This space is reserved for a real TopoStitch capture or published object rather than a fabricated case study.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground">Field notes</div>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance">Building the workflow with real objects and places</h2>
              </div>

              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                TopoStitch is being developed through hands-on capture, reconstruction, metadata, publishing, and provenance experiments. The goal is to learn where context gets lost today and design a record that keeps those pieces connected.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <MapPinned className="w-5 h-5 mt-1 text-muted-foreground" aria-hidden="true" />
                  <div><h3 className="font-medium text-foreground">Physical context</h3><p className="text-sm text-muted-foreground mt-1">Keep the object or site connected to place, collection, and surrounding context.</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <GitBranch className="w-5 h-5 mt-1 text-muted-foreground" aria-hidden="true" />
                  <div><h3 className="font-medium text-foreground">Processing history</h3><p className="text-sm text-muted-foreground mt-1">Preserve the relationship between source captures, processing steps, versions, and published representations.</p></div>
                </div>
              </div>

              <Link href="/platform" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Explore the workflow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
