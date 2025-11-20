import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-pink-400 via-yellow-300 to-sky-400" />
        <div className="absolute -bottom-24 -right-24 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-emerald-300" />
      </div>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow">
            Verano Kids Nueva Acrópolis Lima
          </motion.h1>
          <p className="mt-5 text-lg md:text-xl text-white/90 max-w-xl">
            Programas creativos y formativos para Mini Kids (4-6) y Kids (7-13) en un mundo visual estilo Pixar: explora, aprende y crece con diversión.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#programas" className="inline-flex items-center rounded-xl bg-amber-400 text-slate-900 font-semibold px-6 py-3 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition">
              Ver programas
            </a>
            <a href="#formulario" className="inline-flex items-center rounded-xl bg-white/10 text-white backdrop-blur px-6 py-3 border border-white/20 hover:bg-white/20 transition">
              Pedir información
            </a>
          </div>
          <div className="mt-6 text-white/80 text-sm">
            Sedes: San Isidro • La Molina • Pueblo Libre • Breña • San Miguel
          </div>
        </div>
        <div className="relative">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }} className="relative mx-auto w-full max-w-md">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-sky-400 via-fuchsia-400 to-amber-300 p-1 shadow-2xl">
              <div className="w-full h-full rounded-[22px] bg-slate-900/80 backdrop-blur p-6 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 w-full">
                  {["📚","🎨","🤹","🧠","🎭","🎵","🤖","📐","🧘"].map((e,i)=> (
                    <div key={i} className="aspect-square rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl">
                      <span className="drop-shadow">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
