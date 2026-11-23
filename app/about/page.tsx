import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/reveal";
import styles from "../commerce-validation.module.css";

export const metadata: Metadata = { title: "About TopoStitch", description: "Meet Jacob Galito and learn why TopoStitch helps ecommerce teams turn physical products and existing 3D files into assets they can publish and reuse.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.aboutHero}>
        <Reveal>
          <p className={styles.eyebrow}>Meet the founder</p>
          <h1>I’m Jacob Galito. I help teams put product 3D to work.</h1>
          <p className={styles.heroCopy}>If you have a product worth showing from every angle, or a 3D file nobody can get onto the storefront, I can help you decide what it takes to get it there.</p>
        </Reveal>
      </section>

      <section className={styles.commerceSection}>
        <Reveal>
          <h2>Having a 3D file is only the beginning.</h2>
          <p>You might have a CAD file from manufacturing or a model from a vendor. Then someone has to check the scale, materials, file size, and whether it works where shoppers will see it. Sometimes the first challenge is simply figuring out what to ask your team or agency to deliver.</p>
          <p>I came to this work through product design and augmented reality. Before TopoStitch, I co-founded Ario, where I helped build AR products and co-invented its patented platform. I started TopoStitch by exploring how to capture, process, and publish 3D. That led me to a more practical question: what does a team need to do with the asset once it exists?</p>
        </Reveal>
      </section>

      <section className={styles.pathsSection}>
        <div className={styles.sectionHeading}>
          <h2>Start with one product and a place to use it.</h2>
          <p>Tell me what shoppers need to understand, what files you have, and where the asset needs to work. I’ll help you choose a standard pilot, a custom project, or a consulting engagement to plan the work. We agree on the deliverables and price before you pay.</p>
        </div>
        <div className={styles.pathGrid}>
          <article className={styles.pathCard}>
            <h3>See how we’re building the workflow</h3>
            <Image src="/product/giant-roller-skate-object-record.webp" alt="TopoStitch prototype showing the 3D record of a giant roller skate" width={1600} height={1000} className="h-auto w-full" />
            <p>This prototype example shows a captured object alongside its published record. <Link href="/platform">Explore the prototype</Link>.</p>
          </article>
          <article className={styles.pathCard}>
            <h3>Who you’ll work with</h3>
            <p>I spent 12 years in the U.S. Navy and worked in visual storytelling before building digital products. TopoStitch is independent, veteran-owned, minority-owned, and LGBTQ+ owned. Startup Virginia’s Idea Factory helped me sharpen the business through customer discovery.</p>
            <p>You’ll work directly with me during the pilot, from the first review through handoff.</p>
          </article>
        </div>
      </section>

      <section className={styles.commerceSection}>
        <h2>Show me what you’re working with.</h2>
        <p>Share one product, listing, or existing 3D asset. I’ll review what you need and reply with the next step.</p>
        <Link href="/request" className={styles.primaryButton}>Request a product review</Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/">TopoStitch home</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="mailto:hello@topostitch.dev">Contact</a>
      </footer>
    </main>
  );
}
