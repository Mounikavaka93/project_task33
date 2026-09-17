import { Link, useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils/format'
import ProductVisual from '../components/ProductVisual'
import { getProductById } from '../data/products'
import NotFound from './NotFound'

const STEPS = ['Confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

function liveStatus(order) {
  const minutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000
  if (minutes < 2) return 0
  if (minutes < 8) return 1
  if (minutes < 20) return 2
  if (minutes < 40) return 3
  return 4
}

export default function OrderDetail() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((item) => item.id === id)
  if (!order) return <NotFound />

  const step = liveStatus(order)
  const payLabel = {
    upi: `UPI · ${order.payment.upiId || 'Paid'}`,
    card: `Card ending ${order.payment.cardLast4}`,
    netbanking: order.payment.bank,
    cod: 'Cash on Delivery',
  }[order.payment.method]

  return (
    <div className="min-h-[70vh] w-full bg-apple-gray py-12">
      <div className="page-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="bg-white p-6 sm:p-8">
          <p className="text-sm text-apple-muted">Order {order.id}</p>
          <h1 className="mt-1 text-3xl font-semibold">Tracking</h1>
          <p className="mt-2 text-apple-muted">Estimated delivery {order.eta}</p>
          <ol className="mt-8 space-y-4">
            {STEPS.map((label, index) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${index <= step ? 'bg-apple-blue' : 'bg-apple-border'}`}
                />
                <span className={index <= step ? 'font-medium' : 'text-apple-muted'}>{label}</span>
              </li>
            ))}
          </ol>
          <ul className="mt-10 space-y-4 border-t border-apple-border pt-6">
            {order.items.map((item) => (
              <li key={item.key} className="flex gap-4">
                <ProductVisual
                  product={getProductById(item.productId)}
                  colorName={item.color}
                  hex={item.hex}
                  className="h-20 w-20"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-apple-muted">
                    {item.color} · {item.storage} · Qty {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <aside className="h-fit bg-white p-6">
          <h2 className="font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-apple-muted">{payLabel}</p>
          <p className="mt-1 text-sm">{formatPrice(order.totals.total)}</p>
          <h2 className="mt-6 font-semibold">Ship to</h2>
          <p className="mt-2 text-sm leading-relaxed text-apple-muted">
            {order.customer.name}<br />
            {order.customer.address}<br />
            {order.customer.city}, {order.customer.state} {order.customer.zip}<br />
            {order.customer.phone}
          </p>
          <Link to="/orders" className="btn-ghost mt-6">All orders</Link>
        </aside>
      </div>
    </div>
  )
}
