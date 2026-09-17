import { Link } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'
import { categories } from '../data/products'
import ScrollReveal from './ScrollReveal'

const columns = [
  {
    title: 'Shop and Learn',
    links: [
      { label: 'Store', to: '/' },
      ...categories.map((c) => ({ label: c.name, to: `/${c.slug}` })),
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Orders', to: '/orders' },
      { label: 'Bag', to: '/cart' },
      { label: 'Favorites', to: '/wishlist' },
      { label: 'Checkout', to: '/checkout' },
    ],
  },
  {
    title: 'Apple Store',
    links: [
      { label: 'Find a Store', to: '/' },
      { label: 'Genius Bar', to: '/' },
      { label: 'Today at Apple', to: '/' },
      { label: 'Apple Trade In', to: '/' },
    ],
  },
  {
    title: 'Values',
    links: [
      { label: 'Accessibility', to: '/' },
      { label: 'Environment', to: '/' },
      { label: 'Privacy', to: '/' },
      { label: 'Supplier Responsibility', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-apple-border bg-apple-gray text-[12px] text-apple-muted">
      <ScrollReveal>
        <div className="page-shell py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
          <p className="mb-6 border-b border-apple-border pb-4 leading-relaxed">
            This is a demonstration storefront inspired by Apple design. Product names,
            images, and trademarks belong to their respective owners. Not affiliated
            with Apple Inc.
          </p>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-2 font-semibold text-apple-dark">{col.title}</h3>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="transition hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-apple-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5">
              <FaApple className="text-apple-dark" />
              Copyright © {new Date().getFullYear()} Apple Store Demo. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
              <span>Sales and Refunds</span>
              <span>Legal</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}
