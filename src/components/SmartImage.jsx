import { useState } from 'react'
import ProductVisual from './ProductVisual'

export default function SmartImage({
  src,
  alt,
  className = '',
  product,
  colorName,
  view = 'front',
}) {
  const [failed, setFailed] = useState(!src)

  if (failed || !src) {
    return (
      <ProductVisual
        product={product}
        colorName={colorName}
        view={view}
        className={className}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
