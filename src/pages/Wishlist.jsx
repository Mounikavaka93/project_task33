import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { getProductById } from '../data/products'
import ProductCard from '../components/ProductCard'
import ScrollReveal from '../components/ScrollReveal'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProductById).filter(Boolean)

  return (
    <div className="min-h-[70vh] w-full bg-white py-12">
      <div className="page-shell">
        <ScrollReveal>
          <h1 className="text-[clamp(1.75rem,6vw,2.25rem)] font-semibold tracking-tight sm:text-4xl">Favorites</h1>
          <p className="mt-2 text-apple-muted">
            Save products you love and add them to your bag when you are ready.
          </p>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal variant="up">
            <div className="mt-10 rounded-[28px] bg-apple-gray p-6 text-center sm:p-10">
              <p className="text-xl font-semibold">No favorites yet.</p>
              <p className="mt-2 text-apple-muted">
                Tap the heart on any product to save it here.
              </p>
              <Link to="/" className="btn-primary mt-6">
                Browse products
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 60} variant="up">
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
