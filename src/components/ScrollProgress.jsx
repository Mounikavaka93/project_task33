import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scale, setScale] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScale(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scale})` }}
      aria-hidden="true"
    />
  )
}
