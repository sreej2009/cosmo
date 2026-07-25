import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Star, Clock, Play } from 'lucide-react'
import MoviePoster from './MoviePoster.jsx'

const genreAccent = {
  Action: { bar: 'bg-rose-500', glowRing: 'group-hover:ring-rose-400/60', glowShadow: 'rgba(244,63,94,0.45)' },
  Drama: { bar: 'bg-accent', glowRing: 'group-hover:ring-accent/50', glowShadow: 'rgba(204,154,46,0.45)' },
  Family: { bar: 'bg-emerald-500', glowRing: 'group-hover:ring-emerald-400/60', glowShadow: 'rgba(16,185,129,0.45)' },
  Romance: { bar: 'bg-pink-500', glowRing: 'group-hover:ring-pink-400/60', glowShadow: 'rgba(236,72,153,0.45)' },
  'Sci-Fi': { bar: 'bg-sky-500', glowRing: 'group-hover:ring-sky-400/60', glowShadow: 'rgba(14,165,233,0.45)' },
  Comedy: { bar: 'bg-teal-500', glowRing: 'group-hover:ring-teal-400/60', glowShadow: 'rgba(20,184,166,0.45)' },
  Thriller: { bar: 'bg-violet-500', glowRing: 'group-hover:ring-violet-400/60', glowShadow: 'rgba(139,92,246,0.45)' },
  Crime: { bar: 'bg-orange-500', glowRing: 'group-hover:ring-orange-400/60', glowShadow: 'rgba(249,115,22,0.45)' },
}
const defaultAccent = { bar: 'bg-accent', glowRing: 'group-hover:ring-accent/50', glowShadow: 'rgba(204,154,46,0.45)' }

export default function MovieCard({ movie, index = 0, rank }) {
  const accent = genreAccent[movie.genres?.[0]] ?? defaultAccent
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 300, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 300, damping: 22 })
  const glareX = useTransform(mouseX, (v) => `${v * 100}%`)
  const glareY = useTransform(mouseY, (v) => `${v * 100}%`)
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.3), transparent 55%)`,
  )

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 8) * 0.06 }}
      className={`snap-start shrink-0 flex items-end ${rank ? 'gap-1' : ''}`}
      style={{ perspective: 900 }}
    >
      {rank && (
        <span
          aria-hidden="true"
          className="font-display leading-none text-[7rem] sm:text-[8rem] text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent [-webkit-text-stroke:2px_rgba(240,193,75,0.35)] select-none -mr-5 translate-y-1"
        >
          {rank}
        </span>
      )}
      <Link
        ref={cardRef}
        to={`/movies/${movie.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ '--card-glow': accent.glowShadow }}
        className={`group relative block w-40 sm:w-48 aspect-[2/3] overflow-hidden rounded-xl border border-border/30 bg-surface transition-[border-color,box-shadow] duration-300 ease-out hover:z-10 hover:shadow-[0_25px_55px_-12px_var(--card-glow)] hover:ring-1 ${accent.glowRing} hover:border-accent/60`}
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.06, y: -10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <MoviePoster movie={movie} aspect="poster" fill />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />

          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBackground }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-background/40">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background shadow-[0_8px_24px_-4px_rgba(204,154,46,0.7)] scale-90 transition-transform duration-300 group-hover:scale-100">
              <Play size={19} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="translate-y-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              View Details
            </span>
          </div>

          <span className="absolute top-2.5 left-2.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold text-accent-light backdrop-blur-sm">
            {movie.rating}
          </span>
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur-sm">
            <Star size={10} className="text-accent-light fill-accent-light" aria-hidden="true" />
            {movie.imdb}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black via-black/80 to-transparent px-3 pt-14 pb-3">
            <span
              className={`h-1 w-8 rounded-full ${accent.bar} transition-all duration-300 group-hover:w-12`}
              aria-hidden="true"
            />
            <h3 className="font-display text-base tracking-wide text-white leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-accent-light">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-white/70">
              <span className="flex items-center gap-1 shrink-0 text-accent-light/90">
                <Clock size={11} aria-hidden="true" />
                {movie.durationMin}m
              </span>
              <span className="h-3 w-px shrink-0 bg-white/30" aria-hidden="true" />
              <span className="truncate">{movie.genres.join(' · ')}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
