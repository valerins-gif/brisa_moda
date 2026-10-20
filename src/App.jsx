import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Filtros from './components/Filtros.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import DetalleProducto from './components/DetalleProducto.jsx'
import Carrito from './components/Carrito.jsx'
import FormularioPedido from './components/FormularioPedido.jsx'
import Aviso from './components/Aviso.jsx'
import PiePagina from './components/PiePagina.jsx'

function carritoGuardado() {
  const texto = localStorage.getItem('carrito')
  return texto ? JSON.parse(texto) : []
}
function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [categoria, setCategoria] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('destacados')
  const [seleccionado, setSeleccionado] = useState(null)
  const [carrito, setCarrito] = useState(carritoGuardado)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [aviso, setAviso] = useState('')
  const [pedidoAbierto, setPedidoAbierto] = useState(false)
  useEffect(() => {
    fetch('/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos)
        setCargando(false)
      })
  }, [])
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])
  const texto = busqueda.trim().toLowerCase()
  const visibles = productos
    .filter((p) => categoria === 'todas' || p.categoria === categoria)
    .filter((p) => p.nombre.toLowerCase().includes(texto))
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio
      if (orden === 'mayor') return b.precio - a.precio
      return a.id - b.id
    })
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  function agregarAlCarrito(producto, talla) {
    const existe = carrito.find((item) => item.id === producto.id && item.talla === talla)
    if (existe) {
      setCarrito(
        carrito.map((item) => (item === existe ? { ...item, cantidad: item.cantidad + 1 } : item)),
      )
    } else {
      const nuevo = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        talla,
        cantidad: 1,
      }
      setCarrito([...carrito, nuevo])
    }
    setSeleccionado(null)
    setAviso(`${producto.nombre} (talla ${talla}) se agregó al carrito`)
  }
  function cambiarCantidad(itemCambiado, cambio) {
    const actualizado = carrito.map((item) =>
      item === itemCambiado ? { ...item, cantidad: item.cantidad + cambio } : item,
    )
    setCarrito(actualizado.filter((item) => item.cantidad > 0))
  }
  function quitarDelCarrito(itemQuitado) {
    setCarrito(carrito.filter((item) => item !== itemQuitado))
  }
  function abrirPedido() {
    setCarritoAbierto(false)
    setPedidoAbierto(true)
  }
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Encabezado cantidad={cantidad} onAbrirCarrito={() => setCarritoAbierto(true)} />
      <Portada />
      <main id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <h2 className="font-titulo text-3xl font-bold text-mar-900">Catálogo</h2>
        <Filtros
          categoria={categoria}
          onCategoria={setCategoria}
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          orden={orden}
          onOrden={setOrden}
        />
        <ListaProductos productos={visibles} cargando={cargando} onVerDetalle={setSeleccionado} />
      </main>
      <PiePagina />
      {seleccionado && (
        <DetalleProducto
          producto={seleccionado}
          onCerrar={() => setSeleccionado(null)}
          onAgregar={agregarAlCarrito}
        />
      )}
      {carritoAbierto && (
        <Carrito
          items={carrito}
          onCerrar={() => setCarritoAbierto(false)}
          onCambiarCantidad={cambiarCantidad}
          onQuitar={quitarDelCarrito}
          onPedir={abrirPedido}
        />
      )}
      {pedidoAbierto && (
        <FormularioPedido
          items={carrito}
          onCerrar={() => setPedidoAbierto(false)}
          onEnviado={() => setCarrito([])}
        />
      )}
      <Aviso mensaje={aviso} onOcultar={setAviso} />
    </div>
  )
}
export default App