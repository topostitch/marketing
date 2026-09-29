import Link from 'next/link'
import { buttonClassName } from '@topostitch/design-system'

export default function CustomerDiscovery() {
  return (
    <section aria-labelledby="discovery-title" className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-medium text-muted-foreground">Building a working product. Learning from real workflows.</p>
          <h2 id="discovery-title" className="text-balance text-3xl font-medium md:text-4xl">Currently validating with cultural heritage professionals</h2>
          <p className="leading-relaxed text-muted-foreground">TopoStitch is in early-stage customer discovery, validating cultural heritage as its first market. We’re speaking with professionals responsible for stewardship, digitization, documentation, and preservation.</p>
          <ul className="flex flex-wrap gap-3">{['Collections managers', 'Museum registrars', 'Conservators', 'Digital asset managers'].map(role => <li key={role} className="rounded-full border border-border px-4 py-2 text-sm">{role}</li>)}</ul>
          <p className="leading-relaxed text-muted-foreground">We want to understand how institutions manage 3D and spatial records, where context becomes fragmented, what happens when platforms or staff change, and which problems are important enough to justify a new solution.</p>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-muted/20 p-6 md:p-8">
          <h3 className="text-2xl font-medium">Work with us</h3><p className="mt-3 text-lg font-medium">Manage digital cultural heritage records?</p><p className="mt-2 text-muted-foreground">Help shape how TopoStitch evolves.</p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row"><Link href="/#contact" className={buttonClassName()}>Discuss a pilot</Link><Link href="/#contact" className={buttonClassName({ variant: 'secondary' })}>Share your workflow</Link></div>
        </div>
      </div>
    </section>
  )
}
