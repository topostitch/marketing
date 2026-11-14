import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomServicesInquiry from "@/components/custom-services-inquiry"

export const metadata: Metadata = {
  title: "Custom Services & Training",
  description: "Individually quoted 3D capture, on-site production, remote consultation and training, optimization, and agency services.",
  alternates: { canonical: "/services/custom-services" },
}

const offerings = [
  ["Custom 3D Capture & Production", "Specialized capture and processing for complex objects, unusual materials, larger projects, and custom technical requirements."],
  ["On-site 3D Capture", "Tell us about the site, objects, timing, and logistics. Availability and travel are reviewed for each project; quotes separate professional fees and applicable travel expenses."],
  ["Remote 3D Consultation", "Paid video consultations on capture workflows, equipment, photogrammetry, optimization, deployment, troubleshooting, and technical feasibility."],
  ["Remote Training & Workshops", "Paid instruction for individuals, businesses, agencies, and teams, scoped around learning goals and experience level."],
  ["3D Optimization & Conversion", "Discuss geometry optimization, file conversion, preparation, technical validation, deployment preparation, or batch processing against your requirements."],
  ["Agency, White-label & Volume Production", "Quote-based production support for agencies, studios, developers, manufacturers, and organizations with one-time or recurring needs."],
]

export default async function CustomServicesPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const params = await searchParams
  const initialService = params.service
  return <><Header /><main id="main-content" className="pt-16"><section className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-24"><p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Custom Services & Training</p><h1 className="mt-4 max-w-4xl text-balance text-4xl font-medium tracking-tight md:text-6xl">Specialist 3D work, scoped around your needs.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">These are paid services with individually written quotes. Share your project scope and desired outcome; no payment is due before you review and accept a quote.</p><div className="mt-10 grid gap-4 md:grid-cols-2">{offerings.map(([title, description], index) => <article key={title} className="rounded-2xl border border-border bg-card p-6"><p className="text-sm text-muted-foreground">0{index + 1} · Paid service · Custom quote</p><h2 className="mt-3 text-xl font-medium">{title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p><a href={`/services/custom-services?service=${["capture", "onsite", "consultation", "training", "optimization", "agency"][index]}#inquiry`} className="mt-5 inline-flex min-h-10 items-center font-medium underline underline-offset-4">Request a quote</a></article>)}</div><p className="mt-7 text-sm leading-relaxed text-muted-foreground">Submitting an inquiry is free. Custom production, consultation, and training services are paid and individually quoted. On-site quotes separately identify professional fees and applicable travel expenses. Travel feasibility is reviewed individually.</p></section><div id="inquiry"><CustomServicesInquiry initialService={initialService} /></div></main><Footer /></>
}
