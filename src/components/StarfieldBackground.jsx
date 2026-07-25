import { useMemo } from 'react'

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: `${2 + Math.random() * 4}s`,
    delay: `${Math.random() * 4}s`,
    min: (Math.random() * 0.3).toFixed(2),
    max: (0.6 + Math.random() * 0.4).toFixed(2),
  }))
}

export default function StarfieldBackground({ density = 120, className = '' }) {
  const stars = useMemo(() => generateStars(density), [density])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,30,34,0.6),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(204,154,46,0.12),_transparent_55%)]" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--twinkle-duration': star.duration,
            '--twinkle-delay': star.delay,
            '--twinkle-min': star.min,
            '--twinkle-max': star.max,
          }}
        />
      ))}
    </div>
  )
}
