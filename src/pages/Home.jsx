import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiChevronRight,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTruck,
} from 'react-icons/hi2'
import ScrollReveal from '../components/ScrollReveal'
import ProductCard from '../components/ProductCard'
import SplitText from '../components/SplitText'
import MagneticButton from '../components/MagneticButton'
import PhoneRail from '../components/PhoneRail'
import ProductVisual from '../components/ProductVisual'
import { formatPrice } from '../utils/format'
import { useMotion } from '../context/MotionContext'
import { getFeaturedProducts, getProductById, products } from '../data/products'

const hero = products.find((p) => p.id === 'iphone-17-pro-max')
const latest = products.filter((p) => p.isNew).slice(0, 6)

const stories = [
  {
    kicker: 'iPhone 17 Pro Max',
    title: 'The ultimate iPhone.',
    copy: 'A19 Pro. Fusion camera. Titanium. Available to shop now.',
    image: '/heroes/iphone-pro.jpg',
    theme: 'dark',
    to: '/product/iphone-17-pro-max',
    more: '/iphone',
    full: true,
  },
  {
    kicker: 'iPhone',
    title: 'Hello, hello.',
    copy: 'A new way to share the camera you love — designed to feel cinematic in every hand.',
    image: '/heroes/iphone-family.jpg',
    theme: 'light',
    to: '/iphone',
    more: '/iphone',
    full: true,
  },
  {
    kicker: 'Apple Watch',
    title: 'The ultimate sports watch.',
    copy: 'Advanced health insights. A brighter display. Ready when you are.',
    image: '/heroes/watch.jpg',
    theme: 'light',
    to: '/product/watch-series-11',
    more: '/watch',
  },
  {
    kicker: 'Apple Watch Ultra 3',
    title: 'A battery you can’t outrun.',
    copy: 'Titanium. Adventure tools. The most capable Apple Watch.',
    image: '/heroes/watch-ultra.jpg',
    theme: 'dark',
    to: '/product/watch-ultra-3',
    more: '/watch',
  },
  {
    kicker: 'AirPods Pro 3',
    title: 'Immersive. Intelligent. Iconic.',
    copy: 'The world’s best in-ear Active Noise Cancellation.',
    image: '/heroes/airpods.jpg',
    theme: 'dark',
    to: '/product/airpods-pro-3',
    more: '/airpods',
  },
  {
    kicker: 'MacBook Air',
    title: 'Sky high performance.',
    copy: 'Supercharged by Apple silicon. Silent. Featherlight.',
    image: '/heroes/mac-air.jpg',
    theme: 'light',
    to: '/product/macbook-air-15',
    more: '/mac',
  },
  {
    kicker: 'MacBook Pro',
    title: 'A work of smart.',
    copy: 'M4 Pro and M4 Max take pro workflows even further.',
    image: '/heroes/mac-pro.jpg',
    theme: 'dark',
    to: '/product/macbook-pro-16',
    more: '/mac',
  },
]

const values = [
  {
    icon: HiOutlineTruck,
    title: 'Fast, free delivery',
    copy: 'Get free two-day delivery on eligible products — or pick up at an Apple Store.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Apple Intelligence',
    copy: 'Personal, private, and powerful intelligence built into the latest devices.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Privacy built in',
    copy: 'What happens on your iPhone stays on your iPhone — by design.',
  },
]

