import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import AgeModal from './AgeModal'
import palm from '../assets/palm.svg'
import ring from '../assets/float-ring.svg'
import kidBoy from '../assets/kid-boy.svg'
import kidGirl from '../assets/kid-girl.svg'

export default function Hero() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  // Parallax motion values based on pointer position
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width // 0..1
      const y = (e.clientY - rect.top) / rect.height // 0..1
      mx.set((x - 0.5) * 2) // -1..1
      my.set((y - 0.5) * 2) // -1..1
    }
    const onLeave = () => {
      mx.set(0); my.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [mx, my])

  // Parallax helpers (depth = how far it moves)
  const layer = (depthX, depthY) => ({
    x: useTransform(mx, v => v * depthX),
    y: useTransform(my, v => v * depthY)
  })

  const float = (delay = 0, y = 10, duration = 3) => ({
    animate: { y: [0, -y, 0] },
    transition: { repeat: Infinity, duration, delay, ease: 'easeInOut' }
  })

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* ANIMATED PARALLAX SKY BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {/* Sunset gradient sky (slight parallax) */}
        <motion.div
          style={layer(-10, -6)}
          className="absolute inset-0 bg-gradient-to-b from-rose-400 via-amber-300 to-sky-300" />

        {/* Sun glow */}
        <motion.div
          style={layer(-24, -14)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.9 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[56rem] h-[56rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.75),_rgba(255,255,255,0)_60%)]"/>

        {/* Soft clouds */}
        <motion.div style={layer(30, 16)} {...float(0.2, 8, 6)} className="absolute top-10 left-10 w-64 h-32 rounded-full blur-2xl bg-white/50" />
        <motion.div style={layer(-36, 18)} {...float(0.6, 10, 7)} className="absolute top-24 right-12 w-72 h-36 rounded-full blur-2xl bg-white/40" />
        <motion.div style={layer(18, 12)} {...float(1.1, 7, 5.5)} className="absolute top-40 left-1/3 w-52 h-24 rounded-full blur-xl bg-white/40" />

        {/* Horizon shimmer */}
        <motion.div style={layer(0, -8)} className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-amber-200/60 via-amber-100/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* COPY */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_6px_30px_rgba(255,255,255,0.35)]"
          >
            Verano Kids con magia Pixar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-white/95 max-w-xl"
          >
            Colores vibrantes, alegría y aprendizaje jugando. Programas Mini Kids (4–6) y Kids (7–13) con cursos creativos, emociones, arte y más.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-2xl bg-amber-400 text-slate-900 font-extrabold px-7 py-3 shadow-[0_10px_30px_rgba(245,158,11,0.55)] hover:shadow-[0_14px_36px_rgba(245,158,11,0.7)] transition"
            >
              ☀️ Descubre cursos según su edad
            </motion.button>
            <motion.a
              whileHover={{ y: -2 }}
              href="#formulario"
              className="inline-flex items-center rounded-2xl bg-white/20 text-white backdrop-blur px-7 py-3 border border-white/30 hover:bg-white/30 transition font-semibold"
            >
              🎟️ Inscríbete / pide info
            </motion.a>
          </div>

          <div className="mt-6 text-white/90 text-sm">
            Sedes: San Isidro • La Molina • Pueblo Libre • Breña • San Miguel
          </div>
        </div>

        {/* ILLUSTRATED SUMMER SCENE (SVG + Parallax) */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Card container */}
            <div className="aspect-[4/3] rounded-[28px] shadow-2xl bg-gradient-to-br from-sky-400 to-fuchsia-400 p-[2px]">
              <div className="w-full h-full rounded-[26px] bg-white/20 backdrop-blur-xl relative overflow-hidden">
                {/* Animated sea waves using SVG */}
                <motion.div style={layer(-20, -6)} className="absolute bottom-0 inset-x-0 h-1/2">
                  <svg className="absolute bottom-12 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z" fill="#38bdf8" fillOpacity="0.75">
                      <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z; M0,82 C160,122 320,42 480,82 C640,122 800,42 960,82 C1120,122 1280,42 1440,82 L1440,0 L0,0 Z; M0,78 C160,118 320,38 480,78 C640,118 800,38 960,78 C1120,118 1280,38 1440,78 L1440,0 L0,0 Z; M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z" />
                    </path>
                  </svg>
                  <svg className="absolute bottom-6 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z" fill="#0ea5e9" fillOpacity="0.75">
                      <animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z; M0,92 C180,132 360,52 540,92 C720,132 900,52 1080,92 C1260,132 1440,52 1620,92 L1620,0 L0,0 Z; M0,88 C180,128 360,48 540,88 C720,128 900,48 1080,88 C1260,128 1440,48 1620,88 L1620,0 L0,0 Z; M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z" />
                    </path>
                  </svg>
                </motion.div>

                {/* Sand layer with curve */}
                <motion.svg style={layer(8, 10)} className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
                  <path d="M0,110 C120,150 360,60 600,110 C840,160 1080,60 1320,110 C1440,138 1440,160 1440,160 L0,160 Z" fill="#fde68a" />
                </motion.svg>

                {/* Palm and float ring assets */}
                <motion.img style={layer(12, 6)} {...float(0.3, 8, 4.6)} src={palm} alt="Palmera" className="absolute left-4 bottom-28 w-24 drop-shadow-lg" />
                <motion.img style={layer(-10, 8)} {...float(0.6, 10, 5)} src={ring} alt="Flotador" className="absolute right-6 bottom-24 w-24 drop-shadow-lg" />

                {/* Kids characters for target audience clarity */}
                <motion.img style={layer(-6, 4)} {...float(0.2, 6, 5)} src={kidBoy} alt="Niño feliz" className="absolute left-24 bottom-16 w-24 drop-shadow-xl" />
                <motion.img style={layer(6, 4)} {...float(0.4, 6, 5.5)} src={kidGirl} alt="Niña feliz" className="absolute right-24 bottom-16 w-24 drop-shadow-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative wave divider with subtle drift */}
      <motion.div style={layer(10, 0)} className="absolute bottom-0 inset-x-0 -mb-1">
        <svg className="w-full h-16 text-amber-200/70" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,67 C150,120 350,0 600,67 C850,134 1050,0 1200,67 C1350,134 1440,67 1440,67 L1440,150 L0,150 Z"></path>
        </svg>
      </motion.div>

      <AgeModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
