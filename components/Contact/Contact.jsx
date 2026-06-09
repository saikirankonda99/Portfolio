'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './Contact.module.css'

const EMAIL    = 'saikiran1.konda@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/sai-kiran-konda/'
const GITHUB   = 'https://github.com/saikirankonda99'

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0112 6.84c.85.004 1.71.114 2.5.336 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const LINKS = [
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: <EmailIcon />,
    external: false,
  },
  {
    label: 'GitHub',
    href: GITHUB,
    icon: <GitHubIcon />,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: LINKEDIN,
    icon: <LinkedInIcon />,
    external: true,
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  const year = new Date().getFullYear()

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        <span className={styles.sectionLabel} data-reveal>Contact</span>

        <h2 className={styles.headline} data-reveal data-reveal-delay="0.08">
          Get in touch.
        </h2>

        <p className={styles.copy} data-reveal data-reveal-delay="0.16">
          Open to full-time roles, contract work, and conversations about
          interesting problems. Drop me a line.
        </p>

        <div className={styles.links} data-reveal data-reveal-delay="0.24">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.linkBtn}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>

      </div>

      <footer className={styles.footer}>
        <span className={styles.footerText}>
          Sai Kiran Konda &middot; {year}
        </span>
      </footer>
    </section>
  )
}
