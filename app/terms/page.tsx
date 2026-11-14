import type { Metadata } from "next"
import PolicyPage from "@/components/policy-page"
export const metadata: Metadata = { title: "Terms of Service", description: "Draft service and payment terms for TopoStitch, subject to review before launch.", alternates: { canonical: "/terms" } }
export default function Page() { return <PolicyPage policy="terms" /> }
