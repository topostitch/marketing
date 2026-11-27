'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatUSD, maximumQuantity, packageAmounts, parseQuantity } from '@/lib/package-quantity';
import styles from '@/app/marketing-layout.module.css';

export default function PackageOrder({ offer, initialQuantity, checkoutReady }: {
  offer: keyof typeof packageAmounts; initialQuantity: number; checkoutReady: boolean;
}) {
  const [value, setValue] = useState(String(initialQuantity));
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [checkoutError, setCheckoutError] = useState('');
  const quantity = parseQuantity(value);
  function update(next: string) {
    setValue(next);
    const url = new URL(window.location.href);
    url.searchParams.set('quantity', next);
    window.history.replaceState(null, '', url);
  }
  async function beginCheckout() {
    if (!quantity || checkoutState === 'loading') return;
    setCheckoutState('loading');
    setCheckoutError('');
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer, quantity }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.url !== 'string') throw new Error(result.error || 'Secure checkout could not start.');
      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Secure checkout could not start.');
      setCheckoutState('error');
    }
  }
  return <div className={styles.order}>
    <p><strong>From {formatUSD(packageAmounts[offer])} per product</strong></p>
    <label htmlFor="quantity">Number of products</label>
    <div className={styles.quantity}>
      <button type="button" aria-label="Decrease quantity" disabled={quantity === null || quantity <= 1}
        onClick={() => update(String((quantity ?? 1) - 1))}>−</button>
      <input id="quantity" type="number" inputMode="numeric" min={1} max={maximumQuantity} step={1}
        value={value} aria-invalid={quantity === null} aria-describedby="quantity-help"
        onChange={event => update(event.target.value)} />
      <button type="button" aria-label="Increase quantity" disabled={quantity === null || quantity >= maximumQuantity}
        onClick={() => update(String((quantity ?? 1) + 1))}>+</button>
    </div>
    <p id="quantity-help" className={styles.note}>Choose 1–99 products. Larger catalogs need a custom quote.</p>
    {quantity === null ? <p role="alert">Enter a whole number from 1 to 99.</p> : <>
      <p className={styles.orderTotal} aria-live="polite">Estimated starting total: {formatUSD(packageAmounts[offer] * quantity)} USD</p>
      <p className={styles.note}>Starting price is per product. We’ll collect your project details after checkout. Capture, shipping, complex modeling, variants, and storefront implementation are quoted separately.</p>
      {checkoutReady ? <button className={styles.button} type="button" onClick={beginCheckout} disabled={checkoutState === 'loading'} aria-busy={checkoutState === 'loading'}>
        {checkoutState === 'loading' ? 'Opening secure checkout…' : `Continue to secure checkout · ${formatUSD(packageAmounts[offer] * quantity)}`}
      </button> : <p className={styles.sandboxNotice} role="status">Secure sandbox checkout is not configured for this preview yet. You can still <Link href={`/request?offer=${offer}&quantity=${quantity}`}>request this package</Link>.</p>}
      {checkoutState === 'error' && <p role="alert">{checkoutError}</p>}
      <Link href={`/request?offer=${offer}&quantity=${quantity}`}>Ask a question before buying</Link>
    </>}
    <Link href="/checkout">Choose another package</Link>
  </div>;
}
