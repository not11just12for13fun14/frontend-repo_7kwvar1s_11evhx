import { motion } from 'framer-motion'
import { useState } from 'react'
import AgeModal from './AgeModal'

export default function Hero() {
  const [open, setOpen] = useState(false)

  const float = (delay = 0, y = 10, duration = 3) => ({
    animate: { y: [0, -y, 0] },
    transition: { repeat: Infinity, duration, delay, ease: 'easeInOut' }
  })

  return (
    <section className="relative overflow-hidden">
      {/* SUMMER SKY BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {/* Sunset gradient sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-400 via-amber-300 to-sky-300" />
        {/* Sun glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 0.9 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[56rem] h-[56rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.75),_rgba(255,255,255,0)_60%)]"/>
        {/* Soft clouds */}
        <motion.div {...float(0.2, 8, 6)} className="absolute top-10 left-10 w-64 h-32 rounded-full blur-2xl bg-white/50" />
        <motion.div {...float(0.6, 10, 7)} className="absolute top-24 right-12 w-72 h-36 rounded-full blur-2xl bg-white/40" />
        <motion.div {...float(1.1, 7, 5.5)} className="absolute top-40 left-1/3 w-52 h-24 rounded-full blur-xl bg-white/40" />
        {/* Horizon shimmer */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-amber-200/60 via-amber-100/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
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

        {/* ILLUSTRATED SUMMER SCENE */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Card with Pixar-ish glossy glass */}
            <div className="aspect-[4/3] rounded-[28px] p-1 shadow-2xl bg-gradient-to-br from-sky-400 to-fuchsia-400">
              <div className="w-full h-full rounded-[24px] bg-white/20 backdrop-blur-xl relative overflow-hidden">
                {/* Sea */}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-sky-400/80 via-sky-300/70 to-transparent" />
                {/* Sand */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-amber-300/90 via-amber-200/80 to-transparent" />

                {/* Floating items */}
                <motion.div {...float(0.1, 8, 4.5)} className="absolute left-6 bottom-24 text-5xl">🏖️</motion.div>
                <motion.div {...float(0.4, 10, 5)} className="absolute right-8 bottom-28 text-5xl">🪁</motion.div>
                <motion.div {...float(0.7, 6, 4)} className="absolute left-1/2 -translate-x-1/2 bottom-20 text-5xl">🏄‍♂️</motion.div>
                <motion.div {...float(1.2, 7, 5.2)} className="absolute left-10 bottom-6 text-4xl">⭐</motion.div>
                <motion.div {...float(1.5, 9, 5.8)} className="absolute right-12 bottom-8 text-5xl">🏖️</motion.div>
                <motion.div {...float(1.8, 12, 6.2)} className="absolute left-8 top-8 text-5xl">🌴</motion.div>

                {/* Kids icons grid like stickers */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  className="absolute inset-x-6 top-6 grid grid-cols-3 gap-3"
                >
                  {['🎨','🎭','🎵','📚','🤹','🧠','📐','🤖','🧘'].map((e, i) => (
                    <motion.div
                      key={i}
                      variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                      whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                      className="aspect-square rounded-2xl bg-white/30 border border-white/40 flex items-center justify-center text-3xl shadow-[0_6px_20px_rgba(255,255,255,0.35)]"
                    >
                      <span className="drop-shadow-lg">{e}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Sparkles */}
                <motion.div {...float(0.3, 6, 3.8)} className="absolute top-6 right-6 text-3xl">✨</motion.div>
                <motion.div {...float(0.9, 6, 4.1)} className="absolute top-10 left-8 text-3xl">✨</motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative wave divider */}
      <div className="absolute bottom-0 inset-x-0 -mb-1">
        <svg className="w-full h-16 text-amber-200/70" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,67 C150,120 350,0 600,67 C850,134 1050,0 1200,67 C1350,134 1440,67 1440,67 L1440,150 L0,150 Z"></path>
        </svg>
      </div>

      <AgeModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
