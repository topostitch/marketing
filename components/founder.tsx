import Link from 'next/link'

export default function Founder() {
  return (
    <section aria-labelledby="founder-title" className="border-t border-border py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
        <div><p className="text-sm font-medium text-muted-foreground">The founder’s perspective</p><h2 id="founder-title" className="mt-4 text-balance text-3xl font-medium md:text-4xl">Why TopoStitch exists</h2><p className="mt-5 text-sm text-muted-foreground">Jacob Galito · Founder</p></div>
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p>TopoStitch grew out of nearly two decades of Jacob Galito’s work across product design, 3D, immersive technology, and spatial computing. He previously co-founded Ario, served as Creative Director, and was a co-inventor on its patented platform, building AR, VR, and spatial products across enterprise, industrial, government, training, and cultural settings.</p>
          <p>His cultural-heritage work includes an augmented reality experience for Old Dominion University’s Barry Art Museum during the mask-mandate period and two augmented reality experiences for the White House Historical Association.</p>
          <p>Across those projects, capture and presentation tools kept improving, but context remained fragmented. Models, metadata, source imagery, annotations, and institutional knowledge became separated across teams and platforms.</p>
          <p>That recurring problem led to TopoStitch: what if a digital representation were part of a persistent record of the physical thing itself? The aim is to keep knowledge connected so each new project can build on what came before.</p>
          <Link href="/about" className="inline-flex min-h-11 items-center font-medium text-foreground underline underline-offset-4">Read the full founder story →</Link>
        </div>
      </div>
    </section>
  )
}
