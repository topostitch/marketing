import { Archive, Building2, GraduationCap, Landmark, ScanSearch, Wrench } from 'lucide-react'

export default function StoriesGrid() {
  const explorations = [
    { title: 'Museum & collection objects', category: 'Collections', icon: Archive, description: 'Connect capture sources, metadata, provenance, processing, and public representations around individual objects.' },
    { title: 'Historic places & structures', category: 'Preservation', icon: Landmark, description: 'Document places in spatial context while keeping field notes, source media, and later versions connected.' },
    { title: 'Research & teaching collections', category: 'Education', icon: GraduationCap, description: 'Create inspectable records that can support teaching, comparison, annotation, and reuse.' },
    { title: 'Existing 3D archives', category: 'Ingestion', icon: ScanSearch, description: 'Bring existing models and their attribution into a richer record instead of treating the model as an isolated file.' },
    { title: 'Facilities & physical assets', category: 'Operations', icon: Building2, description: 'Explore how spatial records can support asset state, inspection context, and handoff between teams.' },
    { title: 'Capture workflows', category: 'Fieldwork', icon: Wrench, description: 'Reduce the expertise barrier with guidance around coverage, missing views, processing, and next steps.' },
  ]

  return (
    <section className="w-full bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Use cases under exploration</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium text-foreground text-balance">Where a connected physical-to-digital record may create value</h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">These are product directions and pilot opportunities—not claims of completed customer deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {explorations.map(({ title, category, icon: Icon, description }) => (
              <article key={title} className="p-6 bg-muted/45 rounded-xl border border-border">
                <Icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                <div className="mt-5 inline-block px-2 py-1 bg-background rounded text-xs font-medium text-muted-foreground">{category}</div>
                <h3 className="text-lg font-medium text-foreground mt-3 mb-2 text-balance">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
