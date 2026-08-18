export const branches = [
  {
    id: 'peelamedu',
    name: 'Peelamedu',
    badge: 'Flagship',
    address: 'Avinashi Road, Peelamedu, Coimbatore - 641004',
    tagline: 'Our flagship screen in the heart of Coimbatore.',
    screens: [
      { name: 'Screen 1', type: 'IMAX' },
      { name: 'Screen 2', type: 'Dolby Atmos' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
  {
    id: 'avinashi',
    name: 'Avinashi',
    badge: 'Popular',
    address: 'Tiruppur Road, Avinashi - 641654',
    tagline: 'A favourite weekend spot for the Avinashi crowd.',
    screens: [
      { name: 'Screen 1', type: 'Dolby Atmos' },
      { name: 'Screen 2', type: 'Recliner' },
      { name: 'Screen 3', type: 'Standard' },
    ],
  },
  {
    id: 'perunthurai',
    name: 'Perunthurai',
    badge: 'Newest',
    address: 'Erode Main Road, Perunthurai - 638052',
    tagline: 'Our newest screens, with 4DX motion seating.',
    screens: [
      { name: 'Screen 1', type: 'IMAX' },
      { name: 'Screen 2', type: '4DX' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
  {
    id: 'narasimmanayakampalayam',
    name: 'Narasimmanayakampalayam',
    badge: 'Neighbourhood',
    address: 'Sulur Road, Narasimmanayakampalayam, Coimbatore - 641659',
    tagline: 'A cozy neighbourhood cinema close to home.',
    screens: [
      { name: 'Screen 1', type: 'Dolby Atmos' },
      { name: 'Screen 2', type: 'Standard' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
  {
    id: 'kolappalur',
    name: 'Kolappalur',
    badge: 'Riverside',
    address: 'Kolappalur Main Road, Perundurai - 638057',
    tagline: 'Easygoing screens off the highway.',
    screens: [
      { name: 'Screen 1', type: 'Standard' },
      { name: 'Screen 2', type: 'Recliner' },
      { name: 'Screen 3', type: 'Dolby Atmos' },
    ],
  },
  {
    id: 'siruvalur',
    name: 'Siruvalur',
    badge: 'Family',
    address: 'Siruvalur, Erode District - 638107',
    tagline: 'Family-friendly shows and snack-side seating.',
    screens: [
      { name: 'Screen 1', type: 'IMAX' },
      { name: 'Screen 2', type: 'Standard' },
      { name: 'Screen 3', type: 'Recliner' },
    ],
  },
]

export const getBranchById = (id) => branches.find((b) => b.id === id)
