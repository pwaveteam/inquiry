'use client'
import { useEffect } from 'react'
import * as easingUtils from 'easing-utils'
import { motion } from 'framer-motion'

export default function AboutHero() {
  useEffect(() => {
    class BlackHole {
      canvas: HTMLCanvasElement
      ctx: CanvasRenderingContext2D
      render: any
      discs: any[] = []
      dots: any[] = []
      startDisc: any = {}
      frame: number | null = null
      frameSkip = 0

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        this.setSizes()
        window.addEventListener('resize', this.onResize.bind(this))
        this.tick = this.tick.bind(this)
        this.frame = requestAnimationFrame(this.tick)
      }

      onResize() {
        this.setSizes()
      }

      setSizes() {
        const rect = this.canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio, 1.5)
        this.render = { width: rect.width, height: rect.height, dpi: dpr }
        this.canvas.width = rect.width * dpr
        this.canvas.height = rect.height * dpr
        this.ctx.scale(dpr, dpr)
        this.setGraphics()
      }

      setGraphics() {
        this.setDiscs()
        this.setDots()
      }

      setDiscs() {
        this.discs = []
        const totalDiscs = 100
        const w = this.render.width
        const h = this.render.height
        this.startDisc = { x: w * 0.5, y: 0, w, h }
        for (let i = 0; i < totalDiscs; i++) {
          const p = i / totalDiscs
          this.discs.push(this.tweenDisc({ p }))
        }
      }

      setDots() {
        this.dots = []
        const totalDots = 5000
        for (let i = 0; i < totalDots; i++) {
          const d = this.discs[Math.floor(this.discs.length * Math.random())]
          this.dots.push({
            d,
            a: 0,
            c: `rgb(${40 + Math.random() * 20}, ${120 + Math.random() * 80}, ${255 - Math.random() * 80})`,
            p: Math.random(),
            o: 0.5 + Math.random() * 0.5,
          })
        }
      }

      tweenDisc(disc: any) {
        const s = this.startDisc
        const sx = this.tweenValue(1, 0, disc.p, 'outCubic')
        const sy = this.tweenValue(1, 0, disc.p, 'outExpo')
        disc.sx = sx
        disc.sy = sy
        disc.w = s.w * sx
        disc.h = s.h * sy
        disc.x = s.x
        disc.y = s.y + disc.p * s.h
        return disc
      }

      tweenValue(start: number, end: number, p: number, ease: string) {
        const delta = end - start
        const fn =
          (easingUtils as Record<string, (x: number) => number>)[
            'ease' + ease.charAt(0).toUpperCase() + ease.slice(1)
          ] || ((x: number) => x)
        return start + delta * fn(p)
      }

      moveDiscs() {
        this.discs.forEach((d) => {
          d.p = (d.p + 0.0004) % 1
          this.tweenDisc(d)
          const p = d.sx * d.sy
          d.a = p < 0.01 ? Math.pow(Math.min(p / 0.01, 1), 3) : 1 - Math.min((p - 0.2) / 0.8, 1)
        })
      }

      moveDots() {
        this.dots.forEach((dot) => {
          const v = this.tweenValue(0, 0.001, 1 - dot.d.sx * dot.d.sy, 'inExpo')
          dot.p = (dot.p + v) % 1
        })
      }

      drawDots() {
        const ctx = this.ctx
        for (const dot of this.dots) {
          const { d, a, p, c, o } = dot
          ctx.fillStyle = c
          const newA = a + Math.PI * 2 * p
          const x = d.x + Math.cos(newA) * d.w
          const y = d.y + Math.sin(newA) * d.h
          ctx.globalAlpha = d.a * o
          ctx.beginPath()
          ctx.arc(x, y + d.h, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      tick() {
        if (document.hidden) return
        if (++this.frameSkip % 2 !== 0) {
          this.frame = requestAnimationFrame(this.tick)
          return
        }
        const ctx = this.ctx
        ctx.clearRect(0, 0, this.render.width, this.render.height)
        this.moveDiscs()
        this.moveDots()
        this.drawDots()
        this.frame = requestAnimationFrame(this.tick)
      }

      destroy() {
        if (this.frame) cancelAnimationFrame(this.frame)
        window.removeEventListener('resize', this.onResize)
      }
    }

    const canvas = document.querySelector('.js-canvas') as HTMLCanvasElement
    if (canvas) {
      const instance = new BlackHole(canvas)
      return () => instance.destroy()
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <canvas className="js-canvas absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
        <h1 className="font-[PPNeueMontreal] text-[4rem] font-light leading-[0.9] mb-16 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        Pulse turns strategy<br />into results
        </h1>


        <motion.div
  className="relative flex flex-col items-center text-white/80 z-[3] pointer-events-none mt-[-10px]"
  initial={{ opacity: 0.7 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.6 }}
>
  <span className="text-[12px] tracking-[0.15em] mb-[14px] uppercase">Scroll</span>
  <div className="w-[2px] h-[40px] bg-white/20 relative overflow-hidden rounded-full">
    <motion.div
      animate={{ y: [-40, 40] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute top-0 left-0 w-full h-[20px] bg-white"
    />
  </div>
</motion.div>



      </div>
    </section>
  )
}
