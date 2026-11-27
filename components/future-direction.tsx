import Link from "next/link";
import s from "@/app/marketing-layout.module.css";
export default function FutureDirection() {
  return (
    <section className={s.section}>
      <div className={s.action}>
        <p>OUR DIRECTION</p>
        <h2>Build once. Process at scale.</h2>
        <p>
          We’re developing local-first tools and repeatable workflows to
          simplify 3D production for developers, studios and organizations.
        </p>
        <p>
          Supported production services are our immediate offering. Our
          long-term ambition is automation infrastructure for 3D production.
          Future software is not available to purchase.
        </p>
        <Link className={s.button} href="/developers">
          Follow the developer roadmap
        </Link>
      </div>
    </section>
  );
}
