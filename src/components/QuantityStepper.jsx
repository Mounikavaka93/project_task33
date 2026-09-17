import { HiMinus, HiPlus } from 'react-icons/hi2'
import { MAX_CART_QTY } from '../utils/format'

export default function QuantityStepper({ value, onChange, min = 1, max = MAX_CART_QTY }) {
  return (
    <div className="inline-flex items-center rounded-full border border-apple-border">
      <button
        type="button"
        className="grid h-9 w-9 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <HiMinus size={14} />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <HiPlus size={14} />
      </button>
    </div>
  )
}
