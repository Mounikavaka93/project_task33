import { useRef } from 'react'

export default function MagneticButton({ children, className = '' }) {
  const ref = useRef(null)

  const onMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const x = event.clientX - box.left - box.width / 2
    const y = event.clientY - box.top - box.height / 2
    el.style.transition = 'transform 0.08s linear'
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      className={`inline-flex justify-center will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
