'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

export default function LearnFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  const faqs = [
    {
      question: 'What does knowledge preservation actually mean?',
      answer:
        'Knowledge preservation involves capturing, organizing, maintaining, and providing access to information in ways that ensure it remains understandable and usable by future users. It goes beyond simple storage to include context, relationships, and authenticity verification.',
    },
    {
      question: 'How long can preserved knowledge actually last?',
      answer:
        'No digital system can guarantee that knowledge will remain usable for decades or centuries. Longevity depends on format choices, metadata, organizational continuity, migration planning, documentation, and ongoing stewardship.',
    },
    {
      question: 'Do I need specialized technical skills to use TopoStitch?',
      answer:
        'TopoStitch is being designed for people with different levels of technical experience. The current product is still early, and some workflows require more technical knowledge than the long-term product is intended to require. The Learn library will document those workflows as it develops.',
    },
    {
      question: 'How do I start a preservation project?',
      answer:
        'Start by identifying what needs to be documented, what context would be difficult to reconstruct later, who needs access, and what source material already exists. Role-based learning paths are planned but are not yet a complete step-by-step curriculum.',
    },
    {
      question: 'What happens if formats change or technology becomes obsolete?',
      answer:
        'TopoStitch is being designed with format evolution and portability in mind. Long-term migration and conversion workflows are still being developed, so the product does not yet guarantee automatic preservation across future formats.',
    },
  ]

  return (
    <section className="w-full border-b border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
            FAQs
          </h2>

          <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Common questions about knowledge preservation and learning with TopoStitch.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div key={faq.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="flex shrink-0"
                  >
                    <ChevronDown
                      className="h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              height: {
                                duration: 0.42,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: {
                                duration: 0.28,
                                ease: 'easeOut',
                              },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-base font-light leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
