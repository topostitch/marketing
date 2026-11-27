import Breadcrumbs from "@/components/breadcrumbs";
import JsonLd from "@/components/json-ld";
import { canonical, organizationId, websiteId, founderId } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import FutureDirection from "@/components/future-direction";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../marketing-layout.module.css";

export const metadata: Metadata = pageMetadata({
  title: "About TopoStitch & Founder Jacob Galito",
  description:
    "Meet Jacob Galito, the founder of TopoStitch, an independent, disabled veteran-, minority-, Asian American- and LGBTQ+-owned 3D production company.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              "@id": canonical("/about#page"),
              url: canonical("/about"),
              name: "About TopoStitch and founder Jacob Galito",
              isPartOf: { "@id": websiteId },
              about: [{ "@id": organizationId }, { "@id": founderId }],
            },
            {
              "@type": "Person",
              "@id": founderId,
              name: "Jacob Galito",
              url: canonical("/about"),
              jobTitle: "Founder",
              worksFor: { "@id": organizationId },
              description:
                "Founder of TopoStitch, U.S. Navy veteran, former Ario co-founder and Creative Director, with a background in product design and immersive technology.",
            },
          ],
        }}
      />
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.salesLabel}>ABOUT TOPOSTITCH</p>
          <h1>Built for people who make real things.</h1>
          <p>
            TopoStitch helps sellers, manufacturers, and the teams that support
            them create, improve, and publish 3D product models.
          </p>
        </div>
        <figure className={styles.figure}>
          <Image
            className={styles.aboutImage}
            src="/cup.webp"
            alt="Ceramic mug with a textured glaze and a visible handle"
            width={800}
            height={800}
            sizes="(max-width: 850px) 100vw, 650px"
          />
        </figure>
      </section>
      <section className={styles.section} aria-labelledby="why-topostitch">
        <div className={styles.sectionIntro}>
          <p className={styles.salesLabel}>WHY WE EXIST</p>
          <h2 id="why-topostitch">
            A product’s digital life shouldn’t start over with every project.
          </h2>
          <p>
            A physical product can become a storefront model, an augmented
            reality experience or part of an interactive story. But getting
            there often means rebuilding the same work: finding source files,
            checking dimensions, preparing materials and figuring out what the
            next platform needs.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}>
            <h3>The model is a starting point</h3>
            <p>
              TopoStitch brings capture, reconstruction, preparation and handoff
              into a defined production workflow. The aim is to make an asset
              useful beyond the project that created it, with the context a team
              needs to understand and reuse it.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Start with the work people need done</h3>
            <p>
              Today, that means supported 3D production for merchants,
              manufacturers, agencies and developers. Working with real products
              helps us understand what should become repeatable—and what still
              needs an experienced person’s judgment.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="founder-story">
        <div className={styles.sectionIntro}>
          <p className={styles.salesLabel}>JACOB GALITO · FOUNDER</p>
          <h2 id="founder-story">Designer. Builder. Founder.</h2>
          <p>
            TopoStitch grows out of nearly two decades of Jacob’s work across
            product design, 3D, augmented and virtual reality, spatial computing
            and immersive technology.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}>
            <h3>From visual storytelling to spatial products</h3>
            <p>
              Jacob spent 12 years in the U.S. Navy and worked in visual
              storytelling before building digital products. Before TopoStitch,
              he co-founded Ario, served as its Creative Director and was a
              co-inventor on its patented platform.
            </p>
            <p>
              That work spanned enterprise, industrial, government, training and
              cultural settings—different environments with a recurring need to
              make information useful in the context of the physical world.
            </p>
          </article>
          <article className={styles.card}>
            <h3>The problem that kept coming back</h3>
            <p>
              Capture and presentation tools improved, but the knowledge around
              an object could still become fragmented. Models, source imagery,
              measurements, annotations and project decisions ended up separated
              across teams and platforms.
            </p>
            <p>
              TopoStitch began with a question: how can each new project build
              on what came before? That question connects our production
              services today with our longer-term ambition to build automation
              infrastructure for 3D production.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="prior-experience">
        <div className={styles.sectionIntro}>
          <p className={styles.salesLabel}>SELECTED PRIOR EXPERIENCE</p>
          <h2 id="prior-experience">
            Experience connecting objects, places and stories.
          </h2>
          <p>
            These projects are part of Jacob’s professional history before
            TopoStitch. They are not a TopoStitch customer list or an
            endorsement of this company.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}>
            <h3>Old Dominion University’s Barry Art Museum</h3>
            <p>
              Created an augmented reality experience supporting digital
              engagement with the museum during the mask-mandate period.
            </p>
          </article>
          <article className={styles.card}>
            <h3>White House Historical Association</h3>
            <p>
              Created two augmented reality experiences connecting historical
              interpretation with spatial digital experiences.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ownership">
        <div className={styles.sectionIntro}>
          <p className={styles.salesLabel}>WHO WE ARE</p>
          <h2 id="ownership">
            Independent. Founder-led. Rooted in lived experience.
          </h2>
          <p>
            Based in Richmond, Virginia, TopoStitch is a disabled veteran-owned,
            minority-owned, Asian American-owned and LGBTQ+-owned business.
          </p>
        </div>
        <div className={`${styles.grid} ${styles.two}`}>
          <article className={styles.card}>
            <h3>Disabled veteran-owned</h3>
            <p>
              Founded and led by Jacob Galito, a disabled U.S. Navy veteran
              whose background spans service, design, visual storytelling and
              technology.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Minority-owned</h3>
            <p>
              An independent, minority-owned company bringing a
              multidisciplinary perspective to product development and
              entrepreneurship.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Asian American-owned</h3>
            <p>
              Jacob is Filipino American. That heritage is part of the founder’s
              story and the identity of the company he is building.
            </p>
          </article>
          <article className={styles.card}>
            <h3>LGBTQ+-owned</h3>
            <p>
              TopoStitch is LGBTQ+-owned and founder-led, with a commitment to
              building a company that reflects a broader range of people,
              perspectives and creative communities.
            </p>
          </article>
        </div>
        <p className={styles.note}>
          TopoStitch participated in Startup Virginia’s Idea Factory, helping
          sharpen the business through customer discovery, positioning and
          early-stage validation.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="working-together">
        <div className={styles.sectionIntro}>
          <h2 id="working-together">
            A clear scope. A useful handoff. A person you can talk to.
          </h2>
          <p>
            You’ll work directly with the founder during the pilot. We start
            with what you have, what you need to show and where the asset needs
            to work.
          </p>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Choose the right starting point</h3>
            <p>
              Send an eligible physical product for capture, or discuss
              customer-provided imagery, an existing asset or a specialized
              production need.
            </p>
            <Link href="/services">Explore services</Link>
          </article>
          <article className={styles.card}>
            <h3>Understand the requirements</h3>
            <p>
              Review suitability, preparation, deliverables and fulfillment
              terms before ordering. Uncertain products get an assessment, not a
              promise we cannot support.
            </p>
            <Link href="/learn/product-suitability">
              Check product suitability
            </Link>
          </article>
          <article className={styles.card}>
            <h3>Build with your team</h3>
            <p>
              Agencies and developers can discuss production support, asset
              standards and integration as part of a scoped project.
            </p>
            <Link href="/partnerships">Partner with us</Link>
          </article>
        </div>
      </section>
      <FutureDirection />
      <section className={`${styles.section} ${styles.action}`}>
        <h2>Show us what you’re working on.</h2>
        <p>
          Bring a product, an existing asset or a workflow question. We’ll help
          you identify the next step.
        </p>
        <Link className={styles.button} href="/request">
          Talk about your project
        </Link>
        <Link href="/compare">Compare services and pricing</Link>
      </section>
    </main>
  );
}
