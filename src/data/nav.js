import { getProductsByCategory, products } from './products'

const shopLinks = (slug) =>
  getProductsByCategory(slug).map((item) => ({
    label: item.name,
    to: `/product/${item.id}`,
    hint: item.isNew ? 'New' : undefined,
  }))

export const navMenus = [
  {
    to: '/',
    label: 'Store',
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'Shop the Latest', to: '/' },
          { label: 'Mac', to: '/mac' },
          { label: 'iPad', to: '/ipad' },
          { label: 'iPhone', to: '/iphone' },
          { label: 'Apple Watch', to: '/watch' },
          { label: 'AirPods', to: '/airpods' },
        ],
      },
      {
        title: 'Quick Links',
        links: [
          { label: 'Find a Store', to: '/' },
          { label: 'Order Status', to: '/orders' },
          { label: 'Favorites', to: '/wishlist' },
          { label: 'Bag', to: '/cart' },
        ],
      },
      {
        title: 'Shop Special Stores',
        links: [
          { label: 'Certified Refurbished', to: '/' },
          { label: 'Education', to: '/' },
          { label: 'Business', to: '/' },
        ],
      },
    ],
  },
  {
    to: '/mac',
    label: 'Mac',
    columns: [
      { title: 'Shop Mac', links: shopLinks('mac') },
      {
        title: 'Explore Mac',
        links: [
          { label: 'Explore All Mac', to: '/mac' },
          { label: 'MacBook Air', to: '/product/macbook-air-13' },
          { label: 'MacBook Pro', to: '/product/macbook-pro-16' },
          { label: 'iMac', to: '/product/imac-24' },
        ],
      },
      {
        title: 'More from Mac',
        links: [
          { label: 'Mac Support', to: '/mac' },
          { label: 'Compare Mac', to: '/mac' },
        ],
      },
    ],
  },
  {
    to: '/ipad',
    label: 'iPad',
    columns: [
      { title: 'Shop iPad', links: shopLinks('ipad') },
      {
        title: 'Explore iPad',
        links: [
          { label: 'Explore All iPad', to: '/ipad' },
          { label: 'iPad Pro', to: '/product/ipad-pro-13' },
          { label: 'iPad Air', to: '/product/ipad-air-13' },
          { label: 'iPad mini', to: '/product/ipad-mini' },
        ],
      },
      {
        title: 'More from iPad',
        links: [
          { label: 'Compare iPad', to: '/ipad' },
          { label: 'Why iPad', to: '/ipad' },
        ],
      },
    ],
  },
  {
    to: '/iphone',
    label: 'iPhone',
    columns: [
      { title: 'Shop iPhone', links: shopLinks('iphone') },
      {
        title: 'Explore iPhone',
        links: [
          { label: 'Explore All iPhone', to: '/iphone' },
          { label: 'iPhone 17 Pro', to: '/product/iphone-17-pro' },
          { label: 'iPhone 17', to: '/product/iphone-17' },
          { label: 'Compare iPhone', to: '/iphone' },
        ],
      },
      {
        title: 'More from iPhone',
        links: [
          { label: 'iOS Preview', to: '/iphone' },
          { label: 'Why iPhone', to: '/iphone' },
        ],
      },
    ],
  },
  {
    to: '/watch',
    label: 'Watch',
    columns: [
      { title: 'Shop Watch', links: shopLinks('watch') },
      {
        title: 'Explore Watch',
        links: [
          { label: 'Explore All Apple Watch', to: '/watch' },
          { label: 'Apple Watch Ultra', to: '/product/watch-ultra-3' },
          { label: 'Apple Watch Series', to: '/product/watch-series-11' },
          { label: 'Apple Watch SE', to: '/product/watch-se' },
        ],
      },
      {
        title: 'More from Watch',
        links: [
          { label: 'Compare Watch', to: '/watch' },
          { label: 'Why Apple Watch', to: '/watch' },
        ],
      },
    ],
  },
  {
    to: '/airpods',
    label: 'AirPods',
    columns: [
      { title: 'Shop AirPods', links: shopLinks('airpods') },
      {
        title: 'Explore AirPods',
        links: [
          { label: 'Explore All AirPods', to: '/airpods' },
          { label: 'AirPods Pro', to: '/product/airpods-pro-3' },
          { label: 'AirPods Max', to: '/product/airpods-max' },
        ],
      },
      {
        title: 'More from AirPods',
        links: [
          { label: 'Compare AirPods', to: '/airpods' },
          { label: 'Apple Music', to: '/airpods' },
        ],
      },
    ],
  },
]

export const featuredForNav = (slug) =>
  products.find((item) => item.category === slug && item.featured) ||
  products.find((item) => item.category === slug)
