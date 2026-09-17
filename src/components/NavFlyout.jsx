import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'
import { featuredForNav } from '../data/nav'

export default function NavFlyout({ menu, onNavigate }) {
  if (!menu) return null
  const featured = menu.to !== '/' ? featuredForNav(menu.to.replace('/', '')) : featuredForNav('iphone')

  return (
    <div className="nav-flyout" role="dialog" aria-label={`${menu.label} menu`}>
      <div className="page-shell grid gap-10 py-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.columns.map((column) => (
            <div key={column.title}>
              <p className="mb-3 text-[12px] text-white/45">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      onClick={onNavigate}
                      className="group flex items-baseline gap-2 text-[21px] font-semibold leading-tight text-white/90 transition hover:text-white"
                    >
                      {link.label}
                      {link.hint && (
                        <span className="text-[11px] font-medium text-[#ffb340]">{link.hint}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {featured && (
          <Link
            to={`/product/${featured.id}`}
            onClick={onNavigate}
            className="hidden overflow-hidden rounded-2xl bg-white/5 lg:block"
          >
            <ProductVisual product={featured} className="h-48 w-full" tone="dark" />
            <div className="px-5 py-4">
              <p className="text-sm text-white/50">Featured</p>
              <p className="mt-1 text-lg font-semibold text-white">{featured.name}</p>
              <p className="mt-1 text-sm text-white/55">{featured.tagline}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
