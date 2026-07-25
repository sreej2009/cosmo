import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MovieRow({ children }) {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * scrollerRef.current.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="group/row relative -mx-5 px-5">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-background/80 border border-border/40 text-foreground opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer hover:border-accent/60"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto px-1.5 -mx-1.5 pt-16 -mt-16 pb-4 scroll-smooth snap-x snap-mandatory row-fade no-scrollbar"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-background/80 border border-border/40 text-foreground opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer hover:border-accent/60"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
