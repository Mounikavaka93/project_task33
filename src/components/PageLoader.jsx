import { useEffect, useState } from 'react'
import { FaApple } from 'react-icons/fa'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1750)
    return () => window.clearTimeout(timer)
  }, [])

  if (hidden) return null

  return (
    <div className="page-loader" aria-hidden="true">
      <span className="loader-ring" />
      <FaApple className="page-loader-logo relative" size={40} />
    </div>
  )
}
