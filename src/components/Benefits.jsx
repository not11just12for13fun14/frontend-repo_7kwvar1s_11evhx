export default function Benefits(){
  const items = [
    {title: "Desarrollo integral", desc: "Creatividad, emociones, pensamiento y carácter en armonía."},
    {title: "Metodología activa", desc: "Aprendemos haciendo: proyectos, juegos, música y movimiento."},
    {title: "Ambiente seguro", desc: "Grupos por edades con guías formados y espacios adecuados."},
    {title: "Valores y convivencia", desc: "Trabajo en equipo, respeto, autonomía y autoestima."},
  ]
  return (
    <section className="py-16" id="beneficios">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Beneficios para tu hijo/a</h2>
        <p className="mt-2 text-white/80 max-w-3xl">Nuestros cursos combinan habilidades académicas, sociales y artísticas en un entorno lúdico inspirado en el estilo visual de Pixar.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it,i)=> (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white hover:bg-white/10 transition">
              <div className="text-2xl">✨</div>
              <h3 className="mt-2 font-semibold">{it.title}</h3>
              <p className="text-white/80 text-sm mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
