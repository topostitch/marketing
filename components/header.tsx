'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Platform', href: '/platform' },
    { label: 'Stories', href: '/stories' },
    { label: 'Learn', href: '/learn' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2" aria-label="TopoStitch home">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" aria-hidden="true">
              <span className="text-white font-medium text-sm">T</span>
            </div>
            <span className="text-lg font-medium text-foreground">TopoStitch</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-7" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore the platform
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-foreground hover:bg-muted">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
