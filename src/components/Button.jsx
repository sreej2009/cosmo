import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const variants = {
  primary:
    'bg-accent-strong text-background hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(214,169,40,0.55)] hover:shadow-[0_14px_36px_-10px_rgba(214,169,40,0.7)]',
  gradient:
    'bg-gradient-to-r from-accent-light via-accent-strong to-accent text-background shadow-[0_10px_30px_-10px_rgba(214,169,40,0.55)] hover:brightness-110',
  secondary:
    'bg-transparent text-foreground border border-border hover:border-accent-strong/70 hover:text-accent-light',
  ghost: 'bg-transparent text-foreground-secondary hover:text-accent-light',
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 min-h-11 font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`

  if (as === 'link' && to) {
    return (
      <MotionLink
        to={to}
        className={classes}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
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
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
