import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function MoviePoster({ movie, aspect = 'poster', fill = false, kenBurns = false, video = false, className = '' }) {
  const src = aspect === 'poster' ? movie.poster : movie.backdrop
  const prefersReducedMotion = useReducedMotion()
  const animateKenBurns = kenBurns && !prefersReducedMotion
  const [videoReady, setVideoReady] = useState(false)
  const playVideo = video && movie.youtubeId && !prefersReducedMotion

  return (
    <div
      aria-hidden="true"
      className={`${fill ? 'absolute inset-0' : 'relative'} overflow-hidden ${aspect === 'poster' ? 'aspect-[2/3]' : 'aspect-video'} bg-primary ${className}`}
    >
      {animateKenBurns ? (
        <motion.img
          key={src}
          src={src}
          alt=""
          className="duotone absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1.18, opacity: 1 }}
          transition={{ scale: { duration: 14, ease: 'linear' }, opacity: { duration: 0.6, ease: 'easeOut' } }}
        />
      ) : (
        <img src={src} alt="" loading="lazy" className="duotone absolute inset-0 h-full w-full object-cover" />
      )}
      {playVideo && (
        <motion.iframe
          key={movie.youtubeId}
          src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${movie.youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
          title=""
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={() => setVideoReady(true)}
          className="duotone pointer-events-none absolute -inset-[20%] h-[140%] w-[140%] border-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
      <div className="duotone-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  )
}
