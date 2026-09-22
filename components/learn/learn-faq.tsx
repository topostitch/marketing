'use client'

import { useState } from 'react'

export default function LearnFAQ() {
  const [expanded, setExpanded] = useState<number | null>(0)

  const faqs = [
    {
      id: 1,
      question: 'What does knowledge preservation actually mean?',
      answer: 'Knowledge preservation involves capturing, organizing, maintaining, and providing access to information in ways that ensure it remains understandable and usable by future users. It goes beyond simple storage to include context, relationships, and authenticity verification.',
    },
    {
      id: 2,
      question: 'How long can preserved knowledge actually last?',
      answer: 'With thoughtful design, preservation infrastructure can ensure knowledge survives for decades or centuries. This requires attention to format stability, metadata preservation, organizational continuity, and technology migration strategies.',
    },
    {
      id: 3,
      question: 'Do I need specialized technical skills to use TopoStitch?',
      answer: 'TopoStitch is designed to serve organizations with varying technical capabilities. Some features work out-of-the-box, while others benefit from integration with your existing systems. Our guides cover both approaches.',
    },
    {
      id: 4,
      question: 'How do I start a preservation project?',
      answer: 'Start by identifying what knowledge matters most to your organization or community, understand its current state, and plan how you want to make it accessible. Our learning paths by role provide step-by-step guidance.',
    },
    {
      id: 5,
      question: 'What happens if formats change or technology becomes obsolete?',
      answer: 'We design preservation systems with format evolution in mind. This includes maintaining conversion pathways, documenting technical specifications, and building systems that can adapt as technology changes.',
    },
  ]

  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-20 space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-balance">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground font-light">
              Common questions about knowledge preservation and learning with TopoStitch.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
              >
                <button
                  onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
                >
                  <span className="font-light text-foreground pr-4">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 text-accent transition-transform ${
                      expanded === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    ↓
                  </span>
                </button>
                {expanded === faq.id && (
                  <div className="px-6 py-4 bg-muted border-t border-border">
                    <p className="text-base text-muted-foreground font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
