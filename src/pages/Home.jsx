import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Film, Volume2, Armchair, Popcorn, ArrowRight, ChevronRight, Play, Clock, Flame, Ticket, MapPin } from 'lucide-react'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import StarRating from '../components/StarRating.jsx'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieRow from '../components/MovieRow.jsx'
import ComingSoonCard from '../components/ComingSoonCard.jsx'
import MoviePoster from '../components/MoviePoster.jsx'
import Counter from '../components/Counter.jsx'
import { nowShowing, comingSoon } from '../data/movies.js'

const amenities = [
  { icon: Film, title: 'IMAX Screens', desc: 'Larger-than-life picture with crystal clarity in every seat.' },
  { icon: Volume2, title: 'Dolby Atmos', desc: 'Sound that moves around you, not just past you.' },
  { icon: Armchair, title: 'Recliner Seating', desc: 'Plush, powered recliners built for a three-hour saga.' },
  { icon: Popcorn, title: 'Full Snack Bar', desc: 'Order ahead and have it waiting at your seat.' },
]

const featuredList = [...nowShowing]
  .sort((a, b) => Number(Boolean(b.trailer)) - Number(Boolean(a.trailer)))
  .slice(0, 4)

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const active = featuredList[activeIndex]

  useEffect(() => {
    if (prefersReducedMotion || paused) return undefined
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % featuredList.length)
    }, 7000)
    return () => clearInterval(id)
  }, [paused, prefersReducedMotion])

  return (
    <section
      className="relative h-[92vh] min-h-[680px] overflow-hidden border-b border-border/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <MoviePoster key={active.id} movie={active} aspect="backdrop" fill kenBurns video />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_22%_65%,rgba(6,6,8,0.55),transparent_70%)]" />
      <StarfieldBackground density={50} className="opacity-40" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="relative mx-auto h-full max-w-6xl px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 30, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              exit={{ opacity: 0, x: 30, rotate: 10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute right-5 top-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -16, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                className="w-56 overflow-hidden rounded-2xl border border-accent/30 glow-ring shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]"
              >
                <MoviePoster movie={active} aspect="poster" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end gap-5 px-5 pb-8 pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-wrap items-center gap-5">
              <span className="w-fit flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-accent-light [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Cosmos Pick · Now Showing
              </span>
              {activeIndex === 0 && (
                <span className="w-fit flex items-center gap-1.5 rounded-sm border border-accent/40 bg-black/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-light backdrop-blur-sm">
                  <Flame size={12} className="fill-accent text-accent" aria-hidden="true" />
                  Trending #1 This Week
                </span>
              )}
            </div>

            <h1 className="text-glow drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] text-5xl md:text-7xl max-w-2xl text-foreground">
              {active.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
              <StarRating score={active.imdb} />
              <span className="h-3.5 w-px bg-white/25" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {active.durationMin} min
              </span>
              <span className="rounded border border-border/60 bg-black/20 px-1.5 py-0.5 text-xs backdrop-blur-sm">{active.rating}</span>
              <span className="h-3.5 w-px bg-white/25" aria-hidden="true" />
              <span>{active.genres.join(' · ')}</span>
            </div>

            <p className="max-w-lg text-base text-foreground/75 leading-relaxed line-clamp-3 [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
              {active.synopsis}
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <Button as="link" to={`/movies/${active.id}`} variant="gradient">
                <Play size={16} fill="currentColor" aria-hidden="true" /> Watch Trailer
              </Button>
              <Button as="link" to={`/booking/${active.id}`} variant="secondary">
                Book Tickets
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-end justify-between gap-6 pt-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Popular Movies</span>
            <div className="relative flex items-end gap-3 rounded-2xl bg-black/30 pt-12 pb-6 pl-6 pr-20 backdrop-blur-sm">
              <div className="flex items-end gap-6 overflow-x-auto no-scrollbar px-3 pt-6 -mx-3 -mt-6">
                {featuredList.map((movie, i) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show featured movie ${movie.title}`}
                    aria-pressed={i === activeIndex}
                    className={`group relative shrink-0 w-32 origin-bottom overflow-hidden rounded-xl transition-all duration-300 ease-out cursor-pointer sm:w-40 ${
                      i === activeIndex
                        ? 'scale-110 ring-[3px] ring-pink-500 opacity-100 shadow-[0_10px_30px_-6px_rgba(236,72,153,0.6)] z-10'
                        : 'ring-1 ring-border/40 opacity-70 hover:scale-105 hover:opacity-100 hover:z-10'
                    }`}
                  >
                    <MoviePoster movie={movie} aspect="backdrop" className="transition-transform duration-300 group-hover:scale-110" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex((i) => (i + 1) % featuredList.length)}
                aria-label="Next featured movie"
                className="absolute right-6 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-foreground transition-colors hover:bg-white/20 cursor-pointer"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex gap-2.5">
            {featuredList.map((movie, i) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-pressed={i === activeIndex}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'w-10 bg-accent glow-ring' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-5 py-16 flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="In Theatres" title="Now Showing" />
          <Button as="link" to="/movies" variant="ghost">
            View all <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
        <MovieRow>
          {nowShowing.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} rank={i + 1} />
          ))}
        </MovieRow>
      </section>

      <section className="border-y border-border/30 bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 flex flex-col gap-6">
          <SectionHeading eyebrow="Coming Soon" title="Mark Your Calendar" />
          {comingSoon.length > 3 ? (
            <MovieRow>
              {comingSoon.map((movie, i) => (
                <div key={movie.id} className="w-72 shrink-0 snap-start sm:w-80">
                  <ComingSoonCard movie={movie} index={i} />
                </div>
              ))}
            </MovieRow>
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {comingSoon.map((movie, i) => (
                <ComingSoonCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 rounded-full bg-primary/40 blur-3xl" />
          <StarfieldBackground density={30} className="opacity-30" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20">
          <SectionHeading
            eyebrow="Why Cosmos"
            title="Built for the Full Experience"
            subtitle="Every screen, seat and speaker is chosen to disappear into the story."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-b from-surface to-surface/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_25px_60px_-15px_rgba(204,154,46,0.4)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_0%,rgba(240,193,75,0.12),transparent_60%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-3 font-display text-7xl text-foreground/[0.05] transition-colors duration-300 group-hover:text-accent/10"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 via-accent/10 to-primary text-accent-light ring-1 ring-accent/30 shadow-[0_8px_24px_-8px_rgba(204,154,46,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div className="relative flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="relative mt-auto h-px w-8 bg-accent/40 transition-all duration-300 group-hover:w-16 group-hover:bg-accent"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/30 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[30rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-primary/50 blur-3xl" />
        </div>
        <StarfieldBackground density={90} className="opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl px-5"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-surface/70 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8 px-8 py-10 md:grid-cols-4 md:px-14">
              <Counter value={12} suffix="" label="Screens" />
              <Counter value={4200} suffix="+" label="Seats Citywide" />
              <Counter value={98} suffix="%" label="Happy Moviegoers" />
              <Counter value={20} suffix="+" label="Years Running" />
            </div>

            <div className="relative h-0">
              <span
                aria-hidden="true"
                className="absolute -left-4 top-0 h-8 w-8 -translate-y-1/2 rounded-full bg-background"
              />
              <span
                aria-hidden="true"
                className="absolute -right-4 top-0 h-8 w-8 -translate-y-1/2 rounded-full bg-background"
              />
              <div className="mx-10 border-t border-dashed border-border/60" />
            </div>

            <div className="flex flex-col items-center gap-6 px-8 py-14 text-center md:px-14">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 via-accent/10 to-primary text-accent-light ring-1 ring-accent/30 shadow-[0_8px_28px_-8px_rgba(204,154,46,0.55)]">
                <Ticket size={26} aria-hidden="true" />
              </span>

              <h2 className="text-3xl md:text-5xl text-foreground text-glow">Ready for Your Next Night Out?</h2>

              <p className="max-w-lg text-muted-foreground">
                Pick a film, pick your seats, and let the rest of the night take care of itself.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                <Button as="link" to="/movies" variant="primary">
                  Browse Showtimes <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button as="link" to="/branches" variant="secondary">
                  <MapPin size={16} aria-hidden="true" /> Find a Branch
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
