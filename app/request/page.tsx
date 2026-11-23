import type { Metadata } from "next";
import Link from "next/link";
import MvpLeadForm from "@/components/mvp-lead-form";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = { title: "Request a product review", robots: { index: false, follow: true } };

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ platform?: string; offer?: string }> }) {
  const { platform, offer } = await searchParams;
  return <main id="main-content" className={styles.page}>
    <div className={styles.editorial}>
      <header className={styles.editorialHeader}>
        <h1>Request a product review</h1>
        <p>Tell us what you’re working with. We’ll confirm the scope and price before sending a payment link or invoice.</p>
      </header>
      <MvpLeadForm defaultOffer={offer} defaultPlatform={platform === "Amazon" || platform === "Shopify" ? platform : ""} />
      <p className={styles.requestCompare}><Link href="/services#compare">Compare all offerings</Link></p>
    </div>
  </main>;
}
