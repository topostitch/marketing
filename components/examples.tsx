'use client'

import { ImageIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Examples() {
  const examples = [
    {
      category: 'Museums & Historic Sites',
      title: 'A self-guided experience that goes beyond audio',
      description:
        "Visitors explore an artifact or historic place through audio, images, video, documents, 3D, and spatial annotations—all published from the institution's trusted knowledge record.",
      primary: 'Explore the experience',
    },
    {
      category: 'Collections',
      title: 'An artifact that remains accessible beyond the exhibit',
      description:
        'Publish a 3D artifact online with its provenance, interpretation, media, and related records—then reuse that same content in exhibitions, classrooms, and future experiences.',
      primary: 'View the artifact',
    },
    {
      category: 'Research & Education',
      title: 'A research workspace grounded in the physical object',
      description:
        'Researchers and students can attach evidence, questions, interpretations, and media directly to the objects and places they study while preserving authorship and context.',
      primary: 'Explore the workspace',
    },
    {
      category: 'Preservation & Fieldwork',
      title: 'An archaeological site where context is everything',
      description:
        'Preserve where discoveries were made, how objects relate, what changed over time, and the evidence behind each interpretation in one durable spatial record.',
      primary: 'Explore the site record',
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-sm font-medium tracking-wide text-muted-foreground">Examples</span>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">
            See one record become many experiences
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Explore how the same trusted knowledge can support public interpretation, online access, research,
            education, and fieldwork.
          </p>
        </div>

        {/* Alternating editorial rows */}
        <div className="mt-16 space-y-16 md:space-y-24">
          {examples.map((example, index) => {
            const imageFirst = index % 2 === 0
            return (
              <div
                key={example.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Media */}
                <div className={`w-full aspect-[4/3] bg-muted rounded-lg flex items-center justify-center ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ImageIcon className="w-14 h-14 text-muted-foreground/40" aria-hidden="true" />
                  <span className="sr-only">Example media placeholder</span>
                </div>

                {/* Copy */}
                <div className={`space-y-4 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-sm font-medium tracking-wide text-muted-foreground">
                    {example.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium text-foreground text-balance leading-tight">
                    {example.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-light">
                    {example.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-6 py-6 text-base border-muted-foreground text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      {example.primary}
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="px-4 py-6 text-base text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                    >
                      Read the story
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
