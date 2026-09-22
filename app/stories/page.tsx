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
        <StoriesIntro />
        <FeaturedStory />
        <StoriesGrid />
        <StoriesEarlyAccess />
        <Footer />
      </main>
    </>
  )
}
