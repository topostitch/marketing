import type { Metadata } from "next";
import Link from "next/link";
import { parseQuantity } from "@/lib/package-quantity";
import MvpLeadForm from "@/components/mvp-lead-form";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = { title: "Request a project review", robots: { index: false, follow: true } };

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ platform?: string; offer?: string; quantity?: string }> }) {
  const { platform, offer, quantity } = await searchParams;
  return (
    <main id="main-content" className={`${styles.page} ${styles.requestPage}`}>
      <div className={styles.requestLayout}>
        <header className={styles.requestIntro}>
          <h1>Tell us about your project</h1>
          <p>We’ll review your request and email you with the scope and price.</p>
          <Link href="/compare">Compare services</Link>
        </header>
        <MvpLeadForm key={`${offer ?? ""}:${platform ?? ""}`} defaultOffer={offer} defaultQuantity={parseQuantity(quantity) ?? undefined}
          defaultPlatform={platform === "Amazon" || platform === "Shopify" ? platform : ""} />
      </div>
    </main>
  );
}
