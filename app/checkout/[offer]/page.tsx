import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PackageOrder from '@/components/package-order';
import { commerceOffers } from '@/lib/commerce-offers';
import { directCheckoutAvailable, paymentOffers, type PaymentOffer } from '@/lib/payments';
import { parseQuantity } from '@/lib/package-quantity';
import styles from '../../marketing-layout.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Review your package', robots: { index: false, follow: false } };

export default async function CheckoutPage({ params, searchParams }: {
  params: Promise<{ offer: string }>; searchParams: Promise<{ quantity?: string }>;
}) {
  const [{ offer }, query] = await Promise.all([params, searchParams]);
  if (!Object.hasOwn(paymentOffers, offer)) notFound();
  const selected = offer as PaymentOffer;
  const details = commerceOffers.find(item => item.id === selected)!;
  return <main id="main-content" className={styles.page}>
    <div className={styles.editorial}>
      <header className={styles.editorialHeader}>
        <Link href="/checkout">Back to packages</Link>
        <h1>{details.name}</h1><p>{details.summary}</p>
      </header>
      <div className={styles.card}>
        <h2>Included in your package</h2>
        <ul>{details.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
        <PackageOrder offer={selected} initialQuantity={parseQuantity(query.quantity) ?? 1} checkoutReady={directCheckoutAvailable()} />
      </div>
    </div>
  </main>;
}
