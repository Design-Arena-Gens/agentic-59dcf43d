'use client'

import { useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Particle system for atmosphere
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.3 + 0.1
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.y > canvasHeight) {
          this.y = 0
          this.x = Math.random() * canvasWidth
        }
        if (this.x > canvasWidth) this.x = 0
        if (this.x < 0) this.x = canvasWidth
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(180, 190, 210, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className={styles.main}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.sky}>
        <div className={styles.clouds}></div>
        <div className={styles.moon}></div>
        <div className={styles.moonGlow}></div>
      </div>

      <div className={styles.mountains}></div>

      <div className={styles.grassField}>
        <div className={styles.grassLayer1}></div>
        <div className={styles.grassLayer2}></div>
        <div className={styles.grassLayer3}></div>
      </div>

      <div className={styles.samuraiContainer}>
        <div className={styles.samurai}>
          <div className={styles.samuraiSilhouette}>
            <div className={styles.head}></div>
            <div className={styles.body}></div>
            <div className={styles.armLeft}></div>
            <div className={styles.armRight}></div>
            <div className={styles.legLeft}></div>
            <div className={styles.legRight}></div>
            <div className={styles.helmet}></div>
            <div className={styles.armorPlate}></div>
          </div>
          <div className={styles.katana}>
            <div className={styles.blade}></div>
            <div className={styles.handle}></div>
            <div className={styles.bladeGlow}></div>
          </div>
        </div>
      </div>

      <div className={styles.vignette}></div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>侍</h1>
        <p className={styles.subtitle}>In solitude, the warrior finds peace</p>
      </div>

      <div className={styles.fog}></div>
    </main>
  )
}
