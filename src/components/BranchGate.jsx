import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import StarfieldBackground from './StarfieldBackground.jsx'
import TheatreCurtain from './TheatreCurtain.jsx'
import { branches } from '../data/branches.js'
import cosmoLogo from '../assets/COSMO LOGO.png'

const EASE = [0.65, 0, 0.35, 1]

// Unified theatre-opening timeline (seconds, all relative to mount):
// 0.0–0.6   theatre blackout
// 0.6–1.8   curtain opens / stage reveal
// 1.2–2.1   Cosmos logo reveals in the center
// 2.1–2.7   logo holds under the spotlight
// 2.7–3.7   the SAME logo travels up into its header position
// 3.0–3.8   BranchGate background reveals
// 3.5–4.1   heading + subtitle reveal
// 3.9–4.7   branch cards stagger in
// 4.7–5.0   skip + close settle
const CURTAIN_DELAY = 0.6
const CURTAIN_DURATION = 1.2

const LOGO_TIMES = [0, 1.2 / 3.7, 2.1 / 3.7, 2.7 / 3.7, 1]
const LOGO_DURATION = 3.7

const BG_DELAY = 3.0
const BG_DURATION = 0.8

const HEADER_ICON_DELAY = 3.5
const HEADER_TITLE_DELAY = 3.6
const HEADER_SUBTITLE_DELAY = 3.7

const CARDS_START = 3.9
const CARD_STAGGER = 0.12

const CHROME_DELAY = 4.7

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
      {/* theatre atmosphere: warm ambient wash, vignette, and film grain — present from the first frame */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(214,169,40,0.09),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_50%,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
      {!prefersReducedMotion && (
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="theatre-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.7  0 0 0 0.045 0" />
          </filter>
        </svg>
      )}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ filter: 'url(#theatre-grain)' }} />
      )}

      {/* stage curtain: frames the opening, then slides away to reveal the theatre */}
      {!prefersReducedMotion && <TheatreCurtain openDelay={CURTAIN_DELAY} openDuration={CURTAIN_DURATION} />}

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

      {/* cinema spotlight behind the logo: builds through the hold, then diffuses as the logo departs */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light/25 blur-3xl"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 0, 0.5, 0.35, 0], scale: [1, 1, 1, 1.25, 1.4] }}
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
        className="fixed right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground cursor-pointer"
      >
        <X size={18} aria-hidden="true" />
      </motion.button>

      {/* single persistent logo element: center brand reveal -> header position */}
      <motion.img
        src={cosmoLogo}
        alt="Cosmos Cinemas"
        className="pointer-events-none fixed left-1/2 top-6 z-40 w-28 -translate-x-1/2 drop-shadow-[0_0_18px_rgba(240,193,75,0.3)]"
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
