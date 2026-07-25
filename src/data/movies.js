import { branches } from './branches.js'

const youtubeThumb = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

const today = new Date()
const dateAt = (offsetDays) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

const times = ['10:30 AM', '1:45 PM', '4:30 PM', '7:15 PM', '10:00 PM']

const buildShowtimes = (days) =>
  days.flatMap((offset) =>
    branches.flatMap((branch) => {
      const screen = branch.screens[Math.floor(Math.random() * branch.screens.length)]
      return times
        .filter(() => Math.random() > 0.55)
        .map((time) => ({
          date: dateAt(offset),
          time,
          branchId: branch.id,
          branchName: branch.name,
          theatre: `${screen.name} - ${screen.type}`,
        }))
    }),
  )

export const movies = [
  {
    id: 'karuppu',
    title: 'Karuppu',
    genres: ['Action', 'Drama'],
    durationMin: 158,
    rating: 'UA',
    imdb: 7.4,
    language: 'Tamil',
    year: 2026,
    status: 'now-showing',
    youtubeId: 'JpVl_-1YgIo',
    poster: youtubeThumb('JpVl_-1YgIo'),
    backdrop: youtubeThumb('JpVl_-1YgIo'),
    synopsis:
      'A guardian deity disguises himself as a lawyer to fight corruption in the court system, helping a father and daughter recover the stolen gold meant to save her life.',
    cast: ['Suriya', 'Trisha Krishnan', 'RJ Balaji'],
    price: 280,
    showtimes: buildShowtimes([0, 1, 2]),
  },
  {
    id: 'blast',
    title: 'Blast',
    genres: ['Action', 'Family'],
    durationMin: 148,
    rating: 'UA',
    imdb: 6.9,
    language: 'Tamil',
    year: 2026,
    status: 'now-showing',
    youtubeId: 'CSAad4PmfCg',
    poster: youtubeThumb('CSAad4PmfCg'),
    backdrop: youtubeThumb('CSAad4PmfCg'),
    synopsis:
      'A humble karate-teaching family finds their peaceful life shattered when they cross paths with a ruthless corporate syndicate, forcing them to stand and fight together.',
    cast: ['Arjun', 'Preity Mukhundhan', 'Abhirami'],
    price: 260,
    showtimes: buildShowtimes([0, 1, 2]),
  },
  {
    id: 'lik',
    title: 'LIK: Love Insurance Kompany',
    genres: ['Romance', 'Sci-Fi'],
    durationMin: 150,
    rating: 'U',
    imdb: 6.5,
    language: 'Tamil',
    year: 2026,
    status: 'now-showing',
    youtubeId: 'AByVrKHo6Q0',
    poster: youtubeThumb('AByVrKHo6Q0'),
    backdrop: youtubeThumb('AByVrKHo6Q0'),
    synopsis:
      "In a 2040 where love is guaranteed by an algorithm-driven dating app, a believer in natural romance challenges the system — and the woman who trusts it completely.",
    cast: ['Pradeep Ranganathan', 'Krithi Shetty', 'S. J. Suryah'],
    price: 260,
    showtimes: buildShowtimes([0, 1, 2]),
  },
  {
    id: 'youth',
    title: 'Youth',
    genres: ['Romance', 'Comedy'],
    durationMin: 140,
    rating: 'U',
    imdb: 7.5,
    language: 'Tamil',
    year: 2026,
    status: 'now-showing',
    youtubeId: 'wMcq4IOkceA',
    poster: youtubeThumb('wMcq4IOkceA'),
    backdrop: youtubeThumb('wMcq4IOkceA'),
    synopsis:
      'A carefree sixteen-year-old is determined to find the love of his life before school ends — and gets far more than he bargained for.',
    cast: ['Ken Karunas', 'Priyanshi Yadav', 'Devadarshini'],
    price: 240,
    showtimes: buildShowtimes([0, 1, 2]),
  },
  {
    id: 'thaai-kizhavi',
    title: 'Thaai Kizhavi',
    genres: ['Comedy', 'Drama'],
    durationMin: 145,
    rating: 'U',
    imdb: 8.3,
    language: 'Tamil',
    year: 2026,
    status: 'now-showing',
    youtubeId: 'BCQwSlYlEe8',
    poster: youtubeThumb('BCQwSlYlEe8'),
    backdrop: youtubeThumb('BCQwSlYlEe8'),
    synopsis:
      "An ailing old moneylender's three sons scramble to uncover the hidden gold she's kept secret her whole life, before it's too late.",
    cast: ['Radikaa Sarathkumar', 'Singampuli', 'Munishkanth'],
    price: 240,
    showtimes: buildShowtimes([0, 1, 2]),
  },
  {
    id: 'kraven-the-hunter',
    title: 'Kraven the Hunter',
    genres: ['Action', 'Thriller'],
    durationMin: 127,
    rating: 'A',
    imdb: 5.5,
    language: 'English · Tamil Dubbed',
    year: 2024,
    status: 'coming-soon',
    releaseDate: dateAt(18),
    youtubeId: 'I8gFw4-2RBM',
    poster: youtubeThumb('I8gFw4-2RBM'),
    backdrop: youtubeThumb('I8gFw4-2RBM'),
    synopsis:
      "A man's brutal relationship with his ruthless father sets him down a path of vengeance, transforming him into the world's greatest hunter — and one of its most feared.",
    cast: ['Aaron Taylor-Johnson', 'Russell Crowe', 'Ariana DeBose'],
    price: 300,
    showtimes: [],
  },
  {
    id: 'jana-nayagan',
    title: 'Jana Nayagan',
    genres: ['Action', 'Drama'],
    durationMin: 165,
    rating: 'UA',
    imdb: 8.1,
    language: 'Tamil',
    year: 2026,
    status: 'coming-soon',
    releaseDate: dateAt(3),
    youtubeId: 'fJaAYcERf3Y',
    poster: youtubeThumb('fJaAYcERf3Y'),
    backdrop: youtubeThumb('fJaAYcERf3Y'),
    synopsis:
      "A political action drama following a leader's rise as he takes on a corrupt system to fight for the people — marking Vijay's final film before his transition into politics.",
    cast: ['Vijay', 'Pooja Hegde', 'Bobby Deol'],
    price: 320,
    showtimes: [],
  },
  {
    id: 'mandaadi',
    title: 'Mandaadi',
    genres: ['Action', 'Drama'],
    durationMin: 138,
    rating: 'UA',
    imdb: 7.2,
    language: 'Tamil',
    year: 2026,
    status: 'coming-soon',
    releaseDate: dateAt(46),
    youtubeId: 'RaLjda_3O-Q',
    poster: youtubeThumb('RaLjda_3O-Q'),
    backdrop: youtubeThumb('RaLjda_3O-Q'),
    synopsis:
      'A small-town sportsman fights his way through a corrupt system for a shot at glory, in a sports action drama set against the world of Mandaadi (bull racing).',
    cast: ['Soori', 'Mahima Nambiar', 'Sathyaraj'],
    price: 250,
    showtimes: [],
  },
  {
    id: 'den-of-thieves-2-pantera',
    title: 'Den of Thieves 2: Pantera',
    genres: ['Action', 'Crime'],
    durationMin: 144,
    rating: 'A',
    imdb: 6.3,
    language: 'English · Tamil Dubbed',
    year: 2025,
    status: 'coming-soon',
    releaseDate: dateAt(32),
    youtubeId: '1kmjAnvFw3I',
    poster: youtubeThumb('1kmjAnvFw3I'),
    backdrop: youtubeThumb('1kmjAnvFw3I'),
    synopsis:
      'A relentless LA sheriff tracks his old rival across Europe, drawn into a plot to pull off one of the most ambitious diamond heists in history.',
    cast: ['Gerard Butler', "O'Shea Jackson Jr.", 'Evin Ahmad'],
    price: 300,
    showtimes: [],
  },
]

export const getMovieById = (id) => movies.find((m) => m.id === id)

export const nowShowing = movies.filter((m) => m.status === 'now-showing')
export const comingSoon = movies.filter((m) => m.status === 'coming-soon')

export const allGenres = [...new Set(movies.flatMap((m) => m.genres))].sort()

export const moviesAtBranch = (branchId) =>
  movies.filter((m) => m.showtimes.some((s) => s.branchId === branchId))

export const showtimesForBranch = (movie, branchId) =>
  movie.showtimes.filter((s) => s.branchId === branchId)
