import { useEffect, useId, useRef, useState } from 'react'
import { getProductPhotos } from '../data/products'

function clamp(n) {
  return Math.max(0, Math.min(255, Math.round(n)))
}

export function shadeHex(hex, percent) {
  const raw = hex.replace('#', '')
  const num = parseInt(raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw, 16)
  const amt = Math.round(2.55 * percent)
  const r = clamp((num >> 16) + amt)
  const g = clamp(((num >> 8) & 0xff) + amt)
  const b = clamp((num & 0xff) + amt)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function getShape(product) {
  if (product?.id === 'imac-24') return 'imac'
  if (product?.id === 'airpods-max') return 'airpods-max'
  if (product?.category === 'mac') return 'macbook'
  return product?.category || 'iphone'
}

function IPhone({ color, view, uid }) {
  const light = shadeHex(color, 18)
  const dark = shadeHex(color, -22)
  if (view === 'back') {
    return (
      <svg viewBox="0 0 280 560" className="h-full w-full">
        <defs>
          <linearGradient id={`${uid}-ib`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light} />
            <stop offset="55%" stopColor={color} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
        </defs>
        <rect x="24" y="18" width="232" height="524" rx="48" fill={`url(#${uid}-ib)`} />
        <rect x="28" y="22" width="224" height="516" rx="44" fill={color} />
        <rect x="42" y="46" width="92" height="92" rx="24" fill={dark} opacity="0.55" />
        <circle cx="68" cy="72" r="16" fill="#1a1a1a" />
        <circle cx="108" cy="72" r="16" fill="#1a1a1a" />
        <circle cx="68" cy="112" r="16" fill="#1a1a1a" />
        <circle cx="68" cy="72" r="7" fill="#3d6ea8" />
        <circle cx="108" cy="72" r="7" fill="#2c4c78" />
        <circle cx="68" cy="112" r="7" fill="#5a7aa0" />
        <path
          d="M140 268c4.4 0 8-3.6 8-8 0-5.8-4.6-10.8-8.8-14.6 2.2.2 4.8-1.2 6.2-3.4 1.4-2.2 1.6-4.8.6-7.2-2.2.1-4.6 1.4-6 3.4-1.4 2-1.8 4.4-1.2 6.8-4.6.2-8.8 3.8-8.8 8.6 0 6.4 5.4 14.4 10 14.4z"
          fill={shadeHex(color, -40)}
          opacity="0.55"
        />
      </svg>
    )
  }
  if (view === 'angle') {
    return (
      <svg viewBox="0 0 320 560" className="h-full w-full">
        <defs>
          <linearGradient id={`${uid}-ia`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={dark} />
            <stop offset="35%" stopColor={color} />
            <stop offset="100%" stopColor={light} />
          </linearGradient>
        </defs>
        <path
          d="M86 36h150c28 0 48 22 48 50v388c0 28-20 50-48 50H108c-28 0-50-22-50-50V96c0-32 20-60 28-60z"
          fill={`url(#${uid}-ia)`}
        />
        <rect x="78" y="58" width="184" height="416" rx="36" fill="#111" />
        <rect x="90" y="78" width="160" height="376" rx="24" fill={`url(#${uid}-ia)`} opacity="0.25" />
        <rect x="132" y="68" width="76" height="18" rx="9" fill="#000" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 280 560" className="h-full w-full">
      <defs>
        <linearGradient id={`${uid}-if`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`${uid}-iw`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      <rect x="18" y="14" width="8" height="46" rx="3" fill={dark} />
      <rect x="18" y="78" width="8" height="70" rx="3" fill={dark} />
      <rect x="254" y="90" width="8" height="92" rx="3" fill={dark} />
      <rect x="24" y="18" width="232" height="524" rx="48" fill={`url(#${uid}-if)`} />
      <rect x="36" y="36" width="208" height="488" rx="38" fill="#0b0b0d" />
      <rect x="44" y="54" width="192" height="444" rx="28" fill={`url(#${uid}-iw)`} opacity="0.85" />
      <rect x="96" y="44" width="88" height="22" rx="11" fill="#000" />
      <rect x="110" y="498" width="60" height="5" rx="2.5" fill="#fff" opacity="0.35" />
    </svg>
  )
}

function IPad({ color, view }) {
  const light = shadeHex(color, 16)
  const dark = shadeHex(color, -24)
  if (view === 'back') {
    return (
      <svg viewBox="0 0 420 560" className="h-full w-full">
        <rect x="48" y="20" width="324" height="520" rx="36" fill={color} />
        <circle cx="96" cy="72" r="14" fill={dark} />
        <circle cx="96" cy="72" r="6" fill="#4a6d98" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 420 560" className="h-full w-full">
      <rect x="48" y="20" width="324" height="520" rx="36" fill={view === 'angle' ? dark : color} />
      <rect x="68" y="40" width="284" height="480" rx="22" fill="#111" />
      <rect x="78" y="58" width="264" height="430" rx="12" fill={light} opacity="0.35" />
      <circle cx="210" cy="512" r="8" fill={dark} />
    </svg>
  )
}

function MacBook({ color, view, uid }) {
  const light = shadeHex(color, 20)
  const dark = shadeHex(color, -28)
  return (
    <svg viewBox="0 0 640 420" className="h-full w-full">
      <defs>
        <linearGradient id={`${uid}-ml`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {view === 'back' ? (
        <>
          <rect x="70" y="36" width="500" height="320" rx="18" fill={`url(#${uid}-ml)`} />
          <path
            d="M320 180c6 0 11-5 11-11 0-8-6.4-15-12.2-20 3.2.3 6.6-1.6 8.6-4.6 2-3 2.2-6.6.8-10-3 .2-6.4 2-8.4 4.8-2 2.8-2.6 6-1.8 9.4-6.4.2-12.2 5.2-12.2 11.8 0 9 7.6 20 14.2 20z"
            fill={dark}
            opacity="0.5"
          />
        </>
      ) : (
        <>
          <rect x="70" y="24" width="500" height="300" rx="16" fill={dark} />
          <rect x="88" y="40" width="464" height="268" rx="6" fill="#111" />
          <rect x="108" y="58" width="424" height="232" fill={light} opacity="0.22" />
          <rect x="40" y="322" width="560" height="18" rx="4" fill={color} />
          <rect x="200" y="322" width="240" height="10" rx="3" fill={dark} opacity="0.35" />
          {view === 'angle' && <rect x="70" y="338" width="500" height="36" rx="6" fill={light} />}
        </>
      )}
    </svg>
  )
}

function IMac({ color, view }) {
  const light = shadeHex(color, 18)
  const dark = shadeHex(color, -20)
  return (
    <svg viewBox="0 0 560 480" className="h-full w-full">
      <rect x="48" y="24" width="464" height="300" rx="16" fill="#1c1c1e" />
      <rect x="64" y="40" width="432" height="248" fill={view === 'back' ? color : light} opacity={view === 'back' ? 1 : 0.3} />
      <rect x="48" y="324" width="464" height="36" fill={color} />
      <rect x="250" y="360" width="60" height="70" fill={dark} />
      <rect x="180" y="428" width="200" height="12" rx="6" fill={light} />
    </svg>
  )
}

function Watch({ color, view }) {
  const light = shadeHex(color, 16)
  const dark = shadeHex(color, -30)
  return (
    <svg viewBox="0 0 280 480" className="h-full w-full">
      <rect x="96" y="16" width="88" height="70" rx="16" fill={dark} />
      <rect x="70" y="78" width="140" height="170" rx="38" fill={color} />
      <rect x="84" y="92" width="112" height="142" rx="28" fill="#111" />
      <rect x="96" y="108" width="88" height="110" rx="18" fill={light} opacity="0.45" />
      <circle cx="214" cy="150" r="10" fill={light} />
      <rect x="96" y="248" width="88" height="90" rx="16" fill={dark} />
      {view !== 'front' && <rect x="108" y="70" width="64" height="14" rx="4" fill={light} />}
    </svg>
  )
}

function AirPods({ color, view }) {
  const light = shadeHex(color, 12)
  const dark = shadeHex(color, -10)
  return (
    <svg viewBox="0 0 360 420" className="h-full w-full">
      <rect x="110" y="150" width="140" height="180" rx="36" fill={color} />
      <rect x="118" y="158" width="124" height="70" rx="28" fill={light} />
      <rect x="110" y="228" width="140" height="8" fill={dark} opacity="0.25" />
      {view !== 'back' && (
        <>
          <path d="M92 86c20-38 76-38 88 6 4 16-6 28-18 32l-8 84c-2 14-22 14-24 0l-6-80c-14-8-28-20-32-42z" fill={color} />
          <path d="M268 86c-20-38-76-38-88 6-4 16 6 28 18 32l8 84c2 14 22 14 24 0l6-80c14-8 28-20 32-42z" fill={color} />
        </>
      )}
    </svg>
  )
}

function AirPodsMax({ color }) {
  const light = shadeHex(color, 18)
  const dark = shadeHex(color, -24)
  return (
    <svg viewBox="0 0 360 420" className="h-full w-full">
      <path d="M70 150c0-90 220-90 220 0" fill="none" stroke={dark} strokeWidth="22" />
      <rect x="48" y="140" width="70" height="170" rx="28" fill={color} />
      <rect x="242" y="140" width="70" height="170" rx="28" fill={color} />
      <rect x="58" y="158" width="50" height="134" rx="20" fill={light} />
      <rect x="252" y="158" width="50" height="134" rx="20" fill={dark} />
    </svg>
  )
}

export default function ProductVisual({
  product,
  colorName,
  hex,
  view = 'front',
  className = '',
  tone = 'light',
  priority = false,
}) {
  const uid = useId().replace(/:/g, '')
  const photos = product ? getProductPhotos(product, colorName) : []
  const viewIndex = view === 'angle' ? 1 : view === 'back' ? 2 : 0
  const start = photos[viewIndex] ? viewIndex : 0
  const [srcIndex, setSrcIndex] = useState(start)
  const triedAlt = useRef(false)

  useEffect(() => {
    setSrcIndex(start)
  }, [product?.id, colorName, view, start])

  useEffect(() => {
    triedAlt.current = false
  }, [srcIndex, start])

  const src = photos[srcIndex]
  const color =
    hex ||
    product?.colors?.find((c) => c.name === colorName)?.hex ||
    product?.colors?.[0]?.hex ||
    '#d2d2d7'
  const shape = getShape(product)
  const surface = tone === 'dark' ? 'bg-black' : 'bg-[#f5f5f7]'

  if (src) {
    return (
      <div className={`product-visual relative grid place-items-center overflow-hidden ${surface} ${className}`}>
        <img
          key={src}
          src={src}
          alt={`${product?.name || 'Apple product'} ${colorName || ''}`.trim()}
          className="visual-photo h-full w-full object-contain p-2 sm:p-4"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onError={(event) => {
            const current = event.currentTarget.src
            if (!triedAlt.current && current.includes('/4668/')) {
              triedAlt.current = true
              event.currentTarget.src = current.replace('/4668/', '/4982/')
              return
            }
            setSrcIndex((index) => index + 1)
          }}
        />
      </div>
    )
  }

  const visual = {
    iphone: <IPhone color={color} view={view} uid={uid} />,
    ipad: <IPad color={color} view={view} />,
    macbook: <MacBook color={color} view={view} uid={uid} />,
    imac: <IMac color={color} view={view} />,
    watch: <Watch color={color} view={view} />,
    airpods: <AirPods color={color} view={view} />,
    'airpods-max': <AirPodsMax color={color} view={view} />,
  }[shape] || <IPhone color={color} view={view} uid={uid} />

  return (
    <div
      className={`product-visual relative grid place-items-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 28%, ${shadeHex(color, 48)} 0%, #e8e8ed 58%, #f5f5f7 100%)`,
      }}
    >
      <div className="h-[86%] w-[86%] drop-shadow-xl">{visual}</div>
    </div>
  )
}
