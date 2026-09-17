export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const MAX_CART_QTY = 10

export const getOrderTotals = (subtotal) => {
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 9
  const tax = Math.round(subtotal * 0.08)
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  }
}
