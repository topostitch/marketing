"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { capturePostHogEvent as track } from "@/lib/posthog-events";
import { readCart, writeCart } from "./pilot-order";
import {
  deliverables,
  pilotPolicy,
  validateCart,
  type CartItem,
} from "@/lib/fulfillment-policy";
import s from "@/app/marketing-layout.module.css";
export default function PilotCart() {
  const [items, setItems] = useState<CartItem[]>([]),
    [loaded, setLoaded] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const attempt = useRef<string | null>(null);
  useEffect(() => {
    setItems(readCart());
    setLoaded(true);
  }, []);
  function save(next: CartItem[]) {
    try {
      writeCart(next);
      setItems(next);
      setError("");
      attempt.current = null;
    } catch {
      setError("Your browser could not save the cart.");
    }
  }
  let total = 0,
    valid = true;
  try {
    total = validateCart(items).total;
  } catch {
    valid = false;
  }
  async function checkout() {
    track("checkout_started", {
      quantity: items.reduce((sum, i) => sum + i.quantity, 0),
    });
    setBusy(true);
    setError("");
    attempt.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, attempt: attempt.current }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.error || "Checkout is unavailable.");
      const url = new URL(body.url);
      if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com")
        throw new Error("Unexpected checkout destination.");
      window.location.assign(url.href);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout could not start.");
      setBusy(false);
    }
  }
  if (!loaded) return <p role="status">Loading your cart…</p>;
  if (!items.length)
    return (
      <div className={s.action}>
        <h2>Your cart is empty</h2>
        <p>Choose a capture method and deliverable to get started.</p>
        <Link className={s.button} href="/order">
          Choose a product
        </Link>
      </div>
    );
  return (
    <div className={s.form}>
      <p>
        Up to {pilotPolicy.maxProducts} products per order. Shipping is paid
        separately by you.
      </p>
      {items.map((item, index) => (
        <article className={s.card} key={item.id || index}>
          <h2>
            {Object.hasOwn(deliverables, item.deliverable)
              ? deliverables[item.deliverable].name
              : "Unknown deliverable"}
          </h2>
          <p>
            {item.capture === "ship"
              ? "Send us your product"
              : "Provide your captures"}{" "}
            · Product {index + 1}
          </p>
          <label>
            Quantity for product {index + 1}
            <input
              type="number"
              min="1"
              max={pilotPolicy.maxProducts}
              value={item.quantity}
              onChange={(e) =>
                save(
                  items.map((i, n) =>
                    n === index
                      ? { ...i, quantity: Number(e.target.value) }
                      : i,
                  ),
                )
              }
            />
          </label>
          <button
            className={s.button}
            type="button"
            onClick={() => save(items.filter((_, n) => n !== index))}
          >
            Remove product {index + 1}
          </button>
        </article>
      ))}
      {!valid && (
        <p role="alert">
          Review your item eligibility and quantities. The total cannot exceed
          five products. Remove an invalid item and qualify it again.
        </p>
      )}
      <p>
        <strong>Service total: ${(total / 100).toFixed(2)} USD</strong>
      </p>
      <Link href="/order">Add another product</Link>
      <button
        className={s.button}
        type="button"
        disabled={!valid || busy}
        onClick={checkout}
      >
        {busy ? "Opening checkout…" : "Continue to Stripe sandbox checkout"}
      </button>
      <p>
        No real payment or shipment. Payment is verified server-side before
        detailed intake becomes available.
      </p>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
