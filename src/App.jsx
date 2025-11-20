import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Programs from './components/Programs'
import CTAForm from './components/CTAForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
        <div className="relative">
          <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-fuchsia-400 to-sky-400" />
              <div className="text-white font-semibold">Nueva Acrópolis - Verano Kids</div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-white/90">
              <a href="#beneficios" className="hover:text-white">Beneficios</a>
              <a href="#programas" className="hover:text-white">Programas</a>
              <a href="#formulario" className="hover:text-white">Inscríbete</a>
            </nav>
          </header>
          <Hero />
          <Benefits />
          <Programs />
          <CTAForm />
          <footer className="py-10 text-center text-white/60 text-sm">© {new Date().getFullYear()} Nueva Acrópolis Lima</footer>
        </div>
      </div>
    </div>
  )
}

export default App
