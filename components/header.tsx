'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  ['Services', '/#services'],
  ['Pricing', '/#studio'],
  ['How it works', '/#how-it-works'],
  ['About', '/about'],
  ['Get updates', '/updates'],
  ['Request a pilot', '/request'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="relative z-50 w-full border-b border-border bg-background text-foreground" onKeyDown={event => { if (event.key === 'Escape') close() }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link href="/" onClick={close} className="flex min-h-11 items-center" aria-label="TopoStitch home">
            <img src="/brand/topostitch-mark-dark.svg" alt="" width={145} height={27} />
          </Link>
          <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
            {links.map(([label, href]) => <Link key={href} href={href} className="text-sm hover:underline">{label}</Link>)}
          </nav>
          <button type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-nav" aria-expanded={open} className="flex size-11 items-center justify-center md:hidden">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-nav" aria-label="Mobile navigation" className={open ? 'grid border-t border-border py-2 md:hidden' : 'hidden'}>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={close} className="min-h-11 px-2 py-3 text-sm hover:underline">{label}</Link>)}
        </nav>
      </div>
    </header>
  )
}
