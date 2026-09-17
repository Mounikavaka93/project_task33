import { Link } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'
import { formatPrice, getOrderTotals } from '../utils/format'
import ProductVisual from '../components/ProductVisual'
import QuantityStepper from '../components/QuantityStepper'
import ScrollReveal from '../components/ScrollReveal'
import { getProductById } from '../data/products'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore()
  const { shipping, tax, total } = getOrderTotals(cartTotal)

  return (
    <div className="min-h-[70vh] w-full bg-apple-gray py-12">
      <div className="page-shell">
        <ScrollReveal>
          <h1 className="text-[clamp(1.75rem,6vw,2.25rem)] font-semibold tracking-tight sm:text-4xl">Review your bag.</h1>
          <p className="mt-2 text-apple-muted">Free delivery and free returns.</p>
        </ScrollReveal>

        {cart.length === 0 ? (
          <ScrollReveal variant="up">
            <div className="mt-10 rounded-[28px] bg-white p-6 text-center sm:p-10">
              <p className="text-xl font-semibold">Your bag is empty.</p>
              <p className="mt-2 text-apple-muted">
                Once you add items, they will appear here for checkout.
              </p>
              <Link to="/" className="btn-primary mt-6">
                Continue Shopping
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={item.key}>
                  <ScrollReveal delay={index * 50} variant="up">
                    <div className="flex flex-col gap-4 rounded-[28px] bg-white p-5 sm:flex-row sm:items-center">
                    <Link to={`/product/${item.productId}`}>
                      <ProductVisual
                        product={getProductById(item.productId)}
                        colorName={item.color}
                        hex={item.hex}
                        className="h-32 w-full sm:h-28 sm:w-28"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.productId}`}
                            className="text-lg font-semibold hover:text-apple-blue"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-apple-muted">
                            {item.color} · {item.storage}
                          </p>
                          <p className="mt-1 text-sm text-apple-muted">
                            {formatPrice(item.unitPrice)} each
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(quantity) => updateQuantity(item.key, quantity)}
                        />
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-sm text-apple-muted hover:text-red-500"
                          onClick={() => removeFromCart(item.key)}
                        >
                          <HiOutlineTrash size={16} /> Remove
                        </button>
                      </div>
                    </div>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>

            <ScrollReveal variant="right">
              <aside className="h-fit rounded-[28px] bg-white p-6 lg:sticky lg:top-20">
                <h2 className="text-lg font-semibold">Order summary</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-apple-muted">Items ({cartCount})</dt>
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
                  <div className="flex justify-between border-t border-apple-border pt-3 text-base font-semibold">
                    <dt>Total</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                </dl>
                <Link to="/checkout" className="btn-primary mt-6 w-full">
                  Checkout
                </Link>
                <Link to="/" className="btn-ghost mt-3 w-full justify-center text-sm">
                  Continue shopping
                </Link>
              </aside>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  )
}
