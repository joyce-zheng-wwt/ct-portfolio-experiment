'use client'

import { useEffect, useRef } from 'react'

class Particle {
  x = 0; y = 0; vx = 0; vy = 0; life = 0; size = 0
  W: number; H: number

  constructor(W: number, H: number) {
    this.W = W; this.H = H
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.W
    this.y = Math.random() * this.H
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.life = Math.random()
    this.size = Math.random() * 1.2 + 0.3
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life += 0.003
    if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H || this.life > 1) {
      this.reset()
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const a = Math.sin(this.life * Math.PI) * 0.5
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(33,6,117,${a})`
    ctx.fill()
  }
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let particles: Particle[] = []
    let rafId: number

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
      particles.forEach((p) => { p.W = W; p.H = H })
    }

    function drawGrid() {
      ctx!.strokeStyle = 'rgba(33,6,117,0.04)'
      ctx!.lineWidth = 0.5
      const step = 80
      for (let x = 0; x < W; x += step) {
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, H); ctx!.stroke()
      }
      for (let y = 0; y < H; y += step) {
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(W, y); ctx!.stroke()
      }
    }

    function drawConnections() {
      ctx!.lineWidth = 0.4
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            const a = (1 - d / 120) * 0.1
            ctx!.strokeStyle = `rgba(33,6,117,${a})`
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, W, H)
      drawGrid()
      drawConnections()
      particles.forEach((p) => { p.update(); p.draw(ctx!) })
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    resize()
    for (let i = 0; i < 90; i++) particles.push(new Particle(W, H))
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} />
}
