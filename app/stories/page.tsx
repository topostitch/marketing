import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StoriesHero from '@/components/stories/stories-hero'
import StoriesIntro from '@/components/stories/stories-intro'
import FeaturedStory from '@/components/stories/featured-story'
import StoriesGrid from '@/components/stories/stories-grid'
import StoriesEarlyAccess from '@/components/stories/stories-early-access'

export const metadata = {
  title: 'Stories',
  description: 'Follow TopoStitch field experiments, pilot directions, and physical-to-digital documentation work.',
}

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full pt-16">
        <StoriesHero />
        <aside className="mx-auto max-w-5xl px-6 py-8" aria-label="TopoStitch today">
          <p>These field notes and experiments trace the broader TopoStitch mission. For the current paid product 3D service, see the pilot options.</p>
          <Link className="underline underline-offset-4" href="/#studio">See current pilot options</Link>
        </aside>
        <StoriesIntro />
        <FeaturedStory />
        <StoriesGrid />
        <StoriesEarlyAccess />
        <Footer />
      </main>
    </>
  )
}
