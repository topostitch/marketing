import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL('https://topostitch.dev'),
  title: {
    default: 'TopoStitch | Digital records for physical objects and places',
    template: '%s | TopoStitch',
  },
  description: 'TopoStitch is an early-stage platform for connecting capture sources, 3D representations, metadata, provenance, spatial context, and publishing around physical objects and places.',
  applicationName: 'TopoStitch',
  openGraph: {
    type: 'website',
    siteName: 'TopoStitch',
    title: 'TopoStitch | Digital records for physical objects and places',
    description: 'Connect capture data, metadata, spatial context, and published representations around physical objects and places.',
    url: 'https://topostitch.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopoStitch | Digital records for physical objects and places',
    description: 'Preserve context around physical objects and places with structured digital records.',
  },
  icons: {
    icon: [
      {
        url: '/brand/topostitch-logo-dark.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/brand/topostitch-logo-light.svg',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
