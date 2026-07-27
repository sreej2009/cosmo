import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, LogOut, Plus, Pencil, Trash2, X } from 'lucide-react'
import { movies as initialMovies, saveMovies, youtubePoster } from '../data/movies.js'

const emptyForm = {
  id: '',
  title: '',
  genres: '',
  durationMin: '',
  rating: 'UA',
  imdb: '',
  language: 'Tamil',
  year: new Date().getFullYear(),
  status: 'now-showing',
  releaseDate: '',
  youtubeId: '',
  synopsis: '',
  cast: '',
  price: '',
}

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function MovieForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial
      ? {
          ...emptyForm,
          ...initial,
          genres: initial.genres.join(', '),
          cast: initial.cast.join(', '),
        }
      : emptyForm,
  )

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = initial ? initial.id : slugify(form.title) || `movie-${Date.now()}`
    const poster = youtubePoster(form.youtubeId.trim())
    onSave({
      id,
      title: form.title.trim(),
      genres: form.genres.split(',').map((g) => g.trim()).filter(Boolean),
      durationMin: Number(form.durationMin) || 0,
      rating: form.rating,
      imdb: Number(form.imdb) || 0,
      language: form.language,
      year: Number(form.year) || new Date().getFullYear(),
      status: form.status,
      releaseDate: form.status === 'coming-soon' ? form.releaseDate || new Date().toISOString().slice(0, 10) : undefined,
      youtubeId: form.youtubeId.trim(),
      poster,
      backdrop: poster,
      synopsis: form.synopsis.trim(),
      cast: form.cast.split(',').map((c) => c.trim()).filter(Boolean),
      price: Number(form.price) || 0,
      showtimes: initial?.showtimes ?? [],
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.form
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-2xl border border-border/40 bg-surface p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">{initial ? 'Edit Movie' : 'Add Movie'}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            Title
            <input
              required
              value={form.title}
              onChange={update('title')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Genres (comma separated)
            <input
              required
              value={form.genres}
              onChange={update('genres')}
              placeholder="Action, Drama"
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Cast (comma separated)
            <input
              value={form.cast}
              onChange={update('cast')}
              placeholder="Actor One, Actor Two"
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Duration (min)
            <input
              type="number"
              required
              value={form.durationMin}
              onChange={update('durationMin')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            IMDb Rating
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={form.imdb}
              onChange={update('imdb')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Certificate
            <select
              value={form.rating}
              onChange={update('rating')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            >
              <option>U</option>
              <option>UA</option>
              <option>A</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Language
            <input
              value={form.language}
              onChange={update('language')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Year
            <input
              type="number"
              value={form.year}
              onChange={update('year')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Price (₹)
            <input
              type="number"
              value={form.price}
              onChange={update('price')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            Status
            <select
              value={form.status}
              onChange={update('status')}
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            >
              <option value="now-showing">Now Showing</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </label>

          {form.status === 'coming-soon' && (
            <label className="flex flex-col gap-1.5 text-sm">
              Release Date
              <input
                type="date"
                value={form.releaseDate}
                onChange={update('releaseDate')}
                className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            YouTube Trailer ID
            <input
              required
              value={form.youtubeId}
              onChange={update('youtubeId')}
              placeholder="e.g. JpVl_-1YgIo"
              className="rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
            <span className="text-xs text-muted-foreground">
              The part after "v=" in the YouTube trailer URL. Poster is auto-generated from it.
            </span>
          </label>

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            Synopsis
            <textarea
              rows={3}
              value={form.synopsis}
              onChange={update('synopsis')}
              className="resize-none rounded-lg border border-border/50 bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/60 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background hover:bg-accent-light cursor-pointer"
          >
            {initial ? 'Save Changes' : 'Add Movie'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}

export default function Admin() {
  const isAuthed = sessionStorage.getItem('cosmos_admin') === 'true'
  const navigate = useNavigate()
  const [list, setList] = useState(initialMovies)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)

  if (!isAuthed) return <Navigate to="/admin/login" replace />

  const persist = (next) => {
    setList(next)
    saveMovies(next)
  }

  const handleSave = (movie) => {
    const exists = list.some((m) => m.id === movie.id)
    const next = exists ? list.map((m) => (m.id === movie.id ? movie : m)) : [...list, movie]
    persist(next)
    setShowForm(false)
    setEditing(null)
  }

  const handleDelete = (id) => {
    persist(list.filter((m) => m.id !== id))
    setPendingDelete(null)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('cosmos_admin')
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-primary text-accent-light ring-1 ring-accent/30">
            <Film size={20} aria-hidden="true" />
          </span>
          <div>
            <h1 className="font-display text-2xl text-foreground">Movie Admin</h1>
            <p className="text-sm text-muted-foreground">{list.length} movies · changes save to this browser</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setEditing(null)
              setShowForm(true)
            }}
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background hover:bg-accent-light cursor-pointer"
          >
            <Plus size={16} aria-hidden="true" /> Add Movie
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/60 cursor-pointer"
          >
            <LogOut size={16} aria-hidden="true" /> Log Out
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/30">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/30 bg-surface text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3">Movie</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Genres</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((movie) => (
              <tr key={movie.id} className="border-b border-border/20 last:border-0 hover:bg-surface/60">
                <td className="flex items-center gap-3 px-4 py-3">
                  <img src={movie.poster} alt="" className="h-12 w-9 rounded object-cover" />
                  <span className="font-medium text-foreground">{movie.title}</span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      movie.status === 'now-showing'
                        ? 'bg-accent/15 text-accent-light'
                        : 'bg-sky-500/15 text-sky-400'
                    }`}
                  >
                    {movie.status === 'now-showing' ? 'Now Showing' : 'Coming Soon'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{movie.genres.join(' · ')}</td>
                <td className="px-4 py-3 text-muted-foreground">{movie.imdb}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(movie)
                        setShowForm(true)
                      }}
                      aria-label={`Edit ${movie.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-accent-light cursor-pointer"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(movie)}
                      aria-label={`Delete ${movie.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-destructive cursor-pointer"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <MovieForm
            initial={editing}
            onCancel={() => {
              setShowForm(false)
              setEditing(null)
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
            onClick={() => setPendingDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-border/40 bg-surface p-6 text-center"
            >
              <p className="text-foreground">
                Delete <span className="font-semibold">{pendingDelete.title}</span>?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPendingDelete(null)}
                  className="rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-foreground hover:border-accent/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(pendingDelete.id)}
                  className="rounded-full bg-destructive px-5 py-2.5 text-sm font-medium text-white hover:brightness-110 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
