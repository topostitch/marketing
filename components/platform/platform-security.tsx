import { CheckCircle2, ShieldCheck, Workflow, Users } from 'lucide-react'

export default function PlatformSecurity() {
  const priorities = [
    {
      icon: ShieldCheck,
      title: 'Designed for trustworthy records',
      description: 'Provenance, version history, source references, and published-representation status are core product concepts rather than afterthoughts.',
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
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Trust & stewardship</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground text-balance">
              Institutional trust has to be designed in from the beginning.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              TopoStitch is still early. The goal is to build the record, access, provenance, and governance foundations needed for serious preservation and documentation work—without overstating certifications that are not yet in place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {priorities.map(({ icon: Icon, title, description }) => (
              <div key={title} className="space-y-3 p-6 bg-muted/45 rounded-xl border border-border">
                <Icon className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                <h3 className="text-lg font-medium text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-accent/5 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Current stage:</strong> TopoStitch is an early-stage product under active development. Security and compliance requirements will be documented transparently as the platform moves from pilot use toward production deployments.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
