import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Button from '../components/Button.jsx'
import { movies, allGenres } from '../data/movies.js'

const WALL_COLUMNS = 9
const WALL_ROWS = 2
const WALL_COPIES = 4
const wallPosters = Array.from({ length: WALL_COLUMNS * WALL_ROWS }, (_, i) => movies[i % movies.length])
const wallPostersLoop = Array.from({ length: WALL_COPIES }).flatMap(() => wallPosters)

const mobileHeroMovies = movies.slice(0, 5)

const statusFilters = [
  { id: 'all', label: 'All' },
  { id: 'now-showing', label: 'Now Showing' },
  { id: 'coming-soon', label: 'Coming Soon' },
]

export default function Movies() {
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('All')
  const [activeStatus, setActiveStatus] = useState('all')
  const [mobileHeroIndex, setMobileHeroIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setMobileHeroIndex((i) => (i + 1) % mobileHeroMovies.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre = activeGenre === 'All' || movie.genres.includes(activeGenre)
      const matchesStatus = activeStatus === 'all' || movie.status === activeStatus
      const matchesQuery = movie.title.toLowerCase().includes(query.trim().toLowerCase())
      return matchesGenre && matchesStatus && matchesQuery
    })
  }, [query, activeGenre, activeStatus])

  const clearFilters = () => {
    setQuery('')
    setActiveGenre('All')
    setActiveStatus('all')
  }

  return (
    <div>
      <section className="relative h-[34rem] overflow-hidden border-b border-border/30 bg-background">
        <div className="absolute inset-0 hidden md:block" style={{ perspective: '900px' }}>
          <motion.div
            className="absolute inset-x-[-10%] top-[-14%] grid gap-3 opacity-80"
            style={{
              gridTemplateColumns: `repeat(${WALL_COLUMNS}, minmax(0, 1fr))`,
              rotateX: 50,
              scale: 1.35,
              transformOrigin: '50% 0%',
            }}
            animate={{ y: ['0%', `-${100 / WALL_COPIES}%`] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
          >
            {wallPostersLoop.map((movie, i) => (
              <img
                key={i}
                src={movie.poster}
                alt=""
                aria-hidden="true"
                className="aspect-[2/3] w-full rounded-md object-cover"
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-0 block overflow-hidden md:hidden">
          <AnimatePresence>
            <motion.img
              key={mobileHeroMovies[mobileHeroIndex].id}
              src={mobileHeroMovies[mobileHeroIndex].backdrop}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 0.4, scale: 1.14 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1 }, scale: { duration: 4.5, ease: 'linear' } }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/55 via-45% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/45 via-transparent to-background/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_18%_95%,rgba(6,6,8,0.85),transparent_65%)]" />
        <StarfieldBackground density={40} className="opacity-40" />

        <svg
          className="absolute inset-x-0 bottom-0 w-full"
          height="56"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="movies-swoosh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cc9a2e" stopOpacity="0" />
              <stop offset="20%" stopColor="#cc9a2e" />
              <stop offset="50%" stopColor="#f0c14b" />
              <stop offset="80%" stopColor="#cc9a2e" />
              <stop offset="100%" stopColor="#cc9a2e" stopOpacity="0" />
            </linearGradient>
            <filter id="movies-swoosh-glow" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          <path d="M0,42 Q720,4 1440,42" stroke="url(#movies-swoosh)" strokeWidth="5" fill="none" filter="url(#movies-swoosh-glow)" />
          <path d="M0,42 Q720,4 1440,42" stroke="url(#movies-swoosh)" strokeWidth="2.5" fill="none" />
        </svg>

        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-14">
          <SectionHeading
            eyebrow="Browse"
            title="All Movies"
            subtitle="Filter by genre or search for a title to find your next watch."
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-8 pb-16 flex flex-col gap-8">
        <div className="flex w-fit gap-1 rounded-full border border-border/40 bg-surface p-1">
          {statusFilters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveStatus(id)}
              aria-pressed={activeStatus === id}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer min-h-9 ${
                activeStatus === id
                  ? 'bg-accent-strong text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="glass flex flex-col gap-5 rounded-2xl p-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="relative w-full md:max-w-xs">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="movie-search" className="sr-only">
              Search movies
            </label>
            <input
              id="movie-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full rounded-full border border-border/50 bg-background py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20 outline-none transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...allGenres].map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                aria-pressed={activeGenre === genre}
                className={`rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer min-h-9 ${
                  activeGenre === genre
                    ? 'bg-accent-strong text-background glow-ring'
                    : 'bg-surface text-muted-foreground border border-border/40 hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}
            {activeGenre !== 'All' && <> in <span className="text-foreground">{activeGenre}</span></>}
          </span>
          {(query || activeGenre !== 'All' || activeStatus !== 'all') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-accent-light hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filtered.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/30 bg-surface py-16 text-center text-muted-foreground">
            <SearchX size={32} className="text-accent-light" aria-hidden="true" />
            <p>No movies match your search. Try a different title or genre.</p>
            <Button variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
