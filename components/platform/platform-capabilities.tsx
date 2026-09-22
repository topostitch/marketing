import { Boxes, Camera, GitBranch, MapPinned, Search, Share2 } from 'lucide-react'

export default function PlatformCapabilities() {
  const capabilities = [
    { title: 'Capture intake', description: 'Bring source photos, video, 3D files, and related metadata into a record without separating the result from its evidence.', icon: Camera },
    { title: 'Object & place records', description: 'Organize digital representations around the physical object, collection, site, or place they describe.', icon: Boxes },
    { title: 'Spatial context', description: 'Keep records connected to location and spatial relationships so context can remain visible instead of flattening into folders.', icon: MapPinned },
    { title: 'Version & provenance history', description: 'Track how representations evolve, what sources were used, and which version has been published.', icon: GitBranch },
    { title: 'Searchable metadata', description: 'Structure descriptive and operational metadata so teams can find records by more than a filename.', icon: Search },
    { title: 'Publishing paths', description: 'Prepare records for public pages, embeds, research, education, and future spatial experiences from the same source of truth.', icon: Share2 },
  ]

  return (
    <section id="capabilities" className="w-full py-16 md:py-24 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">What TopoStitch is being built to do</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground text-balance">Keep the evidence, context, and published representation connected.</h2>
            <p className="text-lg text-muted-foreground font-light">The current product is in active development, with pilot workflows focused on capture, record structure, spatial context, provenance, and publishing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ title, description, icon: Icon }) => (
              <div key={title} className="space-y-3 p-6 bg-background rounded-xl border border-border">
                <Icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-lg font-medium text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
