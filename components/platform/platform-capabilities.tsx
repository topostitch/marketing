import { Boxes, Camera, GitBranch, MapPinned, Search, Share2 } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

export default function PlatformCapabilities() {
  const capabilities = [
    { title: 'Capture intake', description: 'Bring source photos, video, 3D files, and related metadata into a record without separating the result from its evidence.', icon: Camera },
    { title: 'Object & place records', description: 'Organize digital representations around the physical object, collection, site, or place they describe.', icon: Boxes },
    { title: 'Spatial context', description: 'Keep records connected to location and spatial relationships so context can remain visible instead of flattening into folders.', icon: MapPinned },
    { title: 'Version & provenance context', description: 'Keep sources, processing context, and published status connected to the record. Richer version-history workflows are still being developed.', icon: GitBranch },
    { title: 'Structured metadata', description: 'Keep descriptive and operational metadata with each record. Broader metadata search is still being developed beyond the fields available in current discovery workflows.', icon: Search },
    { title: 'Publishing paths', description: 'Publish public records today. Embeds, reusable delivery formats, and additional spatial experiences are being developed around the same underlying record.', icon: Share2 },
  ]

  return (
    <section id="capabilities" className="w-full border-y border-border bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                What TopoStitch is being built to do
              </p>

              <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Keep the evidence, context, and published representation connected.
              </h2>

              <p className="text-lg font-light text-muted-foreground">
                The current product is in active development, with pilot workflows focused
                on capture, record structure, spatial context, provenance, and publishing.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ title, description, icon: Icon }, index) => (
              <Reveal
                key={title}
                direction="up"
                delay={(index % 3) * 0.07}
              >
                <div className="h-full space-y-3 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1">
                  <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  <h3 className="text-lg font-medium text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
