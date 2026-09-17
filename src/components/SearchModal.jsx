import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'
import { searchProducts } from '../data/products'
import { formatPrice } from '../utils/format'
import ProductVisual from './ProductVisual'

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore()
  if (!searchOpen) return null
  return <SearchPanel onClose={() => setSearchOpen(false)} />
}

function SearchPanel({ onClose }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query])

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="drawer-overlay absolute inset-0 bg-black/45"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="search-modal absolute inset-x-0 top-0 bg-white pb-5 shadow-xl">
        <div className="page-shell flex items-center gap-3">
          <HiOutlineMagnifyingGlass className="text-apple-muted" size={22} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apple.com"
            className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-apple-muted"
          />
          <button type="button" aria-label="Close search" className="grid h-11 w-11 shrink-0 place-items-center" onClick={onClose}>
            <HiXMark size={22} />
          </button>
        </div>
        <div className="page-shell mt-4">
          {query.trim() === '' ? (
            <p className="text-sm text-apple-muted">
              Try iPhone, MacBook, Watch, AirPods, or iPad.
            </p>
          ) : results.length === 0 ? (
            <p className="text-sm text-apple-muted">No products match “{query}”.</p>
          ) : (
            <ul className="divide-y divide-apple-border">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center gap-4 py-3 transition hover:bg-apple-gray"
                    onClick={onClose}
                  >
                    <ProductVisual
                      product={product}
                      className="h-14 w-14"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-apple-dark">{product.name}</p>
                      <p className="truncate text-sm text-apple-muted">{product.tagline}</p>
                    </div>
                    <span className="hidden shrink-0 text-sm sm:inline">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
