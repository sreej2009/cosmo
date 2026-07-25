import { Star } from 'lucide-react'

export default function StarRating({ score, size = 14 }) {
  const filled = Math.round((score / 10) * 5)

  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex items-center gap-0.5" role="img" aria-label={`${score} out of 10`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={i < filled ? 'text-accent-light fill-accent-light' : 'text-muted-foreground'}
            aria-hidden="true"
          />
        ))}
      </span>
      <span className="text-sm font-semibold text-foreground">{score}/10</span>
    </span>
  )
}
