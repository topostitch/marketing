import Link from 'next/link'
import { Box, Camera, FileText, MapPinned } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full bg-background pt-16 md:pt-24 lg:pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-7 max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">Digital records for physical objects and places</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-tight text-balance">
            Preserve what matters.<br />Build understanding in context.<br />Share knowledge that endures.
          </h1>

          <p className="text-base md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl">
            TopoStitch helps museums, historic sites, researchers, and organizations turn photos, video, 3D captures, documents, and metadata into structured digital records that can be understood, traced, and shared.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
            <Link href="/platform" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-7 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              See how TopoStitch works
            </Link>
            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-7 py-3 text-base font-medium text-foreground hover:bg-muted/60 transition-colors">
              Talk about a pilot
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-16 rounded-2xl border border-border bg-muted/35 p-5 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
            <div className="grid grid-cols-2 gap-3">
              {[{ icon: Camera, label: 'Photos & video' }, { icon: Box, label: '3D captures' }, { icon: FileText, label: 'Documents' }, { icon: MapPinned, label: 'Spatial context' }].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-border bg-background p-4 min-h-24 flex flex-col justify-between">
                  <Icon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="hidden md:block text-2xl text-muted-foreground" aria-hidden="true">→</div>
            <div className="rounded-xl border border-border bg-background p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">TopoStitch record</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-medium text-foreground">One connected record, built to keep context with the thing itself.</h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">Organize identity, location, capture sources, processing history, metadata, provenance, versions, and published representations in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
