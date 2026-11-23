import type { Metadata } from "next";
import UpdatesForm from "@/components/updates-form";
import styles from "../commerce-validation.module.css";

export const metadata: Metadata = { title: "TopoStitch updates", description: "Get email updates about upcoming 3D product pilot openings, merchant workflows, and the TopoStitch platform launch.", alternates: { canonical: "/updates" } };

export default function UpdatesPage() {
  return <main id="main-content" className={styles.page}>
    <section className={styles.commerceSection}>
      <h1>Get TopoStitch updates</h1>
      <p>Hear when pilot spots open, see practical examples of how merchants can use product 3D, and get news about the TopoStitch platform launch.</p>
      <p>Updates are optional. You can unsubscribe by emailing <a href="mailto:hello@topostitch.dev">hello@topostitch.dev</a>.</p>
      <UpdatesForm />
    </section>
  </main>;
}
