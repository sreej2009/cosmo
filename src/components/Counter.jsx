import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function Counter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 })

  useEffect(() => {
    if (isInView) motionValue.set(prefersReducedMotion ? value : value)
  }, [isInView, value, motionValue, prefersReducedMotion])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`
    })
    return unsubscribe
  }, [spring, suffix])

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <motion.span ref={ref} className="text-4xl md:text-5xl font-display text-accent-light text-glow">
        0{suffix}
      </motion.span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
