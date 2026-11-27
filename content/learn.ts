export type Guide = {
  slug: string;
  title: string;
  category: string;
  description: string;
  sections: { heading: string; steps: string[] }[];
};
export const guides: Guide[] = [
  {
    slug: "product-suitability",
    title: "Is your product suitable for 3D digitization?",
    category: "Start here",
    description:
      "Rigid products with distinct surface detail are usually the best starting point. Materials and physical limits both matter.",
    sections: [
      {
        heading: "Inspect the actual product",
        steps: [
          "Look at the surface in ordinary light. Note any glossy, transparent, soft, repetitive or very thin areas, including hidden recesses.",
          "A textured body does not make a reflective trim or transparent handle straightforward. Tell us about mixed materials.",
          "Measure the full product, including protrusions, and record weight and declared replacement value. Use the shared pilot limits below.",
        ],
      },
      {
        heading: "When to ask for assessment",
        steps: [
          "Choose specialized assessment if you are uncertain. Larger or more valuable products can be discussed as custom projects.",
          "Do not send hazardous, perishable, illegal, irreplaceable or unsafe objects. A suitability acknowledgment does not shift our fulfillment responsibilities to you.",
        ],
      },
    ],
  },
  {
    slug: "product-preparation",
    title: "Preparing your product for capture",
    category: "Before you start",
    description:
      "Prepare a stable, representative product and document its condition before capture or shipping.",
    sections: [
      {
        heading: "Prepare without altering the product",
        steps: [
          "Remove loose dust using a method safe for the material. Do not apply coatings, powders or solvents without an agreed plan.",
          "Secure movable components in the intended position without obscuring important surfaces. List removable parts and accessories.",
          "Record measurements and photograph the product’s condition. Identify defects that should remain visible in an accurate model.",
        ],
      },
      {
        heading: "Agree on what matters",
        steps: [
          "Describe what a shopper needs to inspect: silhouette, label, handle, underside or another feature.",
          "Identify the target platform and any important dimensions. A preview can show a planned use without promising platform acceptance.",
          "Read the shipping checklist if sending an object. For your own captures, check lighting and coverage before starting.",
        ],
      },
    ],
  },
  {
    slug: "packaging-shipping",
    title: "Packaging and shipping your product",
    category: "Checklist",
    description:
      "Wait for verified payment, completed intake and confirmed shipping instructions before sending anything.",
    sections: [
      {
        heading: "Before packing",
        steps: [
          "Confirm eligibility, declared replacement value and the list of included parts. Photograph the item and packed contents.",
          "Use a sturdy outer box and protective cushioning suitable for the item. Protect protrusions and prevent parts from moving against one another.",
          "Include the order reference and an inventory. Do not put payment-card information in the parcel.",
        ],
      },
      {
        heading: "Before dispatch",
        steps: [
          "Use the receiving address provided for your specific order. This sandbox preview does not authorize a physical shipment.",
          "Choose tracked inbound and return services. Budget both shipping charges separately from the service fee.",
          "Arrange return shipping insurance appropriate to the declared replacement value. Keep the tracking number, packing photos and carrier documents.",
        ],
      },
      {
        heading: "If something changes",
        steps: [
          "Tell us before dispatch if the product differs from the qualified item or the replacement value changes.",
          "Shipping transit is outside production turnaround. Contact us about a damaged or delayed shipment so responsibility and the next step can be assessed.",
        ],
      },
    ],
  },
  {
    slug: "submission-checklist",
    title: "Capture submission checklist",
    category: "Checklist",
    description:
      "A complete, organized dataset makes assessment possible. Paid customer-capture production is not yet available.",
    sections: [
      {
        heading: "Review the images",
        steps: [
          "Inspect originals at full size. Remove accidental duplicates and flag blurred or missing views; retain the original capture set.",
          "Check all requested surfaces and connecting viewpoints. Note any part you could not capture safely.",
          "Keep one product per clearly labeled set. Include product dimensions, materials and the intended deliverable in a separate note.",
        ],
      },
      {
        heading: "Prepare the handoff",
        steps: [
          "Preserve original filenames and image quality. Do not email a full dataset or upload it to an unverified public location.",
          "Ask for secure submission instructions. Do not send sensitive or unrelated images. No full dataset is required before payment by default.",
          "We provide corrective guidance and one complimentary resubmission assessment for unsuitable captures. Additional processing requires an approved quote.",
        ],
      },
    ],
  },
  {
    slug: "smartphone-capture",
    title: "Capturing products with a smartphone",
    category: "Capture",
    description:
      "Use a consistent camera setup and review a small sample before photographing the full product.",
    sections: [
      {
        heading: "Set up a repeatable session",
        steps: [
          "Clean the lens, stabilize the product and keep the capture area clear. Use the same camera and consistent settings for the set.",
          "Avoid filters, artificial background blur and changing zoom during a sequence. Check that fine product details are in focus.",
          "Take connected views around the product at different heights. Use the coverage guide to plan missing surfaces.",
        ],
      },
      {
        heading: "Review before packing up",
        steps: [
          "Inspect a few originals for motion blur, blown highlights and missing detail. Correct the setup before continuing.",
          "Photograph a dimension reference separately and record its measurement. Do not assume the model automatically has the correct physical scale.",
          "For Shopify’s built-in scanner, follow Shopify’s device and workflow requirements. Those requirements are not TopoStitch eligibility limits.",
        ],
      },
    ],
  },
  {
    slug: "camera-capture",
    title: "Capturing with a DSLR or mirrorless camera",
    category: "Capture",
    description:
      "Consistency and sharp, connected views matter more than a particular camera brand.",
    sections: [
      {
        heading: "Keep the session consistent",
        steps: [
          "Use a stable setup and check exposure and focus before starting. Keep the product’s visible appearance consistent across the set.",
          "Select settings that preserve detail across the product rather than a shallow artistic focus effect. Check images at full size.",
          "Retain camera originals. Discuss supported file formats before submission rather than batch-converting away useful information.",
        ],
      },
      {
        heading: "Check the difficult areas",
        steps: [
          "Review edges, labels, recesses and the underside in your coverage plan. Change support position only with a documented plan.",
          "Do not force a fragile object into an unsafe position to obtain a photograph. Ask for assessment if an important surface is inaccessible.",
        ],
      },
    ],
  },
  {
    slug: "lighting",
    title: "Lighting and reflection management",
    category: "Capture",
    description:
      "Aim for readable surface detail with stable illumination. Lighting cannot make every material suitable.",
    sections: [
      {
        heading: "Start with even illumination",
        steps: [
          "Use soft, stable light and review the resulting photographs. Avoid moving highlights and hard shadows that hide product detail.",
          "Check glossy trim, labels and transparent parts separately. If they dominate the product, seek specialized assessment.",
          "Do not apply a matting treatment without approval; it can alter appearance or damage the product.",
        ],
      },
      {
        heading: "Record your setup",
        steps: [
          "Keep a setup photograph and note any lighting changes. Review a sample before committing to a full capture.",
          "If a label or surface is overexposed, correct the light or exposure and reshoot the affected sequence.",
        ],
      },
    ],
  },
  {
    slug: "coverage",
    title: "Camera angles, overlap and coverage",
    category: "Capture",
    description:
      "Connected views help reconstruction relate one image to the next. More images cannot repair a missing surface.",
    sections: [
      {
        heading: "Plan connected viewpoints",
        steps: [
          "Move around the product in small, consistent steps while keeping recognizable features in successive views.",
          "Repeat from higher and lower viewpoints to include the top, side transitions and accessible lower surfaces.",
          "Make a checklist for handles, recesses and the underside. Document surfaces that are occluded rather than assuming they will be reconstructed.",
        ],
      },
      {
        heading: "Review the whole object",
        steps: [
          "Use the original coverage diagram below as a planning aid, not a numerical guarantee. Required views vary by geometry.",
          "Avoid changing the product’s shape or moving individual parts mid-sequence. Ask for guidance before repositioning a support.",
        ],
      },
    ],
  },
  {
    slug: "photogrammetry",
    title: "Introduction to photogrammetry",
    category: "Foundations",
    description:
      "Photogrammetry reconstructs shape from connected photographs of an object. Reliable inputs and a defined output are essential.",
    sections: [
      {
        heading: "From photographs to a model",
        steps: [
          "A production workflow checks inputs, reconstructs geometry, prepares surfaces and validates the result for its intended use.",
          "Capture records what the camera can see. Hidden areas, reflective materials and motion can require another approach or specialized work.",
        ],
      },
      {
        heading: "Choose an outcome",
        steps: [
          "Start with what someone must inspect or understand. Basic digitization and storefront preparation serve different needs.",
          "A reconstructed asset may require cleanup, optimization and validation before it works well in an interactive viewer. Scope those steps before ordering.",
        ],
      },
    ],
  },
  {
    slug: "deliverables",
    title: "Understanding 3D deliverables",
    category: "Foundations",
    description:
      "Choose the output for its intended use, independently of who takes the photographs.",
    sections: [
      {
        heading: "Define the handoff",
        steps: [
          "Basic digitization covers capture, reconstruction and a checked digital model for an eligible physical product.",
          "E-commerce Ready includes optimization and preparation for one agreed ecommerce destination. Integration and custom experiences are quoted separately.",
          "Agree on file formats, dimensions, visible detail and a review method. Do not assume a file extension alone guarantees quality or platform acceptance.",
        ],
      },
      {
        heading: "Keep assets reusable",
        steps: [
          "Keep source assets and the final handoff organized by product. Record which version is approved for each destination.",
          "Existing asset optimization is a separate pilot candidate. Ask for review of your source file rather than buying new-product digitization.",
        ],
      },
    ],
  },
];
export const learningSources = [
  {
    label: "Shopify: scanning products with the 3D scanner",
    url: "https://help.shopify.com/en/manual/products/product-media/3d-scanner",
  },
  {
    label: "Apple: capturing photographs for Object Capture",
    url: "https://developer.apple.com/documentation/realitykit/capturing-photographs-for-realitykit-object-capture",
  },
  {
    label: "Amazon: official 3D and AR overview",
    url: "https://sell.amazon.com/tools/3d-ar",
  },
];
