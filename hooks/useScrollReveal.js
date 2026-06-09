import { useEffect } from 'react'
import gsap from 'gsap'

export function useScrollReveal(containerRef, { threshold = 0.12 } = {}) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(container.querySelectorAll('[data-reveal]'))
    if (!els.length) return

    gsap.set(els, { opacity: 0, y: 36 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = parseFloat(entry.target.dataset.revealDelay ?? '0')
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay,
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
