import { NavLink } from 'react-router-dom'
import { Home, Clapperboard, Ticket, MapPin, Armchair, Mail } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/movies', label: 'Movies', icon: Clapperboard },
  { to: '/movies', label: 'Book', icon: Ticket, accent: true },
  { to: '/branches', label: 'Branches', icon: MapPin },
  { to: '/about', label: 'Experience', icon: Armchair },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-border/30 bg-background/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-center justify-around px-2 py-2">
        {links.map(({ to, label, icon: Icon, end, accent }) => (
          <li key={label}>
            <NavLink
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 min-h-11 min-w-11 justify-center transition-colors ${
                  accent
                    ? 'bg-accent text-background -mt-5 h-14 w-14 rounded-full shadow-lg shadow-accent/30'
                    : isActive
                      ? 'text-accent-light'
                      : 'text-muted-foreground'
                }`
              }
            >
              <Icon size={accent ? 22 : 19} aria-hidden="true" />
              {!accent && <span className="text-[10px] font-medium">{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
