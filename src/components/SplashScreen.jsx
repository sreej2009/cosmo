import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import cosmoLogo from '../assets/COSMO LOGO.png'

const CLOSED_HOLD = 0.6
const OPEN_DELAY = CLOSED_HOLD
const OPEN_DURATION = 1.2
const LOGO_START = OPEN_DELAY + OPEN_DURATION - 0.6
const LOGO_IN = 0.35
const LOGO_HOLD = 0.8
const LOGO_OUT = 0.5
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

export default function SplashScreen({ onDone }) {
  const prefersReducedMotion = useReducedMotion()

  const logoDuration = LOGO_IN + LOGO_HOLD + LOGO_OUT
  const logoTimes = [0, LOGO_IN / logoDuration, (LOGO_IN + LOGO_HOLD) / logoDuration, 1]

  useEffect(() => {
    const totalMs = prefersReducedMotion ? 500 : (LOGO_START + logoDuration + 0.3) * 1000
    const id = setTimeout(onDone, totalMs)
    return () => clearTimeout(id)
  }, [prefersReducedMotion, onDone, logoDuration])

  const openTransition = {
    duration: prefersReducedMotion ? 0.3 : OPEN_DURATION,
    delay: prefersReducedMotion ? 0 : OPEN_DELAY,
    ease: EASE,
  }

  return (
    <motion.div className="fixed inset-0 z-[200] overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
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

      <div className="absolute inset-x-0 top-0 z-30 flex flex-col">
        <div className="h-9 w-full shadow-[0_6px_18px_rgba(0,0,0,0.55)]" style={scallopStyle} />
        <div className="flex -mt-5 overflow-hidden">
          {Array.from({ length: SCALLOP_COUNT }, (_, i) => (
            <span key={i} className="h-9 w-9 shrink-0 -ml-[2px] first:ml-0 rounded-full" style={scallopStyle} />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 z-[5] bg-black backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.92 }
            : { opacity: [0, 0.92, 0.92, 0] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.3 }
            : { delay: LOGO_START, duration: logoDuration, times: logoTimes, ease: 'easeInOut' }
        }
      />

      <motion.img
        src={cosmoLogo}
        alt="Cosmos Cinemas"
        className="absolute left-1/2 top-1/2 z-10 w-[26rem] sm:w-[34rem] max-w-[85vw] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_45px_rgba(240,193,75,0.35)]"
        initial={{ opacity: 0, scale: 0.4, y: 60, rotate: -8 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
            : {
                opacity: [0, 1, 1, 0],
                scale: [0.4, 1.14, 1, 0.9],
                y: [60, -10, 0, 0],
                rotate: [-8, 3, 0, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.3 }
            : { delay: LOGO_START, duration: logoDuration, times: logoTimes, ease: ['circOut', 'easeOut', 'easeInOut'] }
        }
      />
    </motion.div>
  )
}
