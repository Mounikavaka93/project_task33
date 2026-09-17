import { HiCheck } from 'react-icons/hi2'
import { useStore } from '../context/StoreContext'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null

  return (
    <div className="pointer-events-none fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-[80] w-full max-w-[min(90vw,28rem)] -translate-x-1/2 px-4">
      <div className="toast flex items-center gap-2 rounded-full bg-apple-dark/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur sm:px-5">
        <HiCheck className="shrink-0 text-green-400" size={18} />
        <span className="min-w-0 leading-snug">{toast}</span>
      </div>
    </div>
  )
}
