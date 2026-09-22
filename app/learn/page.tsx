import Header from '@/components/header'
import Footer from '@/components/footer'
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
  title: 'Learn',
  description: 'Practical guides for 3D capture, photogrammetry, metadata, provenance, preservation, and publishing physical-to-digital records.',
}

export default function LearnPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full pt-16">
        <LearnHero />
        <LearnIntro />
        <GuidesAndArticles />
        <CorePrinciples />
        <LearningPaths />
        <WhatWeBelieve />
        <HowWeBuild />
        <LearnFAQ />
        <LearnEarlyAccess />
        <Footer />
      </main>
    </>
  )
}
