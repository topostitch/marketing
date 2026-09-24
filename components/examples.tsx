'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/motion/reveal'

const examples = [
  {
    category: 'Museums & Historic Sites',
    title: 'A self-guided experience that goes beyond audio',
    description:
      "TopoStitch is exploring how 3D presentation, spatial interpretation, source material, and record context can support future self-guided experiences.",
    action: 'See the concept',
    image: '/product/spatial-annotation-presentation.webp',
    imageAlt:
      'TopoStitch 3D presentation editor showing the Zero Mile Stone with spatial labels anchored directly to features on the 3D model.',
  },
  {
    category: 'Collections',
    title: 'An artifact that remains accessible beyond the exhibit',
    description:
      'The current object-record work explores how provenance, interpretation, media, and publication context can remain connected to a digital representation beyond a single project.',
    action: 'See the record',
    image: '/product/vintage_pocket_watch_provenance_history.webp',
    imageAlt:
      'TopoStitch object history for a Vintage Pocket Watch showing publication provenance and saved record changes.',
  },
  {
    category: 'Research & Education',
    title: 'A research workspace grounded in the physical object',
    description:
      'Current record and location workflows explore how evidence, observations, interpretation, and spatial context can stay connected to the objects and places being studied.',
    action: 'See the concept',
    image: '/product/zero-mile-stone-location-context.webp',
    imageAlt:
      'TopoStitch location and context record for the Zero Mile Stone showing its mapped physical location and associated place information.',
  },
  {
    category: 'Preservation & Fieldwork',
    title: 'A record that preserves how the object was created',
    description:
      'TopoStitch is being developed to keep more of the capture and processing history connected to the resulting digital representation. The full reconstruction-history workflow is still evolving.',
    action: 'See the workflow',
    image: '/product/standard_object_reconstruction_workflow.webp',
    imageAlt:
      'TopoStitch reconstruction workflow showing connected processing steps for validating, reconstructing, optimizing, and preparing a 3D object.',
  },
]

export default function Examples() {
  return (
    <section className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Reveal>
            <span className="text-sm font-medium tracking-wide text-muted-foreground">
              Examples
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
              See one record become many experiences
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              The same connected record can support interpretation, collections access,
              research, education, preservation, and future publishing.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {examples.map((example, index) => (
            <Reveal
              key={example.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={(index % 2) * 0.08}
            >
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-muted/20 transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden border-b border-border bg-background">
                  <Image
                    src={example.image}
                    alt={example.imageAlt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                <div className="p-6 md:p-7">
                  <span className="inline-flex rounded-md bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {example.category}
                  </span>

                  <h3 className="mt-4 text-balance text-xl font-medium leading-tight text-foreground md:text-2xl">
                    {example.title}
                  </h3>

                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {example.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    {example.action}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
