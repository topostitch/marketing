import Header from '@/components/header'
import Footer from '@/components/footer'
import PlatformHero from '@/components/platform/platform-hero'
import PlatformCapabilities from '@/components/platform/platform-capabilities'
import PlatformArchitecture from '@/components/platform/platform-architecture'
import PlatformIntegrations from '@/components/platform/platform-integrations'
import PlatformSecurity from '@/components/platform/platform-security'
import PlatformCTA from '@/components/platform/platform-cta'

export const metadata = {
  title: 'Platform',
  description: 'See how TopoStitch connects capture sources, 3D representations, metadata, provenance, spatial context, versions, and publishing.',
}

export default function PlatformPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full pt-16">
        <PlatformHero />
        <PlatformCapabilities />
        <PlatformArchitecture />
        <PlatformIntegrations />
        <PlatformSecurity />
        <PlatformCTA />
        <Footer />
      </main>
    </>
  )
}
