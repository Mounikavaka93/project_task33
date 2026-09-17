# Apple Store — React E-Commerce

A premium, Apple-inspired e-commerce frontend built with **React**, **Vite**, and **Tailwind CSS**. Explore iPhone, iPad, Mac, Apple Watch, and AirPods with a polished shopping experience.

## Features

- Home hero, featured banners, and category tiles
- Dedicated category pages for iPhone, iPad, Mac, Watch, and AirPods
- Product listing cards with colors, pricing, wishlist, and add to cart
- Product details with image gallery, storage/color options, and specs
- Apple-style navigation, search overlay, and responsive mobile menu
- Shopping bag drawer, full cart page, quantity controls, and checkout UI
- Scroll reveal, hover, and page-load animations
- Cart and favorites persist in `localStorage`

## Tech stack

- React 19 + Vite
- Tailwind CSS 4
- React Router
- React Icons

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Deploy

This project is ready for **Vercel** or **Netlify**.

- **Vercel:** import the repo, framework preset Vite. `vercel.json` handles SPA routing.
- **Netlify:** connect the repo or run `netlify deploy --prod --dir=dist`. `netlify.toml` already sets the build command, publish directory, and redirects.

## Disclaimer

This is a demonstration storefront inspired by Apple design. It is not affiliated with Apple Inc. Product names and imagery are used for educational/demo purposes only.
