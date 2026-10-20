import Encabezado from './components/Encabezado.jsx'
import Portada from './components/Portada.jsx'
import PiePagina from './components/PiePagina.jsx'
function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Encabezado />
      <Portada />
      <main id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <h2 className="font-titulo text-3xl font-bold text-mar-900">Catálogo</h2>
        <p className="mt-2 text-stone-500">Aquí aparecerán los productos.</p>
      </main>
      <PiePagina />
    </div>
  )
}
export default App