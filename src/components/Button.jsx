import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const variants = {
  primary:
    'bg-accent text-background hover:bg-accent-light glow-ring',
  gradient:
    'bg-gradient-to-r from-accent-light via-accent to-accent text-background shadow-lg shadow-accent/25 hover:brightness-110',
  secondary:
    'bg-transparent text-foreground border border-border hover:border-accent hover:text-accent-light',
  ghost: 'bg-transparent text-foreground hover:text-accent-light',
}

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 min-h-11 font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`

  if (as === 'link' && to) {
    return (
      <MotionLink
        to={to}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
