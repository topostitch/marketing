import {
  Archive,
  Building2,
  GraduationCap,
  Landmark,
  ScanSearch,
  Wrench,
} from 'lucide-react'
import Reveal from '@/components/motion/reveal'

export default function StoriesGrid() {
  const explorations = [
    {
      title: 'Museum & collection objects',
      category: 'Collections',
      icon: Archive,
      description:
        'Connect capture sources, metadata, provenance, processing, and public representations around individual objects.',
    },
    {
      title: 'Historic places & structures',
      category: 'Preservation',
      icon: Landmark,
      description:
        'Document places in spatial context while keeping field notes, source media, and later versions connected.',
    },
    {
      title: 'Research & teaching collections',
      category: 'Education',
      icon: GraduationCap,
      description:
        'Create inspectable records that can support teaching, comparison, annotation, and reuse.',
    },
    {
      title: 'Existing 3D archives',
      category: 'Ingestion',
      icon: ScanSearch,
      description:
        'Bring existing models and their attribution into a richer record instead of treating the model as an isolated file.',
    },
    {
      title: 'Facilities & physical assets',
      category: 'Operations',
      icon: Building2,
      description:
        'Explore how spatial records can support asset state, inspection context, and handoff between teams.',
    },
    {
      title: 'Capture workflows',
      category: 'Fieldwork',
      icon: Wrench,
      description:
        'Reduce the expertise barrier with guidance around coverage, missing views, processing, and next steps.',
    },
  ]

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Use cases under exploration
              </p>

              <h2 className="mt-3 text-balance text-3xl font-medium text-foreground md:text-4xl">
                Where a connected physical-to-digital record may create value
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                These are product directions and pilot opportunities—not claims of completed customer deployments.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {explorations.map(({ title, category, icon: Icon, description }, index) => (
              <Reveal
                key={title}
                direction="up"
                delay={(index % 3) * 0.07}
              >
                <article className="h-full rounded-xl border border-border bg-muted/45 p-6 transition-all duration-300 hover:-translate-y-1">
                  <Icon
                    className="h-6 w-6 text-muted-foreground"
                    aria-hidden="true"
                  />

                  <div className="mt-5 inline-block rounded bg-background px-2 py-1 text-xs font-medium text-muted-foreground">
                    {category}
                  </div>

                  <h3 className="mb-2 mt-3 text-balance text-lg font-medium text-foreground">
                    {title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
