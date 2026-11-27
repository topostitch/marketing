// Status evidence: RFC-0049/0050 (Nov 27) and tools/cli source. No public software releases verified.
export const capabilities = [
  {
    id: "production",
    name: "Production services",
    status: "Pilot",
    detail:
      "Supported service delivery; physical-product payments are sandbox-only in this preview.",
  },
  {
    id: "captures",
    name: "Customer-provided captures",
    status: "Exploring",
    detail:
      "Guidance and inquiries are open. Paid fulfillment and pricing are not yet verified.",
  },
  {
    id: "cli",
    name: "Developer CLI",
    status: "In development",
    detail:
      "Local implementation exists. A supported public release or external private preview has not been verified.",
  },
  {
    id: "stitches",
    name: "Stitches workflow automation",
    status: "Planned",
    detail: "Roadmap direction; no committed release date or public editor.",
  },
  {
    id: "mcp",
    name: "MCP and AI-assisted automation",
    status: "Exploring",
    detail:
      "Technical and market discovery. No public MCP integration is offered.",
  },
  {
    id: "shopify",
    name: "Shopify application",
    status: "Exploring",
    detail:
      "Interest discovery; no TopoStitch application is available to install.",
  },
  {
    id: "api",
    name: "Commercial API and SDK",
    status: "Planned",
    detail:
      "Roadmap capability without a committed release date. No public API is sold.",
  },
  {
    id: "on-premises",
    name: "On-premises deployment",
    status: "Exploring",
    detail: "Requirements discovery only. No enterprise readiness claim.",
  },
  {
    id: "air-gapped",
    name: "Air-gapped deployment",
    status: "Exploring",
    detail:
      "Requirements discovery only. No validated isolation, compliance or government authorization claim.",
  },
] as const;
export const consentVersion = "marketing-2026-11-27";
