import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, Star } from 'lucide-react'
import MoviePoster from './MoviePoster.jsx'
import { movies } from '../data/movies.js'

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.genres.some((g) => g.toLowerCase().includes(q)),
    )
  }, [query])

  const goToMovie = (id) => {
    navigate(`/movies/${id}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/90 backdrop-blur-sm px-5 pt-24 sm:pt-32"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search movies"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-border/40 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-border/30 px-5 py-4">
              <Search size={18} className="text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, genres..."
                className="flex-1 min-w-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() === '' && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Start typing to search the full catalog.
                </p>
              )}

              {query.trim() !== '' && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No movies match "{query}".
                </p>
              )}

              {results.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => goToMovie(movie.id)}
                  className="flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5 cursor-pointer"
                >
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                    <MoviePoster movie={movie} aspect="poster" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground truncate">{movie.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{movie.genres.join(' · ')}</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-accent-light fill-accent-light" aria-hidden="true" />
                      {movie.imdb}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} aria-hidden="true" />
                      {movie.durationMin}m
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
