export const packageAmounts = { basic: 149, ecommerce: 299 } as const;
export const maximumQuantity = 99;
export function parseQuantity(value: unknown): number | null {
  if (typeof value !== 'string' || !/^[1-9][0-9]?$/.test(value)) return null;
  const quantity = Number(value);
  return quantity <= maximumQuantity ? quantity : null;
}
export function formatUSD(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}
