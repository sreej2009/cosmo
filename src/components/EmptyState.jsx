import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function EmptyState({ icon: Icon = AlertCircle, title, message, actionLabel, actionTo }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-5 pt-28 pb-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-primary text-accent-light ring-1 ring-accent/25">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h1 className="text-2xl text-foreground">{title}</h1>
      {message && <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:brightness-110"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
