import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, BellRing, CalendarDays } from 'lucide-react'
import MoviePoster from './MoviePoster.jsx'

export default function ComingSoonCard({ movie, index = 0 }) {
  const [notify, setNotify] = useState(false)

  const releaseLabel = new Date(movie.releaseDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 6) * 0.08 }}
      className="group relative aspect-video overflow-hidden rounded-xl border border-border/30 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_45px_-12px_rgba(204,154,46,0.35)]"
    >
      <Link to={`/movies/${movie.id}`} className="absolute inset-0 block">
        <MoviePoster movie={movie} aspect="backdrop" fill />

        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-background/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-light backdrop-blur-sm">
          <CalendarDays size={12} aria-hidden="true" />
          {releaseLabel}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pt-16 pb-4">
          <span className="h-px w-8 bg-accent/80" aria-hidden="true" />
          <h3 className="font-display text-lg tracking-wide text-white leading-tight transition-colors duration-300 group-hover:text-accent-light">
            {movie.title}
          </h3>
          <p className="text-xs text-white/70">
            {movie.genres.join(' · ')} · {movie.durationMin}m
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => setNotify((v) => !v)}
        aria-pressed={notify}
        className={`absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors min-h-9 ${
          notify
            ? 'bg-accent text-background'
            : 'bg-background/85 text-foreground border border-border/50 hover:border-accent/60 backdrop-blur-sm'
        }`}
      >
        {notify ? <BellRing size={13} aria-hidden="true" /> : <Bell size={13} aria-hidden="true" />}
        {notify ? 'Notified' : 'Notify Me'}
      </button>
    </motion.div>
  )
}
