export type InsightCategory =
  "Ecommerce" | "Platform guides" | "Industry research" | "Agency & production";

export type InsightSource = {
  label: string;
  publisher: string;
  url: string;
  note?: string;
};

export type InsightParagraph = {
  text: string;
  sources?: number[];
};

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  audience: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  intro: string;
  sections: {
    heading: string;
    paragraphs: InsightParagraph[];
    bullets?: string[];
  }[];
  sources: InsightSource[];
  relatedServices: string[];
  cta: { label: string; href: string };
  relatedArticles: string[];
};

const reviewed = "2026-11-26";

export const insightArticles: InsightArticle[] = [
  {
    slug: "3d-product-model-cost",
    title: "How Much Does a 3D Product Model Cost?",
    description:
      "Learn what changes the cost of a 3D product model, what to ask in a quote, and where TopoStitch’s $149 and $299 starting packages fit.",
    category: "Ecommerce",
    audience: "Merchants and agencies comparing 3D production options",
    datePublished: reviewed,
    dateModified: "2026-11-27",
    readMinutes: 5,
    intro:
      "A 3D product model does not have one standard price. Cost depends on what you are starting with, how the product looks and behaves, and where the finished asset needs to work.",
    sections: [
      {
        heading: "What affects the price?",
        paragraphs: [
          {
            text: "A simple, rigid product with clear reference photos is usually easier to model than a transparent bottle, reflective appliance, flexible textile, or object with many small components. Existing CAD or a well-made model may reduce the amount of work, but those files still need a review for scale, geometry, materials, texture size, and delivery requirements.",
          },
          {
            text: "The intended use also matters. A model for a browser-based product viewer has different performance and presentation needs from a manufacturing visualization, a photorealistic render, a configurable product, or a large catalog pipeline. Ask the provider to state the target use and acceptance criteria before work begins.",
          },
        ],
      },
      {
        heading: "Compare scope, not only the number",
        paragraphs: [
          {
            text: "A useful quote identifies whether it includes model creation or cleanup, materials and textures, scale checks, optimization, export formats, a preview, revisions, and help with the upload. Shopify recommends supplying clear product photos and detailed measurements when commissioning a model. [1]",
            sources: [0],
          },
          {
            text: "For Shopify, platform guidance describes GLB and USDZ support and a 500 MB upload ceiling, while Shopify’s partner guidance asks for a compact GLB and specifies a 15 MB maximum for the model it describes. Those numbers apply to different contexts; confirm the current requirements for your theme and workflow instead of treating the platform ceiling as a performance target. [2][3]",
            sources: [1, 2],
          },
        ],
      },
      {
        heading: "TopoStitch starting prices",
        paragraphs: [
          {
            text: "Basic digitization starts at $149 for physical capture, reconstruction and a checked digital model. E-commerce Ready starts at $299 and adds optimization and preparation for one agreed ecommerce destination. Eligible standard physical products can use sandbox checkout after qualification. Customer-provided captures remain inquiry-only. Inbound and return shipping are paid separately by the customer; specialized work and integration require a quote.",
          },
          {
            text: "Specialized production for products such as clear glass, polished metal, gemstones, flexible goods, or complex assemblies needs a review and quote. Multi-product catalogs, custom interactions, and storefront integration are scoped separately.",
          },
        ],
      },
      {
        heading: "A practical way to start",
        paragraphs: [
          {
            text: "Choose one representative product. Share its dimensions, clear photos from multiple angles, any existing CAD or 3D file, and the destination where customers should see it. Agree on file formats, quality checks, optimization, and revisions before production. Then test the delivered asset on the intended product page before expanding to more SKUs.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Hiring a Shopify Partner to create 3D models",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/expert-3d-model",
        note: "Official guidance on source photos, dimensions, review, and model requirements.",
      },
      {
        label: "Product media types",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/product-media-types",
        note: "Official product media file types and upload guidance.",
      },
      {
        label: "Creating 3D models for merchants",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/partners/manage-clients-stores/creating-media/3d-models/creating-3d-models",
        note: "Shopify Partner production guidance.",
      },
    ],
    relatedServices: ["basic", "ecommerce"],
    cta: { label: "Compare 3D services and starting prices", href: "/compare" },
    relatedArticles: ["shopify-3d-product-models", "amazon-3d-product-models"],
  },
  {
    slug: "shopify-3d-product-models",
    title: "How to Add 3D Product Models to Shopify",
    description:
      "A practical Shopify 3D checklist covering asset files, product media, theme support, mobile review, and common performance checks.",
    category: "Platform guides",
    audience: "Shopify merchants, ecommerce teams, and developers",
    datePublished: reviewed,
    dateModified: reviewed,
    readMinutes: 6,
    intro:
      "Shopify product pages can include images, video, and 3D media. A model has to meet Shopify’s file requirements and your online store theme needs to support displaying 3D content.",
    sections: [
      {
        heading: "1. Confirm that 3D fits the product page",
        paragraphs: [
          {
            text: "A 3D model is most useful when customers need to inspect shape, detail, scale, or product components that are hard to communicate with flat images. It works alongside product photos and descriptions; it should not replace the information customers need to make a decision.",
          },
          {
            text: "Check whether your theme supports video and 3D product media. Shopify says all Online Store 2.0 themes built by Shopify and the Horizon theme family support these media types; third-party themes may require an update or developer help. [1]",
            sources: [0],
          },
        ],
      },
      {
        heading: "2. Prepare and inspect the model",
        paragraphs: [
          {
            text: "Shopify lists GLB and USDZ as supported 3D model types and allows uploads up to 500 MB. Shopify states that files over 15 MB are automatically optimized during upload. Its separate partner guidance describes a compact GLB of approximately 4 MB and a 15 MB maximum. Keep a clean source copy and test the final result on your own theme. [1][2]",
            sources: [0, 1],
          },
          {
            text: "Before upload, inspect the model from all sides. Check proportions, scale, material appearance, logos and labels, holes or gaps, and whether transparent or reflective parts look acceptable. Shopify’s partner guidance recommends clear multi-angle product photos and detailed dimensions when a model is commissioned. [2]",
            sources: [1],
          },
        ],
      },
      {
        heading: "3. Add the model to a product",
        paragraphs: [
          {
            text: "In Shopify admin, open the product you want to update and add the model as product media using the product media controls. Shopify also documents adding product media through its mobile app. Exact labels can change as Shopify updates the admin, so follow the live Help Center instructions for the current interface. [1][3]",
            sources: [0, 2],
          },
          {
            text: "If you manage media through a theme or an integration, verify that the product media is rendered by a compatible theme component. Shopify’s developer guidance explains how product media, including models, can be accessed in Liquid and through product media APIs. [4]",
            sources: [3],
          },
        ],
      },
      {
        heading: "4. Test the whole shopping experience",
        paragraphs: [
          {
            text: "Review the product page on a phone and desktop, with the model selected and with images selected. Check that the page remains usable with a keyboard, that controls are labeled and visible, and that the model does not obscure price, variants, or purchase actions. Test loading on a typical mobile connection and keep still images available as a fallback.",
          },
          {
            text: "A model can be uploaded successfully and still need work. If it appears too dark, too small, slow to load, or incorrectly scaled, review the original file, lighting and material setup, product dimensions, and theme behavior before assuming the platform upload failed.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Product media types",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/product-media-types",
      },
      {
        label: "Hiring a Shopify Partner to create 3D models",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/expert-3d-model",
      },
      {
        label: "Adding product media",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/add-media",
      },
      {
        label: "Product media API and Liquid syntax",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/partners/manage-clients-stores/creating-media/product-media-API-liquid",
      },
    ],
    relatedServices: ["ecommerce", "optimization"],
    cta: {
      label: "Explore ecommerce-ready production",
      href: "/services/shopify-3d-models",
    },
    relatedArticles: ["3d-product-model-cost", "amazon-3d-product-models"],
  },
  {
    slug: "amazon-3d-product-models",
    title: "How to Get 3D Product Models for Amazon",
    description:
      "Understand Amazon’s 3D content workflow, why eligibility varies, what files to prepare, and what to verify before commissioning a model.",
    category: "Platform guides",
    audience: "Amazon sellers, brand owners, agencies, and product teams",
    datePublished: reviewed,
    dateModified: reviewed,
    readMinutes: 6,
    intro:
      "Amazon supports 3D product experiences on eligible listings, but a 3D file does not guarantee that a particular product will receive a 3D viewer, AR placement, or virtual try-on experience.",
    sections: [
      {
        heading: "Start with listing and category eligibility",
        paragraphs: [
          {
            text: "Amazon’s Seller Central materials describe 3D content for experiences such as View in 3D, View in Your Room, Virtual Try-On, and Showroom. Availability depends on factors such as product type, marketplace, account access, and Amazon’s review. Check eligibility for the specific ASIN and region in Seller Central before paying for production. [1][2]",
            sources: [0, 1],
          },
          {
            text: "A service provider cannot promise Amazon placement or approval. TopoStitch is an independent production service and does not claim to be an Amazon-approved studio or provider.",
          },
        ],
      },
      {
        heading: "Prepare an asset brief",
        paragraphs: [
          {
            text: "Collect the ASIN, category, product dimensions, brand ownership details, intended 3D experience, and any existing model or CAD files. Ask the production team to confirm its export format and the current specifications shown in your Seller Central workflow. Amazon’s technical materials discuss glTF/GLB assets and proper proportions, but its upload and eligibility guidance should be treated as the final authority for the listing. [1]",
            sources: [0],
          },
          {
            text: "If starting from the physical product, provide sharp photos from multiple angles, consistent lighting, and clear dimensions. Reflective, transparent, soft, or highly detailed items may need a different production approach or a quote.",
          },
        ],
      },
      {
        heading: "Review before uploading",
        paragraphs: [
          {
            text: "Open the model in a glTF-compatible viewer and check that it matches the real product, has correct scale and proportions, and displays its materials and markings clearly. A file that looks right in a desktop viewer can still need changes to meet Amazon’s current technical rules or the requirements of a particular experience.",
          },
          {
            text: "Upload through the current Seller Central 3D content flow for the eligible product. Check the status Amazon returns, then inspect the live customer experience on supported devices and locations. Retain the original asset and record which version was submitted.",
          },
        ],
      },
      {
        heading: "Plan for reuse without assuming one universal file",
        paragraphs: [
          {
            text: "A well-organized source model can reduce repeated work, but each marketplace may require different formats, dimensions, materials, file weights, or metadata. Keep the editable master and create destination-specific exports after checking each platform’s current rules.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "3D asset technical guidance",
        publisher: "Amazon Seller Central",
        url: "https://sellercentral.amazon.com/help/hub/reference/external/G7RGSNQFZ2BAG7K3?locale=en-US",
        note: "Seller Central help content; sign-in and marketplace access may be required.",
      },
      {
        label: "Getting Started With 3D Content on Amazon (Spring 2024)",
        publisher: "Amazon",
        url: "https://m.media-amazon.com/images/G/01/imaging/3D/Getting_Started_With_3D_Content_on_Amazon_-_Spring_2024_WW.pdf",
        note: "Amazon guide. Verify current account and listing rules in Seller Central.",
      },
      {
        label: "Amazon announcement about 3D content on product listings",
        publisher: "Amazon Seller Central News",
        url: "https://sellercentral.amazon.com/seller-forums/discussions/t/db5577d0-e1da-4314-920a-852a462afef3",
      },
    ],
    relatedServices: ["ecommerce", "optimization", "specialized"],
    cta: {
      label: "Discuss an Amazon-ready asset scope",
      href: "/request?offer=ecommerce",
    },
    relatedArticles: ["shopify-3d-product-models", "3d-product-model-cost"],
  },
  {
    slug: "3d-commerce-sales",
    title: "Can 3D Product Visualization Increase Ecommerce Sales?",
    description:
      "What case studies say about 3D product experiences, why results are not guarantees, and how to evaluate a pilot with your own customers.",
    category: "Industry research",
    audience: "Merchant decision-makers evaluating a 3D pilot",
    datePublished: reviewed,
    dateModified: reviewed,
    readMinutes: 5,
    intro:
      "Interactive product media can help shoppers inspect shape and detail. Whether it changes sales depends on the product, the implementation, and which customers choose to use the experience.",
    sections: [
      {
        heading: "What published case studies report",
        paragraphs: [
          {
            text: "Shopify’s Rebecca Minkoff case study reports that shoppers who interacted with a 3D model were 27% more likely to place an order than shoppers who did not. It also reports a 44% higher likelihood of adding the product to cart after 3D interaction. These comparisons describe observed shopper behavior; they do not establish that the 3D experience alone caused the difference. [1]",
            sources: [0],
          },
          {
            text: "Walmart reported tenfold customer and member adoption growth across 10 AR experiences at Walmart U.S. and Sam’s Club, alongside lower return rates and improved conversion. The announcement did not provide the size of those latter changes. This is evidence of retailer investment and experience adoption, not a forecast for an independent seller. [2]",
            sources: [1],
          },
          {
            text: "Kohler’s technology provider VNTANA says it centralized and activated more than 8,000 3D models and reduced manual preparation work. The example shows the operational value of asset management at scale; the case study does not publish a controlled sales lift that can be applied to another company. [3]",
            sources: [2],
          },
        ],
      },
      {
        heading: "Why the numbers do not transfer automatically",
        paragraphs: [
          {
            text: "People who choose to rotate a product or open an AR view may already have stronger purchase intent. Results can also reflect product selection, marketing, site changes, traffic mix, device compatibility, or the way each company measured an interaction. A case study is a useful signal and a source of hypotheses, not a promise of incremental revenue.",
          },
        ],
      },
      {
        heading: "How to evaluate a small pilot",
        paragraphs: [
          {
            text: "Select products where buyers regularly need to understand shape, size, materials, or fit. Before adding 3D, record a baseline for conversion, returns, page speed, and support questions. Compare similar products or traffic periods; use a controlled experiment if you have enough volume and can keep other changes stable.",
          },
          {
            text: "Measure business outcomes alongside engagement. A higher model interaction rate is not enough on its own. Estimate incremental contribution margin and avoided return cost, then compare them with model production, upload, maintenance, and page-performance costs.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Rebecca Minkoff 3D commerce case study",
        publisher: "Shopify",
        url: "https://www.shopify.com/ca/case-studies/rebecca-minkoff",
        note: "Shopify reports observational differences between shoppers who interacted and those who did not.",
      },
      {
        label: "Walmart 2024 immersive commerce announcement",
        publisher: "Walmart Corporate",
        url: "https://corporate.walmart.com/news/2024/10/09/walmart-reveals-plan-for-scaling-artificial-intelligence-generative-ai-augmented-reality-and-immersive-commerce-experiences",
        note: "Walmart reports adoption growth and directional business improvements across 10 experiences.",
      },
      {
        label: "Kohler 3D commerce case study",
        publisher: "VNTANA",
        url: "https://www.vntana.com/casestudies/the-3d-commerce-breakthrough-how-kohler-revolutionized-product-visualization/",
        note: "Provider-reported asset management results; not independently audited by TopoStitch.",
      },
    ],
    relatedServices: ["ecommerce", "basic"],
    cta: {
      label: "Explore ecommerce-ready production",
      href: "/services/3d-product-modeling",
    },
    relatedArticles: ["3d-product-model-cost", "shopify-3d-product-models"],
  },
  {
    slug: "agency-3d-production",
    title: "How Agencies Can Offer 3D Services Without an In-House Team",
    description:
      "A practical framework for agencies to scope specialist 3D production, run a one-SKU pilot, and set clear delivery and approval terms.",
    category: "Agency & production",
    audience:
      "Ecommerce agencies, studios, photographers, developers, and 3D providers",
    datePublished: reviewed,
    dateModified: reviewed,
    readMinutes: 5,
    intro:
      "An agency can bring 3D into a client project without building every production capability in-house. The arrangement works best when the client, agency, and specialist agree on scope, ownership, review, and handoff before a catalog-wide commitment.",
    sections: [
      {
        heading: "Choose a clear partner role",
        paragraphs: [
          {
            text: "A specialist may help create a new model, optimize an existing file, prepare destination-specific exports, or advise on a product-page workflow. The agency can continue to lead the client relationship, brand direction, storefront implementation, and project management if that is how the parties agree to divide responsibilities.",
          },
          {
            text: "Retail and manufacturer examples show that asset production and distribution can involve several teams. VNTANA’s Kohler case study describes centralizing a large model library and coordinating use across digital channels. It is a provider-reported enterprise example, not proof that every agency needs the same platform or process. [1]",
            sources: [0],
          },
        ],
      },
      {
        heading: "Write a production brief before quoting",
        paragraphs: [
          {
            text: "List the product dimensions, target use, reference photos, available CAD or 3D files, required exports, visual review criteria, and intended destination. Shopify’s guidance for commissioning a model also asks for clear photos from multiple angles and detailed dimensions in millimeters. [2]",
            sources: [1],
          },
          {
            text: "Define who owns source files and delivered exports, whether the work is confidential, how many review rounds are included, who collects client feedback, and how acceptance is determined. Name any platform or device constraints and identify who will perform the final upload and testing.",
          },
        ],
      },
      {
        heading: "Run a one-SKU pilot",
        paragraphs: [
          {
            text: "Choose a product that represents the client’s typical complexity. Test the brief, production path, file review, storefront display, and client approval with that item before estimating a larger catalog. Record the work that required manual correction and the dependencies the next batch would need.",
          },
          {
            text: "Use a pilot to discover whether white-label delivery makes sense, not to imply guaranteed throughput or turnaround. A production partner should agree to capacity and service levels only after scope and operating conditions are clear.",
          },
        ],
      },
      {
        heading: "Discuss a partner fit",
        paragraphs: [
          {
            text: "TopoStitch is exploring white-label production, catalog digitization, asset optimization, and project collaboration with agencies, developers, manufacturers, and other 3D providers. Partnership terms, capacity, and delivery schedules are agreed per project. Send a short overview of your client work and the kind of support you need.",
          },
        ],
      },
    ],
    sources: [
      {
        label: "Kohler 3D commerce case study",
        publisher: "VNTANA",
        url: "https://www.vntana.com/casestudies/the-3d-commerce-breakthrough-how-kohler-revolutionized-product-visualization/",
        note: "Technology-provider account of asset centralization and distribution.",
      },
      {
        label: "Hiring a Shopify Partner to create 3D models",
        publisher: "Shopify Help Center",
        url: "https://help.shopify.com/en/manual/products/product-media/expert-3d-model",
      },
    ],
    relatedServices: ["specialized", "optimization"],
    cta: { label: "Discuss a partnership", href: "/partnerships#inquiry" },
    relatedArticles: ["3d-product-model-cost", "shopify-3d-product-models"],
  },
];

export const insightCategories: InsightCategory[] = [
  "Ecommerce",
  "Platform guides",
  "Industry research",
  "Agency & production",
];

export function getInsight(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}
