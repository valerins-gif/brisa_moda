function Encabezado() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="font-titulo text-2xl font-bold text-mar-900">
          Brisa <span className="text-marca-500">Moda</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          <a href="#catalogo" className="hover:text-marca-600">
            Catálogo
          </a>
          <a href="#contacto" className="hover:text-marca-600">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  )
}
export default Encabezado