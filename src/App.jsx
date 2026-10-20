import { useEffect, useState } from 'react'
import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import Filtros from './components/Filtros.jsx'
import ListaProductos from './components/ListaProductos.jsx'
import PiePagina from './components/PiePagina.jsx'
function App() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [categoria, setCategoria] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState('destacados')
  useEffect(() => {
    fetch('/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos)
        setCargando(false)
      })
  }, [])
  const texto = busqueda.trim().toLowerCase()
  const visibles = productos
    .filter((p) => categoria === 'todas' || p.categoria === categoria)
    .filter((p) => p.nombre.toLowerCase().includes(texto))
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio
      if (orden === 'mayor') return b.precio - a.precio
      return a.id - b.id
    })
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Encabezado />
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
        <ListaProductos productos={visibles} cargando={cargando} />
      </main>
      <PiePagina />
    </div>
  )
}
export default App