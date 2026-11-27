"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { capturePostHogEvent as track } from "@/lib/posthog-events";
import { useRouter } from "next/navigation";
import {
  pilotPolicy as p,
  deliverables,
  qualify,
  validateCart,
  type CartItem,
  type Deliverable,
} from "@/lib/fulfillment-policy";
import s from "@/app/marketing-layout.module.css";
const key = "topostitch-pilot-cart-v1";
export function readCart(): CartItem[] {
  try {
    const v = JSON.parse(sessionStorage.getItem(key) || "[]");
    return Array.isArray(v)
      ? v.filter(
          (i) =>
            i &&
            typeof i === "object" &&
            typeof i.id === "string" &&
            typeof i.deliverable === "string" &&
            typeof i.quantity === "number",
        )
      : [];
  } catch {
    return [];
  }
}
export function writeCart(items: CartItem[]) {
  sessionStorage.setItem(key, JSON.stringify(items));
}
export default function PilotOrder({
  initialCapture,
  initialDeliverable,
}: {
  initialCapture: "ship" | "captures";
  initialDeliverable: Deliverable;
}) {
  const [capture, setCapture] = useState(initialCapture),
    [offer, setOffer] = useState(initialDeliverable),
    [message, setMessage] = useState("");
  const router = useRouter();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item: CartItem = {
      id: crypto.randomUUID(),
      capture,
      deliverable: offer,
      quantity: Number(f.get("quantity")),
      surface: f.get("surface") as CartItem["surface"],
      dimensions: ["length", "width", "height"].map((k) => Number(f.get(k))),
      weight: Number(f.get("weight")),
      value: Number(f.get("value")),
      contiguousUS: f.get("region") === "yes",
      safe: f.get("safe") === "on",
      acknowledged: f.get("acknowledge") === "on",
      policyVersion: p.version,
    };
    const result = qualify(item);
    track("object_suitability_outcome", {
      outcome: result.eligible ? "eligible" : "assessment",
      capture,
    });
    if (!result.eligible) {
      setMessage(result.reason);
      return;
    }
    try {
      const cart = validateCart([...readCart(), item]);
      writeCart(cart.items);
      track("cart_item_added", {
        capture,
        deliverable: offer,
        quantity: item.quantity,
      });
      router.push("/cart");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not save the cart. Enable browser storage and retry.",
      );
    }
  }
  return (
    <form className={s.form} onSubmit={submit}>
      <label>
        Capture method
        <select
          value={capture}
          onChange={(e) => {
            setCapture(e.target.value as "ship" | "captures");
            setMessage("");
            track("capture_method_selected", { capture: e.target.value });
          }}
        >
          <option value="ship">Send us your product</option>
          <option value="captures">Provide your captures</option>
        </select>
      </label>
      <label>
        Desired deliverable
        <select
          value={offer}
          onChange={(e) => {
            setOffer(e.target.value as Deliverable);
            track("package_selected", { deliverable: e.target.value });
          }}
        >
          {Object.entries(deliverables).map(([id, d]) => (
            <option key={id} value={id}>
              {d.name} — starting ${d.cents / 100}
            </option>
          ))}
        </select>
      </label>
      <p>{deliverables[offer].description}</p>
      {capture === "captures" ? (
        <div className={s.action}>
          <h2>Let’s assess your capture plan</h2>
          <p>
            Paid customer-capture fulfillment is disabled until validation,
            fulfillment and pricing are verified. No upload or payment is
            required to inquire.
          </p>
          <Link
            className={s.button}
            href="/request?offer=custom&platform=customer-captures"
          >
            Discuss your captures
          </Link>
          <Link href="/updates?interest=captures">
            Get customer-capture updates
          </Link>
          <Link href="/learn/submission-checklist">
            Read the submission checklist
          </Link>
        </div>
      ) : (
        <>
          <h2>Confirm product eligibility</h2>
          <p>
            For identical products, use one line and adjust quantity. Add
            different products separately so each has its own eligibility
            confirmation.
          </p>
          <label>
            Surface and geometry
            <select name="surface" required>
              <option value="">Choose the closest description</option>
              <option value="good">
                Matte/textured, distinctive and rigid
              </option>
              <option value="challenging">
                Smooth, repetitive, recessed or intricate
              </option>
              <option value="specialized">
                Reflective, transparent, deformable or extremely thin
              </option>
              <option value="uncertain">I’m unsure</option>
            </select>
          </label>
          <fieldset className={s.grid}>
            <legend>Product dimensions in inches</legend>
            {["length", "width", "height"].map((n) => (
              <label key={n}>
                {n[0].toUpperCase() + n.slice(1)}
                <input name={n} type="number" min="0.01" step="0.01" required />
              </label>
            ))}
          </fieldset>
          <div className={`${s.grid} ${s.two}`}>
            <label>
              Weight (lbs)
              <input
                name="weight"
                type="number"
                min="0.01"
                step="0.01"
                required
              />
            </label>
            <label>
              Declared replacement value (USD)
              <input name="value" type="number" min="0" step="0.01" required />
            </label>
          </div>
          <label>
            Service location
            <select name="region" required>
              <option value="">Choose location</option>
              <option value="yes">Contiguous United States</option>
              <option value="no">Elsewhere — request a quotation</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              defaultValue="1"
              step="1"
              required
            />
          </label>
          <label className={s.consent}>
            <input name="safe" type="checkbox" required />
            <span>
              The product is not hazardous, perishable, illegal, irreplaceable
              or unsafe.
            </span>
          </label>
          <label className={s.consent}>
            <input name="acknowledge" type="checkbox" required />
            <span>
              I have read the{" "}
              <Link href="/learn/product-suitability">suitability</Link>,{" "}
              <Link href="/learn/product-preparation">preparation</Link> and{" "}
              <a href="#terms">pilot fulfillment terms</a>, including shipping
              costs, value limits, recapture and refunds. This does not waive
              TopoStitch’s responsibilities.
            </span>
          </label>
          <button className={s.button} type="submit">
            Add eligible product to cart
          </button>
        </>
      )}
      {message && (
        <div role="alert">
          <p>{message}</p>
          <Link href="/request?offer=custom">
            Request a specialized quotation
          </Link>
        </div>
      )}
    </form>
  );
}
