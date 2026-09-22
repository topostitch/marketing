'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What is TopoStitch?',
      answer:
        "TopoStitch is a platform for preserving the knowledge connected to physical objects and places. Instead of creating separate content for websites, exhibits, research projects, or self-guided experiences, institutions create one trusted knowledge record that can be published wherever it's needed.",
    },
    {
      question: 'Who is TopoStitch designed for?',
      answer:
        'TopoStitch is being developed with museums, historic sites, universities, preservation teams, and public institutions. While those are our initial focus, the platform is designed for any organization that needs to preserve and share trusted knowledge connected to real-world assets.',
    },
    {
      question: 'How is this different from a CMS or digital asset manager?',
      answer:
        'Traditional systems store files. TopoStitch organizes knowledge around the objects and places those files describe. That means the same trusted record can support research, collections, websites, self-guided experiences, education, and future applications without rebuilding the content.',
    },
    {
      question: 'What is early access?',
      answer:
        "Early Access partners help shape TopoStitch by testing real projects and workflows. You'll work directly with the founder, provide feedback, influence the roadmap, and receive priority onboarding as the platform evolves.",
    },
    {
      question: 'What does participation cost?',
      answer:
        'Early Access pricing depends on the scope of the partnership. Some collaborations may focus on pilot projects, grant-funded work, or research partnerships. Our priority is validating real workflows before finalizing long-term pricing.',
    },
    {
      question: 'Do I need 3D models to use TopoStitch?',
      answer:
        'No. TopoStitch is designed around preserving knowledge first. While 3D models can enrich the experience, institutions can also connect documents, images, audio, video, maps, timelines, and other media to the same trusted knowledge record.',
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground text-balance leading-tight">FAQs</h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            Questions we expect from museums, researchers, preservation teams, and early partners.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 divide-y divide-border border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-medium text-foreground">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="pb-6 text-base text-muted-foreground leading-relaxed font-light">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-16 flex flex-col items-center text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground">Still have questions?</h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-xl">
              Tell us about the objects, places, collections, or knowledge your organization is trying to
              preserve, study, or share.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base border-muted-foreground text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 cursor-pointer"
          >
            Start a Conversation
          </Button>
        </div>
      </div>
    </section>
  )
}
