import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clapperboard, ArrowRight, Film, Volume2, Armchair, Zap, Tv } from 'lucide-react'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import { branches } from '../data/branches.js'
import { moviesAtBranch } from '../data/movies.js'

const screenIcons = {
  IMAX: Film,
  'Dolby Atmos': Volume2,
  Recliner: Armchair,
  '4DX': Zap,
  Standard: Tv,
}

const mapPins = [
  { x: 10, y: 22 },
  { x: 28, y: 48 },
  { x: 46, y: 20 },
  { x: 64, y: 46 },
  { x: 82, y: 18 },
  { x: 96, y: 44 },
]

export default function Branches() {
  return (
    <div>
      <section className="relative h-[34rem] overflow-hidden border-b border-border/30 bg-[#07070d]">
        <motion.div
          className="absolute -top-16 -left-10 h-72 w-72 rounded-full bg-indigo-500/40 blur-xl"
          animate={{ opacity: [0.55, 0.8, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-8 right-0 h-96 w-96 rounded-full bg-accent/35 blur-xl"
          animate={{ opacity: [0.5, 0.75, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-purple-600/30 blur-xl"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <StarfieldBackground density={140} className="opacity-95" />
        <div className="absolute inset-0 shadow-[inset_0_0_10rem_3rem_rgba(0,0,0,0.6)]" />

        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-90 md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse cx="50" cy="40" rx="46" ry="30" fill="none" stroke="#f0c14b" strokeWidth="1.4" strokeDasharray="5 7" vectorEffect="non-scaling-stroke" />
          <ellipse cx="50" cy="40" rx="32" ry="20" fill="none" stroke="#8fa8e0" strokeWidth="1.4" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
          <ellipse cx="50" cy="40" rx="18" ry="11" fill="none" stroke="#f0c14b" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>

        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="signal-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          <motion.path
            id="branch-route"
            d={`M${mapPins[0].x},${mapPins[0].y} Q19,10 ${mapPins[1].x},${mapPins[1].y} Q37,66 ${mapPins[2].x},${mapPins[2].y} Q55,6 ${mapPins[3].x},${mapPins[3].y} Q73,64 ${mapPins[4].x},${mapPins[4].y} Q89,8 ${mapPins[5].x},${mapPins[5].y}`}
            fill="none"
            stroke="#f0c14b"
            strokeWidth="0.4"
            strokeDasharray="1.8 1.6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <circle r="1.1" fill="#eaf2ff" filter="url(#signal-glow)" opacity="0.9">
            <animateMotion dur="3.4s" begin="2.2s" repeatCount="indefinite">
              <mpath href="#branch-route" />
            </animateMotion>
          </circle>
          <circle r="0.55" fill="#ffffff">
            <animateMotion dur="3.4s" begin="2.2s" repeatCount="indefinite">
              <mpath href="#branch-route" />
            </animateMotion>
          </circle>
        </svg>

        {branches.map((branch, i) => (
          <motion.div
            key={branch.id}
            className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-full flex-col items-center gap-1 md:flex"
            style={{ left: `${mapPins[i].x}%`, top: `${mapPins[i].y}%` }}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.25, ease: 'easeOut' }}
          >
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute h-12 w-12 rounded-full bg-[#07070d]/70 blur-md" />
              <motion.span
                className="absolute bottom-1 h-4 w-4 rounded-full bg-accent-light/60"
                animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 + 1 }}
              />
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="relative"
              >
                <MapPin
                  size={44}
                  className="fill-accent-light/25 text-accent-light drop-shadow-[0_0_6px_rgba(240,193,75,0.9)]"
                  strokeWidth={1.75}
                />
              </motion.span>
            </span>
            <span className="rounded-md bg-background/70 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-accent-light/90 backdrop-blur-sm">
              {branch.name}
            </span>
          </motion.div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-background from-5% via-background/65 via-28% to-transparent to-58%" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex max-w-2xl flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-light/70" aria-hidden="true" />
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">
                <MapPin size={12} aria-hidden="true" />
                Our Branches
              </span>
            </div>
            <h2 className="text-3xl leading-tight text-foreground drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] md:text-4xl">
              Find Your Nearest <span className="text-accent-light">Cosmos</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Six screens-first locations across Coimbatore and Erode district, each with its own line-up and showtimes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {branches.map((branch, i) => {
            const movieCount = moviesAtBranch(branch.id).length
            return (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link
                  to={`/branches/${branch.id}`}
                  className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-strong/50 hover:bg-surface-raised hover:shadow-[0_22px_50px_-16px_rgba(214,169,40,0.3)] ${
                    branch.badge === 'Flagship' ? 'border-accent/25' : 'border-border/30'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 -right-3 font-display text-7xl text-foreground/[0.05] transition-colors duration-300 group-hover:text-accent/10"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary text-accent-light ring-1 ring-accent/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_-2px_rgba(242,201,76,0.5)]">
                      <MapPin size={22} aria-hidden="true" />
                    </span>
                    {branch.badge && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-light">
                        {branch.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative flex flex-col gap-1.5">
                    <h3 className="font-display text-2xl text-foreground">{branch.name}</h3>
                    <span className="h-px w-8 bg-accent/50 transition-all duration-300 group-hover:w-14 group-hover:bg-accent-strong" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">{branch.address}</p>
                  </div>

                  <p className="relative text-sm text-muted-foreground leading-relaxed">{branch.tagline}</p>

                  <ul className="relative flex flex-wrap gap-2 pt-1">
                    {branch.screens.map((screen) => {
                      const Icon = screenIcons[screen.type] ?? Film
                      return (
                        <li
                          key={screen.name}
                          className="flex items-center gap-1.5 rounded-full border border-border/40 bg-background px-3 py-1 text-xs text-muted-foreground"
                        >
                          <Icon size={11} className="text-accent-light" aria-hidden="true" />
                          {screen.type}
                        </li>
                      )
                    })}
                  </ul>

                  <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-border/20 pt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clapperboard size={14} aria-hidden="true" />
                      {movieCount} {movieCount === 1 ? 'movie' : 'movies'} showing
                    </span>
                    <span className="flex items-center gap-1 font-medium text-muted-foreground opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-light group-hover:opacity-100">
                      View Showtimes <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
