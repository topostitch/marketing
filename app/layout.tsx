import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://topostitch.dev'),
  title: {
    default: 'TopoStitch | Digital records for physical objects and places',
    template: '%s | TopoStitch',
  },
  description: 'TopoStitch helps organizations turn photos, video, 3D captures, documents, and metadata into structured, traceable digital records for physical objects and places.',
  applicationName: 'TopoStitch',
  openGraph: {
    type: 'website',
    siteName: 'TopoStitch',
    title: 'TopoStitch | Digital records for physical objects and places',
    description: 'Turn capture data into structured, traceable digital records that preserve context and can be shared across research, education, and public experiences.',
    url: 'https://topostitch.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TopoStitch | Digital records for physical objects and places',
    description: 'Preserve context around physical objects and places with structured digital records.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
