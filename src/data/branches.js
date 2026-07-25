export const branches = [
  {
    id: 'starview',
    name: 'Starview District',
    badge: 'Flagship',
    address: '42 Orbit Avenue, Starview District',
    tagline: 'The original Cosmos flagship, built for premieres.',
    screens: [
      { name: 'Screen 1', type: 'IMAX' },
      { name: 'Screen 2', type: 'Dolby Atmos' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
  {
    id: 'comet-heights',
    name: 'Comet Heights',
    badge: 'Newest',
    address: '17 Comet Heights Boulevard, Uptown',
    tagline: 'Our newest screens, with 4DX motion seating.',
    screens: [
      { name: 'Screen 1', type: 'IMAX' },
      { name: 'Screen 2', type: '4DX' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
  {
    id: 'lunar-quarter',
    name: 'Lunar Quarter',
    badge: 'Riverside',
    address: '9 Lunar Quarter Walk, Riverside',
    tagline: 'A cozy neighbourhood cinema by the water.',
    screens: [
      { name: 'Screen 1', type: 'Dolby Atmos' },
      { name: 'Screen 2', type: 'Standard' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
]

export const getBranchById = (id) => branches.find((b) => b.id === id)
