import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const SEATS_PER_ROW = 10
const MAX_SEATS = 8

function computeTakenSeats(seedKey) {
  const taken = new Set()
  const seed = [...seedKey].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  let rng = seed
  const next = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }
  ROWS.forEach((row) => {
    for (let n = 1; n <= SEATS_PER_ROW; n += 1) {
      if (next() < 0.18) taken.add(`${row}${n}`)
    }
  })
  return taken
}

export default function SeatMap({ price, seedKey, onChange }) {
  const takenSeats = useMemo(() => computeTakenSeats(seedKey), [seedKey])
  const [selected, setSelected] = useState([])

  const toggleSeat = (seatId) => {
    if (takenSeats.has(seatId)) return
    const next = selected.includes(seatId)
      ? selected.filter((s) => s !== seatId)
      : selected.length >= MAX_SEATS
        ? selected
        : [...selected, seatId]
    setSelected(next)
    onChange?.(next, next.length * price)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-xl">
        <div className="relative mx-auto mb-3 h-10 w-full max-w-md" aria-hidden="true">
          <svg viewBox="0 0 400 40" className="absolute inset-0 h-full w-full overflow-visible">
            <path
              d="M 10 30 Q 200 -10 390 30"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M 10 30 Q 200 -10 390 30"
              fill="none"
              stroke="var(--color-accent)"
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
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="w-4 text-xs text-muted-foreground">{row}</span>
              <div className="flex gap-1.5">
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((n) => {
                  const seatId = `${row}${n}`
                  const isTaken = takenSeats.has(seatId)
                  const isSelected = selected.includes(seatId)

                  return (
                    <motion.button
                      key={seatId}
                      type="button"
                      disabled={isTaken}
                      onClick={() => toggleSeat(seatId)}
                      whileTap={!isTaken ? { scale: 0.9 } : undefined}
                      aria-label={`Seat ${seatId}${isTaken ? ' (unavailable)' : isSelected ? ' (selected)' : ''}`}
                      aria-pressed={isSelected}
                      className={`h-6 w-6 sm:h-7 sm:w-7 rounded-t-md border text-[9px] flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed
                        ${
                          isTaken
                            ? 'bg-muted/40 border-muted/40 text-muted-foreground/40'
                            : isSelected
                              ? 'bg-accent border-accent text-background'
                              : 'bg-muted border-border/50 text-muted-foreground hover:border-accent-light hover:text-accent-light'
                        }`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-t-md bg-muted border border-border/50" /> Available
        </li>
        <li className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-t-md bg-accent border border-accent" /> Selected
        </li>
        <li className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-t-md bg-muted/40 border border-muted/40" /> Taken
        </li>
      </ul>
    </div>
  )
}
