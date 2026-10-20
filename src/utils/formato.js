// Convierte un número en pesos colombianos: 45000 → "$ 45.000"
const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})
export function pesos(valor) {
  return formatoPesos.format(valor)
}