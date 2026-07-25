import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, AtSign, Users, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import StarfieldBackground from './StarfieldBackground.jsx'
import logoWide from '../assets/cosmo-logo-wide.png'

const socials = [
  { icon: Camera, label: 'Instagram', href: 'https://instagram.com' },
  { icon: AtSign, label: 'Twitter / X', href: 'https://twitter.com' },
  { icon: Users, label: 'Facebook', href: 'https://facebook.com' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-surface pb-20 md:pb-0">
      <StarfieldBackground density={40} className="opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-10 flex flex-col gap-3 border-b border-border/20">
        <span className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-accent-light">
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          Stay in the Loop
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h3 className="font-display text-3xl md:text-4xl text-foreground max-w-md">
            Get Showtimes Before They Drop
          </h3>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full border border-border/50 bg-background px-4 py-2.5 min-h-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 min-h-11 text-sm font-semibold text-background hover:bg-accent-light transition-colors cursor-pointer whitespace-nowrap"
            >
              {subscribed ? 'Subscribed' : 'Subscribe'} <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 flex flex-col gap-3">
          <Link to="/" className="w-fit">
            <img src={logoWide} alt="Cosmos Cinemas" className="h-20 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            An immersive cinema experience under one roof — IMAX, Dolby Atmos and reclining
            comfort, built for stories that deserve a bigger sky.
          </p>
          <ul className="flex gap-2.5 pt-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground hover:text-accent-light hover:border-accent/50 transition-colors"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Quick Links
          </h3>
          <Link to="/movies" className="text-sm text-muted-foreground hover:text-accent-light w-fit">
            Now Showing
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-accent-light w-fit">
            Experience
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-accent-light w-fit">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
            Visit Us
          </h3>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            42 Orbit Avenue, Starview District
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={16} className="shrink-0" aria-hidden="true" />
            +1 (555) 019-2842
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={16} className="shrink-0" aria-hidden="true" />
            hello@cosmoscinemas.example
          </p>
        </div>
      </div>

      <div className="relative border-t border-border/30 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Cosmos Cinemas. All rights reserved.
      </div>
    </footer>
  )
}
