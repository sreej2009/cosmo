import { useMemo, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowLeft, ArrowRight, Armchair } from 'lucide-react'
import MoviePoster from '../components/MoviePoster.jsx'
import { getBranchById } from '../data/branches.js'
import { moviesAtBranch, showtimesForBranch } from '../data/movies.js'

function MovieShowtimes({ movie, branchId }) {
  const navigate = useNavigate()
  const showtimes = useMemo(() => showtimesForBranch(movie, branchId), [movie, branchId])
  const dates = useMemo(() => [...new Set(showtimes.map((s) => s.date))], [showtimes])
  const [activeDate, setActiveDate] = useState(dates[0] ?? null)

  const timesForDate = showtimes.filter((s) => s.date === activeDate)

  const goToBooking = (showtime) => {
    navigate(`/booking/${movie.id}`, { state: { showtime } })
  }

  return (
    <div className="grid gap-5 rounded-2xl border border-border/30 bg-surface p-5 sm:grid-cols-[7rem_1fr] sm:p-6">
      <Link to={`/movies/${movie.id}`} className="mx-auto w-28 shrink-0 overflow-hidden rounded-xl sm:mx-0">
        <MoviePoster movie={movie} aspect="poster" />
      </Link>

      <div className="flex flex-col gap-3">
        <div>
          <Link to={`/movies/${movie.id}`} className="font-display text-xl text-foreground hover:text-accent-light">
            {movie.title}
          </Link>
          <p className="text-xs text-muted-foreground">{movie.genres.join(' · ')} · {movie.durationMin}m</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {dates.map((date) => (
            <button
              key={date}
              type="button"
              onClick={() => setActiveDate(date)}
              aria-pressed={activeDate === date}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium min-h-9 cursor-pointer transition-colors ${
                activeDate === date
                  ? 'bg-accent text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {timesForDate.map((show) => (
            <button
              key={`${show.date}-${show.time}-${show.theatre}`}
              type="button"
              onClick={() => goToBooking(show)}
              className="flex items-center gap-2 rounded-lg border border-border/40 px-3.5 py-2 text-sm text-muted-foreground cursor-pointer transition-colors min-h-11 hover:border-accent/50 hover:text-foreground"
            >
              <span className="font-medium text-foreground">{show.time}</span>
              <span className="text-xs opacity-80">{show.theatre}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BranchDetail() {
  const { branchId } = useParams()
  const branch = getBranchById(branchId)
  const movies = useMemo(() => (branch ? moviesAtBranch(branch.id) : []), [branch])

  if (!branch) {
    return (
      <div className="mx-auto max-w-2xl px-5 pt-24 pb-24 text-center">
        <h1 className="text-3xl text-foreground mb-4">Branch not found</h1>
        <Link to="/branches" className="text-accent-light hover:underline">
          Back to all branches
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-5 pt-16 pb-16">
      <Link to="/branches" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={14} aria-hidden="true" /> All branches
      </Link>

      <div className="mb-10 flex flex-col gap-3">
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent-light">
          <MapPin size={14} aria-hidden="true" />
          {branch.address}
        </span>
        <h1 className="text-3xl md:text-4xl text-foreground">{branch.name}</h1>
        <p className="text-muted-foreground max-w-lg">{branch.tagline}</p>

        <div className="mt-2 flex flex-wrap gap-3">
          {branch.screens.map((screen) => (
            <span
              key={screen.name}
              className="flex items-center gap-2 rounded-xl border border-border/30 bg-surface px-4 py-2.5 text-sm text-muted-foreground"
            >
              <Armchair size={15} className="text-accent-light" aria-hidden="true" />
              <span className="text-foreground">{screen.name}</span> · {screen.type}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl text-foreground">Now Showing Here</h2>
        <Link
          to="/movies"
          className="flex items-center gap-1 text-sm text-accent-light hover:underline"
        >
          Browse all movies <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>

      {movies.length === 0 ? (
        <div className="rounded-2xl border border-border/30 bg-surface py-16 text-center text-muted-foreground">
          No showtimes scheduled at this branch right now.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {movies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
            >
              <MovieShowtimes movie={movie} branchId={branch.id} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
