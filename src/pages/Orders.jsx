import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils/format'
import ProductVisual from '../components/ProductVisual'
import ScrollReveal from '../components/ScrollReveal'
import { getProductById } from '../data/products'

function liveStatus(order) {
  const minutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000
  if (order.payment.method === 'cod' && minutes < 1) return 'Confirmed'
  if (minutes < 2) return 'Paid'
  if (minutes < 8) return 'Packed'
  if (minutes < 20) return 'Shipped'
  if (minutes < 40) return 'Out for delivery'
  return 'Delivered'
}

export default function Orders() {
  const { orders } = useStore()

  return (
    <div className="min-h-[70vh] w-full bg-white py-12">
      <div className="page-shell">
        <ScrollReveal>
          <h1 className="text-[clamp(1.75rem,6vw,2.25rem)] font-semibold tracking-tight sm:text-4xl">Orders</h1>
          <p className="mt-2 text-apple-muted">Track every Apple Store order placed on this device.</p>
        </ScrollReveal>
        {orders.length === 0 ? (
          <div className="mt-10 bg-apple-gray p-6 text-center sm:p-10">
            <p className="text-xl font-semibold">No orders yet.</p>
            <Link to="/" className="btn-primary mt-6">Shop now</Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {orders.map((order, index) => (
              <li key={order.id}>
                <ScrollReveal delay={index * 50} variant="up">
                  <Link to={`/orders/${order.id}`} className="flex flex-col gap-4 bg-apple-gray p-5 sm:flex-row sm:items-center">
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item) => (
                      <ProductVisual
                        key={item.key}
                        product={getProductById(item.productId)}
                        colorName={item.color}
                        hex={item.hex}
                        className="h-16 w-16 border border-white"
                      />
                    ))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-apple-muted">
                      {liveStatus(order)} · {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(order.totals.total)}</p>
                </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
