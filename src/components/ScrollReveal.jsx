import { useEffect, useRef, useState } from 'react'
import { useMotion } from '../context/MotionContext'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}) {
  const ref = useRef(null)
  const { ready } = useMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ready) return undefined
    const el = ref.current
    if (!el) return undefined

    const show = () => setVisible(true)

    if (typeof IntersectionObserver === 'undefined') {
      show()
      return undefined
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 24) {
      show()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          show()
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px 80px 0px' },
    )
    observer.observe(el)
    const failSafe = window.setTimeout(show, 1200)
    return () => {
      observer.disconnect()
      window.clearTimeout(failSafe)
    }
  }, [ready, delay])

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
