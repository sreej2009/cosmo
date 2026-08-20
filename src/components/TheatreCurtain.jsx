import { motion } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1]
const SCALLOP_COUNT = 60
const TASSEL_COUNT = 40

const fabric = (highlightAngle) => `
  repeating-linear-gradient(90deg,
    rgba(0,0,0,0.32) 0px,
    rgba(0,0,0,0.05) 14px,
    rgba(255,255,255,0.06) 28px,
    rgba(0,0,0,0.32) 46px
  ),
  linear-gradient(${highlightAngle}deg, rgba(255,255,255,0.07) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.32) 100%),
  linear-gradient(180deg, #55101b 0%, #34090f 38%, #1c060a 72%, #0c0304 100%)
`

const pelmetGradient = `
  linear-gradient(100deg, rgba(255,255,255,0.1) 0%, transparent 30%, rgba(0,0,0,0.35) 100%),
  linear-gradient(180deg, #6b1420 0%, #3c0b12 100%)
`

const leftCurtainStyle = { backgroundImage: fabric(100) }
const rightCurtainStyle = { backgroundImage: fabric(260) }
const scallopStyle = { backgroundImage: pelmetGradient }

function Tassels() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-3 -mb-1.5 overflow-hidden">
      {Array.from({ length: TASSEL_COUNT }, (_, i) => (
        <span key={i} className="h-3 w-3 shrink-0 -ml-[3px] first:ml-0 rounded-full bg-gradient-to-b from-accent-light to-accent" />
      ))}
    </div>
  )
}

/**
 * Theatre stage curtain: the two side panels slide open to reveal the stage,
 * and the top pelmet/valance fades away shortly after so it doesn't linger
 * over content that appears later in the sequence.
 */
export default function TheatreCurtain({ openDelay = 0.6, openDuration = 1.2 }) {
  const openTransition = { duration: openDuration, delay: openDelay, ease: EASE }
  const pelmetFadeTransition = { duration: 0.6, delay: openDelay + openDuration * 0.55, ease: 'easeInOut' }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left"
        style={leftCurtainStyle}
        initial={{ x: '0%', rotate: 0, scaleX: 1 }}
        animate={{ x: '-102%', rotate: -1.5, scaleX: 0.92 }}
        transition={openTransition}
      >
        <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-accent-light/85 to-transparent" />
        <Tassels />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right"
        style={rightCurtainStyle}
        initial={{ x: '0%', rotate: 0, scaleX: 1 }}
        animate={{ x: '102%', rotate: 1.5, scaleX: 0.92 }}
        transition={openTransition}
      >
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-accent-light/85 to-transparent" />
        <Tassels />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={pelmetFadeTransition}
      >
        <div className="h-9 w-full shadow-[0_6px_18px_rgba(0,0,0,0.55)]" style={scallopStyle} />
        <div className="flex -mt-5 overflow-hidden">
          {Array.from({ length: SCALLOP_COUNT }, (_, i) => (
            <span key={i} className="h-9 w-9 shrink-0 -ml-[2px] first:ml-0 rounded-full" style={scallopStyle} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
