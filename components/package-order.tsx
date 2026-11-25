'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatUSD, maximumQuantity, packageAmounts, parseQuantity } from '@/lib/package-quantity';
import styles from '@/app/marketing-layout.module.css';

export default function PackageOrder({ offer, initialQuantity, sandboxLink }: {
  offer: keyof typeof packageAmounts; initialQuantity: number; sandboxLink: string | null;
}) {
  const [value, setValue] = useState(String(initialQuantity));
  const quantity = parseQuantity(value);
  function update(next: string) {
    setValue(next);
    const url = new URL(window.location.href);
    url.searchParams.set('quantity', next);
    window.history.replaceState(null, '', url);
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
      <p className={styles.note}>Final scope and price are confirmed before payment. Capture, shipping, complex modeling, variants, and storefront implementation are quoted separately.</p>
      <Link className={styles.button} href={`/request?offer=${offer}&quantity=${quantity}`}>Request review for {quantity} {quantity === 1 ? 'product' : 'products'}</Link>
      {sandboxLink && <div className={styles.sandboxNotice}>
        <h2>Try Stripe sandbox</h2>
        <p>This single-product walkthrough uses a test card and creates no fulfillment order.</p>
        {quantity === 1 ? <>
          <p>Test card: 4242 4242 4242 4242 · any future expiry · any three-digit CVC.</p>
          <a className={styles.button} href={sandboxLink}>Continue to Stripe test checkout</a>
        </> : <p>Test checkout supports one product. Request a review for this quantity, or select one product to try the walkthrough.</p>}
      </div>}
    </>}
    <Link href="/checkout">Choose another package</Link>
  </div>;
}
