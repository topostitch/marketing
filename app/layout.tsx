import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL('https://www.topostitch.dev'),

  title: {
    default: 'TopoStitch | Product 3D for Amazon & Shopify',
    template: '%s | TopoStitch',
  },

  description:
    'Founder-led 3D product pilots for ecommerce merchants. Bring an existing model or apply for a one-product Ship-to-3D pilot.',

  applicationName: 'TopoStitch',
  robots: { index: true, follow: true },

  openGraph: {
    type: 'website',
    siteName: 'TopoStitch',
    title: 'TopoStitch | Product 3D for Amazon & Shopify',
    description:
      'Founder-led product 3D preparation and Ship-to-3D pilots for ecommerce merchants.',
    url: 'https://www.topostitch.dev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TopoStitch | Product 3D for Amazon & Shopify',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TopoStitch | Product 3D for Amazon & Shopify',
    description:
      'Product 3D preparation and done-for-you pilots for Amazon and Shopify merchants. Explore pilot pricing and evidence for 3D commerce.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: { url: '/favicon.svg?v=3', type: 'image/svg+xml', sizes: 'any' },
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fafaf8' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg">
          Skip to main content
        </a>
        <noscript><style>{`.scroll-reveal { opacity: 1 !important; transform: none !important; }`}</style></noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

