import RecordContext from '@/components/record-context'
import Stewardship from '@/components/stewardship'
import Founder from '@/components/founder'
import FounderExperience from '@/components/founder-experience'
import StartupVirginia from '@/components/startup-virginia'
import CustomerDiscovery from '@/components/customer-discovery'
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
        <Examples />
        <Problem />
        <RecordContext />
        <Framework />
        <Audience />
        <Stewardship />
        <Founder />
        <FounderExperience />
        <StartupVirginia />
        <CustomerDiscovery />
        <EarlyPartners />
        <CTA />
        <Faqs />
        <JoinForm />
      </main>
      <Footer />
    </>
  )
}
