import Link from 'next/link'
import LearnHero from '@/components/learn/learn-hero'
import LearnIntro from '@/components/learn/learn-intro'
import GuidesAndArticles from '@/components/learn/guides-and-articles'
import CorePrinciples from '@/components/learn/core-principles'
import LearningPaths from '@/components/learn/learning-paths'
import WhatWeBelieve from '@/components/learn/what-we-believe'
import HowWeBuild from '@/components/learn/how-we-build'
import LearnFAQ from '@/components/learn/learn-faq'
import LearnEarlyAccess from '@/components/learn/learn-early-access'

export const metadata = {
  alternates: { canonical: '/learn' },
  title: 'Learn',
  description: 'Practical guides for 3D capture, photogrammetry, metadata, provenance, preservation, and publishing physical-to-digital records.',
}

export default function LearnPage() {
  return (
    <>

      <main id="main-content" className="w-full">
        <LearnHero />
        <aside className="mx-auto max-w-5xl px-6 py-8" aria-label="TopoStitch today">
          <p>This is our learning roadmap for capture and preservation. Planned guides are marked below. If you’re preparing a product for ecommerce today, start with the pilot requirements.</p>
          <Link className="underline underline-offset-4" href="/services/3d-product-modeling">Explore ecommerce 3D services</Link>
        </aside>
        <LearnIntro />
        <GuidesAndArticles />
        <CorePrinciples />
        <LearningPaths />
        <WhatWeBelieve />
        <HowWeBuild />
        <LearnFAQ />
        <LearnEarlyAccess />
      </main>
    </>
  )
}
