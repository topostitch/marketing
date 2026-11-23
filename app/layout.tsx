import Footer from '@/components/footer'
import Header from '@/components/header'
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
    'Done-for-you 3D modeling and optimization, plus hands-on consulting for ecommerce teams and their partners.',

  applicationName: 'TopoStitch',
  robots: { index: !process.env.VERCEL || process.env.VERCEL_ENV === 'production', follow: true },

  openGraph: {
    type: 'website',
    siteName: 'TopoStitch',
    title: 'TopoStitch | Product 3D for Amazon & Shopify',
    description:
      'Get a 3D product model made, prepare an existing asset, or work with TopoStitch on your team’s 3D workflow.',
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
      'Explore done-for-you 3D modeling and guided support for your storefront, agency, or product team.',
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
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