function StoryPhoto({ story, className, priority = false }) {
  const [failed, setFailed] = useState(false)
  const productId = story.to.startsWith('/product/') ? story.to.replace('/product/', '') : null
  const product = productId ? getProductById(productId) : getProductById('iphone-17-pro-max')

  if (failed && product) {
    return (
      <ProductVisual
        product={product}
        className={className}
        tone={story.theme === 'dark' ? 'dark' : 'light'}
        priority={priority}
      />
    )
  }

  return (
    <img
      src={story.image}
      alt={story.kicker}
      className={`hero-photo ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

function StoryBanner({ story }) {
  const dark = story.theme === 'dark'

  return (
    <section className={`relative h-full w-full overflow-hidden ${dark ? 'bg-black text-white' : 'bg-apple-gray text-apple-dark'}`}>
      <div className="page-shell relative z-10 flex flex-col items-center pt-14 text-center sm:pt-16">
        <p className="text-sm font-medium opacity-70">{story.kicker}</p>
        <h2 className="mt-2 text-[clamp(1.8rem,6vw,3.4rem)] font-semibold tracking-tight">{story.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80 sm:text-lg">{story.copy}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <Link
              to={story.more}
              className={`btn-outline ${
                dark
                  ? 'border-white/40 text-white hover:bg-white hover:text-black'
                  : 'border-apple-dark/20 text-apple-dark hover:bg-apple-dark hover:text-white'
              }`}
            >
              Learn more
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to={story.to} className="btn-primary">
              Buy
            </Link>
          </MagneticButton>
        </div>
      </div>
      <div className={`relative mt-6 w-full ${story.full ? 'h-[42vh] min-h-[240px] sm:h-[56vh]' : 'h-[34vh] min-h-[220px] sm:h-[42vh]'}`}>
        <StoryPhoto story={story} className="h-full w-full" priority={Boolean(story.full)} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
    </section>
  )
}

export default function Home() {
  const featured = getFeaturedProducts()
  const { ready } = useMotion()
  const fullStories = stories.filter((item) => item.full)
  const tileStories = stories.filter((item) => !item.full)

  return (
    <div className="w-full">
      <section className="relative min-h-[88vh] w-full overflow-hidden bg-black text-white">
        <StoryPhoto story={stories[0]} className="absolute inset-0 h-full w-full" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />
        <div className="page-shell relative z-10 flex min-h-[88vh] w-full flex-col items-center pt-16 text-center sm:pt-20">
          {hero.isNew && (
            <p className={`${ready ? 'hero-copy' : 'opacity-0'} text-sm font-medium text-[#ffb340]`}>New</p>
          )}
          <h1 className="mt-2 max-w-[18ch] text-[clamp(2rem,8.4vw,2.625rem)] font-semibold leading-[1.08] tracking-tight sm:max-w-none sm:text-6xl lg:text-7xl">
            <SplitText text={hero.name} />
          </h1>
          <p className={`${ready ? 'hero-copy-delay' : 'opacity-0'} mt-4 max-w-xl text-base text-white/85 sm:text-2xl`}>
            {hero.tagline}
          </p>
          <p className={`${ready ? 'hero-copy-later' : 'opacity-0'} mt-2 text-base text-white/60`}>
            From {formatPrice(hero.price)}.
          </p>
          <div className={`${ready ? 'hero-cta' : 'opacity-0'} mt-8 flex flex-wrap items-center justify-center gap-3`}>
            <MagneticButton>
              <Link to="/iphone" className="btn-outline border-white/40 text-white hover:bg-white hover:text-black">
                Learn more
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to={`/product/${hero.id}`} className="btn-primary">
                Buy
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="w-full bg-apple-gray py-3 text-center text-sm leading-relaxed text-apple-dark">
        <div className="page-shell">
          Get up to ₹15,000 instant cashback on selected products with eligible cards. Plus up to 6 months of No Cost EMI.{' '}
          <Link to="/iphone" className="text-apple-blue hover:underline">
            Shop
          </Link>
        </div>
      </section>

      {fullStories.slice(1).map((story) => (
        <StoryBanner key={story.kicker} story={story} />
      ))}

      <section className="w-full">
        <div className="grid gap-3 md:grid-cols-2">
          {tileStories.map((story) => (
            <StoryBanner key={story.kicker} story={story} />
          ))}
        </div>
      </section>

      <PhoneRail />

      <section className="w-full bg-apple-gray py-16 sm:py-20">
        <div className="page-shell">
          <ScrollReveal>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight sm:text-4xl">The latest.</h2>
                <p className="mt-2 text-apple-muted">Take a look at what’s new, right now.</p>
              </div>
              <Link to="/iphone" className="btn-ghost hidden sm:inline-flex">
                Shop all <HiChevronRight />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {latest.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 60} variant="up">
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="page-shell">
          <ScrollReveal variant="blur">
            <h2 className="text-[clamp(1.6rem,5vw,2.25rem)] font-semibold tracking-tight sm:text-4xl">
              Featured products.
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {featured.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 60}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-apple-gray py-16 sm:py-20">
        <div className="page-shell grid gap-4 md:grid-cols-3">
          {values.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 90} variant="up">
              <div className="h-full bg-white px-6 py-8 text-center sm:px-8 sm:py-10">
                <item.icon className="mx-auto text-apple-blue" size={32} />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-apple-muted">{item.copy}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
