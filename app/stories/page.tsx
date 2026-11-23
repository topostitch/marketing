import Link from 'next/link'
import StoriesHero from '@/components/stories/stories-hero'
import StoriesIntro from '@/components/stories/stories-intro'
import FeaturedStory from '@/components/stories/featured-story'
import StoriesGrid from '@/components/stories/stories-grid'
import StoriesEarlyAccess from '@/components/stories/stories-early-access'

export const metadata = {
  alternates: { canonical: '/stories' },
  title: 'Stories',
  description: 'Follow TopoStitch field experiments, pilot directions, and physical-to-digital documentation work.',
}

export default function StoriesPage() {
  return (
    <>

      <main id="main-content" className="w-full">
        <StoriesHero />
        <aside className="mx-auto max-w-5xl px-6 py-8" aria-label="TopoStitch today">
          <p>These field notes and experiments trace the broader TopoStitch mission. For the current paid product 3D service, see the pilot options.</p>
          <Link className="underline underline-offset-4" href="/services#compare">See current pilot options</Link>
        </aside>
        <StoriesIntro />
        <FeaturedStory />
        <StoriesGrid />
        <StoriesEarlyAccess />
      </main>
    </>
  )
}
