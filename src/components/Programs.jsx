export default function Programs(){
  const miniKids = [
    "Comprensión y manejo de las emociones",
    "Fortalecimiento del carácter y seguridad en sí mismo",
    "Matemáticas divertidas",
    "Prácticas de atención y concentración",
    "Aprendiendo a cantar",
    "Caligrafía y escritura creativa",
    "Dibujo Kawaii",
    "Pintura y acuarela",
    "Teatro y clown",
    "Tiempo fuera de la pantalla: juegos de mesa",
    "Yoga Kids",
    "Gestión emocional",
  ]

  const kids = [
    "Comprensión lectora y ortografía",
    "Comprensión y manejo de las emociones",
    "Fortalecimiento del carácter y seguridad en sí mismo",
    "Matemáticas divertidas",
    "Oratoria y expresión corporal",
    "Prácticas de atención y concentración",
    "Creación de anime e historietas tipo Manga",
    "Dibujo arquitectónico en 3D",
    "Robótica electrónica",
    "Autoestima",
    "Teatro y clown",
  ]

  const Badge = ({children}) => (
    <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white text-sm px-3 py-1">{children}</span>
  )

  return (
    <section className="py-16" id="programas">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Programas</h2>
        <p className="text-white/80 mt-2 max-w-3xl">Dos líneas por edades para potenciar habilidades según su etapa de desarrollo.</p>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl p-6 border border-pink-200/20 bg-gradient-to-br from-pink-400/10 via-fuchsia-400/10 to-amber-300/10">
            <div className="flex items-center gap-3">
              <Badge>4 a 6 años</Badge>
              <h3 className="text-2xl font-semibold text-white">Mini Kids</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {miniKids.map((c,i)=> (
                <li key={i} className="text-white/90 flex items-start gap-2"><span>•</span><span>{c}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl p-6 border border-sky-200/20 bg-gradient-to-br from-sky-400/10 via-indigo-400/10 to-emerald-300/10">
            <div className="flex items-center gap-3">
              <Badge>7 a 13 años</Badge>
              <h3 className="text-2xl font-semibold text-white">Kids</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {kids.map((c,i)=> (
                <li key={i} className="text-white/90 flex items-start gap-2"><span>•</span><span>{c}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
