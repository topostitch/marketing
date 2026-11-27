// Founder-provided provisional pilot policy, 2026-11-27. Production is not authorized.
export const pilotPolicy = {
  version: "pilot-2026-11-27",
  productionApproved: false,
  customerCapturePaid: false,
  maxDimensionIn: 12,
  maxWeightLb: 10,
  maxValueUsd: 250,
  maxProducts: 5,
  area: "Contiguous United States",
  turnaround: { basic: "5–10 business days", ecommerce: "7–14 business days" },
  shipping:
    "Customers pay inbound and return shipping. Use protective packaging and tracked shipping, with return insurance appropriate to the declared replacement value. Shipping transit time is excluded from turnaround.",
  timing:
    "Turnaround starts after product receipt or acceptance of a complete capture dataset. Specialized projects receive individual estimates.",
  quality:
    "TopoStitch corrects its own capture and processing errors at no additional charge. Unsuitable customer captures receive corrective guidance and one complimentary resubmission assessment. Additional work requires an approved quotation; we never charge automatically.",
  refunds:
    "Cancel before production begins for a full service-fee refund. If TopoStitch cannot fulfill the agreed deliverable, the service fee is fully refunded. Later customer-requested cancellations are assessed against completed work and the disclosed scope. If captures are unsuitable and processing has not begun, we offer guidance, an alternative service or a refund.",
  costs:
    "Service-fee refunds do not automatically include carrier charges already incurred. Any other nonrecoverable cost must be disclosed and approved before it is incurred. Shipping-cost treatment when TopoStitch is at fault and insurance coverage require final founder approval before production launch.",
  exclusions:
    "Hazardous, perishable, illegal, irreplaceable or otherwise unsafe items are excluded from standard fulfillment.",
} as const;
export const deliverables = {
  basic: {
    name: "Basic digitization",
    cents: 14900,
    description:
      "Physical product capture, reconstruction and a checked digital model. Storefront optimization and integration are not included.",
  },
  ecommerce: {
    name: "E-commerce Ready",
    cents: 29900,
    description:
      "Physical product capture, reconstruction, optimization and files prepared for one agreed ecommerce destination. Platform acceptance is not guaranteed.",
  },
} as const;
export type Deliverable = keyof typeof deliverables;
export type CartItem = {
  id: string;
  capture: "ship" | "captures";
  deliverable: Deliverable;
  quantity: number;
  surface: "good" | "challenging" | "specialized" | "uncertain";
  dimensions: number[];
  weight: number;
  value: number;
  contiguousUS: boolean;
  safe: boolean;
  acknowledged: boolean;
  policyVersion: string;
};
export function qualify(input: unknown): { eligible: boolean; reason: string } {
  if (!input || typeof input !== "object")
    return { eligible: false, reason: "Confirm the product requirements." };
  const i = input as CartItem;
  if (i.capture === "captures")
    return {
      eligible: false,
      reason:
        "Customer-provided captures are inquiry-only while fulfillment, validation and pricing are verified.",
    };
  if (i.capture !== "ship" || !Object.hasOwn(deliverables, i.deliverable))
    return {
      eligible: false,
      reason: "Select a capture method and deliverable.",
    };
  if (
    !Number.isInteger(i.quantity) ||
    i.quantity < 1 ||
    i.quantity > pilotPolicy.maxProducts
  )
    return {
      eligible: false,
      reason: `Standard orders support 1–${pilotPolicy.maxProducts} products. Request a quotation for larger orders.`,
    };
  if (i.surface !== "good")
    return {
      eligible: false,
      reason:
        "Challenging, specialized or uncertain products need an assessment before purchase.",
    };
  if (i.safe !== true)
    return { eligible: false, reason: pilotPolicy.exclusions };
  if (i.contiguousUS !== true)
    return {
      eligible: false,
      reason:
        "The standard pilot serves the contiguous United States. Ask about your location.",
    };
  if (
    !Array.isArray(i.dimensions) ||
    i.dimensions.length !== 3 ||
    i.dimensions.some((n) => !Number.isFinite(n) || n <= 0) ||
    !Number.isFinite(i.weight) ||
    i.weight <= 0 ||
    !Number.isFinite(i.value) ||
    i.value < 0
  )
    return {
      eligible: false,
      reason: "Enter valid dimensions, weight and replacement value.",
    };
  if (
    i.dimensions.some((n) => n > pilotPolicy.maxDimensionIn) ||
    i.weight > pilotPolicy.maxWeightLb ||
    i.value > pilotPolicy.maxValueUsd
  )
    return {
      eligible: false,
      reason:
        "This product exceeds a standard pilot limit. Request a custom quotation.",
    };
  if (i.acknowledged !== true || i.policyVersion !== pilotPolicy.version)
    return {
      eligible: false,
      reason:
        "Review and acknowledge the current suitability, preparation and fulfillment requirements.",
    };
  return {
    eligible: true,
    reason: "Eligible for the standard physical-product sandbox pilot.",
  };
}
export function validateCart(input: unknown) {
  if (
    !Array.isArray(input) ||
    !input.length ||
    input.length > pilotPolicy.maxProducts
  )
    throw new Error("Your cart must contain 1–5 products.");
  const items = input as CartItem[];
  let count = 0,
    total = 0;
  const ids = new Set<string>();
  for (const item of items) {
    const result = qualify(item);
    if (!result.eligible) throw new Error(result.reason);
    if (
      typeof item.id !== "string" ||
      !/^[a-zA-Z0-9-]{1,80}$/.test(item.id) ||
      ids.has(item.id)
    )
      throw new Error("Invalid or duplicate cart item.");
    ids.add(item.id);
    count += item.quantity;
    total += deliverables[item.deliverable].cents * item.quantity;
  }
  if (count > pilotPolicy.maxProducts)
    throw new Error(
      "The standard pilot supports at most five products per order. Request a quotation for more.",
    );
  // Explicit projection: never persist arbitrary submitted properties or client prices.
  return {
    items: items.map((i) => ({
      id: i.id,
      capture: i.capture,
      deliverable: i.deliverable,
      quantity: i.quantity,
      surface: i.surface,
      dimensions: i.dimensions,
      weight: i.weight,
      value: i.value,
      contiguousUS: i.contiguousUS,
      safe: i.safe,
      acknowledged: i.acknowledged,
      policyVersion: i.policyVersion,
    })),
    count,
    total,
  };
}
