import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = {
  title: "About TopoStitch",
  description: "TopoStitch helps commerce teams create, optimize, and publish reusable 3D product models.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Making product 3D usable</h1>
          <p>TopoStitch helps sellers, manufacturers, and the teams that support them create, improve, and publish 3D product models.</p>
        </div>
        <figure className={styles.figure}>
          <Image className={styles.aboutImage} src="/cup.webp"
            alt="Ceramic mug with a textured glaze and a visible handle" width={800} height={800}
            sizes="(max-width: 850px) 100vw, 650px" />
        </figure>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>Two ways to work with us</h2>
          <p>A model has to work where people will see it. TopoStitch brings capture, asset preparation, and handoff into one scoped project so teams know what they’re getting and how to use it.</p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}><h3>Done for You</h3><p>We create or optimize your model and deliver files for one agreed destination. Start with a physical product, suitable imagery, CAD, or an existing model.</p><Link href="/services#compare">Compare packages</Link></article>
          <article className={styles.card}><h3>Done with You</h3><p>We work with your team on capture planning, asset review, storefront requirements, and handoff. You get a clear plan for the work you want to handle in-house.</p><Link href="/request?offer=custom">Discuss your workflow</Link></article>
        </div>
      </section>
      <section className={`${styles.section} ${styles.action}`}>
        <h2>Work with TopoStitch</h2>
        <p>Start with a one-product pilot or discuss a custom project for your agency, catalog, or team.</p>
        <Link className={styles.button} href="/request">Request a product review</Link>
      </section>
      <footer className={styles.footer}>
        <Link href="/">TopoStitch home</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="mailto:hello@topostitch.dev">Contact</a>
      </footer>
    </main>
  );
}
