import type { Metadata } from "next"
import PolicyPage from "@/components/policy-page"
export const metadata: Metadata = { title: "Shipping Policy", description: "Draft shipping responsibilities and delivery timing for TopoStitch services.", alternates: { canonical: "/shipping" } }
export default function Page() { return <PolicyPage policy="shipping" /> }
