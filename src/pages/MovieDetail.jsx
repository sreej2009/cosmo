import { useMemo, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Clock, Star, Languages, X, ArrowRight, Ticket, Film } from 'lucide-react'
import Button from '../components/Button.jsx'
import MoviePoster from '../components/MoviePoster.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieRow from '../components/MovieRow.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Avatar from '../components/Avatar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { getMovieById, movies } from '../data/movies.js'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = getMovieById(id)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const showtimesRef = useRef(null)

  const dates = useMemo(() => {
    if (!movie) return []
    return [...new Set(movie.showtimes.map((s) => s.date))]
  }, [movie])

  const activeDate = selectedDate ?? dates[0] ?? null

  const timesForDate = useMemo(() => {
    if (!movie || !activeDate) return []
    return movie.showtimes.filter((s) => s.date === activeDate)
  }, [movie, activeDate])

  const related = useMemo(() => {
    if (!movie) return []
    return movies
      .filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)))
      .slice(0, 8)
  }, [movie])

  if (!movie) {
    return (
      <EmptyState
        icon={Film}
        title="Movie not found"
        message="This title may have been removed or the link is incorrect."
        actionLabel="Back to all movies"
        actionTo="/movies"
      />
    )
  }

  const goToBooking = () => {
    if (!selectedShowtime) return
    navigate(`/booking/${movie.id}`, { state: { showtime: selectedShowtime } })
  }

  const scrollToShowtimes = () => {
    showtimesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <section className="relative h-[60vh] min-h-[26rem] overflow-hidden border-b border-border/30">
        <MoviePoster movie={movie} aspect="backdrop" fill />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(0,0,0,0.55),transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mx-auto flex h-full max-w-6xl items-end gap-6 px-5 pb-10"
        >
          <div className="hidden shrink-0 sm:block h-52 w-36 overflow-hidden rounded-lg border border-border/40 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]">
            <MoviePoster movie={movie} aspect="poster" className="h-full w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
              {movie.genres.join(' · ')}
            </span>
            <h1 className="max-w-2xl text-4xl text-foreground text-glow md:text-5xl">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-accent-light text-accent-light" aria-hidden="true" />
                {movie.imdb} / 10
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {movie.durationMin} min
              </span>
              <span className="flex items-center gap-1.5">
                <Languages size={14} aria-hidden="true" />
                {movie.language}
              </span>
              <span className="rounded border border-border/60 px-1.5 py-0.5 text-xs">{movie.rating}</span>
            </div>
            <p className="hidden max-w-xl text-sm leading-relaxed text-muted-foreground sm:block line-clamp-2">
              {movie.synopsis}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="primary" onClick={() => setTrailerOpen(true)}>
                <Play size={16} fill="currentColor" aria-hidden="true" /> Watch Trailer
              </Button>
              <Button variant="secondary" onClick={scrollToShowtimes}>
                <Ticket size={16} aria-hidden="true" /> Book Tickets
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div>
            <h2 className="mb-3 text-xl text-foreground">Synopsis</h2>
            <p className="leading-relaxed text-muted-foreground">{movie.synopsis}</p>
          </div>
          <div>
            <h2 className="mb-4 text-xl text-foreground">Cast</h2>
            <div className="flex flex-wrap gap-5">
              {movie.cast.map((name) => (
                <div key={name} className="flex w-20 flex-col items-center gap-2 text-center">
                  <Avatar name={name} size={56} />
                  <span className="text-xs leading-tight text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={showtimesRef} className="h-fit scroll-mt-24 rounded-2xl border border-border/30 bg-surface p-6 flex flex-col gap-5">
          <h2 className="text-xl text-foreground">Showtimes</h2>

          {dates.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Showtimes will be announced closer to release. Check back soon.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedShowtime(null)
                    }}
                    aria-pressed={activeDate === date}
                    className={`rounded-lg px-3 py-2 text-xs font-medium min-h-9 cursor-pointer transition-colors ${
                      activeDate === date
                        ? 'bg-accent-strong text-background'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {timesForDate.map((show) => {
                  const key = `${show.branchId}-${show.date}-${show.time}-${show.theatre}`
                  const isSelected =
                    selectedShowtime &&
                    `${selectedShowtime.branchId}-${selectedShowtime.date}-${selectedShowtime.time}-${selectedShowtime.theatre}` === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedShowtime(show)}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm cursor-pointer transition-colors min-h-11 ${
                        isSelected
                          ? 'border-accent-strong bg-accent-strong/10 text-accent-light'
                          : 'border-border/40 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                      }`}
                    >
                      <span className="flex flex-col items-start">
                        <span>{show.time}</span>
                        <span className="text-xs opacity-70">{show.branchName}</span>
                      </span>
                      <span className="text-xs opacity-80">{show.theatre}</span>
                    </button>
                  )
                })}
              </div>

              <Button variant="primary" disabled={!selectedShowtime} onClick={goToBooking}>
                Select Seats <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border/30 bg-surface/50">
          <div className="mx-auto max-w-6xl px-5 py-14 flex flex-col gap-6">
            <SectionHeading eyebrow="You Might Also Like" title="Related Movies" />
            <MovieRow>
              {related.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </MovieRow>
          </div>
        </section>
      )}

      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${movie.title} trailer`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTrailerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full rounded-2xl border border-border/40 bg-surface ${
                movie.youtubeId ? 'max-w-3xl overflow-hidden' : 'max-w-2xl p-10 text-center'
              }`}
            >
              <button
                type="button"
                onClick={() => setTrailerOpen(false)}
                aria-label="Close trailer"
                className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full cursor-pointer ${
                  movie.youtubeId
                    ? 'bg-background/70 text-foreground hover:bg-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <X size={20} />
              </button>

              {movie.youtubeId ? (
                <div className="aspect-video w-full">
                  <iframe
                    key={movie.youtubeId}
                    src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&rel=0`}
                    title={`${movie.title} trailer`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                  <Play size={40} className="mx-auto mb-4 text-accent-light" aria-hidden="true" />
                  <h3 className="text-xl text-foreground mb-2">Trailer Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">
                    The official trailer for {movie.title} hasn't been released yet. Check back closer
                    to showtime.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
