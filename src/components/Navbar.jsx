import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'
import {
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineClipboardDocumentList,
  HiOutlineBars3,
  HiXMark,
  HiChevronRight,
} from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'
import { navMenus } from '../data/nav'
import NavFlyout from './NavFlyout'

export default function Navbar() {
  const { cartCount, setCartOpen, setSearchOpen, wishlist, cartOpen, searchOpen } = useStore()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuRender, setMenuRender] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [openGroup, setOpenGroup] = useState(null)

  const closeFlyout = () => setActiveMenu(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    closeFlyout()
    setOpenGroup(null)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        closeFlyout()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, cartOpen, searchOpen])

  const openMenu = () => {
    closeFlyout()
    setMenuRender(true)
    setMenuOpen(true)
  }

  const closeMenu = () => setMenuOpen(false)

  const toggleMenu = () => {
    if (menuOpen) closeMenu()
    else openMenu()
  }

  const openSearch = () => {
    closeMenu()
    closeFlyout()
    setCartOpen(false)
    setSearchOpen(true)
  }

  const openCart = () => {
    closeMenu()
    closeFlyout()
    setSearchOpen(false)
    setCartOpen(true)
  }

  const toggleFlyout = (to) => {
    closeMenu()
    setSearchOpen(false)
    setCartOpen(false)
    setActiveMenu((current) => (current === to ? null : to))
  }

  const onMenuAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return
    if (!menuOpen) setMenuRender(false)
  }

  const current = navMenus.find((item) => item.to === activeMenu)

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-50 w-full transition-[background,backdrop-filter] duration-300 ${
          scrolled || menuOpen || activeMenu
            ? 'bg-neutral-950/92 backdrop-blur-2xl'
            : 'bg-neutral-950/80 backdrop-blur-xl'
        }`}
      >
        <nav className="page-shell grid h-12 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <Link
            to="/"
            className="nav-icon justify-self-start text-white"
            aria-label="Apple Store home"
            onClick={() => {
              closeMenu()
              closeFlyout()
            }}
          >
            <FaApple size={18} />
          </Link>

          <ul className="hidden items-center justify-center gap-5 lg:flex xl:gap-8">
            {navMenus.map((item) => (
              <li key={item.to}>
                <button
                  type="button"
                  className={`nav-link text-[12px] tracking-wide transition ${
                    activeMenu === item.to || location.pathname === item.to
                      ? 'active-link text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                  aria-expanded={activeMenu === item.to}
                  onClick={() => toggleFlyout(item.to)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-self-end gap-1 text-white sm:gap-2 lg:gap-3">
            <button type="button" aria-label="Search" className="nav-icon" onClick={openSearch}>
              <HiOutlineMagnifyingGlass size={18} />
            </button>
            <Link to="/orders" aria-label="Orders" className="nav-icon hidden sm:inline-flex" onClick={closeFlyout}>
              <HiOutlineClipboardDocumentList size={18} />
            </Link>
            <Link to="/wishlist" aria-label="Favorites" className="nav-icon relative" onClick={closeFlyout}>
              <HiOutlineHeart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-apple-blue px-1 text-[9px] font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ''}`}
              className="nav-icon relative"
              onClick={openCart}
            >
              <HiOutlineShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-apple-blue px-1 text-[9px] font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`nav-toggle lg:hidden ${menuRender ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={toggleMenu}
            >
              {menuRender ? <HiXMark size={22} /> : <HiOutlineBars3 size={22} />}
            </button>
          </div>
        </nav>
        {current && (
          <div className="hidden lg:block">
            <NavFlyout menu={current} onNavigate={closeFlyout} />
          </div>
        )}
      </header>

      {activeMenu && (
        <button
          type="button"
          className="fixed inset-0 z-40 hidden bg-black/40 lg:block"
          aria-label="Close menu"
          onClick={closeFlyout}
        />
      )}

      {menuRender && (
        <div
          id="mobile-nav"
          className={`mobile-menu fixed inset-0 z-40 overflow-y-auto bg-neutral-950 pt-[calc(4rem+env(safe-area-inset-top,0px))] lg:hidden ${menuOpen ? '' : 'is-closing'}`}
          onAnimationEnd={onMenuAnimationEnd}
        >
          <ul className="page-shell flex flex-col py-4 pb-16">
            {navMenus.map((item, index) => (
              <li key={item.to} style={{ animationDelay: `${index * 0.05}s` }}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-2xl font-semibold text-white/90"
                  onClick={() => setOpenGroup((currentGroup) => (currentGroup === item.to ? null : item.to))}
                >
                  {item.label}
                  <HiChevronRight
                    className={`transition ${openGroup === item.to ? 'rotate-90' : ''}`}
                    size={22}
                  />
                </button>
                {openGroup === item.to && (
                  <div className="mb-4 space-y-4 border-b border-white/10 pb-4">
                    {item.columns.map((column) => (
                      <div key={column.title}>
                        <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/40">{column.title}</p>
                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={`${item.to}-${link.label}`}>
                              <Link
                                to={link.to}
                                className="block text-lg text-white/80"
                                onClick={closeMenu}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link to={item.to} className="inline-flex text-sm text-apple-blue" onClick={closeMenu}>
                      Explore {item.label}
                    </Link>
                  </div>
                )}
              </li>
            ))}
            <li style={{ animationDelay: `${navMenus.length * 0.05}s` }}>
              <button
                type="button"
                className="block w-full py-3 text-left text-2xl font-semibold text-white/90"
                onClick={openSearch}
              >
                Search
              </button>
            </li>
            <li>
              <Link to="/wishlist" className="block py-3 text-2xl font-semibold text-white/90" onClick={closeMenu}>
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/orders" className="block py-3 text-2xl font-semibold text-white/90" onClick={closeMenu}>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block py-3 text-2xl font-semibold text-white/90" onClick={closeMenu}>
                Bag
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
