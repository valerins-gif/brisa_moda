import { pesos } from '../utils/formato.js'
function Carrito({ items, onCerrar, onCambiarCantidad, onQuitar, onPedir }) {
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/50" onClick={onCerrar}>
      <aside
        className="flex h-full w-full max-w-md flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-200 p-4">
          <h2 className="font-titulo text-2xl font-bold text-mar-900">Tu carrito</h2>
          <button
            onClick={onCerrar}
            aria-label="Cerrar carrito"
            className="text-3xl leading-none text-stone-400 hover:text-stone-700"
          >
            ×
          </button>
        </div>
        {items.length === 0 ? (
          <p className="flex-1 p-8 text-center text-stone-500">Tu carrito está vacío.</p>
        ) : (
          <ul className="flex-1 divide-y divide-stone-200 overflow-y-auto px-4">
            {items.map((item) => (
              <li key={`${item.id}-${item.talla}`} className="flex gap-3 py-4">
                <img src={item.imagen} alt="" className="h-20 w-20 rounded-lg" />
                <div className="flex flex-1 flex-col">
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-stone-500">
                    Talla {item.talla} · {pesos(item.precio)}
                  </p>
                  <div className="mt-auto flex items-center gap-2">
                    <button
                      onClick={() => onCambiarCantidad(item, -1)}
                      aria-label="Quitar uno"
                      className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.cantidad}</span>
                    <button
                      onClick={() => onCambiarCantidad(item, 1)}
                      aria-label="Agregar uno"
                      className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onQuitar(item)}
                      className="ml-auto text-sm text-stone-500 underline hover:text-marca-600"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-stone-200 p-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{pesos(total)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onPedir}
            className="mt-4 w-full rounded-full bg-marca-500 py-3 font-semibold text-white
              hover:bg-marca-600 disabled:bg-stone-300"
          >
            Hacer pedido
          </button>
        </div>
      </aside>
    </div>
  )
}
export default Carrito