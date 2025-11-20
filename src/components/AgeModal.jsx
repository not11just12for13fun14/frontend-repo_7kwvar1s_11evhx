import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COURSES_79 = [
  'Comprensión Lectora',
  'Comprensión y manejo de las emociones',
  'Fortalecimiento del carácter y seguridad en sí mismo',
  'Matemáticas Divertidas',
  'Oratoria y expresión corporal kids',
  'Prácticas de atención y concentración para la vida escolar',
]

const COURSES_812 = [
  'Aprendiendo a cantar',
  'Caligrafía y escritura creativa',
  'Creación de ánime e historietas (Manga)',
  'Dibujo arquitectónico en 3D',
  'Dibujo Kawaii, pintura y acuarela',
  'Pintura y acuarela',
  'Teatro y clown',
  'Tiempo fuera de la pantalla APRENDE JUEGOS DE MESA',
  'Yoga Kids',
]

const COURSES_1012 = [
  'Aprende a estudiar, entender y memorizar',
  'Autoestima y desarrollo del carácter Kids',
  'Comprensión Lectora y ortografía',
  'Desarrollo de habilidades para socializar',
  'Gestión emocional Kids',
  'Matemáticas Divertidas',
  'Oratoria y liderazgo Kids',
  'Prácticas de atención y concentración para la vida escolar',
  'Vocalización y dicción KIDS',
]

export default function AgeModal({ open, onClose }){
  const [selected, setSelected] = useState([])

  const toggleAge = (age) => {
    setSelected(prev => prev.includes(age) ? prev.filter(a=>a!==age) : [...prev, age])
  }

  const { program, recommended } = useMemo(()=>{
    if (!selected.length) return { program: null, recommended: [] }
    const minAge = Math.min(...selected)
    const maxAge = Math.max(...selected)
    // Determine program
    const program = maxAge >= 7 ? 'Kids' : 'Mini Kids (general)'

    const set = new Set()
    // Ranges
    if (selected.some(a=> a>=7 && a<=9)) COURSES_79.forEach(c=>set.add(c))
    if (selected.some(a=> a>=8 && a<=12)) COURSES_812.forEach(c=>set.add(c))
    if (selected.some(a=> a>=10 && a<=12)) COURSES_1012.forEach(c=>set.add(c))

    return { program, recommended: Array.from(set) }
  }, [selected])

  const ages = [4,5,6,7,8,9,10,11,12]

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur" onClick={onClose} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} className="relative max-w-2xl w-full mx-6 rounded-3xl border border-white/10 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-amber-400 via-fuchsia-400 to-sky-400" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-emerald-300" />
            <div className="relative bg-slate-900/90 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Elige la edad de tu hijo/a</h3>
                  <p className="text-white/80">Te mostraremos los cursos disponibles según su etapa.</p>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white text-xl">×</button>
              </div>
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ages.map(age => (
                  <button key={age} onClick={()=>toggleAge(age)} className={`rounded-2xl px-3 py-2 text-white text-sm border transition ${selected.includes(age) ? 'bg-amber-400 text-slate-900 border-amber-300 shadow' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                    {age} años
                  </button>
                ))}
              </div>

              <div className="mt-6">
                {program ? (
                  <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
                    <div className="text-white/90 text-sm">Programa sugerido</div>
                    <div className="text-white text-lg font-semibold mt-1">{program}</div>
                    {program.startsWith('Mini Kids') && (
                      <div className="text-white/70 text-sm mt-1">Programa general 4-6: pronto más detalle. Nuestro equipo te guiará con el contenido ideal.</div>
                    )}
                  </div>
                ) : (
                  <div className="text-white/70">Selecciona al menos una edad para ver recomendaciones.</div>
                )}
              </div>

              {recommended.length > 0 && (
                <div className="mt-6">
                  <div className="text-white font-semibold">Cursos recomendados</div>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recommended.map((c, i) => (
                      <li key={i} className="text-white/90 flex items-start gap-2"><span>•</span><span>{c}</span></li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#formulario" onClick={onClose} className="inline-flex items-center rounded-xl bg-amber-400 text-slate-900 font-semibold px-5 py-2.5 shadow hover:shadow-lg transition">Solicitar información</a>
                <button onClick={()=>setSelected([])} className="inline-flex items-center rounded-xl bg-white/10 text-white px-5 py-2.5 border border-white/20 hover:bg-white/20 transition">Limpiar</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
