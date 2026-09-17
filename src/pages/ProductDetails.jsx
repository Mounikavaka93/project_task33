import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiHeart, HiOutlineHeart, HiChevronRight, HiChevronLeft, HiStar } from 'react-icons/hi2'
import {
  getProductById,
  getRelatedProducts,
  getProductViews,
  getProductMeta,
  getColor,
  getCategory,
  getOptionLabel,
} from '../data/products'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../utils/format'
import ProductCard from '../components/ProductCard'
import ProductVisual from '../components/ProductVisual'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import NotFound from './NotFound'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  if (!product) return <NotFound />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const views = getProductViews()
  const meta = getProductMeta(product)
  const category = getCategory(product.category)
  const optionLabel = getOptionLabel(product)

  const [activeView, setActiveView] = useState('front')
  const [color, setColor] = useState(product.colors[0].name)
  const [storage, setStorage] = useState(product.storage[0].size)
  const selected = getColor(product, color)
  const viewIndex = views.findIndex((item) => item.id === activeView)

  const price = useMemo(() => {
    return product.storage.find((item) => item.size === storage)?.price ?? product.price
  }, [product, storage])

  const monthly = Math.round(price / 12)
  const eta = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }, [])

  const saved = isWishlisted(product.id)
  const related = getRelatedProducts(product)

  const cycleView = (direction) => {
    const next = (viewIndex + direction + views.length) % views.length
    setActiveView(views[next].id)
  }

  const handleBuyNow = () => {
    addToCart(product, { color, storage, openDrawer: false })
    navigate('/checkout')
  }

  return (
    <div className="w-full bg-white">
      <div className="page-shell flex flex-col gap-3 pt-8 text-sm text-apple-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
        <div className="min-w-0 truncate">
          <Link to={`/${product.category}`} className="hover:text-apple-blue">
            {category?.name || product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-apple-dark">{product.name}</span>
        </div>
        <nav className="flex gap-5 overflow-x-auto pb-1 sm:ml-auto sm:overflow-visible">
          <a href="#overview" className="transition hover:text-apple-blue">
            Overview
          </a>
          <a href="#specs" className="transition hover:text-apple-blue">
            Tech specs
          </a>
          {related.length > 0 && (
            <a href="#related" className="transition hover:text-apple-blue">
              More
            </a>
          )}
        </nav>
      </div>

      <section id="overview" className="page-shell grid items-start gap-8 py-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
        <ScrollReveal variant="up">
          <div className="lg:sticky lg:top-20">
            <div className="gallery-main relative">
              <ProductVisual
                product={product}
                colorName={color}
                view={activeView}
                className="h-[280px] w-full sm:h-[420px] lg:h-[520px]"
              />
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => cycleView(-1)}
                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-apple-dark shadow-sm transition hover:scale-105"
              >
                <HiChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => cycleView(1)}
                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-apple-dark shadow-sm transition hover:scale-105"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {views.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setActiveView(view.id)}
                  className={`overflow-hidden border-2 transition ${
                    activeView === view.id ? 'border-apple-blue' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <ProductVisual product={product} colorName={color} view={view.id} className="h-20 w-full sm:h-24" />
                  <span className="block bg-apple-gray py-1 text-center text-[11px] text-apple-muted">
                    {view.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="right">
          <div className="flex flex-col">
            {product.isNew && <p className="text-sm font-medium text-[#b64400]">New</p>}
            <h1 className="mt-1 text-[clamp(1.75rem,6.5vw,3rem)] font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-lg text-apple-muted">{product.tagline}</p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <HiStar className="text-amber-500" /> {meta.rating.toFixed(1)} · {meta.reviews} reviews
            </p>
            <p className="mt-6 leading-relaxed text-apple-dark/80">{product.description}</p>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium">
                Color — <span className="text-apple-muted">{selected.name}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    title={option.name}
                    onClick={() => setColor(option.name)}
                    className={`grid h-11 w-11 place-items-center rounded-full border-2 transition ${
                      color === option.name ? 'scale-110 border-apple-blue' : 'border-black/10 hover:scale-105'
                    }`}
                    style={{ backgroundColor: option.hex }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.colors.map((option) => (
                  <button
                    key={`${option.name}-preview`}
                    type="button"
                    onClick={() => setColor(option.name)}
                    className={`overflow-hidden border transition hover:-translate-y-0.5 ${
                      color === option.name ? 'border-apple-blue' : 'border-transparent'
                    }`}
                  >
                    <ProductVisual product={product} colorName={option.name} className="h-24 w-full" />
                    <span className="block truncate bg-apple-gray px-2 py-1 text-center text-xs">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium">{optionLabel}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.storage.map((option) => (
                  <button
                    key={option.size}
                    type="button"
                    onClick={() => setStorage(option.size)}
                    className={`rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5 ${
                      storage === option.size
                        ? 'border-apple-blue bg-apple-blue/5'
                        : 'border-apple-border hover:border-apple-dark'
                    }`}
                  >
                    <span className="block font-medium">{option.size}</span>
                    <span className="text-sm text-apple-muted">{formatPrice(option.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-apple-gray p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-apple-muted">Price details</p>
              <p className="mt-3 text-3xl font-medium tracking-tight">{formatPrice(price)}</p>
              <p className="mt-1 text-sm text-apple-muted">
                or {formatPrice(monthly)}/mo. for 12 months
              </p>
              <p className="mt-4 text-sm text-apple-dark">
                {selected.name} · {storage}
              </p>
              <p className="mt-2 text-sm text-apple-muted">
                {meta.delivery} {eta}. {meta.stock} in stock.
              </p>
              <p className="mt-1 text-xs text-apple-muted">
                SKU {meta.sku} · {meta.warranty} · {meta.origin}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <MagneticButton className="w-full flex-1">
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => addToCart(product, { color, storage })}
                >
                  Add to Cart
                </button>
              </MagneticButton>
              <MagneticButton className="w-full flex-1">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-apple-dark px-[1.15rem] py-[0.62rem] text-[0.9rem] font-medium text-white transition hover:bg-black hover:scale-[1.03] sm:px-[1.35rem] sm:py-[0.7rem] sm:text-[0.95rem]"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </MagneticButton>
              <button
                type="button"
                aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
                className="grid h-12 w-12 shrink-0 place-items-center self-center rounded-full border border-apple-border transition hover:scale-110 sm:self-auto"
                onClick={() => toggleWishlist(product.id)}
              >
                {saved ? <HiHeart className="text-red-500" size={20} /> : <HiOutlineHeart size={20} />}
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="specs" className="w-full bg-apple-gray py-16">
        <div className="page-shell grid gap-10 lg:grid-cols-2">
          <div>
            <ScrollReveal variant="left">
              <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight">Tech specs</h2>
            </ScrollReveal>
            <div className="mt-8 divide-y divide-apple-border overflow-hidden bg-white">
              {product.specs.map((spec, index) => (
                <ScrollReveal key={spec.label} delay={index * 50} variant="up">
                  <div className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:items-center">
                    <p className="text-sm font-medium text-apple-muted">{spec.label}</p>
                    <p className="sm:col-span-2">{spec.value}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ScrollReveal variant="right">
            <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight">What’s in the box</h2>
            <ul className="mt-8 space-y-3 bg-white p-6">
              {meta.box.map((item) => (
                <li key={item} className="border-b border-apple-border pb-3 last:border-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 && (
        <section id="related" className="w-full py-16">
          <div className="page-shell">
            <ScrollReveal>
              <div className="mb-8 flex items-end justify-between gap-3">
                <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight">You may also like</h2>
                <Link to={`/${product.category}`} className="btn-ghost shrink-0 text-sm">
                  See all <HiChevronRight />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {related.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 60} variant="up">
                  <ProductCard product={item} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
