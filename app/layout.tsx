import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL('https://www.topostitch.dev'),

  title: {
    default: 'TopoStitch — One product. More ways to sell it.',
    template: '%s | TopoStitch',
  },

  description:
    'Create product imagery, 3D, AR, social content, ads, and more from a single physical product.',

  applicationName: 'TopoStitch',

  openGraph: {
    type: 'website',
    siteName: 'TopoStitch',
    title: 'TopoStitch — One product. More ways to sell it.',
    description:
      'Turn one physical product into reusable content for ecommerce, 3D, AR, social, ads, and more.',
    url: 'https://www.topostitch.dev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TopoStitch — One product. More ways to sell it.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TopoStitch — One product. More ways to sell it.',
    description:
      'Create product imagery, 3D, AR, social content, ads, and more from a single physical product.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: [
      {
        url: '/brand/topostitch-mark-dark.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/brand/topostitch-mark-light.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
    ],
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
