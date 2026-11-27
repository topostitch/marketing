import { guides } from "@/content/learn";
import { insightArticles } from "@/content/insights";
import { canonical } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  const lines = [
    "# TopoStitch",
    "",
    "> Supported 3D production services for ecommerce, augmented reality and interactive experiences.",
    "",
    "Physical-product digitization and ecommerce preparation are service offerings. Eligibility and fulfillment terms apply. Preview payments are sandbox-only. Customer-provided captures are inquiry-only. Future CLI, automation, API and deployment capabilities are not currently purchasable software.",
    "",
    "## Company and services",
    ...[
      ["/about", "About TopoStitch and founder Jacob Galito"],
      ["/services", "Capture methods and production services"],
      ["/compare", "Deliverables and approved starting prices"],
      ["/partnerships", "Agency and developer partnerships"],
      ["/developers", "Future capabilities and their availability states"],
      ["/privacy", "Privacy and consent"],
    ].map(([path, label]) => `- [${label}](${canonical(path)})`),
    "",
    "## Learn: practical production guidance",
    ...guides.map(
      (g) =>
        `- [${g.title}](${canonical(`/learn/${g.slug}`)}): ${g.description}`,
    ),
    "",
    "## Insights: business and industry",
    ...insightArticles.map(
      (a) =>
        `- [${a.title}](${canonical(`/insights/${a.slug}`)}): ${a.description}`,
    ),
    "",
    "Official platform and case-study sources are linked from the relevant articles. Retailer examples are not TopoStitch partnerships or endorsements. This index is a navigation aid; linked pages contain the current scope and limitations.",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
