import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionProvider, useMotion } from '../context/MotionContext'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchModal from './SearchModal'
import EntranceScreen from './EntranceScreen'
import Toast from './Toast'
import ScrollProgress from './ScrollProgress'

function Shell() {
  const location = useLocation()
  const { ready } = useMotion()
  const isHome = location.pathname === '/'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="flex min-h-svh w-full max-w-full flex-col overflow-x-hidden bg-white">
      <EntranceScreen />
      <ScrollProgress />
      <Navbar />
      <main
        key={location.pathname}
        className={`w-full flex-1 pt-[calc(3rem+env(safe-area-inset-top,0px))] ${
          ready ? (isHome ? 'page-enter' : 'page-fade') : 'opacity-0'
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <Toast />
    </div>
  )
}

export default function Layout() {
  return (
    <MotionProvider>
      <Shell />
    </MotionProvider>
  )
}
