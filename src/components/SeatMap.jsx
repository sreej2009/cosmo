import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const STANDARD_ROWS = new Set(['A', 'B', 'C'])
const COUPLE_ROW = 'H'
const SEATS_PER_ROW = 10
const MAX_PEOPLE = 8

function tierForRow(row) {
  if (row === COUPLE_ROW) return 'couple'
  if (STANDARD_ROWS.has(row)) return 'standard'
  return 'premium'
}

function priceForTier(base, tier) {
  if (tier === 'premium') return Math.round(base * 1.35)
  if (tier === 'couple') return Math.round(base * 2.6)
  return base
}

function peopleForSeat(seatId) {
  return seatId.includes('-') ? 2 : 1
}

function rowLayout(row) {
  const tier = tierForRow(row)
  if (tier === 'couple') {
    return Array.from({ length: SEATS_PER_ROW / 2 }, (_, i) => `${row}${i * 2 + 1}-${i * 2 + 2}`)
  }
  return Array.from({ length: SEATS_PER_ROW }, (_, i) => `${row}${i + 1}`)
}

function computeTakenSeats(seedKey) {
  const taken = new Set()
  const seed = [...seedKey].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  let rng = seed
  const next = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }
  ROWS.forEach((row) => {
    rowLayout(row).forEach((seatId) => {
      if (next() < 0.18) taken.add(seatId)
    })
  })
  return taken
}

const legend = [
  { label: 'Available', className: 'bg-muted border border-border/50' },
  { label: 'Selected', className: 'bg-accent-strong border border-accent-strong' },
  { label: 'Premium', className: 'bg-muted border border-accent/60' },
  { label: 'Couple', className: 'bg-muted border border-accent/60' },
  { label: 'Taken', className: 'bg-muted/30 border border-muted/30' },
]

export default function SeatMap({ price, seedKey, onChange }) {
  const takenSeats = useMemo(() => computeTakenSeats(seedKey), [seedKey])
  const [selected, setSelected] = useState([])

  const totalPeople = selected.reduce((sum, id) => sum + peopleForSeat(id), 0)

  const toggleSeat = (seatId) => {
    if (takenSeats.has(seatId)) return
    const alreadySelected = selected.includes(seatId)
    const wouldAdd = alreadySelected ? 0 : peopleForSeat(seatId)
    if (!alreadySelected && totalPeople + wouldAdd > MAX_PEOPLE) return

    const next = alreadySelected ? selected.filter((s) => s !== seatId) : [...selected, seatId]
    setSelected(next)

    const amount = next.reduce((sum, id) => {
      const row = id[0]
      return sum + priceForTier(price, tierForRow(row))
    }, 0)
    onChange?.(next, amount)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-xl">
        <div className="relative mx-auto mb-3 h-10 w-full max-w-md" aria-hidden="true">
          <svg viewBox="0 0 400 40" className="absolute inset-0 h-full w-full overflow-visible">
            <path
              d="M 10 30 Q 200 -10 390 30"
              fill="none"
              stroke="var(--color-accent-strong)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M 10 30 Q 200 -10 390 30"
              fill="none"
              stroke="var(--color-accent-strong)"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.15"
              filter="blur(6px)"
            />
          </svg>
        </div>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Screen This Way
        </p>

        <div className="flex flex-col gap-2 items-center">
          {ROWS.map((row) => {
            const tier = tierForRow(row)
            return (
              <div key={row} className="flex items-center gap-2">
                <span className="w-4 text-xs text-muted-foreground">{row}</span>
                <div className="flex gap-1.5">
                  {rowLayout(row).map((seatId) => {
                    const isTaken = takenSeats.has(seatId)
                    const isSelected = selected.includes(seatId)
                    const isCouple = tier === 'couple'
                    const isPremium = tier === 'premium'

                    return (
                      <motion.button
                        key={seatId}
                        type="button"
                        disabled={isTaken}
                        onClick={() => toggleSeat(seatId)}
                        whileTap={!isTaken ? { scale: 0.9 } : undefined}
                        aria-label={`Seat ${seatId}${isTaken ? ' (unavailable)' : isSelected ? ' (selected)' : ''}${isPremium ? ' — premium' : isCouple ? ' — couple' : ''}`}
                        aria-pressed={isSelected}
                        className={`flex items-center justify-center rounded-t-md border text-[9px] transition-colors cursor-pointer disabled:cursor-not-allowed
                          ${isCouple ? 'h-6 w-11 sm:h-7 sm:w-13' : 'h-6 w-6 sm:h-7 sm:w-7'}
                          ${
                            isTaken
                              ? 'bg-muted/30 border-muted/30 text-muted-foreground/30'
                              : isSelected
                                ? 'bg-accent-strong border-accent-strong text-background'
                                : isPremium || isCouple
                                  ? 'bg-muted border-accent/60 text-accent-light/80 hover:border-accent-light hover:text-accent-light'
                                  : 'bg-muted border-border/50 text-muted-foreground hover:border-accent-light hover:text-accent-light'
                          }`}
                      >
                        {isCouple && !isTaken && <Heart size={9} className={isSelected ? 'fill-background' : 'fill-accent-light/70'} aria-hidden="true" />}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        {legend.map(({ label, className }) => (
          <li key={label} className="flex items-center gap-2">
            <span className={`h-4 w-4 rounded-t-md ${className}`} /> {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
