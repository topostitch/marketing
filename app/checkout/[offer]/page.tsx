import { redirect, notFound } from "next/navigation";
export default async function Checkout({
  params,
}: {
  params: Promise<{ offer: string }>;
}) {
  const { offer } = await params;
  if (!["basic", "ecommerce"].includes(offer)) notFound();
  redirect(`/order?deliverable=${offer}`);
}
