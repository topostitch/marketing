import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import styles from '../marketing-layout.module.css';

export const metadata: Metadata = {
  title: '3D Services for Ecommerce',
  description: 'Compare TopoStitch’s 3D product model optimization, model creation, workflow consulting, and agency integration support.',
  alternates: { canonical: '/services' },
};

const illustrations = {
  basic: { src: '/chair.webp', alt: 'Illustration of a chair shoppers could rotate to inspect the frame and upholstery' },
  ecommerce: { src: '/cup.webp', alt: 'Ceramic mug with a textured glaze, curved handle, and exposed clay foot' },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.salesIntro}>
        <h1>3D services for ecommerce</h1>
        <p>Get a model made, put an existing file to work, or get help bringing 3D into your team’s workflow.</p>
        <nav aria-label="Explore services" className={styles.salesNav}>
          <Link href="#done-for-you">Done for You</Link>
          <Link href="#done-with-you">Done with You</Link>
          <Link href="#compare" className={styles.button}>Compare offerings</Link>
        </nav>
      </header>

      {(['Done for You', 'Done with You'] as const).map(service => (
        <section className={styles.section} id={service === 'Done for You' ? 'done-for-you' : 'done-with-you'} key={service}>
          <div className={styles.sectionIntro}><h2>{service}</h2></div>
          <div className={styles.salesOffers}>
            {commerceOffers.filter(offer => offer.service === service).map(offer => {
              const illustration = offer.id === 'basic' || offer.id === 'ecommerce' ? illustrations[offer.id] : undefined;
              return (
                <article key={offer.id} id={offer.id} className={styles.salesOffer}>
                  <div className={styles.salesCopy}>
                    <p className={styles.salesLabel}>{offer.name}</p>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <p className={styles.price}>{offer.price}</p>
                    <Link className={styles.button} href={`/request?offer=${offer.id}`}>{offer.cta}</Link>
                  </div>
                  <div className={styles.salesExample}>
                    {illustration && <Image src={illustration.src} alt={illustration.alt} width={1254} height={1254}
                      sizes="(max-width: 650px) 90vw, 520px" className={styles.salesImage} />}
                    <div>
                      <h4>Example project</h4>
                      <p>{offer.example}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section id="compare" className={styles.section}>
        <div className={styles.sectionIntro}>
          <h2>Compare all offerings</h2>
          <p>See what each service includes and where pricing starts. Prices are in USD.</p>
        </div>
        <div className={`${styles.grid} ${styles.compareGrid}`}>
          {commerceOffers.map(offer => (
            <article key={offer.id} className={`${styles.card} ${styles.compareCard}`}>
              <p className={styles.salesLabel}>{offer.service}</p>
              <h3>{offer.name}</h3>
              <p className={styles.price}>{offer.price}</p>
              <p>{offer.summary}</p>
              <ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
              <Link className={styles.button} href={`/request?offer=${offer.id}`}>{offer.cta}</Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>Starting prices apply to eligible products and source material. Capture, shipping, complex modeling, variants, and storefront implementation are scoped separately.</p>
      </section>

      <section className={styles.section} id="purchase-process">
        <div className={styles.sectionIntro}><h2>How to get started</h2></div>
        <ol className={`${styles.grid} ${styles.stepList}`}>
          <li><h3>Choose a service</h3><p>Tell us what product, files, or workflow you want help with.</p></li>
          <li><h3>Review the scope</h3><p>We confirm fit and send the deliverables, timing, and final price for your approval.</p></li>
          <li><h3>Pay and kick off</h3><p>Once you approve the scope, we send a secure payment link or invoice and coordinate the inputs we need to start.</p></li>
        </ol>
      </section>

      <footer className={styles.footer}>
        <Link href="/">TopoStitch home</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="mailto:hello@topostitch.dev">Contact</a>
      </footer>
    </main>
  );
}
