import Link from 'next/link'
import PlatformProof from '@/components/platform/platform-proof'
import Footer from '@/components/footer'
import PlatformHero from '@/components/platform/platform-hero'
import PlatformCapabilities from '@/components/platform/platform-capabilities'
import PlatformArchitecture from '@/components/platform/platform-architecture'
import PlatformIntegrations from '@/components/platform/platform-integrations'
import PlatformSecurity from '@/components/platform/platform-security'
import PlatformCTA from '@/components/platform/platform-cta'
import PlatformDiscovery from '@/components/platform/platform-discovery'

export const metadata = {
  alternates: { canonical: '/platform' },
  title: 'Platform',
  description: 'See how TopoStitch connects capture sources, 3D representations, metadata, provenance, spatial context, versions, and publishing.',
}

export default function PlatformPage() {
  return (
    <>

      <main id="main-content" className="w-full">
        <PlatformHero />
        <aside className="mx-auto max-w-5xl px-6 py-8" aria-label="TopoStitch today">
          <p>Explore TopoStitch’s longer-term work on capture, provenance, and reusable 3D records. The current paid service is a founder-led product 3D pilot.</p>
          <Link className="underline underline-offset-4" href="/services#compare">See current pilot pricing</Link>
        </aside>
        <PlatformCapabilities />
	<PlatformProof />
	<PlatformDiscovery />
	<PlatformArchitecture />
        <PlatformIntegrations />
        <PlatformSecurity />
        <PlatformCTA />
        <Footer />
      </main>
    </>
  )
}
