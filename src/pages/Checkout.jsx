import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HiCheckCircle,
  HiCreditCard,
  HiDevicePhoneMobile,
  HiBuildingLibrary,
  HiTruck,
} from 'react-icons/hi2'
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'
import { useStore } from '../context/StoreContext'
import { formatPrice, getOrderTotals } from '../utils/format'
import ProductVisual from '../components/ProductVisual'
import { getProductById } from '../data/products'

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
]

const BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra', 'Yes Bank']

const METHODS = [
  { id: 'upi', label: 'UPI', hint: 'GPay, PhonePe, Paytm, BHIM', icon: HiDevicePhoneMobile },
  { id: 'card', label: 'Credit / Debit Card', hint: 'Visa, Mastercard, RuPay, Amex', icon: HiCreditCard },
  { id: 'netbanking', label: 'Net Banking', hint: 'All major Indian banks', icon: HiBuildingLibrary },
  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when your order arrives', icon: HiTruck },
]

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  landmark: '',
  city: '',
  state: 'Maharashtra',
  zip: '',
  upiId: '',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  bank: BANKS[0],
}

function formatCard(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [method, setMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  const { shipping, tax, total } = getOrderTotals(cartTotal)
  const eta = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + (method === 'cod' ? 4 : 3))
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }, [method])

  const update = (event) => {
    const { name, value } = event.target
    let next = value
    if (name === 'cardNumber') next = formatCard(value)
    if (name === 'cardExpiry') next = formatExpiry(value)
    if (name === 'cardCvv') next = value.replace(/\D/g, '').slice(0, 4)
    if (name === 'phone') next = value.replace(/\D/g, '').slice(0, 10)
    if (name === 'zip') next = value.replace(/\D/g, '').slice(0, 6)
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  const validate = () => {
    if (form.name.trim().length < 3) return 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email.'
    if (form.phone.length !== 10) return 'Enter a 10-digit mobile number.'
    if (form.address.trim().length < 8) return 'Enter a complete street address.'
    if (form.city.trim().length < 2) return 'Enter your city.'
    if (form.zip.length !== 6) return 'Enter a 6-digit PIN code.'
    if (method === 'upi' && !/^[\w.-]{2,}@[\w.-]{2,}$/.test(form.upiId)) {
      return 'Enter a valid UPI ID such as name@okaxis.'
    }
    if (method === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length !== 16) return 'Enter a 16-digit card number.'
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) return 'Enter expiry as MM/YY.'
      if (form.cardCvv.length < 3) return 'Enter the CVV.'
      if (form.cardName.trim().length < 3) return 'Enter the name on the card.'
    }
    return ''
  }

  const submit = (event) => {
    event.preventDefault()
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setError('')
    setProcessing(true)
    window.setTimeout(() => {
      const placed = placeOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          landmark: form.landmark,
          city: form.city,
          state: form.state,
          zip: form.zip,
        },
        payment: {
          method,
          upiId: method === 'upi' ? form.upiId : undefined,
          bank: method === 'netbanking' ? form.bank : undefined,
          cardLast4:
            method === 'card' ? form.cardNumber.replace(/\s/g, '').slice(-4) : undefined,
        },
        eta,
        totals: { shipping, tax, total },
      })
      setOrder(placed)
      setProcessing(false)
    }, 1100)
  }

  if (order) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-apple-gray py-16">
        <div className="page-shell flex justify-center">
          <div className="w-full max-w-xl bg-white p-6 text-center sm:p-10">
            <HiCheckCircle className="mx-auto text-green-500" size={56} />
            <h1 className="mt-4 text-3xl font-semibold">Order confirmed.</h1>
            <p className="mt-2 text-sm text-apple-muted">Order ID {order.id}</p>
            <p className="mt-3 text-apple-muted">
              {order.payment.method === 'cod'
                ? `Pay ${formatPrice(total)} in cash when your order arrives.`
                : `Payment received via ${METHODS.find((m) => m.id === order.payment.method)?.label}.`}
            </p>
            <p className="mt-2 text-sm">Estimated delivery {order.eta}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to={`/orders/${order.id}`} className="btn-primary">
                Track order
              </Link>
              <Link to="/" className="btn-outline border-apple-dark">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-apple-gray py-16">
        <div className="page-shell flex justify-center">
          <div className="w-full max-w-lg bg-white p-6 text-center sm:p-10">
            <h1 className="text-3xl font-semibold">Your bag is empty.</h1>
            <p className="mt-3 text-apple-muted">Add a product before checking out.</p>
            <button type="button" className="btn-primary mt-8" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-apple-gray py-12">
      <form onSubmit={submit} className="page-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="bg-white p-6 sm:p-8">
            <h1 className="text-[clamp(1.6rem,5vw,1.875rem)] font-semibold tracking-tight sm:text-3xl">Checkout</h1>
            <p className="mt-2 text-sm text-apple-muted">
              Delivery and payment details for this order.
            </p>
            <h2 className="mt-8 text-lg font-semibold">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { name: 'name', label: 'Full name', span: true },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Mobile number', type: 'tel' },
                { name: 'address', label: 'Street address', span: true },
                { name: 'landmark', label: 'Landmark (optional)', span: true },
                { name: 'city', label: 'City' },
                { name: 'zip', label: 'PIN code' },
              ].map((field) => (
                <label key={field.name} className={`block text-sm ${field.span ? 'sm:col-span-2' : ''}`}>
                  <span className="mb-1.5 block text-apple-muted">{field.label}</span>
                  <input
                    required={!field.label.includes('optional')}
                    name={field.name}
                    type={field.type || 'text'}
                    value={form[field.name]}
                    onChange={update}
                    className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none transition focus:border-apple-blue focus:bg-white"
                  />
                </label>
              ))}
              <label className="block text-sm">
                <span className="mb-1.5 block text-apple-muted">State</span>
                <select
                  name="state"
                  value={form.state}
                  onChange={update}
                  className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue"
                >
                  {STATES.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Payment method</h2>
            <div className="mt-4 grid gap-3">
              {METHODS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition sm:gap-4 sm:px-4 sm:py-4 ${
                    method === item.id
                      ? 'border-apple-blue bg-apple-blue/5'
                      : 'border-apple-border hover:border-apple-dark'
                  }`}
                >
                  <item.icon className="shrink-0" size={22} />
                  <span className="min-w-0">
                    <span className="block font-medium">{item.label}</span>
                    <span className="text-sm text-apple-muted">{item.hint}</span>
                  </span>
                </button>
              ))}
            </div>

            {method === 'upi' && (
              <div className="mt-5">
                <p className="mb-3 text-sm text-apple-muted">Pay using any UPI app</p>
                <div className="mb-4 flex flex-wrap gap-2 text-sm">
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                    <span key={app} className="rounded-full bg-apple-gray px-3 py-1">
                      {app}
                    </span>
                  ))}
                </div>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-apple-muted">UPI ID</span>
                  <input
                    name="upiId"
                    value={form.upiId}
                    onChange={update}
                    placeholder="yourname@okaxis"
                    className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue focus:bg-white"
                  />
                </label>
              </div>
            )}

            {method === 'card' && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 text-3xl text-apple-muted sm:col-span-2">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaCcAmex />
                </div>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block text-apple-muted">Name on card</span>
                  <input name="cardName" value={form.cardName} onChange={update} className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue" />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block text-apple-muted">Card number</span>
                  <input name="cardNumber" value={form.cardNumber} onChange={update} placeholder="XXXX XXXX XXXX XXXX" className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue" />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-apple-muted">Expiry</span>
                  <input name="cardExpiry" value={form.cardExpiry} onChange={update} placeholder="MM/YY" className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue" />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-apple-muted">CVV</span>
                  <input name="cardCvv" value={form.cardCvv} onChange={update} type="password" className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue" />
                </label>
              </div>
            )}

            {method === 'netbanking' && (
              <label className="mt-5 block text-sm">
                <span className="mb-1.5 block text-apple-muted">Select bank</span>
                <select
                  name="bank"
                  value={form.bank}
                  onChange={update}
                  className="w-full rounded-xl border border-apple-border bg-apple-gray px-4 py-3 outline-none focus:border-apple-blue"
                >
                  {BANKS.map((bank) => (
                    <option key={bank}>{bank}</option>
                  ))}
                </select>
              </label>
            )}

            {method === 'cod' && (
              <p className="mt-5 rounded-2xl bg-apple-gray px-4 py-3 text-sm text-apple-muted">
                Pay {formatPrice(total)} in cash or UPI to the delivery partner. Keep the exact amount ready.
              </p>
            )}

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <button type="submit" className="btn-primary mt-6 w-full" disabled={processing}>
              {processing
                ? 'Processing…'
                : method === 'cod'
                  ? `Place Order · ${formatPrice(total)}`
                  : `Pay ${formatPrice(total)}`}
            </button>
          </section>
        </div>

        <aside className="h-fit bg-white p-6 lg:sticky lg:top-20">
          <h2 className="text-lg font-semibold">Your bag</h2>
          <ul className="mt-4 space-y-4">
            {cart.map((item) => (
              <li key={item.key} className="flex gap-3">
                <ProductVisual
                  product={getProductById(item.productId)}
                  colorName={item.color}
                  hex={item.hex}
                  className="h-16 w-16"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-apple-muted">
                    {item.color} · {item.storage} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(item.unitPrice * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-apple-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-apple-muted">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-apple-muted">Estimated tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-apple-muted">Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="pt-2 text-xs text-apple-muted">Get it by {eta}. Inclusive of applicable taxes.</p>
          </div>
        </aside>
      </form>
    </div>
  )
}
