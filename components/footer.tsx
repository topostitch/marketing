import Link from 'next/link'
import Image from 'next/image'
import UpdatesForm from './updates-form'
import styles from '@/app/marketing-layout.module.css'

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <section id="updates" className={styles.footerSignup} aria-labelledby="updates-heading">
          <div>
            <h2 id="updates-heading">Get TopoStitch updates</h2>
            <p>Pilot openings and practical examples of 3D on product pages.</p>
          </div>
          <UpdatesForm />
        </section>
        <div className={styles.footerBar}>
          <Link href="/" aria-label="TopoStitch home">
            <Image src="/brand/topostitch-mark-dark.svg" alt="" width={145} height={27} />
          </Link>
          <nav aria-label="Footer">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="mailto:hello@topostitch.dev">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
