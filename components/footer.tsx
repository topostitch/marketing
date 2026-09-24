import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-14 md:py-16 bg-background text-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 mb-12">
          <div className="space-y-4 max-w-xl">
            <Link href="/" className="text-xl font-medium text-foreground">TopoStitch</Link>
            <p className="text-sm text-muted-foreground leading-relaxed">Digital records for physical objects and places. TopoStitch is an early-stage platform for connecting capture sources, 3D representations, metadata, provenance, processing history, and publishing.</p>
            <a href="mailto:hello@topostitch.dev" className="inline-block text-sm text-foreground underline underline-offset-4 hover:text-accent transition-colors">hello@topostitch.dev</a>
          </div>

          <nav className="grid grid-cols-2 gap-6" aria-label="Footer navigation">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Explore</p>
              <Link href="/platform" className="block text-sm text-muted-foreground hover:text-foreground">Platform</Link>
              <Link href="/stories" className="block text-sm text-muted-foreground hover:text-foreground">Stories</Link>
              <Link href="/learn" className="block text-sm text-muted-foreground hover:text-foreground">Learn</Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Connect</p>
              <Link href="/#contact" className="block text-sm text-muted-foreground hover:text-foreground">Discuss a pilot</Link>
              <a href="mailto:hello@topostitch.dev" className="block text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </nav>
        </div>

        <div className="border-t border-border pt-7 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 TopoStitch LLC. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Early-stage product · Richmond, Virginia</p>
        </div>
      </div>
    </footer>
  )
}
