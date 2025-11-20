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

  const kids79 = [
    "Comprensión Lectora",
    "Comprensión y manejo de las emociones",
    "Fortalecimiento del carácter y seguridad en sí mismo",
    "Matemáticas Divertidas",
    "Oratoria y expresión corporal kids",
    "Prácticas de atención y concentración para la vida escolar",
  ]

  const kids812 = [
    "Aprendiendo a cantar",
    "Caligrafía y escritura creativa",
    "Creación de ánime e historietas (Manga)",
    "Dibujo arquitectónico en 3D",
    "Dibujo Kawaii, pintura y acuarela",
    "Pintura y acuarela",
    "Teatro y clown",
    "Tiempo fuera de la pantalla APRENDE JUEGOS DE MESA",
    "Yoga Kids",
  ]

  const kids1012 = [
    "Aprende a estudiar, entender y memorizar",
    "Autoestima y desarrollo del carácter Kids",
    "Comprensión Lectora y ortografía",
    "Desarrollo de habilidades para socializar",
    "Gestión emocional Kids",
    "Matemáticas Divertidas",
    "Oratoria y liderazgo Kids",
    "Prácticas de atención y concentración para la vida escolar",
    "Vocalización y dicción KIDS",
  ]

  const Badge = ({children}) => (
    <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white text-sm px-3 py-1">{children}</span>
  )

  const SubTitle = ({children}) => (
    <div className="flex items-center gap-3 mt-4">
      <Badge>{children}</Badge>
    </div>
  )

  const Bullet = ({text}) => (
    <li className="text-white/90 flex items-start gap-2"><span>•</span><span>{text}</span></li>
  )

  return (
    <section className="py-16" id="programas">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Programas</h2>
        <p className="text-white/80 mt-2 max-w-3xl">Dos líneas por edades para potenciar habilidades según su etapa de desarrollo.</p>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Mini Kids */}
          <div className="rounded-3xl p-6 border border-pink-200/20 bg-gradient-to-br from-pink-400/10 via-fuchsia-400/10 to-amber-300/10">
            <div className="flex items-center gap-3">
              <Badge>4-5 y 5-6 años</Badge>
              <h3 className="text-2xl font-semibold text-white">Mini Kids</h3>
            </div>
            <p className="text-white/80 mt-2">Dos subniveles para acompañar mejor su desarrollo: 4-5 años y 5-6 años.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              {miniKids.map((c,i)=> (
                <Bullet key={i} text={c} />
              ))}
            </ul>
          </div>

          {/* Kids */}
          <div className="rounded-3xl p-6 border border-sky-200/20 bg-gradient-to-br from-sky-400/10 via-indigo-400/10 to-emerald-300/10">
            <div className="flex items-center gap-3">
              <Badge>7 a 13 años</Badge>
              <h3 className="text-2xl font-semibold text-white">Kids</h3>
            </div>

            <div className="mt-4">
              <SubTitle>7-9 años</SubTitle>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {kids79.map((c,i)=> <Bullet key={"79-"+i} text={c} />)}
              </ul>

              <SubTitle>8-12 años</SubTitle>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {kids812.map((c,i)=> <Bullet key={"812-"+i} text={c} />)}
              </ul>

              <SubTitle>10-12 años</SubTitle>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {kids1012.map((c,i)=> <Bullet key={"1012-"+i} text={c} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
