import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineTrash, HiXMark } from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'
import { formatPrice, getOrderTotals } from '../utils/format'
import ProductVisual from './ProductVisual'
import QuantityStepper from './QuantityStepper'
import { getProductById } from '../data/products'

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useStore()
  const { shipping, tax, total } = getOrderTotals(cartTotal)

  useEffect(() => {
    if (!cartOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="drawer-overlay absolute inset-0 bg-black/40"
        aria-label="Close bag"
        onClick={() => setCartOpen(false)}
      />
      <aside className="drawer-panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-apple-border px-4 py-4 sm:px-5">
          <h2 className="text-lg font-semibold">Bag ({cartCount})</h2>
          <button type="button" aria-label="Close" className="grid h-11 w-11 place-items-center" onClick={() => setCartOpen(false)}>
            <HiXMark size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-lg font-semibold text-apple-dark">Your bag is empty.</p>
              <p className="mt-2 text-sm text-apple-muted">
                Explore the latest iPhone, Mac, and more.
              </p>
              <Link
                to="/"
                className="btn-primary mt-6"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <Link to={`/product/${item.productId}`} onClick={() => setCartOpen(false)}>
                    <ProductVisual
                      product={getProductById(item.productId)}
                      colorName={item.color}
                      hex={item.hex}
                      className="h-24 w-24"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          className="block truncate font-semibold text-apple-dark hover:text-apple-blue"
                          onClick={() => setCartOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-apple-muted">
                          {item.color} · {item.storage}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(quantity) => updateQuantity(item.key, quantity)}
                      />
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-sm text-apple-muted transition hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.key)}
                      >
                        <HiOutlineTrash size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-apple-border px-4 py-4 sm:px-5">
            <dl className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-apple-muted">Subtotal</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-apple-muted">Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-apple-muted">Estimated tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-apple-border pt-2 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              to="/cart"
              className="btn-outline mb-2 w-full border-apple-dark text-apple-dark hover:bg-apple-dark hover:text-white"
              onClick={() => setCartOpen(false)}
            >
              Review Bag
            </Link>
            <Link
              to="/checkout"
              className="btn-primary w-full"
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
