import { pesos } from '../utils/formato.js'
function TarjetaProducto({ producto, onVerDetalle }) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200
        transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative">
        <img src={producto.imagen} alt={producto.nombre} className="aspect-square w-full" />
        {producto.nuevo && (
          <span
            className="absolute top-3 left-3 rounded-full bg-mar-700 px-3 py-1 text-xs
              font-semibold text-white"
          >
            Nuevo
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs tracking-wide text-stone-500 uppercase">{producto.categoria}</p>
        <h3 className="font-semibold">{producto.nombre}</h3>
        <p className="text-lg font-bold text-marca-600">{pesos(producto.precio)}</p>
        <button
          onClick={() => onVerDetalle(producto)}
          className="mt-auto rounded-full border border-mar-700 py-2 text-sm font-semibold
            text-mar-700 transition hover:bg-mar-700 hover:text-white"
        >
          Ver detalle
        </button>
      </div>
    </article>
  )
}
export default TarjetaProducto