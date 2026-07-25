import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <motion.div
      className={`flex flex-col gap-3 max-w-2xl ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl text-foreground">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-base leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}
