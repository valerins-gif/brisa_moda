import { useState } from 'react'
import { pesos } from '../utils/formato.js'
function DetalleProducto({ producto, onCerrar, onAgregar }) {
  const [talla, setTalla] = useState('')
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={onCerrar}
    >
      <div
        className="grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl
          md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={producto.imagen} alt={producto.nombre} className="aspect-square w-full" />
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-titulo text-2xl font-bold text-mar-900">{producto.nombre}</h3>
            <button
              onClick={onCerrar}
              aria-label="Cerrar"
              className="text-3xl leading-none text-stone-400 hover:text-stone-700"
            >
              ×
            </button>
          </div>
          <p className="text-2xl font-bold text-marca-600">{pesos(producto.precio)}</p>
          <p className="text-stone-600">{producto.descripcion}</p>
          <div>
            <p className="mb-2 text-sm font-semibold">Talla</p>
            <div className="flex flex-wrap gap-2">
              {producto.tallas.map((t) => (
                <button
                  key={t}
                  onClick={() => setTalla(t)}
                  className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-medium ${
                    talla === t
                      ? 'border-mar-700 bg-mar-700 text-white'
                      : 'border-stone-300 hover:border-mar-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!talla}
            onClick={() => onAgregar(producto, talla)}
            className="mt-auto rounded-full bg-marca-500 py-3 font-semibold text-white
              hover:bg-marca-600 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {talla ? 'Agregar al carrito' : 'Elige una talla'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default DetalleProducto