import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, CheckCircle2, Navigation } from 'lucide-react'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StarfieldBackground from '../components/StarfieldBackground.jsx'

const initialForm = { name: '', email: '', message: '' }

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Avinashi Road, Peelamedu, Coimbatore - 641004' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: Mail, label: 'Email', value: 'hello@cosmoscinemas.example' },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 grid gap-14 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="We'd Love to Hear From You"
          subtitle="Questions about group bookings, private screenings or accessibility? Send us a message."
        />

        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <li
              key={label}
              className="flex items-start gap-3 rounded-xl border border-border/30 bg-surface p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-primary text-accent-light ring-1 ring-accent/25">
                <Icon size={17} aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            </li>
          ))}
        </ul>

        <a
          href="https://www.openstreetmap.org/?mlat=11.0296&mlon=77.0266#map=13/11.0296/77.0266"
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-2xl border border-border/30 h-52"
        >
          <StarfieldBackground density={90} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,154,46,0.15),transparent_60%)]" />
          <div className="relative flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background glow-ring transition-transform duration-300 group-hover:scale-110">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Peelamedu</p>
              <p className="text-xs text-muted-foreground">Avinashi Road, Coimbatore</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-accent-light">
              <Navigation size={12} aria-hidden="true" /> Get Directions
            </span>
          </div>
        </a>
      </div>

      <div className="rounded-2xl border border-border/30 bg-surface p-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-10 text-center"
              role="status"
              aria-live="polite"
            >
              <CheckCircle2 size={40} className="text-accent-light" aria-hidden="true" />
              <h3 className="text-xl text-foreground">Message Sent</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Thanks for reaching out — our team usually replies within one business day.
              </p>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name <span className="text-accent-light">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  className="rounded-lg border border-border/50 bg-background px-4 py-2.5 min-h-11 text-sm text-foreground focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/25 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email <span className="text-accent-light">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="rounded-lg border border-border/50 bg-background px-4 py-2.5 min-h-11 text-sm text-foreground focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/25 outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message <span className="text-accent-light">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  className="rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/25 outline-none transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="gradient" className="self-start">
                Send Message
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
