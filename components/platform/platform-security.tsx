import { CheckCircle2, ShieldCheck, Workflow, Users } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

export default function PlatformSecurity() {
  const priorities = [
    {
      icon: ShieldCheck,
      title: 'Designed for trustworthy records',
      description: 'Provenance, source references, publishing status, and change history are core product concepts. Richer version-history workflows are still being developed.',
    },
    {
      icon: Users,
      title: 'Organization-aware access',
      description: 'The platform is being designed around organizations, contributors, public records, and internal work so teams can control what is shared.',
    },
    {
      icon: Workflow,
      title: 'Traceable processing',
      description: 'Capture and processing steps can stay connected to the resulting digital object, helping teams understand how a representation was created.',
    },
    {
      icon: CheckCircle2,
      title: 'Compliance-minded roadmap',
      description: 'Security, privacy, accessibility, and institutional requirements are being considered early. Formal certifications will only be claimed when they are actually achieved.',
    },
  ]

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Trust & stewardship
              </p>

              <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Institutional trust has to be designed in from the beginning.
              </h2>

              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                TopoStitch is still early. The goal is to build the record, access,
                provenance, and governance foundations needed for serious preservation
                and documentation work—without overstating certifications that are not yet in place.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {priorities.map(({ icon: Icon, title, description }, index) => (
              <Reveal
                key={title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 0.08}
              >
                <div className="h-full space-y-3 rounded-xl border border-border bg-muted/45 p-6 transition-all duration-300 hover:-translate-y-1">
                  <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />

                  <h3 className="text-lg font-medium text-foreground">
                    {title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-accent/5 p-6 md:p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Current stage:</strong>{' '}
                TopoStitch is an early-stage product under active development. Security
                and compliance requirements will be documented transparently as the
                platform moves from pilot use toward production deployments.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
