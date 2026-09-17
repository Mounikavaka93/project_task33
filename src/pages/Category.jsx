import { Link, useParams } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import ProductCard from '../components/ProductCard'
import ProductVisual from '../components/ProductVisual'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import { getCategory, getProductsByCategory } from '../data/products'
import { useMotion } from '../context/MotionContext'
import { formatPrice } from '../utils/format'
import NotFound from './NotFound'

export default function Category() {
  const { slug } = useParams()
  const { ready } = useMotion()
  const category = getCategory(slug)
  const items = getProductsByCategory(slug)

  if (!category) return <NotFound />

  const dark = category.theme === 'dark'
  const headline = category.headline || category.name
  const lead = items[0]

  return (
    <div key={slug} className="w-full">
      <section
        className={`relative w-full overflow-hidden ${dark ? 'bg-black text-white' : 'bg-apple-gray text-apple-dark'}`}
      >
        <div className="page-shell flex flex-col items-center pt-14 text-center sm:pt-20">
          <p className={`${ready ? 'hero-copy' : 'opacity-0'} text-sm font-medium`}>
            Apple {category.name}
          </p>
          <h1 className="mt-2 max-w-[16ch] text-[clamp(2rem,8vw,3rem)] font-semibold tracking-tight sm:max-w-none sm:text-6xl lg:text-7xl">
            <SplitText text={headline} />
          </h1>
          <p className={`${ready ? 'hero-copy-delay' : 'opacity-0'} mt-4 max-w-2xl text-base opacity-80 sm:text-xl`}>
            {category.tagline}
          </p>
          <p className={`${ready ? 'hero-copy-later' : 'opacity-0'} mt-3 max-w-2xl text-sm opacity-60 sm:text-base`}>
            {category.description}
          </p>
          <div className={`${ready ? 'hero-cta' : 'opacity-0'} mt-8 flex flex-wrap items-center justify-center gap-3`}>
            <MagneticButton>
              <a
                href="#models"
                className={`btn-outline ${
                  dark
                    ? 'border-white/40 text-white hover:bg-white hover:text-black'
                    : 'border-apple-dark/20 text-apple-dark hover:bg-apple-dark hover:text-white'
                }`}
              >
                Explore Now
              </a>
            </MagneticButton>
            {lead && (
              <MagneticButton>
                <Link to={`/product/${lead.id}`} className="btn-primary">
                  Buy Now
                </Link>
              </MagneticButton>
            )}
          </div>
        </div>
        {lead && (
          <div className={`relative mt-10 w-full ${ready ? 'hero-image' : 'opacity-0'}`}>
            {dark && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black to-transparent" />
            )}
            <ProductVisual product={lead} className="h-[34vh] min-h-[200px] w-full sm:h-[48vh] lg:h-[54vh]" />
          </div>
        )}
      </section>

      {items.length > 0 && (
        <section className="w-full border-b border-apple-border bg-white py-10">
          <div className="page-shell">
            <ScrollReveal variant="left">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Compare at a glance.</h2>
              <p className="mt-2 text-apple-muted">
                Images, names, prices, and key specifications for every {category.name} model.
              </p>
            </ScrollReveal>
            <div className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]">
              {items.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 60} variant="up">
                  <Link
                    to={`/product/${product.id}`}
                    className="product-card group flex h-full flex-col bg-apple-gray p-4"
                  >
                    <div className="visual-wrap h-28 overflow-hidden sm:h-32">
                      <ProductVisual product={product} className="h-full w-full" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-apple-dark sm:text-base">{product.name}</h3>
                    <p className="mt-1 text-sm text-apple-dark">From {formatPrice(product.price)}</p>
                    <ul className="mt-3 space-y-1 border-t border-black/5 pt-3">
                      {product.specs.slice(0, 3).map((spec) => (
                        <li key={spec.label} className="text-[11px] leading-snug sm:text-xs">
                          <span className="block text-apple-muted">{spec.label}</span>
                          <span className="text-apple-dark">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="models" className="w-full bg-white py-14 sm:py-20">
        <div className="page-shell">
          <ScrollReveal variant="left">
            <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight">Explore {category.name}.</h2>
            <p className="mt-2 text-apple-muted">
              {items.length} models · Real product photos, full specs, and color options.
            </p>
          </ScrollReveal>
          {items.length === 0 ? (
            <p className="mt-10 text-apple-muted">No products are available in this category yet.</p>
          ) : (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {items.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 70}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
