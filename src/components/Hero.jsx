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

  // Accessibility: respect reduced motion
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(!!mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

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
    const onLeave = () => { mx.set(0); my.set(0) }

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

  const float = (delay = 0, y = 10, duration = 3) => reduceMotion ? {} : ({
    animate: { y: [0, -y, 0] },
    transition: { repeat: Infinity, duration, delay, ease: 'easeInOut' }
  })

  // 3D tilt of the scene card for a more "Pixar-like" depth
  const tiltX = useTransform(my, v => reduceMotion ? 0 : (-v * 6))
  const tiltY = useTransform(mx, v => reduceMotion ? 0 : (v * 6))
  const tiltScale = useTransform(mx, v => reduceMotion ? 1 : 1.02)

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* BACKGROUND: sunset + volumetric light to push a pseudo-3D vibe */}
      <div className="absolute inset-0 -z-10">
        {/* Sky gradient with subtle parallax */}
        <motion.div
          style={layer(-18, -10)}
          className="absolute inset-0 bg-gradient-to-b from-[#FF8BA7] via-[#FFD18B] to-[#8BD7FF]" />

        {/* Sun core + bloom */}
        <motion.div
          style={layer(-36, -22)}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[70rem] rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(255,247,230,0.95)_0%,rgba(255,247,230,0.35)_35%,rgba(255,247,230,0)_60%)]" />
          <div className="absolute -inset-10 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),rgba(255,255,255,0)_60%)]" />
        </motion.div>

        {/* Volumetric light beams */}
        <motion.div
          style={layer(-10, -6)}
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] opacity-50"
        >
          <div className="w-full h-full bg-[conic-gradient(from_200deg_at_50%_50%,rgba(255,255,255,0.18),rgba(255,255,255,0)_30%,rgba(255,255,255,0.18)_60%,rgba(255,255,255,0)_80%)] [mask-image:radial-gradient(closest-side,white,transparent)]" />
        </motion.div>

        {/* Soft clouds with depth-of-field (blurrier ones farther) */}
        <motion.div style={layer(40, 22)} {...float(0.2, 10, 6)} className="absolute top-16 left-6 w-72 h-36 rounded-[40px] blur-3xl bg-white/55" />
        <motion.div style={layer(-44, 24)} {...float(0.6, 12, 7)} className="absolute top-28 right-10 w-80 h-40 rounded-[44px] blur-3xl bg-white/45" />
        <motion.div style={layer(24, 14)} {...float(1.0, 9, 5.5)} className="absolute top-44 left-1/3 w-60 h-28 rounded-[36px] blur-2xl bg-white/45" />

        {/* Horizon bloom */}
        <motion.div style={layer(0, -10)} className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-amber-200/70 via-amber-100/25 to-transparent" />

        {/* Subtle film grain for a more cinematic, soft-3D feel */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* COPY */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_10px_40px_rgba(255,255,255,0.35)]"
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
              whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: reduceMotion ? 1 : 0.98 }}
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-2xl bg-amber-400 text-slate-900 font-extrabold px-7 py-3 shadow-[0_12px_36px_rgba(245,158,11,0.6)] hover:shadow-[0_16px_44px_rgba(245,158,11,0.75)] transition"
            >
              ☀️ Descubre cursos según su edad
            </motion.button>
            <motion.a
              whileHover={{ y: reduceMotion ? 0 : -2 }}
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

        {/* ILLUSTRATED SUMMER SCENE (3D-ish) */}
        <div className="relative">
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, scale: tiltScale }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md [perspective:1000px]"
          >
            {/* Card container with rim light */}
            <div className="aspect-[4/3] rounded-[28px] shadow-2xl p-[2px] bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.5),transparent_40%),linear-gradient(135deg,#60a5fa,#f472b6,#f59e0b)]">
              <div className="w-full h-full rounded-[26px] bg-white/15 backdrop-blur-xl relative overflow-hidden">
                {/* Ambient occlusion border */}
                <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/20 [box-shadow:inset_0_-30px_60px_rgba(0,0,0,0.15),inset_0_30px_60px_rgba(255,255,255,0.08)]" />

                {/* Animated sea with specular highlight */}
                <motion.div style={layer(-26, -10)} className="absolute bottom-0 inset-x-0 h-1/2">
                  {/* base waves */}
                  <svg className="absolute bottom-14 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z" fill="#38bdf8" fillOpacity="0.8">
                      <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z; M0,82 C160,122 320,42 480,82 C640,122 800,42 960,82 C1120,122 1280,42 1440,82 L1440,0 L0,0 Z; M0,78 C160,118 320,38 480,78 C640,118 800,38 960,78 C1120,118 1280,38 1440,78 L1440,0 L0,0 Z; M0,80 C160,120 320,40 480,80 C640,120 800,40 960,80 C1120,120 1280,40 1440,80 L1440,0 L0,0 Z" />
                    </path>
                  </svg>
                  <svg className="absolute bottom-7 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z" fill="#0ea5e9" fillOpacity="0.85">
                      <animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z; M0,92 C180,132 360,52 540,92 C720,132 900,52 1080,92 C1260,132 1440,52 1620,92 L1620,0 L0,0 Z; M0,88 C180,128 360,48 540,88 C720,128 900,48 1080,88 C1260,128 1440,48 1620,88 L1620,0 L0,0 Z; M0,90 C180,130 360,50 540,90 C720,130 900,50 1080,90 C1260,130 1440,50 1620,90 L1620,0 L0,0 Z" />
                    </path>
                  </svg>
                  {/* specular stripes */}
                  <div className="absolute inset-x-0 bottom-10 h-8 opacity-40 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.0)_0px,rgba(255,255,255,0.0)_20px,rgba(255,255,255,0.5)_21px,rgba(255,255,255,0.0)_42px)] animate-[shine_6s_linear_infinite]" />
                </motion.div>

                {/* Sand layer with curve + inner shadow */}
                <motion.svg style={layer(14, 14)} className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 170" preserveAspectRatio="none">
                  <defs>
                    <filter id="blurShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur"/>
                      <feOffset in="blur" dx="0" dy="-2" result="offset"/>
                      <feMerge>
                        <feMergeNode in="offset"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M0,110 C120,150 360,60 600,110 C840,160 1080,60 1320,110 C1440,138 1440,170 1440,170 L0,170 Z" fill="#fde68a" filter="url(#blurShadow)" />
                  <path d="M0,110 C120,150 360,60 600,110 C840,160 1080,60 1320,110" fill="none" stroke="#eab308" strokeOpacity="0.35" strokeWidth="6" />
                </motion.svg>

                {/* Palm and float ring with gentle bob */}
                <motion.img style={layer(16, 8)} {...float(0.3, 10, 4.6)} src={palm} alt="Palmera" className="absolute left-4 bottom-32 w-24 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]" />
                <motion.img style={layer(-14, 10)} {...float(0.6, 12, 5)} src={ring} alt="Flotador" className="absolute right-6 bottom-28 w-24 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]" />

                {/* Characters with rim light and depth */}
                <motion.div style={layer(-10, 6)} {...float(0.2, 8, 5)} className="absolute left-20 bottom-16">
                  <div className="relative">
                    <img src={kidBoy} alt="Niño feliz" className="w-24 drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)]" />
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/40 to-transparent mix-blend-screen" />
                  </div>
                </motion.div>
                <motion.div style={layer(12, 6)} {...float(0.4, 8, 5.5)} className="absolute right-20 bottom-16">
                  <div className="relative">
                    <img src={kidGirl} alt="Niña feliz" className="w-24 drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)]" />
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tl from-white/40 to-transparent mix-blend-screen" />
                  </div>
                </motion.div>

                {/* subtle foreground vignette for depth */}
                <div className="pointer-events-none absolute inset-0 rounded-[26px] [box-shadow:inset_0_-80px_120px_rgba(0,0,0,0.18)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative wave divider with subtle drift */}
      <motion.div style={layer(16, 0)} className="absolute bottom-0 inset-x-0 -mb-1">
        <svg className="w-full h-16 text-amber-200/70" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,67 C150,120 350,0 600,67 C850,134 1050,0 1200,67 C1350,134 1440,67 1440,67 L1440,150 L0,150 Z"></path>
        </svg>
      </motion.div>

      <AgeModal open={open} onClose={() => setOpen(false)} />

      {/* keyframes for specular shine */}
      <style>{`
        @keyframes shine { from { background-position: 0 0; } to { background-position: 200px 0; } }
      `}</style>
    </section>
  )
}
