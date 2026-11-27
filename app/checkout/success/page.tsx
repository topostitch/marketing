import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../../marketing-layout.module.css';

export const metadata: Metadata = {
  title: 'Checkout submitted',
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return <main id="main-content" className={styles.page}>
    <article className={styles.editorial}>
      <header className={styles.editorialHeader}>
        <p className={styles.salesLabel}>Secure checkout</p>
        <h1>Thanks. We’re confirming your payment.</h1>
        <p>TopoStitch will reconcile the payment and use the email you entered at checkout to follow up with project intake details.</p>
      </header>
      <p><Link href="/services">Review TopoStitch services</Link></p>
    </article>
  </main>;
}
