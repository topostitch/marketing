export const commerceOffers = [
  {
    id: "basic",
    name: "Basic digitization",
    service: "Model creation and optimization",
    price: "From $149 per product",
    title: "Give your physical product a digital starting point",
    summary: "Capture and reconstruct an eligible physical product.",
    description:
      "Send an eligible physical product for capture, reconstruction and a checked digital model. Choose E-commerce Ready when you need optimization for a storefront. Existing asset optimization is a separate pilot candidate.",
    example:
      "A manufacturer sends a small, rigid, textured product so its team can review the form as a digital model before deciding how to publish it.",
    deliverables: [
      "Physical product capture",
      "Reconstruction and quality review",
      "A checked digital model; integration is separate",
    ],
    cta: "Request Basic",
  },
  {
    id: "ecommerce",
    name: "E-commerce Ready",
    service: "Model creation and optimization",
    price: "From $299 per product",
    title: "Give shoppers a product they can explore",
    summary: "Create a new 3D model for one product and storefront.",
    description:
      "We create, check, and optimize a new model for an eligible product. Physical capture is included for eligible standard products; customer-provided captures remain inquiry-only. We agree on the output and where it needs to work before production.",
    example:
      "A homewares seller wants shoppers to see the handle, foot, and glaze of a ceramic mug. We review the references and scope an interactive model for the seller’s product page.",
    deliverables: [
      "Review of imagery or capture needs",
      "Model creation, quality checks, and optimization",
      "Files for one agreed storefront or marketplace",
    ],
    cta: "Request E-commerce Ready",
  },
  {
    id: "custom",
    name: "Specialized production",
    service: "3D consulting and integration",
    price: "Custom quote",
    title: "Find a production approach for a demanding product",
    summary:
      "Request assessment for complex materials, geometry, dimensions or capture requirements.",
    description:
      "Work with TopoStitch to assess your assets and choose what to capture, improve, or publish. We can scope a written recommendation, a guided capture plan, or a one-product pilot your team can run.",
    example:
      "A manufacturer has CAD files for its catalog. We start with one product and define what its ecommerce team should ask for, how to judge the first model, and what to standardize before rollout.",
    deliverables: [
      "Asset and storefront requirements review",
      "Written workflow or pilot recommendation",
      "Guidance on capture, review, and handoff",
    ],
    cta: "Request a consulting quote",
  },
  {
    id: "partnership",
    name: "Interactive experiences and integrations",
    service: "3D consulting and integration",
    price: "Project quote",
    title: "Make 3D handoffs easier for client teams",
    summary:
      "Discuss delivery standards, storefront integration, or a catalog rollout.",
    description:
      "We work with agencies and implementation teams to define the files a project needs, who handles each step, and how to check models in the intended storefront or viewer. Scope can include hands-on integration support.",
    example:
      "An agency inherits a client’s product models ahead of a storefront redesign. We help check a sample asset and agree on file requirements and acceptance criteria before the team prepares the rest.",
    deliverables: [
      "Asset requirements and ownership",
      "A plan for compatibility checks",
      "Handoff or rollout support scoped to the project",
    ],
    cta: "Discuss a partnership",
  },
] as const;
