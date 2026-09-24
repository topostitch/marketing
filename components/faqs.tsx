'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  const faqs = [
    {
      question: 'What is TopoStitch?',
      answer:
        "TopoStitch is an early-stage platform for keeping source captures, metadata, provenance, spatial context, and published representations connected to physical objects and places. Public records and several core record workflows work today; broader reuse across embeds, institutional systems, and additional experiences is still being developed.",
    },
    {
      question: 'Who is TopoStitch designed for?',
      answer:
        'TopoStitch is being developed with museums, historic sites, universities, preservation teams, and public institutions. While those are our initial focus, the platform is designed for any organization that needs to preserve and share trusted knowledge connected to real-world assets.',
    },
    {
      question: 'How is this different from a CMS or digital asset manager?',
      answer:
        'TopoStitch is not intended to replace a CMS or digital asset manager. It is being designed to connect files and metadata around the physical objects and places they describe. Broader reuse across institutional systems, websites, education, and spatial experiences is part of the product direction and will be validated through pilot work.',
    },
    {
      question: 'What is early access?',
      answer:
        "Early access partners help shape TopoStitch by testing real projects and workflows. You'll work directly with the founder, provide feedback, influence the roadmap, and receive priority onboarding as the platform evolves.",
    },
    {
      question: 'What does participation cost?',
      answer:
        'Early access pricing depends on the scope of the partnership. Some collaborations may focus on pilot projects, grant-funded work, or research partnerships. Our priority is validating real workflows before finalizing long-term pricing.',
    },
    {
      question: 'Do I need 3D models to use TopoStitch?',
      answer:
        'No. The product is being designed around the record, not around requiring a 3D model. Current workflows already use source imagery, metadata, location context, and 3D representations; support for additional media and record types will expand as the platform develops.',
    },
  ]

  return (
    <section className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
            FAQs
          </h2>

          <p className="text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Questions we expect from museums, researchers, preservation teams, and early partners.
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

        <div className="mt-16 flex flex-col items-center space-y-6 text-center">
          <div className="space-y-3">
            <h3 className="text-2xl font-medium text-foreground md:text-3xl">
              Still have questions?
            </h3>

            <p className="max-w-xl text-base font-light leading-relaxed text-muted-foreground">
              Tell us about the objects, places, collections, or knowledge your organization is trying to preserve, study, or share.
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer rounded-lg border-muted-foreground px-8 py-6 text-base text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/50"
          >
            Discuss a pilot
          </Button>
        </div>
      </div>
    </section>
  )
}
