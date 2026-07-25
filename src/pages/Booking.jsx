import { useMemo, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Ticket } from 'lucide-react'
import Button from '../components/Button.jsx'
import SeatMap from '../components/SeatMap.jsx'
import { getMovieById } from '../data/movies.js'

const steps = ['Showtime', 'Seats', 'Confirmation']

export default function Booking() {
  const { movieId } = useParams()
  const location = useLocation()
  const movie = getMovieById(movieId)

  const [step, setStep] = useState(1)
  const [showtime, setShowtime] = useState(location.state?.showtime ?? null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [total, setTotal] = useState(0)

  const dates = useMemo(() => {
    if (!movie) return []
    return [...new Set(movie.showtimes.map((s) => s.date))]
  }, [movie])

  const [activeDate, setActiveDate] = useState(location.state?.showtime?.date ?? dates[0] ?? null)

  if (!movie) {
    return (
      <div className="mx-auto max-w-2xl px-5 pt-24 pb-24 text-center">
        <h1 className="text-3xl text-foreground mb-4">Movie not found</h1>
        <Link to="/movies" className="text-accent-light hover:underline">
          Back to all movies
        </Link>
      </div>
    )
  }

  if (movie.showtimes.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 pt-24 pb-24 text-center">
        <h1 className="text-3xl text-foreground mb-4">{movie.title} isn't bookable yet</h1>
        <p className="text-muted-foreground mb-6">Showtimes will open closer to release.</p>
        <Link to="/movies" className="text-accent-light hover:underline">
          Browse other movies
        </Link>
      </div>
    )
  }

  const seatKey = showtime
    ? `${movie.id}-${showtime.branchId}-${showtime.date}-${showtime.time}-${showtime.theatre}`
    : movie.id

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 pb-16">
      <div className="mb-10 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-light">Booking</span>
        <h1 className="text-3xl md:text-4xl text-foreground">{movie.title}</h1>
      </div>

      <ol className="mb-10 flex items-center gap-3">
        {steps.map((label, i) => {
          const num = i + 1
          const isDone = step > num
          const isActive = step === num
          return (
            <li key={label} className="flex flex-1 items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                  isDone
                    ? 'bg-accent border-accent text-background'
                    : isActive
                      ? 'border-accent text-accent-light'
                      : 'border-border/40 text-muted-foreground'
                }`}
              >
                {isDone ? <Check size={16} /> : num}
              </div>
              <span className={`text-sm hidden sm:block ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {num < steps.length && <div className="h-px flex-1 bg-border/30" />}
            </li>
          )
        })}
      </ol>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-wrap gap-2">
              {dates.map((date) => {
                const isActive = activeDate === date
                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => {
                      setActiveDate(date)
                      setShowtime(null)
                    }}
                    aria-pressed={isActive}
                    className={`rounded-lg px-3 py-2 text-xs font-medium min-h-9 cursor-pointer transition-colors ${
                      isActive ? 'bg-accent text-background' : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {movie.showtimes
                .filter((s) => s.date === activeDate)
                .map((s) => {
                  const key = `${s.branchId}-${s.date}-${s.time}-${s.theatre}`
                  const isSelected =
                    showtime && `${showtime.branchId}-${showtime.date}-${showtime.time}-${showtime.theatre}` === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setShowtime(s)}
                      aria-pressed={isSelected}
                      className={`flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left cursor-pointer transition-colors min-h-11 ${
                        isSelected
                          ? 'border-accent bg-primary text-accent-light'
                          : 'border-border/40 text-muted-foreground hover:border-accent/50 hover:text-foreground'
                      }`}
                    >
                      <span className="text-sm font-semibold">{s.time}</span>
                      <span className="text-xs opacity-80">{s.branchName}</span>
                      <span className="text-xs opacity-80">
                        {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ·{' '}
                        {s.theatre}
                      </span>
                    </button>
                  )
                })}
            </div>

            <Button variant="primary" disabled={!showtime} onClick={() => setStep(2)} className="self-end">
              Continue to Seats <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            <SeatMap
              key={seatKey}
              price={movie.price}
              seedKey={seatKey}
              onChange={(seats, amount) => {
                setSelectedSeats(seats)
                setTotal(amount)
              }}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/30 bg-surface px-5 py-4">
              <div className="text-sm text-muted-foreground">
                {selectedSeats.length > 0 ? (
                  <>
                    <span className="text-foreground font-medium">{selectedSeats.join(', ')}</span> selected
                  </>
                ) : (
                  'Select up to 8 seats'
                )}
              </div>
              <div className="text-lg font-semibold text-accent-light">₹{total}</div>
            </div>

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </Button>
              <Button variant="primary" disabled={selectedSeats.length === 0} onClick={() => setStep(3)}>
                Confirm Booking <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-background glow-ring"
              >
                <Ticket size={28} aria-hidden="true" />
              </motion.span>
              <h2 className="text-2xl md:text-3xl text-foreground">Booking Confirmed!</h2>
              <p className="text-muted-foreground max-w-md">
                Your seats for <span className="text-foreground">{movie.title}</span> are locked in.
                A confirmation has been sent to your inbox.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.3, ease: 'easeOut' }}
              className="relative flex w-full max-w-md rounded-2xl bg-surface shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
            >
              <div className="flex-1 min-w-0 flex flex-col gap-4 p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent-light mb-1">Admit One</p>
                  <h3 className="font-display text-2xl italic text-foreground leading-tight truncate">{movie.title}</h3>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                  <dt className="text-muted-foreground">Branch</dt>
                  <dd className="text-foreground text-right truncate">{showtime?.branchName}</dd>
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="text-foreground text-right">
                    {showtime && new Date(showtime.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </dd>
                  <dt className="text-muted-foreground">Time</dt>
                  <dd className="text-foreground text-right">{showtime?.time}</dd>
                  <dt className="text-muted-foreground">Theatre</dt>
                  <dd className="text-foreground text-right truncate">{showtime?.theatre}</dd>
                </dl>
              </div>

              <div
                aria-hidden="true"
                className="relative flex flex-col items-center justify-center border-l border-dashed border-border/50 px-2"
              >
                <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-background" />
                <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-background" />
              </div>

              <div className="flex w-32 shrink-0 flex-col items-center justify-center gap-3 rounded-r-2xl bg-primary/40 p-4 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Seats</p>
                  <p className="text-sm font-semibold text-foreground">{selectedSeats.join(', ')}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Total</p>
                  <p className="text-lg font-semibold text-accent-light">₹{total}</p>
                </div>
              </div>
            </motion.div>

            <Button as="link" to="/movies" variant="gradient">
              Book Another Movie
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
