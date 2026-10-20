import { useState } from 'react'
import { pesos } from '../utils/formato.js'
const WHATSAPP_TIENDA = '573001234567'
const estiloCampo =
  'rounded-lg border border-stone-300 px-3 py-2 font-normal outline-none focus:border-mar-700'
function FormularioPedido({ items, onCerrar, onEnviado }) {
  const [datos, setDatos] = useState({
    nombre: '',
    celular: '',
    direccion: '',
    pago: 'Contraentrega',
  })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value })
  }
  function validar() {
    const nuevos = {}
    if (datos.nombre.trim().length < 3) nuevos.nombre = 'Escribe tu nombre completo.'
    if (!/^3\d{9}$/.test(datos.celular)) {
      nuevos.celular = 'El celular debe tener 10 dígitos y empezar por 3.'
    }
    if (datos.direccion.trim().length < 5) nuevos.direccion = 'Escribe la dirección de entrega.'
    return nuevos
  }
  function enviar(evento) {
    evento.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return
    const lineas = items.map((item) => {
      const subtotal = pesos(item.precio * item.cantidad)
      return `- ${item.cantidad} x ${item.nombre} (talla ${item.talla}): ${subtotal}`
    })
    const mensaje = [
      '¡Hola, Brisa Moda! Quiero hacer este pedido:',
      ...lineas,
      `Total: ${pesos(total)}`,
      `Nombre: ${datos.nombre}`,
      `Celular: ${datos.celular}`,
      `Dirección: ${datos.direccion}`,
      `Pago: ${datos.pago}`,
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP_TIENDA}?text=${encodeURIComponent(mensaje)}`, '_blank')
    setEnviado(true)
    onEnviado()
  }
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
      onClick={onCerrar}
    >
      <div
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {enviado ? (
          <div className="py-6 text-center">
            <h2 className="font-titulo text-2xl font-bold text-mar-900">¡Pedido enviado!</h2>
            <p className="mt-2 text-stone-600">
              Se abrió WhatsApp con el resumen de tu pedido. Envía el mensaje y te confirmaremos
              la entrega.
            </p>
            <button
              onClick={onCerrar}
              className="mt-6 rounded-full bg-mar-700 px-6 py-3 font-semibold text-white
                hover:bg-mar-900"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate className="flex flex-col gap-4">
            <h2 className="font-titulo text-2xl font-bold text-mar-900">Datos de entrega</h2>
            <p className="rounded-lg bg-marca-50 p-3 text-sm">
              Total del pedido: <strong>{pesos(total)}</strong>
            </p>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Nombre completo
              <input name="nombre" value={datos.nombre} onChange={cambiar} className={estiloCampo} />
              {errores.nombre && <span className="text-red-600">{errores.nombre}</span>}
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Celular
              <input
                name="celular"
                type="tel"
                value={datos.celular}
                onChange={cambiar}
                placeholder="3001234567"
                className={estiloCampo}
              />
              {errores.celular && <span className="text-red-600">{errores.celular}</span>}
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Dirección y barrio
              <input
                name="direccion"
                value={datos.direccion}
                onChange={cambiar}
                placeholder="Cra. 3 # 35-20, Manga"
                className={estiloCampo}
              />
              {errores.direccion && <span className="text-red-600">{errores.direccion}</span>}
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Forma de pago
              <select name="pago" value={datos.pago} onChange={cambiar} className={estiloCampo}>
                <option>Contraentrega</option>
                <option>Nequi</option>
                <option>Daviplata</option>
                <option>Transferencia bancaria</option>
              </select>
            </label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={onCerrar}
                className="flex-1 rounded-full border border-stone-300 py-3 font-semibold
                  hover:bg-stone-100"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-green-600 py-3 font-semibold text-white
                  hover:bg-green-700"
              >
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
export default FormularioPedido