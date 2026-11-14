import type { Metadata } from "next"
import PolicyPage from "@/components/policy-page"
export const metadata: Metadata = { title: "Refunds & Cancellations", description: "Draft milestone-based cancellation and refund terms for TopoStitch services.", alternates: { canonical: "/refunds" } }
export default function Page() { return <PolicyPage policy="refunds" /> }
