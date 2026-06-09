'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './VideoIntro.module.css'

export default function VideoIntro({
  videoSrc = '/intro.mp4',
  poster = '/intro-poster.jpg',
  tagline,
  firstName,
  lastName,
  role,
  scrollToId = 'next',
}) {
  const fgRef = useRef(null)
  const bgRef = useRef(null)

  const taglineRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const roleRef = useRef(null)

  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [showBadge, setShowBadge] = useState(true)

  // Keep backdrop time-synced (nudge only when drift > 0.25 s)
  useEffect(() => {
    const fg = fgRef.current
    const bg = bgRef.current
    if (!fg || !bg) return
    const sync = () => {
      if (Math.abs(fg.currentTime - bg.currentTime) > 0.25) {
        bg.currentTime = fg.currentTime
      }
    }
    fg.addEventListener('timeupdate', sync)
    return () => fg.removeEventListener('timeupdate', sync)
  }, [])

  // Auto-hide "Tap for sound" badge after 5 s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(false), 5000)
    return () => clearTimeout(t)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = [taglineRef.current, firstNameRef.current, lastNameRef.current, roleRef.current]
    gsap.set(els, { opacity: 0, y: 28 })
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: 'power3.out',
      delay: 0.4,
    })
  }, [])

  // Reflect muted state on the DOM node (React's muted prop is not reactive)
  useEffect(() => {
    if (fgRef.current) fgRef.current.muted = muted
  }, [muted])

  const togglePlay = () => {
    const fg = fgRef.current
    const bg = bgRef.current
    if (!fg) return
    if (playing) {
      fg.pause()
      bg?.pause()
    } else {
      fg.play().catch(() => {})
      bg?.play().catch(() => {})
    }
    setPlaying((p) => !p)
  }

  const toggleMute = () => {
    setMuted((m) => {
      if (m) setShowBadge(false) // unmuting — hide badge immediately
      return !m
    })
  }

  const scrollToNext = () => {
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.hero}>
      {/* Ambient blurred backdrop */}
      <video
        ref={bgRef}
        className={styles.bgVideo}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Foreground video */}
      <video
        ref={fgRef}
        className={styles.fgVideo}
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero copy — bottom left */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          {tagline}
        </span>
        <h1 className={styles.name}>
          <span ref={firstNameRef} className={styles.firstName}>
            {firstName}
          </span>
          <span ref={lastNameRef} className={styles.lastName}>
            {lastName}
          </span>
        </h1>
        <p ref={roleRef} className={styles.role}>
          {role}
        </p>
      </div>

      {/* Playback controls — bottom right */}
      <div className={styles.controls}>
        <button className={styles.btn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button className={styles.btn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {showBadge && (
          <span className={styles.soundBadge}>Tap for sound</span>
        )}
      </div>

      {/* Scroll cue */}
      <button className={styles.scrollCue} onClick={scrollToNext} aria-label="Scroll to content">
        <div className={styles.scrollLine} />
      </button>
    </div>
  )
}
