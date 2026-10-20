function Portada() {
  return (
    <section className="bg-linear-to-br from-marca-100 via-marca-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-mar-700 uppercase">
            Colección Caribe 2026
          </p>
          <h1 className="font-titulo text-4xl leading-tight font-bold text-mar-900 md:text-5xl">
            Ropa fresca para el calor de Cartagena
          </h1>
          <p className="mt-4 max-w-md text-stone-600">
            Lino, algodón y accesorios hechos por artesanos de la región. Haz tu pedido en
            línea y recíbelo en casa.
          </p>
          <a
            href="#catalogo"
            className="mt-6 inline-block rounded-full bg-marca-500 px-6 py-3 font-semibold
              text-white shadow hover:bg-marca-600"
          >
            Ver catálogo
          </a>
        </div>
        <img
          src="/img/portada.svg"
          alt="Prendas de la colección Caribe"
          className="mx-auto w-full max-w-sm"
        />
      </div>
    </section>
  )
}
export default Portada