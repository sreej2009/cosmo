import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Clapperboard, MapPin, Armchair, Mail, Search, Ticket } from 'lucide-react'
import logoWide from '../assets/cosmo-logo-wide.png'
import SearchOverlay from './SearchOverlay.jsx'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/movies', label: 'Movies', icon: Clapperboard },
  { to: '/branches', label: 'Branches', icon: MapPin },
  { to: '/about', label: 'Experience', icon: Armchair },
  { to: '/contact', label: 'Contact', icon: Mail },
]

function NavIcon({ to, label, icon: Icon, end }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1.5 rounded-xl border py-3 transition-all duration-200 ${
            isActive
              ? 'border-accent/40 bg-accent text-background shadow-[0_8px_20px_-6px_rgba(204,154,46,0.55)]'
              : 'border-border/20 bg-white/[0.02] text-muted-foreground hover:border-border/50 hover:bg-white/5 hover:text-foreground'
          }`
        }
      >
        <Icon size={19} aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-wide">{label}</span>
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchSession, setSearchSession] = useState(0)

  return (
    <>
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 w-36 flex-col items-center border-r border-border/20 bg-background">
      <div className="flex w-full items-center justify-center border-b-2 border-accent bg-primary px-2 py-7 shadow-[0_6px_20px_rgba(0,0,0,0.5)]">
        <NavLink to="/" aria-label="Cosmos Cinemas home" className="w-full">
          <img src={logoWide} alt="Cosmos Cinemas" className="w-full object-contain" />
        </NavLink>
      </div>

      <ul className="flex w-full flex-col gap-2.5 px-3 pt-6">
        {links.map((link) => (
          <NavIcon key={link.to} {...link} />
        ))}
      </ul>

      <div className="mt-auto flex w-full flex-col items-center gap-3 border-t border-border/20 px-3 pb-6 pt-5">
        <button
          type="button"
          aria-label="Search"
          onClick={() => {
            setSearchOpen(true)
            setSearchSession((s) => s + 1)
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/20 bg-white/[0.02] py-3 text-muted-foreground hover:border-border/50 hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer"
        >
          <Search size={17} aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Search</span>
        </button>
        <NavLink
          to="/movies"
          aria-label="Book Tickets"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-background glow-ring hover:bg-accent-light transition-colors"
        >
          <Ticket size={17} aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Tickets</span>
        </NavLink>
      </div>
    </aside>
    <SearchOverlay key={searchSession} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
