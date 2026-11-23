import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { commerceOffers } from '@/lib/commerce-offers';
import { paymentLink, paymentOffers } from '@/lib/payments';
import styles from '../marketing-layout.module.css';

export const metadata: Metadata = {
  title: '3D Services for Ecommerce',
  description: 'Compare TopoStitch’s 3D product model optimization, model creation, workflow consulting, and agency integration support.',
  alternates: { canonical: '/services' },
};

export const dynamic = 'force-dynamic';

const illustrations = {
  basic: { src: '/chair.webp', alt: 'Illustration of a chair shoppers could rotate to inspect the frame and upholstery' },
  ecommerce: { src: '/cup.webp', alt: 'Ceramic mug with a textured glaze, curved handle, and exposed clay foot' },
};

export default function ServicesPage() {
  const offerings = commerceOffers.map(offer => {
    const standard = offer.id === 'basic' || offer.id === 'ecommerce';
    if (standard && paymentLink(offer.id)) {
      return { ...offer, href: `/checkout/${offer.id}`, cta: `Buy ${offer.name}`, price: `${paymentOffers[offer.id].price} per product`, direct: true };
    }
    return { ...offer, href: `/request?offer=${offer.id}`, direct: false };
  });
  const hasDirectCheckout = offerings.some(offer => offer.direct);

  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.salesIntro}>
        <h1>3D services for ecommerce</h1>
        <p>Get a model made, put an existing file to work, or get help bringing 3D into your team’s workflow.</p>
        <nav aria-label="Explore services" className={styles.salesNav}>
          <a href="#done-for-you">Get a model made or optimized</a>
          <a href="#done-with-you">Get help with your workflow</a>
          <a href="#compare" className={styles.button}>Compare offerings</a>
        </nav>
      </header>

      {(['Model creation and optimization', '3D consulting and integration'] as const).map(service => (
        <section className={styles.section} id={service === 'Model creation and optimization' ? 'done-for-you' : 'done-with-you'} key={service}>
          <div className={styles.sectionIntro}><h2>{service}</h2></div>
          <div className={styles.salesOffers}>
            {offerings.filter(offer => offer.service === service).map(offer => {
              const illustration = offer.id === 'basic' || offer.id === 'ecommerce' ? illustrations[offer.id] : undefined;
              return (
                <article key={offer.id} id={offer.id} className={styles.salesOffer}>
                  <div className={styles.salesCopy}>
                    <p className={styles.salesLabel}>{offer.name}</p>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <p className={styles.price}>{offer.price}</p>
                    <Link className={styles.button} href={offer.href}>{offer.cta}</Link>
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
          <p>Compare prices and what’s included. Prices are in USD.</p>
        </div>
        <div className={`${styles.grid} ${styles.compareGrid}`}>
          {offerings.map(offer => (
            <article key={offer.id} className={`${styles.card} ${styles.compareCard}`}>
              <p className={styles.salesLabel}>{offer.service}</p>
              <h3>{offer.name}</h3>
              <p className={styles.price}>{offer.price}</p>
              <p>{offer.summary}</p>
              <ul>{offer.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
              <Link className={styles.button} href={offer.href}>{offer.cta}</Link>
            </article>
          ))}
        </div>
        <p className={styles.note}>Capture, shipping, complex modeling, variants, and storefront implementation are quoted separately.</p>
      </section>

      <section className={styles.section} id="purchase-process">
        <div className={styles.sectionIntro}><h2>How to get started</h2></div>
        <ol className={`${styles.grid} ${styles.stepList}`}>
          <li><h3>Choose a service</h3><p>{hasDirectCheckout ? 'Buy an available standard package or request a quote for custom work.' : 'Tell us what product, files, or workflow you want help with.'}</p></li>
          <li><h3>{hasDirectCheckout ? 'Pay or approve a quote' : 'Review the scope'}</h3><p>{hasDirectCheckout ? 'Standard packages use Stripe checkout. Custom work starts with a quote for you to approve.' : 'We confirm fit and send the deliverables, timing, and final price for your approval.'}</p></li>
          <li><h3>{hasDirectCheckout ? 'Share your project details' : 'Pay and kick off'}</h3><p>{hasDirectCheckout ? 'After payment, we’ll ask for the files and details needed to start.' : 'Once you approve the scope, we send a secure payment link or invoice and coordinate the inputs we need to start.'}</p></li>
        </ol>
      </section>

    </main>
  );
}
