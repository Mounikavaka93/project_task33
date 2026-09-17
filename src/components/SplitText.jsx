import { useMotion } from '../context/MotionContext'

export default function SplitText({ text, className = '' }) {
  const { ready } = useMotion()
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span className={`split-title ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, letterIndex) => {
              const index = charIndex++
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  className={ready ? 'char-in' : 'char-wait'}
                  style={ready ? { animationDelay: `${index * 0.035}s` } : undefined}
                >
                  {char}
                </span>
              )
            })}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}
