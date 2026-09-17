import { products } from '../data/products'

export default function Marquee() {
  const labels = [...products.map((p) => p.name), ...products.map((p) => p.name)]

  return (
    <div className="marquee border-y border-white/10 bg-black py-4 text-white/70">
      <div className="marquee-track">
        {labels.map((label, index) => (
          <span key={`${label}-${index}`} className="whitespace-nowrap text-sm tracking-[0.22em] uppercase">
            {label}
            <span className="mx-6 text-white/25">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
