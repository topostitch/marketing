import Link from 'next/link'

export default function CTA() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-foreground text-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-balance leading-tight">Help shape a better way to document physical things.</h2>
          <p className="text-base md:text-lg opacity-75 font-light leading-relaxed max-w-2xl">TopoStitch is looking for museums, historic sites, researchers, educators, and other teams with a real object, collection, or place they want to document and share.</p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-background px-7 py-3 text-base font-medium text-foreground hover:bg-background/90 transition-colors">Discuss a pilot</Link>
            <Link href="/platform" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-background/40 px-7 py-3 text-base font-medium text-background hover:bg-background/10 transition-colors">Explore the platform</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
