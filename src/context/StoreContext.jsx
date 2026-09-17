import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getProductById } from '../data/products'
import { MAX_CART_QTY } from '../utils/format'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('apple-cart', []))
  const [wishlist, setWishlist] = useState(() => load('apple-wishlist', []))
  const [orders, setOrders] = useState(() => load('apple-orders', []))
  const [toast, setToast] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('apple-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('apple-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('apple-orders', JSON.stringify(orders))
  }, [orders])

  const showToast = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }, [])

  const addToCart = useCallback(
    (product, { color, storage, quantity = 1, openDrawer = true } = {}) => {
      const colorName = color || product.colors[0].name
      const storageSize = storage || product.storage[0].size
      const unitPrice =
        product.storage.find((s) => s.size === storageSize)?.price ?? product.price
      const key = `${product.id}-${colorName}-${storageSize}`

      setCart((prev) => {
        const existing = prev.find((item) => item.key === key)
        if (existing) {
          return prev.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            name: product.name,
            image: null,
            hex: product.colors.find((c) => c.name === colorName)?.hex || product.colors[0].hex,
            shape: product.category,
            color: colorName,
            storage: storageSize,
            unitPrice,
            quantity,
          },
        ]
      })
      showToast(`${product.name} added to bag`)
      if (openDrawer) {
        setSearchOpen(false)
        setCartOpen(true)
      }
    },
    [showToast],
  )

  const updateQuantity = useCallback((key, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.min(MAX_CART_QTY, Math.max(1, quantity)) }
          : item,
      ),
    )
  }, [])

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((item) => item.key !== key))
    showToast('Removed from bag')
  }, [showToast])

  const clearCart = useCallback(() => setCart([]), [])

  const placeOrder = useCallback((details) => {
    const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const shipping = details.totals?.shipping ?? 0
    const tax = details.totals?.tax ?? 0
    const order = {
      id: `APL${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: details.payment.method === 'cod' ? 'confirmed' : 'paid',
      paymentStatus: details.payment.method === 'cod' ? 'pending' : 'paid',
      ...details,
      items: cart,
      totals: {
        subtotal,
        shipping,
        tax,
        total: details.totals?.total ?? subtotal + shipping + tax,
      },
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
    showToast('Order placed successfully')
    return order
  }, [cart, showToast])

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId)
        const product = getProductById(productId)
        showToast(
          exists
            ? `${product?.name ?? 'Item'} removed from favorites`
            : `${product?.name ?? 'Item'} saved to favorites`,
        )
        return exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      })
    },
    [showToast],
  )

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart],
  )

  const value = {
    cart,
    wishlist,
    toast,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    orders,
    placeOrder,
    cartCount,
    cartTotal,
    showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
