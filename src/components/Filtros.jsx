const CATEGORIAS = [
  { valor: 'todas', nombre: 'Todo' },
  { valor: 'hombre', nombre: 'Hombre' },
  { valor: 'mujer', nombre: 'Mujer' },
  { valor: 'accesorios', nombre: 'Accesorios' },
]
function Filtros({ categoria, onCategoria, busqueda, onBusqueda, orden, onOrden }) {
  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => (
          <button
            key={c.valor}
            onClick={() => onCategoria(c.valor)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              categoria === c.valor
                ? 'bg-mar-700 text-white'
                : 'bg-white text-stone-700 ring-1 ring-stone-300 hover:bg-stone-100'
            }`}
          >
            {c.nombre}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar prenda…"
          aria-label="Buscar prenda"
          className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm
            outline-none focus:border-mar-700 md:w-56"
        />
        <select
          value={orden}
          onChange={(e) => onOrden(e.target.value)}
          aria-label="Ordenar"
          className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm"
        >
          <option value="destacados">Destacados</option>
          <option value="menor">Menor precio</option>
          <option value="mayor">Mayor precio</option>
        </select>
      </div>
    </div>
  )
}
export default Filtros