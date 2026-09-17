import { useEffect, useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { useMotion } from '../context/MotionContext'

export default function EntranceScreen() {
  const { complete } = useMotion()
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    const fade = window.setTimeout(() => {
      complete()
      setPhase('out')
    }, 2400)
    const done = window.setTimeout(() => setPhase('gone'), 3100)
    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(done)
    }
  }, [complete])

  useEffect(() => {
    if (phase !== 'out') return undefined
    const gone = window.setTimeout(() => setPhase('gone'), 650)
    return () => window.clearTimeout(gone)
  }, [phase])

  if (phase === 'gone') return null

  const skip = () => {
    complete()
    setPhase('out')
  }

  return (
    <div className={`entrance ${phase === 'out' ? 'entrance-out' : ''}`}>
      <div className="entrance-glow" />
      <span className="entrance-ring r1" />
      <span className="entrance-ring r2" />
      <span className="entrance-ring r3" />
      <FaApple className="entrance-apple-icon" />
      <p className="entrance-word">apple</p>
      <p className="entrance-store">Store</p>
      <button type="button" className="entrance-skip" onClick={skip}>
        Skip
      </button>
    </div>
  )
}
