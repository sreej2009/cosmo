import { motion } from 'framer-motion'
import { Film, Volume2, Armchair, Popcorn, Accessibility, Wifi, ArrowRight } from 'lucide-react'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Counter from '../components/Counter.jsx'
import Button from '../components/Button.jsx'
import { movies } from '../data/movies.js'

const heroStrip = [...movies, ...movies]

const experience = [
  { icon: Film, title: 'IMAX & Laser Projection', desc: 'Wall-to-wall screens with 4K laser clarity, no matter where you sit.' },
  { icon: Volume2, title: 'Dolby Atmos Sound', desc: 'Object-based audio that places every footstep and explosion precisely.' },
  { icon: Armchair, title: 'Powered Recliners', desc: 'Leg rests, extra legroom and tray tables in every auditorium.' },
  { icon: Popcorn, title: 'Seat-Side Service', desc: 'Order snacks from your seat and skip the concession line entirely.' },
  { icon: Accessibility, title: 'Fully Accessible', desc: 'Step-free access, wheelchair spaces and assistive listening in every screen.' },
  { icon: Wifi, title: 'Free Wi-Fi Lounge', desc: 'Arrive early and work or relax in our starlit lobby lounge.' },
]

export default function About() {
  return (
    <div>
      <section className="relative h-[22rem] overflow-hidden border-b border-border/30 bg-background">
        <div className="row-fade absolute inset-x-0 top-0 flex h-3/5 gap-2 opacity-95">
          {heroStrip.map((movie, i) => (
            <img
              key={`${movie.id}-${i}`}
              src={movie.backdrop}
              alt=""
              aria-hidden="true"
              className="h-full w-64 shrink-0 object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/60 via-55% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(6,6,8,0.8),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_50%_38%,rgba(6,6,8,0.8),transparent_65%)]" />
        <Armchair
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 text-accent/10 md:block"
          size={260}
          strokeWidth={0.75}
        />
        <div className="relative mx-auto max-w-4xl px-5 pt-14 pb-14 text-center flex flex-col items-center gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-accent-light">Our Story</span>
          <h1 className="text-4xl md:text-6xl text-foreground text-glow drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            A Cinema Built Like a Night Sky
          </h1>
          <p className="max-w-2xl text-muted-foreground leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            Cosmos Cinemas opened its first screen over two decades ago with one idea: the
            experience around the film matters as much as the film itself. Today, every auditorium
            is engineered for picture, sound and comfort in equal measure.
          </p>
        </div>
      </section>

      <section className="border-b border-border/30 bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter value={12} suffix="" label="Screens" />
          <Counter value={4200} suffix="+" label="Seats Citywide" />
          <Counter value={98} suffix="%" label="Happy Moviegoers" />
          <Counter value={20} suffix="+" label="Years Running" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 flex flex-col gap-10">
        <SectionHeading
          eyebrow="Experience"
          title="What Makes It Different"
          subtitle="Every detail, from the seat to the sound system, is chosen to disappear into the story on screen."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.07, ease: 'easeOut' }}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/30 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_45px_-12px_rgba(204,154,46,0.3)]"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 -right-2 font-display text-6xl text-foreground/[0.05] transition-colors duration-300 group-hover:text-accent/10"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent-light">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="relative text-lg font-semibold text-foreground">{title}</h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border/30">
        <StarfieldBackground density={70} />
        <div className="relative mx-auto max-w-2xl px-5 py-20 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl text-foreground text-glow">Come See It for Yourself</h2>
          <p className="text-muted-foreground max-w-md">
            The best way to understand the difference is from a recliner, mid-scene, sound wrapping
            around you.
          </p>
          <Button as="link" to="/movies" variant="gradient">
            Browse Showtimes <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </section>
    </div>
  )
}
