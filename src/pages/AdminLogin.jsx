import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import Button from '../components/Button.jsx'

const ADMIN_PASSWORD = 'cosmos2026'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('cosmos_admin', 'true')
      navigate('/admin', { replace: true })
    } else {
      setError('Incorrect password. Try again.')
    }
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-16">
      <StarfieldBackground density={90} className="opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-border/30 bg-surface p-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 via-accent/10 to-primary text-accent-light ring-1 ring-accent/30">
          <Lock size={20} aria-hidden="true" />
        </span>

        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to manage Cosmos Cinemas.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            placeholder="Password"
            autoFocus
            className="rounded-full border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
          />
          {error && <p className="px-1 text-xs text-destructive">{error}</p>}
        </div>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </form>
    </div>
  )
}
