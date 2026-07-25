import { Compass } from 'lucide-react'
import StarfieldBackground from '../components/StarfieldBackground.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <StarfieldBackground density={100} />
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5 px-5 pt-24 pb-24 text-center">
        <Compass size={40} className="text-accent-light" aria-hidden="true" />
        <h1 className="text-5xl text-foreground text-glow">404</h1>
        <p className="text-muted-foreground">
          This screen doesn't exist — looks like you've drifted off the star map.
        </p>
        <Button as="link" to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
