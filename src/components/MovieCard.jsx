import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Play } from 'lucide-react'
import MoviePoster from './MoviePoster.jsx'

export default function MovieCard({ movie, index = 0, rank }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 8) * 0.05 }}
      className={`snap-start shrink-0 flex items-end ${rank ? 'gap-1' : ''}`}
    >
      {rank && (
        <span
          aria-hidden="true"
          className="font-display leading-none text-[7rem] sm:text-[8rem] text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-transparent [-webkit-text-stroke:1.5px_rgba(242,201,76,0.28)] select-none -mr-5 translate-y-1"
        >
          {rank}
        </span>
      )}
      <Link
        to={`/movies/${movie.id}`}
        aria-label={`View ${movie.title}`}
        className="group relative block w-40 origin-bottom overflow-hidden rounded-lg border border-border/40 bg-surface shadow-[0_14px_30px_-16px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-strong/50 hover:shadow-[0_24px_45px_-16px_rgba(214,169,40,0.35)] sm:w-48"
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <MoviePoster
            movie={movie}
            aspect="poster"
            fill
            className="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-strong/95 text-background shadow-[0_8px_20px_-4px_rgba(214,169,40,0.7)] scale-90 transition-transform duration-300 group-hover:scale-100">
              <Play size={17} fill="currentColor" aria-hidden="true" />
            </span>
          </div>

          <span className="absolute top-2.5 left-2.5 rounded border border-white/10 bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-foreground-secondary backdrop-blur-sm">
            {movie.rating}
          </span>
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded border border-white/10 bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-accent-light backdrop-blur-sm">
            <Star size={10} className="fill-accent-light" aria-hidden="true" />
            {movie.imdb}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 px-3 pb-3 pt-10">
            <h3 className="font-display text-base leading-tight text-white transition-colors duration-300 line-clamp-2 group-hover:text-accent-light">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-white/65">
              <span className="flex shrink-0 items-center gap-1">
                <Clock size={11} aria-hidden="true" />
                {movie.durationMin}m
              </span>
              <span className="h-3 w-px shrink-0 bg-white/25" aria-hidden="true" />
              <span className="truncate">{movie.genres.join(' · ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
