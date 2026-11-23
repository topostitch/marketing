import type { Metadata } from "next";
import MvpLeadForm from "@/components/mvp-lead-form";
import styles from "../commerce-validation.module.css";

export const metadata: Metadata = { title: "Request a product pilot", robots: { index: false, follow: true } };

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ platform?: string }> }) {
  const { platform } = await searchParams;
  return <main id="main-content" className={styles.page}>
    <section className={styles.commerceSection}>
      <h1>Request a product pilot</h1>
      <p>Start with one product. We’ll review the request and confirm the scope and price before sending a payment link.</p>
      <MvpLeadForm defaultPlatform={platform === "Amazon" || platform === "Shopify" ? platform : ""} />
    </section>
  </main>;
}
