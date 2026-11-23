'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from '@/app/marketing-layout.module.css'

const links = [
  ['Services', '/services'],
  ['How it works', '/#how-it-works'],
  ['About', '/about'],
  ['Service updates', '/updates'],
  ['Request a review', '/request'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  return (
    <header className={styles.siteHeader} onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        close()
        menuButton.current?.focus()
      }
    }}>
      <div className={styles.headerInner}>
        <div className={styles.headerRow}>
          <Link href="/" onClick={close} className={styles.headerBrand} aria-label="TopoStitch home">
            <img src="/brand/topostitch-mark-dark.svg" alt="" width={145} height={27} />
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <button ref={menuButton} type="button" onClick={() => setOpen(value => !value)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-controls="mobile-nav" aria-expanded={open} className={styles.menuButton}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-nav" aria-label="Mobile navigation" className={styles.mobileNav} hidden={!open}>
          {links.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}
        </nav>
      </div>
    </header>
  )
}
