import { useState } from 'react'

const SEDES = [
  { label: 'San Isidro', email: 'sanisidro@acropolisperu.org', ecommerce: 'https://cursosacropolisperu.org/kids' },
  { label: 'La Molina', email: 'lamolina@acropolisperu.org' },
  { label: 'Pueblo Libre', email: 'pueblo@acropolisperu.org' },
  { label: 'Breña', email: 'brena@acropolisperu.org' },
  { label: 'San Miguel', email: 'sanmiguel@acropolisperu.org' },
]

export default function CTAForm(){
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({
    parent_name: '', parent_email: '', parent_phone: '',
    child_name: '', child_age: '', program: 'Mini Kids (4-5 y 5-6)', sede: 'San Isidro',
    courses: [], message: ''
  })

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${backend}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, child_age: Number(form.child_age) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Error')
      setStatus('ok')
    } catch (err) {
      setStatus('error')
    }
  }

  const toggleCourse = (name) => {
    setForm(f => {
      const exists = f.courses.includes(name)
      return { ...f, courses: exists ? f.courses.filter(c => c !== name) : [...f.courses, name] }
    })
  }

  const courseList = [
    'Comprensión lectora', 'Gestión emocional', 'Matemáticas divertidas', 'Oratoria', 'Atención y concentración', 'Canto', 'Caligrafía y escritura', 'Anime y Manga', 'Dibujo 3D', 'Dibujo Kawaii', 'Pintura y acuarela', 'Teatro y clown', 'Juegos de mesa', 'Yoga Kids', 'Robótica', 'Autoestima'
  ]

  const sedeInfo = SEDES.find(s => s.label === form.sede)

  return (
    <section className="py-16" id="formulario">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Solicita información o reserva tu cupo</h2>
            <p className="text-white/80 mt-2">Elige la sede, cuéntanos sobre tu hijo/a y los cursos de interés. Te contactaremos a la brevedad.</p>

            {sedeInfo?.ecommerce && (
              <a href={sedeInfo.ecommerce} target="_blank" className="mt-6 inline-flex items-center rounded-xl bg-emerald-400 text-slate-900 font-semibold px-6 py-3 shadow-lg shadow-emerald-400/30 hover:shadow-emerald-400/50 transition">
                Ir a inscripción online en San Isidro
              </a>
            )}
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80">Nombre del padre/madre</label>
                <input required value={form.parent_name} onChange={e=>setForm({...form, parent_name:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/80">Email</label>
                <input type="email" required value={form.parent_email} onChange={e=>setForm({...form, parent_email:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/80">Teléfono</label>
                <input required value={form.parent_phone} onChange={e=>setForm({...form, parent_phone:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/80">Nombre del niño/niña</label>
                <input required value={form.child_name} onChange={e=>setForm({...form, child_name:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/80">Edad</label>
                <input type="number" min={3} max={17} required value={form.child_age} onChange={e=>setForm({...form, child_age:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/80">Programa</label>
                <select value={form.program} onChange={e=>setForm({...form, program:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                  <option>Mini Kids (4-5 y 5-6)</option>
                  <option>Kids (7-13)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-white/80">Sede</label>
                <select value={form.sede} onChange={e=>setForm({...form, sede:e.target.value})} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                  {SEDES.map(s=> <option key={s.label}>{s.label}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-white/80">Cursos de interés</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {courseList.map(c => (
                    <label key={c} className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${form.courses.includes(c)?'bg-amber-400 text-slate-900 border-amber-300':'bg-white/10 text-white border-white/20'}`}>
                      <input type="checkbox" className="hidden" checked={form.courses.includes(c)} onChange={()=>toggleCourse(c)} />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-white/80">Mensaje</label>
                <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} rows={3} className="mt-1 w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between gap-3">
                <button disabled={status==='loading'} className="inline-flex items-center rounded-xl bg-amber-400 text-slate-900 font-semibold px-6 py-3 shadow hover:shadow-lg transition">
                  {status==='loading'?'Enviando...':'Enviar solicitud'}
                </button>
                {status==='ok' && <span className="text-emerald-300">¡Gracias! Te contactaremos pronto.</span>}
                {status==='error' && <span className="text-rose-300">Hubo un error. Inténtalo de nuevo.</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
