function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function hueFor(name) {
  const seed = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return seed % 360
}

export default function Avatar({ name, size = 56 }) {
  const hue = hueFor(name)

  return (
    <span
      className="flex items-center justify-center rounded-full font-display text-foreground shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(155deg, hsl(${hue} 35% 28%), hsl(${hue} 30% 14%))`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
