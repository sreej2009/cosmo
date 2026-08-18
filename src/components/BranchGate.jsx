import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import StarfieldBackground from './StarfieldBackground.jsx'
import { branches } from '../data/branches.js'
import cosmoLogo from '../assets/COSMO LOGO.png'

const EASE = [0.65, 0, 0.35, 1]

// Timeline (seconds): 0–0.5 black hold, 0.5–1.4 logo appears,
// 1.4–1.9 logo holds, 1.9–3.0 logo travels to header position.
const LOGO_TIMES = [0, 0.5 / 3, 1.4 / 3, 1.9 / 3, 1]
const LOGO_DURATION = 3

const BG_DELAY = 2
const BG_DURATION = 1

const HEADER_ICON_DELAY = 2.8
const HEADER_TITLE_DELAY = 2.9
const HEADER_SUBTITLE_DELAY = 3.0

const CARDS_START = 3.3
const CARD_STAGGER = 0.12

const CHROME_DELAY = 4.2

export default function BranchGate({ onDone }) {
  const prefersReducedMotion = useReducedMotion()

  const choose = (branchId) => {
    try {
      localStorage.setItem('cosmos_preferred_branch', branchId)
    } catch {
      // ignore storage failures
    }
    onDone()
  }

  const fadeUp = (delay, distance = 16) =>
    prefersReducedMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: 'easeOut' },
        }

  return (
    <motion.div
      className="fixed inset-0 z-[150] overflow-y-auto bg-black px-5 py-12"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* background reveal: existing starfield + ambient glow, hidden until the logo settles */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: BG_DURATION, delay: BG_DELAY, ease: 'easeInOut' }}
      >
        <StarfieldBackground density={100} className="opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl" />
      </motion.div>

      {/* soft glow behind the logo during its center reveal, fades as it settles into the header */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/25 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.55, 0.55, 0] }}
          transition={{ duration: LOGO_DURATION, times: LOGO_TIMES, ease: EASE }}
        />
      )}

      <motion.button
        type="button"
        onClick={onDone}
        aria-label="Skip and continue to home"
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: CHROME_DELAY, ease: 'easeOut' }}
        className="fixed right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground cursor-pointer"
      >
        <X size={18} aria-hidden="true" />
      </motion.button>

      {/* single persistent logo element: center brand reveal -> header position */}
      <motion.img
        src={cosmoLogo}
        alt="Cosmos Cinemas"
        className="pointer-events-none fixed left-1/2 top-6 z-20 w-28 -translate-x-1/2 drop-shadow-[0_0_18px_rgba(240,193,75,0.3)]"
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: '0vh', scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, y: '36vh', scale: 1.7, filter: 'blur(8px)' }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: '0vh', scale: 1, filter: 'blur(0px)' }
            : {
                opacity: [0, 0, 1, 1, 1],
                y: ['36vh', '36vh', '36vh', '36vh', '0vh'],
                scale: [1.7, 1.7, 2.25, 2.25, 1],
                filter: ['blur(8px)', 'blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
              }
        }
        transition={prefersReducedMotion ? { duration: 0 } : { duration: LOGO_DURATION, times: LOGO_TIMES, ease: EASE }}
      />

      <div className="relative z-10 flex min-h-full items-center justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <motion.span
              {...fadeUp(HEADER_ICON_DELAY, 15)}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 via-accent/10 to-primary text-accent-light ring-1 ring-accent/30"
            >
              <MapPin size={22} aria-hidden="true" />
            </motion.span>
            <motion.h1 {...fadeUp(HEADER_TITLE_DELAY, 20)} className="font-display text-3xl text-foreground md:text-4xl">
              Choose Your Cosmos
            </motion.h1>
            <motion.p {...fadeUp(HEADER_SUBTITLE_DELAY, 15)} className="max-w-md text-sm text-muted-foreground">
              Pick the branch closest to you to see its showtimes first, or skip for now.
            </motion.p>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, i) => (
              <motion.button
                key={branch.id}
                type="button"
                onClick={() => choose(branch.id)}
                initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: CARDS_START + i * CARD_STAGGER, ease: 'easeOut' }
                }
                className="group flex flex-col items-start gap-2 rounded-2xl border border-border/30 bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_45px_-12px_rgba(204,154,46,0.35)] cursor-pointer"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-primary text-accent-light ring-1 ring-accent/25 transition-transform duration-300 group-hover:scale-110">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  {branch.badge && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-light">
                      {branch.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg text-foreground">{branch.name}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{branch.address}</p>
              </motion.button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={onDone}
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: CHROME_DELAY, ease: 'easeOut' }}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-accent-light hover:underline cursor-pointer"
          >
            Skip for now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
