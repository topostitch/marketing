import type { Metadata } from "next";
import UpdatesForm from "@/components/updates-form";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = { title: "TopoStitch updates", description: "Get email updates about TopoStitch services, pilot openings, and product 3D examples.", alternates: { canonical: "/updates" } };

export default function UpdatesPage() {
  return <main id="main-content" className={styles.page}>
    <section className={styles.editorial}>
      <header className={styles.editorialHeader}>
        <h1>Get TopoStitch updates</h1>
      <p>Hear when pilot spots open and get practical examples of product 3D for ecommerce.</p>
      <p>Unsubscribe by emailing <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>.</p>
      </header>
      <UpdatesForm />
    </section>
  </main>;
}
