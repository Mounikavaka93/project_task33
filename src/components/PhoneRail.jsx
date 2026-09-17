import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'
import { getProductsByCategory } from '../data/products'
import { formatPrice } from '../utils/format'

export default function PhoneRail() {
  const phones = getProductsByCategory('iphone')

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="page-shell">
        <h2 className="text-[clamp(1.7rem,5vw,2.4rem)] font-semibold tracking-tight">Get to know iPhone.</h2>
        <p className="mt-2 text-apple-muted">Scroll through the lineup — just like the Apple Store family strip.</p>
      </div>
      <div className="phone-rail mt-8">
        {phones.map((phone, index) => (
          <Link key={phone.id} to={`/product/${phone.id}`} className="phone-rail-card">
            <ProductVisual product={phone} className="h-[280px] w-full sm:h-[340px]" priority={index < 2} />
            <div className="px-1 pt-4 text-center">
              {phone.isNew && <p className="text-[12px] font-medium text-[#b64400]">New</p>}
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{phone.name}</h3>
              <p className="mt-1 text-sm text-apple-muted">{phone.tagline}</p>
              <p className="mt-2 text-sm">From {formatPrice(phone.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
