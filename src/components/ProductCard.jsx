import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils/format'
import { getOptionLabel } from '../data/products'
import ProductVisual from './ProductVisual'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = isWishlisted(product.id)
  const [colorName, setColorName] = useState(product.colors[0].name)
  const [storage, setStorage] = useState(product.storage[0].size)
  const optionLabel = getOptionLabel(product)
  const price = useMemo(
    () => product.storage.find((item) => item.size === storage)?.price ?? product.price,
    [product, storage],
  )

  return (
    <article className="product-card group relative flex h-full flex-col bg-apple-gray p-4 sm:p-7">
      <span className="card-shine" />
      <button
        type="button"
        aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/80 text-apple-dark shadow-sm backdrop-blur transition hover:scale-110 sm:right-5 sm:top-5"
      >
        {saved ? <HiHeart className="text-red-500" size={18} /> : <HiOutlineHeart size={18} />}
      </button>

      <Link to={`/product/${product.id}`} className="flex min-h-0 flex-1 flex-col">
        <div className="visual-wrap mb-4 h-44 w-full overflow-hidden sm:mb-5 sm:h-64">
          <ProductVisual
            product={product}
            colorName={colorName}
            className="h-full w-full"
          />
        </div>
        <div className="flex min-h-[1.25rem] items-center">
          {product.isNew ? (
            <span className="text-[12px] font-medium text-[#b64400]">New</span>
          ) : (
            <span className="text-[12px] opacity-0">New</span>
          )}
        </div>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-apple-dark sm:text-xl">{product.name}</h3>
        <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm text-apple-muted">{product.tagline}</p>
        <p className="mt-3 text-[15px] font-medium text-apple-dark">From {formatPrice(price)}</p>
        <ul className="spec-list mt-4 space-y-1.5 border-t border-black/5 pt-4">
          {product.specs.slice(0, 4).map((spec) => (
            <li key={spec.label} className="spec-row flex items-start justify-between gap-3 text-[13px]">
              <span className="shrink-0 text-apple-muted">{spec.label}</span>
              <span className="max-w-[60%] break-words text-right text-apple-dark">{spec.value}</span>
            </li>
          ))}
        </ul>
      </Link>

      <div className="mt-4">
        <p className="mb-1.5 text-xs text-apple-muted">Color</p>
        <div className="flex min-h-[20px] flex-wrap items-center gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              title={color.name}
              aria-label={color.name}
              onClick={() => setColorName(color.name)}
              className={`h-5 w-5 rounded-full border transition hover:scale-110 ${
                colorName === color.name ? 'scale-110 border-apple-blue' : 'border-black/10'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
          <span className="ml-1 max-w-full truncate text-xs text-apple-muted">{colorName}</span>
        </div>
      </div>

      {product.storage.length > 1 && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs text-apple-muted">{optionLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {product.storage.map((option) => (
              <button
                key={option.size}
                type="button"
                title={option.size}
                onClick={() => setStorage(option.size)}
                className={`variant-chip ${storage === option.size ? 'active' : ''}`}
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-3">
        <button
          type="button"
          className="btn-primary w-full text-sm min-[420px]:flex-1"
          onClick={() => addToCart(product, { color: colorName, storage })}
        >
          Add to Cart
        </button>
        <Link to={`/product/${product.id}`} className="btn-ghost w-full justify-center text-sm min-[420px]:w-auto min-[420px]:shrink-0">
          Learn more
        </Link>
      </div>
    </article>
  )
}
