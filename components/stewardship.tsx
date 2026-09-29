const pillars = [
  ['Cultural sustainability', 'Preserve institutional knowledge, provenance, interpretation, and context for future generations.'],
  ['Digital sustainability', 'Keep records structured, portable, discoverable, and useful beyond a single project, platform, or file format.'],
  ['Operational sustainability', 'Make previous documentation and digitization work easier to find and reuse instead of repeatedly recreating what already exists.'],
]

export default function Stewardship() {
  return (
    <section aria-labelledby="stewardship-title" className="border-t border-border bg-muted/20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-medium text-muted-foreground">Continuity, by design</p>
          <h2 id="stewardship-title" className="text-balance text-3xl font-medium md:text-4xl">Built for long-term stewardship</h2>
          <p className="text-lg leading-relaxed">Preservation is more than creating a digital copy.</p>
          <p className="leading-relaxed text-muted-foreground">TopoStitch is being built to keep digital records useful over time by connecting 3D assets, spatial data, provenance, metadata, annotations, and source material to the physical objects and places they document.</p>
          <p className="leading-relaxed text-muted-foreground">Making existing records easier to preserve, discover, reuse, and carry forward is the foundation of our approach to sustainable cultural heritage documentation.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map(([title, body]) => <article key={title} className="rounded-xl border border-border bg-background p-6"><h3 className="text-xl font-medium">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p></article>)}
        </div>
        <p className="mt-10 text-2xl font-medium text-foreground md:text-3xl">Preserve once. Build on it over time.</p>
      </div>
    </section>
  )
}
