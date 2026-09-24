import Image from 'next/image'
import Reveal from '@/components/motion/reveal'

const proofs = [
  {
    eyebrow: 'Capture evidence',
    title: 'Keep source imagery connected to the record',
    description:
      'Review the original source imagery alongside camera and capture metadata so the evidence behind a 3D representation stays visible and traceable.',
    image: '/product/source-imagery-metadata.webp',
    imageAlt:
      'TopoStitch source imagery viewer showing an original capture image with camera, lens, exposure, dimensions, and capture metadata.',
  },
  {
    eyebrow: 'Published 3D record',
    title: 'Turn a physical object into a durable digital record',
    description:
      'Publish an interactive 3D representation with the descriptive record and context needed to keep a physical object accessible beyond the original capture session.',
    image: '/product/giant-roller-skate-object-record.webp',
    imageAlt:
      'TopoStitch published object record showing a giant roller skate as an interactive 3D representation with its descriptive record.',
  },
  {
    eyebrow: '3D presentation',
    title: 'Attach interpretation directly to the object',
    description:
      'Author spatial labels and presentation details directly on the 3D object so interpretation stays connected to the feature it describes.',
    image: '/product/spatial-annotation-presentation.webp',
    imageAlt:
      'TopoStitch 3D presentation editor showing the Zero Mile Stone with descriptive labels anchored to specific features on the model.',
  },
  {
    eyebrow: 'Cross-device review',
    title: 'Test the presentation on the device where it will be experienced',
    description:
      'Open the published record or AR-focused view on another device using a QR code or share link before presenting it to an audience.',
    image: '/product/cross-device-ar-preview.webp',
    imageAlt:
      'TopoStitch cross-device preview showing QR codes for opening a 3D record and AR-focused experience on another device.',
  },
  {
    eyebrow: 'Publishing & delivery',
    title: 'Prepare records for publishing and reuse',
    description:
      'Public record publishing is available today. Embeds, reusable delivery formats, and starter-code handoff are being developed and tested so future outputs can stay connected to the source record.',
    image: '/product/publish-embed-export.webp',
    imageAlt:
      'TopoStitch export and publishing interface showing options for GLB, USDZ, model-viewer, Three.js, embed code, and reusable delivery files.',
  },
]

export default function PlatformProof() {
  return (
    <section className="w-full border-b border-border bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              See the platform in practice
            </p>

            <h2 className="text-balance text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              TopoStitch is being built around one connected record from capture through publishing.
            </h2>

            <p className="text-lg font-light leading-relaxed text-muted-foreground">
              Current product workflows connect source evidence, spatial context, presentation, and publishing around the same record, while additional delivery and reuse workflows continue to be developed.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {proofs.map((proof, index) => {
            const imageFirst = index % 2 === 0

            return (
              <article
                key={proof.title}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  direction={imageFirst ? 'left' : 'right'}
                  className={imageFirst ? 'lg:order-1' : 'lg:order-2'}
                >
                  <div className="group overflow-hidden rounded-2xl border border-border bg-muted/20">
                    <Image
                      src={proof.image}
                      alt={proof.imageAlt}
                      width={1600}
                      height={1000}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.012]"
                      loading="lazy"
                    />
                  </div>
                </Reveal>

                <Reveal
                  direction={imageFirst ? 'right' : 'left'}
                  delay={0.1}
                  className={imageFirst ? 'lg:order-2' : 'lg:order-1'}
                >
                  <div className="space-y-4">
                    <p className="text-sm font-medium tracking-wide text-muted-foreground">
                      {proof.eyebrow}
                    </p>

                    <h3 className="text-balance text-2xl font-medium leading-tight text-foreground md:text-3xl">
                      {proof.title}
                    </h3>

                    <p className="text-base font-light leading-relaxed text-muted-foreground">
                      {proof.description}
                    </p>
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
