'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const FULL_COUNT = 300
const SMALL_COUNT = 120

function buildSpriteTexture() {
  const size = 64
  const cv = document.createElement('canvas')
  cv.width = size
  cv.height = size
  const ctx = cv.getContext('2d')
  const mid = size / 2
  const grad = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(cv)
}

export default function CinematicLayer({ className }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 640
    const count = isMobile ? SMALL_COUNT : FULL_COUNT

    // ── renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(wrap.clientWidth || window.innerWidth, wrap.clientHeight || window.innerHeight)
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
    })
    wrap.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      (wrap.clientWidth || window.innerWidth) / (wrap.clientHeight || window.innerHeight),
      0.1,
      1000,
    )
    camera.position.z = 5

    // ── sprite texture ─────────────────────────────────────────
    const sprite = buildSpriteTexture()

    // ── geometry ───────────────────────────────────────────────
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const phases = new Float32Array(count) // per-particle sine phase

    const warm = new THREE.Color('#ff9a3c')
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      const mix = Math.random()
      const c = white.clone().lerp(warm, mix)
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      phases[i] = Math.random() * Math.PI * 2
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    // keep a copy of the original y values for drift
    const baseY = new Float32Array(count)
    for (let i = 0; i < count; i++) baseY[i] = positions[i * 3 + 1]

    // ── material ───────────────────────────────────────────────
    const mat = new THREE.PointsMaterial({
      size: 0.18,
      map: sprite,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── mouse parallax ─────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const camTarget = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── resize ─────────────────────────────────────────────────
    const onResize = () => {
      const w = wrap.clientWidth || window.innerWidth
      const h = wrap.clientHeight || window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── visibility (IntersectionObserver) ─────────────────────
    let visible = true
    let rafId = null

    const scheduleFrame = () => {
      rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible
        visible = entry.isIntersecting
        if (!wasVisible && visible && rafId === null) scheduleFrame()
      },
      { threshold: 0 },
    )
    observer.observe(wrap)

    // ── animation loop ─────────────────────────────────────────
    const tick = (time) => {
      if (!visible) {
        rafId = null
        return
      }
      rafId = requestAnimationFrame(tick)

      if (!prefersReduced) {
        const t = time * 0.0004
        const posAttr = geo.attributes.position
        for (let i = 0; i < count; i++) {
          posAttr.array[i * 3 + 1] = baseY[i] + Math.sin(t + phases[i]) * 0.28
        }
        posAttr.needsUpdate = true

        camTarget.x += (mouse.x * 0.45 - camTarget.x) * 0.045
        camTarget.y += (mouse.y * 0.28 - camTarget.y) * 0.045
        camera.position.x = camTarget.x
        camera.position.y = camTarget.y
      }

      renderer.render(scene, camera)
    }

    scheduleFrame()

    // ── cleanup ────────────────────────────────────────────────
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      renderer.dispose()
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={wrapRef} className={className} />
}
