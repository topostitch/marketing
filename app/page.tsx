import Header from '@/components/header'
import Hero from '@/components/hero'
import Problem from '@/components/problem'
import Framework from '@/components/framework'
import Audience from '@/components/audience'
import Examples from '@/components/examples'
import EarlyPartners from '@/components/early-partners'
import CTA from '@/components/cta'
import Faqs from '@/components/faqs'
import JoinForm from '@/components/join-form'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full pt-16">
        <Hero />
        <Problem />
        <Framework />
        <Audience />
        <Examples />
        <EarlyPartners />
        <CTA />
        <Faqs />
        <JoinForm />
        <Footer />
      </main>
    </>
  )
}
