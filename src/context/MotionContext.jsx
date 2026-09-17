import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const MotionContext = createContext({
  ready: false,
  complete: () => {},
})

export function MotionProvider({ children }) {
  const [ready, setReady] = useState(false)
  const complete = useCallback(() => setReady(true), [])

  useEffect(() => {
    const safety = window.setTimeout(() => setReady(true), 4200)
    return () => window.clearTimeout(safety)
  }, [])

  const value = useMemo(() => ({ ready, complete }), [ready, complete])
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotion() {
  return useContext(MotionContext)
}
