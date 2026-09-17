const pex = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`

const apple = (id) =>
  `https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/${id}?wid=800&hei=800&fmt=jpeg&qlt=90`

const shots = (...ids) => {
  const urls = ids.filter(Boolean).map(apple)
  if (!urls.length) return []
  while (urls.length < 3) urls.push(urls[0])
  return urls.slice(0, 3)
}

const iphonePro = (finish, size = '6-3inch') => [
  apple(`iphone-16-pro-finish-select-202409-${size}-${finish}`),
  apple(`iphone-16-pro-finish-select-202409-${size}-${finish}_AV1`),
  apple(`iphone-16-pro-finish-select-202409-${size}-${finish}_AV2`),
]

const iphone15ProBlue = [
  apple('iphone-15-pro-finish-select-202309-6-1inch-bluetitanium'),
  apple('iphone-15-pro-finish-select-202309-6-1inch-bluetitanium_AV1'),
  apple('iphone-15-pro-finish-select-202309-6-1inch-bluetitanium_AV2'),
]

const iphone = (finish) => [
  apple(`iphone-16-finish-select-202409-6-1inch-${finish}`),
  apple(`iphone-16-finish-select-202409-6-1inch-${finish}_AV1`),
  apple(`iphone-16-finish-select-202409-6-1inch-${finish}_AV2`),
]

const ipadPro = (size, finish) =>
  shots(
    `ipad-pro-${size}-select-wifi-${finish}-202405`,
    'ipad-pro-finish-unselect-gallery-1-202405',
    'ipad-pro-finish-unselect-gallery-2-202405',
  )

const ipadAir = (finish) =>
  shots(
    `ipad-air-select-wifi-${finish}-202203`,
    'ipad-air-finish-unselect-gallery-1-202405',
    'ipad-air-finish-unselect-gallery-2-202405',
  )

const ipadMini = (finish) =>
  shots(
    `ipad-mini-select-wifi-${finish}-202410`,
    'ipad-mini-finish-unselect-gallery-1-202410',
    'ipad-mini-finish-unselect-gallery-2-202410',
  )

const macbookPro = (size, finish) =>
  shots(`mbp${size}-${finish}-select-202410`, 'macbook-pro-og-202410')

const macbookAir = (size, finish) =>
  shots(`mba${size}-${finish}-select-202503`, 'macbook-air-og-202503')

const imac = (finish) =>
  shots(
    `imac-24-${finish}-selection-hero-202310`,
    'imac-digitalmat-gallery-1-202410',
    'imac-digitalmat-gallery-2-202410',
  )

const watchUltra = (finish) =>
  shots(
    `watch-case-49-titanium-${finish}-ultra2_VW_34FR`,
    'watch-ultra2-digitalmat-gallery-1-202409',
    'watch-ultra2-digitalmat-gallery-2-202409',
  )

const watchS10 = (finish) =>
  shots(
    `watch-case-46-aluminum-${finish}-nc-s10_VW_34FR`,
    `watch-case-42-aluminum-${finish}-nc-s10_VW_34FR`,
    'watch-s10-digitalmat-gallery-1-202409',
  )

const watchSE = (finish) =>
  shots(
    `watch-case-44-aluminum-${finish}-nc-se_VW_34FR`,
    `watch-case-40-aluminum-${finish}-nc-se_VW_34FR`,
    'watch-se-digitalmat-gallery-1-202309',
  )

const airpodsPro = () =>
  shots('airpods-pro-2-hero-select-202409', 'airpods-pro-2-hero-select-202409_FV1', 'MQD83')

const airpods4 = () =>
  shots('airpods-4-hero-select-202409', 'airpods-4-hero-select-202409_FV1', 'airpods-4-anc-select-202409')

const airpodsMax = (finish) =>
  shots(
    `airpods-max-select-202409-${finish}`,
    `airpods-max-select-202409-${finish}_FV1`,
    'airpods-max-hero-select-202409',
  )

export const categories = [
  {
    slug: 'iphone',
    name: 'iPhone',
    headline: 'iPhone',
    tagline: 'Designed to be loved.',
    description:
      'The most advanced iPhone lineup, with stunning displays, cinematic cameras, and Apple Intelligence.',
    theme: 'dark',
    image: pex(788946),
  },
  {
    slug: 'ipad',
    name: 'iPad',
    headline: 'iPad',
    tagline: 'Touch, draw, and type. In a whole new way.',
    description:
      'Powerful, portable, and endlessly versatile — the iPad family for every kind of creativity.',
    theme: 'light',
    image: pex(1334597),
  },
  {
    slug: 'mac',
    name: 'Mac',
    headline: 'MacBook / Mac',
    tagline: 'If you can dream it, Mac can do it.',
    description:
      'Supercharged by Apple silicon. MacBook, iMac, and more — built for work, play, and everything in between.',
    theme: 'light',
    image: pex(18105),
  },
  {
    slug: 'watch',
    name: 'Apple Watch',
    navLabel: 'Watch',
    headline: 'Apple Watch',
    tagline: 'The ultimate device for a healthy life.',
    description:
      'Advanced health insights, fitness tracking, and a design that never sits still.',
    theme: 'dark',
    image: pex(437037),
  },
  {
    slug: 'airpods',
    name: 'AirPods',
    headline: 'AirPods',
    tagline: 'A magical connection to your devices.',
    description:
      'Immersive sound, Adaptive Audio, and effortless pairing across the Apple ecosystem.',
    theme: 'light',
    image: pex(3780681),
  },
]

export const products = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    tagline: 'The ultimate iPhone.',
    category: 'iphone',
    price: 1199,
    isNew: true,
    featured: true,
    images: iphonePro('deserttitanium', '6-9inch'),
    colors: [
      { name: 'Cosmic Orange', hex: '#C45A2A', images: iphonePro('deserttitanium', '6-9inch') },
      { name: 'Deep Blue', hex: '#2B4C7E', images: iphone15ProBlue },
      { name: 'Silver', hex: '#D8D8D4', images: iphonePro('whitetitanium', '6-9inch') },
      { name: 'Natural Titanium', hex: '#C8C2B4', images: iphonePro('naturaltitanium', '6-9inch') },
    ],
    storage: [
      { size: '256GB', price: 1199 },
      { size: '512GB', price: 1399 },
      { size: '1TB', price: 1599 },
      { size: '2TB', price: 1799 },
    ],
    specs: [
      { label: 'Display', value: '6.9" Super Retina XDR' },
      { label: 'Chip', value: 'A19 Pro' },
      { label: 'Camera', value: '48MP Fusion Pro system' },
      { label: 'Battery', value: 'Up to 33 hours video' },
      { label: 'Material', value: 'Titanium frame' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'iPhone 17 Pro Max introduces a refined titanium design, a groundbreaking camera system, and A19 Pro — the most powerful chip ever in a smartphone.',
  },
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    tagline: 'Titanium. So Pro.',
    category: 'iphone',
    price: 999,
    isNew: true,
    featured: true,
    images: iphonePro('deserttitanium'),
    colors: [
      { name: 'Cosmic Orange', hex: '#C45A2A', images: iphonePro('deserttitanium') },
      { name: 'Deep Blue', hex: '#2B4C7E', images: iphone15ProBlue },
      { name: 'Silver', hex: '#D8D8D4', images: iphonePro('whitetitanium') },
      { name: 'Natural Titanium', hex: '#C8C2B4', images: iphonePro('naturaltitanium') },
    ],
    storage: [
      { size: '256GB', price: 999 },
      { size: '512GB', price: 1199 },
      { size: '1TB', price: 1399 },
    ],
    specs: [
      { label: 'Display', value: '6.3" Super Retina XDR' },
      { label: 'Chip', value: 'A19 Pro' },
      { label: 'Camera', value: '48MP Fusion Pro system' },
      { label: 'Battery', value: 'Up to 29 hours video' },
      { label: 'Material', value: 'Titanium frame' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'A remarkably light Pro iPhone with a stunning camera system, A19 Pro performance, and a display that makes everything look cinematic.',
  },
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    tagline: 'A total power move.',
    category: 'iphone',
    price: 799,
    isNew: true,
    featured: false,
    images: iphone('ultramarine'),
    colors: [
      { name: 'Lavender', hex: '#C9B8D9', images: iphone('pink') },
      { name: 'Sage', hex: '#A8C3B0', images: iphone('teal') },
      { name: 'Mist Blue', hex: '#A9C4D8', images: iphone('ultramarine') },
      { name: 'White', hex: '#F2F2F2', images: iphone('white') },
      { name: 'Black', hex: '#1C1C1E', images: iphone('black') },
    ],
    storage: [
      { size: '128GB', price: 799 },
      { size: '256GB', price: 899 },
      { size: '512GB', price: 1099 },
    ],
    specs: [
      { label: 'Display', value: '6.3" Super Retina XDR' },
      { label: 'Chip', value: 'A19' },
      { label: 'Camera', value: '48MP Fusion camera' },
      { label: 'Battery', value: 'Up to 27 hours video' },
      { label: 'Ceramic Shield', value: 'Latest generation' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'iPhone 17 brings a gorgeous new design, a powerful A19 chip, and a 48MP camera that captures stunning detail in any light.',
  },
  {
    id: 'iphone-17-air',
    name: 'iPhone 17 Air',
    tagline: 'The thinnest iPhone ever.',
    category: 'iphone',
    price: 899,
    isNew: true,
    featured: false,
    images: iphone('ultramarine'),
    colors: [
      { name: 'Sky Blue', hex: '#8FB8D4', images: iphone('ultramarine') },
      { name: 'Light Gold', hex: '#E6D5B8', images: iphonePro('deserttitanium') },
      { name: 'Cloud White', hex: '#F4F4F0', images: iphone('white') },
      { name: 'Space Black', hex: '#2C2C2E', images: iphone('black') },
    ],
    storage: [
      { size: '256GB', price: 899 },
      { size: '512GB', price: 1099 },
      { size: '1TB', price: 1299 },
    ],
    specs: [
      { label: 'Display', value: '6.6" Super Retina XDR' },
      { label: 'Chip', value: 'A19' },
      { label: 'Thickness', value: '5.6 mm' },
      { label: 'Camera', value: '48MP Fusion camera' },
      { label: 'Weight', value: '146 grams' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'Impossibly thin. Surprisingly capable. iPhone 17 Air redefines how an iPhone can feel in your hand — without compromise.',
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    tagline: 'Built for Apple Intelligence.',
    category: 'iphone',
    price: 699,
    isNew: false,
    featured: false,
    images: iphone('ultramarine'),
    colors: [
      { name: 'Ultramarine', hex: '#4A62C0', images: iphone('ultramarine') },
      { name: 'Teal', hex: '#4E8B86', images: iphone('teal') },
      { name: 'Pink', hex: '#E8B4C4', images: iphone('pink') },
      { name: 'White', hex: '#F2F2F2', images: iphone('white') },
      { name: 'Black', hex: '#1C1C1E', images: iphone('black') },
    ],
    storage: [
      { size: '128GB', price: 699 },
      { size: '256GB', price: 799 },
      { size: '512GB', price: 999 },
    ],
    specs: [
      { label: 'Display', value: '6.1" Super Retina XDR' },
      { label: 'Chip', value: 'A18' },
      { label: 'Camera', value: '48MP Fusion camera' },
      { label: 'Battery', value: 'Up to 22 hours video' },
      { label: 'Camera Control', value: 'Yes' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'A brilliant all-around iPhone with Camera Control, a powerful A18 chip, and the intelligence features you use every day.',
  },
  {
    id: 'ipad-pro-13',
    name: 'iPad Pro 13"',
    tagline: 'The thinnest Apple product ever.',
    category: 'ipad',
    price: 1299,
    isNew: true,
    featured: true,
    images: ipadPro('13', 'spaceblack'),
    colors: [
      { name: 'Space Black', hex: '#2C2C2E', images: ipadPro('13', 'spaceblack') },
      { name: 'Silver', hex: '#E3E4E6', images: ipadPro('13', 'silver') },
    ],
    storage: [
      { size: '256GB', price: 1299 },
      { size: '512GB', price: 1499 },
      { size: '1TB', price: 1899 },
      { size: '2TB', price: 2299 },
    ],
    specs: [
      { label: 'Display', value: '13" Ultra Retina XDR' },
      { label: 'Chip', value: 'M4' },
      { label: 'Camera', value: '12MP Wide + LiDAR' },
      { label: 'Thickness', value: '5.1 mm' },
      { label: 'Apple Pencil Pro', value: 'Compatible' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'Impossibly thin, unbelievably powerful. The 13-inch iPad Pro with M4 and Ultra Retina XDR is a professional studio you can hold.',
  },
  {
    id: 'ipad-pro-11',
    name: 'iPad Pro 11"',
    tagline: 'Thinpossible.',
    category: 'ipad',
    price: 999,
    isNew: true,
    featured: false,
    images: ipadPro('11', 'spaceblack'),
    colors: [
      { name: 'Space Black', hex: '#2C2C2E', images: ipadPro('11', 'spaceblack') },
      { name: 'Silver', hex: '#E3E4E6', images: ipadPro('11', 'silver') },
    ],
    storage: [
      { size: '256GB', price: 999 },
      { size: '512GB', price: 1199 },
      { size: '1TB', price: 1599 },
    ],
    specs: [
      { label: 'Display', value: '11" Ultra Retina XDR' },
      { label: 'Chip', value: 'M4' },
      { label: 'Camera', value: '12MP Wide + LiDAR' },
      { label: 'Thickness', value: '5.3 mm' },
      { label: 'Apple Pencil Pro', value: 'Compatible' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'All the power of M4 in a perfectly portable 11-inch design. Draw, edit, and create with pro-level precision.',
  },
  {
    id: 'ipad-air-13',
    name: 'iPad Air 13"',
    tagline: 'Fresh air.',
    category: 'ipad',
    price: 799,
    isNew: false,
    featured: false,
    images: ipadAir('blue'),
    colors: [
      { name: 'Blue', hex: '#7FA4C4', images: ipadAir('blue') },
      { name: 'Purple', hex: '#A89BB8', images: ipadAir('purple') },
      { name: 'Starlight', hex: '#E8DCC8', images: ipadAir('starlight') },
      { name: 'Space Gray', hex: '#6E6E73', images: ipadAir('spacegray') },
    ],
    storage: [
      { size: '128GB', price: 799 },
      { size: '256GB', price: 899 },
      { size: '512GB', price: 1099 },
      { size: '1TB', price: 1299 },
    ],
    specs: [
      { label: 'Display', value: '13" Liquid Retina' },
      { label: 'Chip', value: 'M3' },
      { label: 'Camera', value: '12MP Wide' },
      { label: 'Apple Pencil Pro', value: 'Compatible' },
      { label: 'Magic Keyboard', value: 'Compatible' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'Two sizes. Four colors. Endless capability. iPad Air with M3 is a joy to use for work, class, and creative projects.',
  },
  {
    id: 'ipad-air-11',
    name: 'iPad Air 11"',
    tagline: 'Light. Bright. Full of life.',
    category: 'ipad',
    price: 599,
    isNew: false,
    featured: false,
    images: ipadAir('blue'),
    colors: [
      { name: 'Blue', hex: '#7FA4C4', images: ipadAir('blue') },
      { name: 'Purple', hex: '#A89BB8', images: ipadAir('purple') },
      { name: 'Starlight', hex: '#E8DCC8', images: ipadAir('starlight') },
      { name: 'Space Gray', hex: '#6E6E73', images: ipadAir('spacegray') },
    ],
    storage: [
      { size: '128GB', price: 599 },
      { size: '256GB', price: 699 },
      { size: '512GB', price: 899 },
    ],
    specs: [
      { label: 'Display', value: '11" Liquid Retina' },
      { label: 'Chip', value: 'M3' },
      { label: 'Camera', value: '12MP Wide' },
      { label: 'Apple Pencil Pro', value: 'Compatible' },
      { label: 'Weight', value: '462 grams' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'The 11-inch iPad Air packs M3 performance into a colorfully portable design you can take anywhere.',
  },
  {
    id: 'ipad-mini',
    name: 'iPad mini',
    tagline: 'Mega power. Mini sized.',
    category: 'ipad',
    price: 499,
    isNew: false,
    featured: false,
    images: ipadMini('blue'),
    colors: [
      { name: 'Blue', hex: '#6B90C4', images: ipadMini('blue') },
      { name: 'Purple', hex: '#9B8BB0', images: ipadMini('purple') },
      { name: 'Starlight', hex: '#E8DCC8', images: ipadMini('starlight') },
      { name: 'Space Gray', hex: '#6E6E73', images: ipadMini('spacegray') },
    ],
    storage: [
      { size: '128GB', price: 499 },
      { size: '256GB', price: 599 },
      { size: '512GB', price: 799 },
    ],
    specs: [
      { label: 'Display', value: '8.3" Liquid Retina' },
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Camera', value: '12MP Wide' },
      { label: 'Apple Pencil Pro', value: 'Compatible' },
      { label: 'Size', value: 'Fits in one hand' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'The full iPad experience in the most portable size — with A17 Pro, Apple Pencil Pro, and a stunning Liquid Retina display.',
  },
  {
    id: 'macbook-pro-16',
    name: 'MacBook Pro 16"',
    tagline: 'Mind-blowing. Head-turning.',
    category: 'mac',
    price: 2499,
    isNew: true,
    featured: true,
    images: macbookPro('16', 'spaceblack'),
    colors: [
      { name: 'Space Black', hex: '#2C2C2E', images: macbookPro('16', 'spaceblack') },
      { name: 'Silver', hex: '#E3E4E6', images: macbookPro('16', 'silver') },
    ],
    storage: [
      { size: '512GB', price: 2499 },
      { size: '1TB', price: 2699 },
      { size: '2TB', price: 3099 },
      { size: '4TB', price: 3899 },
    ],
    specs: [
      { label: 'Display', value: '16.2" Liquid Retina XDR' },
      { label: 'Chip', value: 'M4 Pro / M4 Max' },
      { label: 'Memory', value: 'Up to 128GB unified' },
      { label: 'Battery', value: 'Up to 24 hours' },
      { label: 'Ports', value: 'Thunderbolt 5, HDMI, SD' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'The most advanced MacBook Pro ever, with M4 Pro and M4 Max, a breathtaking XDR display, and all-day battery life for pros.',
  },
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14"',
    tagline: 'Pro to the core.',
    category: 'mac',
    price: 1599,
    isNew: true,
    featured: false,
    images: macbookPro('14', 'spaceblack'),
    colors: [
      { name: 'Space Black', hex: '#2C2C2E', images: macbookPro('14', 'spaceblack') },
      { name: 'Silver', hex: '#E3E4E6', images: macbookPro('14', 'silver') },
    ],
    storage: [
      { size: '512GB', price: 1599 },
      { size: '1TB', price: 1799 },
      { size: '2TB', price: 2199 },
    ],
    specs: [
      { label: 'Display', value: '14.2" Liquid Retina XDR' },
      { label: 'Chip', value: 'M4 / M4 Pro / M4 Max' },
      { label: 'Memory', value: 'Up to 128GB unified' },
      { label: 'Battery', value: 'Up to 24 hours' },
      { label: 'Weight', value: '3.4 pounds' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'A compact powerhouse with a stunning Liquid Retina XDR display and the flexibility of M4, M4 Pro, or M4 Max.',
  },
  {
    id: 'macbook-air-15',
    name: 'MacBook Air 15"',
    tagline: 'Lean. Mean. M4 machine.',
    category: 'mac',
    price: 1299,
    isNew: true,
    featured: false,
    images: macbookAir('15', 'skyblue'),
    colors: [
      { name: 'Sky Blue', hex: '#8FB8D4', images: macbookAir('15', 'skyblue') },
      { name: 'Starlight', hex: '#E8DCC8', images: macbookAir('15', 'starlight') },
      { name: 'Silver', hex: '#E3E4E6', images: macbookAir('15', 'silver') },
      { name: 'Midnight', hex: '#1C1C1E', images: macbookAir('15', 'midnight') },
    ],
    storage: [
      { size: '256GB', price: 1299 },
      { size: '512GB', price: 1499 },
      { size: '1TB', price: 1699 },
      { size: '2TB', price: 2099 },
    ],
    specs: [
      { label: 'Display', value: '15.3" Liquid Retina' },
      { label: 'Chip', value: 'M4' },
      { label: 'Memory', value: 'Up to 32GB unified' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Weight', value: '3.3 pounds' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'The world’s most popular laptop in a spacious 15-inch design — silent, fanless, and supercharged by M4.',
  },
  {
    id: 'macbook-air-13',
    name: 'MacBook Air 13"',
    tagline: 'Sky high performance. Down to earth.',
    category: 'mac',
    price: 999,
    isNew: true,
    featured: false,
    images: macbookAir('13', 'skyblue'),
    colors: [
      { name: 'Sky Blue', hex: '#8FB8D4', images: macbookAir('13', 'skyblue') },
      { name: 'Starlight', hex: '#E8DCC8', images: macbookAir('13', 'starlight') },
      { name: 'Silver', hex: '#E3E4E6', images: macbookAir('13', 'silver') },
      { name: 'Midnight', hex: '#1C1C1E', images: macbookAir('13', 'midnight') },
    ],
    storage: [
      { size: '256GB', price: 999 },
      { size: '512GB', price: 1199 },
      { size: '1TB', price: 1399 },
    ],
    specs: [
      { label: 'Display', value: '13.6" Liquid Retina' },
      { label: 'Chip', value: 'M4' },
      { label: 'Memory', value: 'Up to 32GB unified' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Weight', value: '2.7 pounds' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'Strikingly thin and light, with M4 speed, a Liquid Retina display, and MagSafe charging — the everyday Mac that does it all.',
  },
  {
    id: 'imac-24',
    name: 'iMac',
    tagline: 'Ready. Set. Wow.',
    category: 'mac',
    price: 1299,
    isNew: false,
    featured: false,
    images: imac('blue'),
    colors: [
      { name: 'Blue', hex: '#5B8DB8', images: imac('blue') },
      { name: 'Green', hex: '#7FA98C', images: imac('green') },
      { name: 'Pink', hex: '#E8B4C4', images: imac('pink') },
      { name: 'Silver', hex: '#E3E4E6', images: imac('silver') },
      { name: 'Yellow', hex: '#E8D47A', images: imac('yellow') },
      { name: 'Orange', hex: '#E09A5A', images: imac('orange') },
      { name: 'Purple', hex: '#9B8BB0', images: imac('purple') },
    ],
    storage: [
      { size: '256GB', price: 1299 },
      { size: '512GB', price: 1499 },
      { size: '1TB', price: 1699 },
    ],
    specs: [
      { label: 'Display', value: '24" 4.5K Retina' },
      { label: 'Chip', value: 'M4' },
      { label: 'Camera', value: '12MP Center Stage' },
      { label: 'Audio', value: 'Six-speaker system' },
      { label: 'Colors', value: 'Seven vibrant finishes' },
      { label: 'Apple Intelligence', value: 'Yes' },
    ],
    description:
      'A stunning 24-inch canvas powered by M4, with a 12MP Center Stage camera and seven colorful finishes that light up any room.',
  },
  {
    id: 'watch-ultra-3',
    name: 'Apple Watch Ultra 3',
    tagline: 'New heights. New depths.',
    category: 'watch',
    price: 799,
    isNew: true,
    featured: true,
    images: watchUltra('natural'),
    colors: [
      { name: 'Natural Titanium', hex: '#C8C2B4', images: watchUltra('natural') },
      { name: 'Black Titanium', hex: '#3A3A3C', images: watchUltra('black') },
    ],
    storage: [
      { size: '49mm GPS + Cellular', price: 799 },
    ],
    specs: [
      { label: 'Display', value: '49mm Always-On Retina' },
      { label: 'Chip', value: 'S10 SiP' },
      { label: 'Battery', value: 'Up to 42 hours' },
      { label: 'Water resistance', value: '100m, EN13319' },
      { label: 'Precision Finding', value: 'Yes' },
      { label: 'Satellite', value: 'Emergency SOS' },
    ],
    description:
      'The most rugged, capable Apple Watch. Titanium, a brilliant display, and adventure-ready tools for athletes and explorers.',
  },
  {
    id: 'watch-series-11',
    name: 'Apple Watch Series 11',
    tagline: 'The ultimate sports watch.',
    category: 'watch',
    price: 399,
    isNew: true,
    featured: false,
    images: watchS10('jetblack'),
    colors: [
      { name: 'Jet Black', hex: '#1C1C1E', images: watchS10('jetblack') },
      { name: 'Rose Gold', hex: '#E8C4B8', images: watchS10('rosegold') },
      { name: 'Silver', hex: '#E3E4E6', images: watchS10('silver') },
    ],
    storage: [
      { size: '42mm GPS', price: 399 },
      { size: '42mm GPS + Cellular', price: 499 },
      { size: '46mm GPS', price: 429 },
      { size: '46mm GPS + Cellular', price: 529 },
    ],
    specs: [
      { label: 'Display', value: 'Always-On Retina' },
      { label: 'Chip', value: 'S10 SiP' },
      { label: 'Health', value: 'Sleep, heart, Vitals' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Fast charge', value: 'Yes' },
      { label: 'watchOS', value: 'Latest' },
    ],
    description:
      'Advanced health insights, a brighter display, and the most comprehensive fitness experience — on your wrist all day.',
  },
  {
    id: 'watch-se',
    name: 'Apple Watch SE',
    tagline: 'A great deal to love.',
    category: 'watch',
    price: 249,
    isNew: false,
    featured: false,
    images: watchSE('midnight'),
    colors: [
      { name: 'Midnight', hex: '#1C1C1E', images: watchSE('midnight') },
      { name: 'Starlight', hex: '#E8DCC8', images: watchSE('starlight') },
      { name: 'Silver', hex: '#E3E4E6', images: watchSE('silver') },
    ],
    storage: [
      { size: '40mm GPS', price: 249 },
      { size: '44mm GPS', price: 279 },
      { size: '40mm GPS + Cellular', price: 299 },
      { size: '44mm GPS + Cellular', price: 329 },
    ],
    specs: [
      { label: 'Display', value: 'Retina LTPO OLED' },
      { label: 'Chip', value: 'S8 SiP' },
      { label: 'Crash Detection', value: 'Yes' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Activity rings', value: 'Yes' },
      { label: 'Family Setup', value: 'Yes' },
    ],
    description:
      'All the essentials that make Apple Watch distinctive — activity tracking, safety features, and a familiar, beloved design.',
  },
  {
    id: 'airpods-pro-3',
    name: 'AirPods Pro 3',
    tagline: 'The world’s best in-ear Active Noise Cancellation.',
    category: 'airpods',
    price: 249,
    isNew: true,
    featured: true,
    images: airpodsPro(),
    colors: [{ name: 'White', hex: '#F5F5F7', images: airpodsPro() }],
    storage: [{ size: 'USB-C Case', price: 249 }],
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'ANC', value: 'Up to 2x previous gen' },
      { label: 'Audio', value: 'Adaptive Audio' },
      { label: 'Hearing', value: 'Hearing Aid feature' },
      { label: 'Battery', value: 'Up to 30 hours with case' },
      { label: 'Sweat & water', value: 'IP54' },
    ],
    description:
      'Immersive sound with Adaptive Audio, Conversation Awareness, and Personalized Spatial Audio. Intelligence that lives in your ears.',
  },
  {
    id: 'airpods-4',
    name: 'AirPods 4',
    tagline: 'Iconic. Now supersonic.',
    category: 'airpods',
    price: 129,
    isNew: true,
    featured: false,
    images: airpods4(),
    colors: [{ name: 'White', hex: '#F5F5F7', images: airpods4() }],
    storage: [
      { size: 'Standard', price: 129 },
      { size: 'Active Noise Cancellation', price: 179 },
    ],
    specs: [
      { label: 'Chip', value: 'H2' },
      { label: 'Fit', value: 'Open-ear design' },
      { label: 'ANC', value: 'Optional model' },
      { label: 'Audio', value: 'Personalized Spatial Audio' },
      { label: 'Battery', value: 'Up to 30 hours with case' },
      { label: 'USB-C', value: 'Yes' },
    ],
    description:
      'A refined open-ear design with richer audio, better call quality, and an optional Active Noise Cancellation model.',
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    tagline: 'Sound. Elevated.',
    category: 'airpods',
    price: 549,
    isNew: false,
    featured: false,
    images: airpodsMax('midnight'),
    colors: [
      { name: 'Midnight', hex: '#1C1C1E', images: airpodsMax('midnight') },
      { name: 'Starlight', hex: '#E8DCC8', images: airpodsMax('starlight') },
      { name: 'Blue', hex: '#5B8DB8', images: airpodsMax('blue') },
      { name: 'Purple', hex: '#9B8BB0', images: airpodsMax('purple') },
      { name: 'Orange', hex: '#E09A5A', images: airpodsMax('orange') },
    ],
    storage: [{ size: 'USB-C', price: 549 }],
    specs: [
      { label: 'Drivers', value: 'Apple-designed dynamic' },
      { label: 'ANC', value: 'Computational audio' },
      { label: 'Audio', value: 'Personalized Spatial Audio' },
      { label: 'Chip', value: 'H1 (each cup)' },
      { label: 'Battery', value: 'Up to 20 hours' },
      { label: 'Case', value: 'Smart Case included' },
    ],
    description:
      'Over-ear headphones that combine high-fidelity audio, Active Noise Cancellation, and a breathtaking aluminum design.',
  },
]

export const getProductById = (id) => products.find((p) => p.id === id)

export const getProductsByCategory = (slug) =>
  products.filter((p) => p.category === slug)

export const getFeaturedProducts = () => products.filter((p) => p.featured)

export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit)

export const searchProducts = (query) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q),
  )
}

export const getCategory = (slug) => categories.find((c) => c.slug === slug)

export const getColor = (product, colorName) =>
  product.colors.find((c) => c.name === colorName) || product.colors[0]

export const getProductPhotos = (product, colorName) => {
  const color = colorName ? getColor(product, colorName) : product.colors?.[0]
  if (color?.images?.length) return color.images
  if (product?.images?.length) return product.images
  return []
}

export const getProductViews = () => [
  { id: 'front', label: 'Front' },
  { id: 'angle', label: 'Side' },
  { id: 'back', label: 'Back' },
]

export const getOptionLabel = (product) => {
  if (product.category === 'watch') return 'Size'
  if (product.category === 'airpods') return 'Option'
  return 'Storage'
}

export const getProductMeta = (product) => {
  const boxes = {
    iphone: ['iPhone', 'USB-C Charge Cable', 'Documentation'],
    ipad: ['iPad', 'USB-C Charge Cable', 'Documentation'],
    mac: ['Mac', 'USB-C Power Adapter', 'USB-C Charge Cable'],
    watch: ['Apple Watch', 'Sport Band', 'Magnetic Fast Charger'],
    airpods: ['AirPods', 'Charging Case', 'Documentation'],
  }
  return {
    sku: `HN/${product.id.replace(/-/g, '').slice(0, 8).toUpperCase()}A`,
    rating: 4.6 + ((product.name.length % 4) + 1) / 10,
    reviews: 320 + product.name.length * 47,
    stock: product.isNew ? 12 : 48,
    warranty: '1 Year Limited Warranty',
    origin: 'Designed by Apple in California',
    box: boxes[product.category] || boxes.iphone,
    delivery: 'Free delivery. Get it by',
  }
}
