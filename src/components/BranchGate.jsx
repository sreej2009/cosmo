import { motion } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import StarfieldBackground from './StarfieldBackground.jsx'
import { branches } from '../data/branches.js'

export default function BranchGate({ onDone }) {
  const choose = (branchId) => {
    try {
      localStorage.setItem('cosmos_preferred_branch', branchId)
    } catch {
      // ignore storage failures
    }
    onDone()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-background px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StarfieldBackground density={100} className="opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl" />

      <button
        type="button"
        onClick={onDone}
        aria-label="Skip and continue to home"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground cursor-pointer"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 via-accent/10 to-primary text-accent-light ring-1 ring-accent/30">
            <MapPin size={22} aria-hidden="true" />
          </span>
          <h1 className="font-display text-3xl text-foreground md:text-4xl">Choose Your Cosmos</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Pick the branch closest to you to see its showtimes first, or skip for now.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch, i) => (
            <motion.button
              key={branch.id}
              type="button"
              onClick={() => choose(branch.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
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

        <button
          type="button"
          onClick={onDone}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-accent-light hover:underline cursor-pointer"
        >
          Skip for now
        </button>
      </motion.div>
    </motion.div>
  )
}
