# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
This is a training project for an online flower and gift shop built with **React** and [Vite](https://vitejs.dev/). It demonstrates a shopping cart, order form, product filtering and a small blog.
Currently, two official plugins are available:

## Features

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- View bouquets, toys and greeting cards
- Search and filter products by category and price range
- Add products to the cart and place orders
- Cart data stored via API
- "About Us" page with a map showing the shop location
- A small blog with useful articles
- 
## Getting Started

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Развёрнутая версия

[giftshop-react-adao.onrender.com](https://giftshop-react-adao.onrender.com)

### Production Build

```bash
npm run build
```
The compiled files will appear in the `dist` folder.

### Linting

```bash
npm run lint
```

## Project Structure

- `src/` – application source code
- `modules/` – UI components (product cards, cart, filter, etc.)
- `pages/` – site pages
- `redux/` – Redux store, slices and thunks
- `scss/` – SCSS styles
- `public/` – static files (icons, images)

## Technologies Used

- React 18
- Redux Toolkit
- React Router DOM
- React Leaflet
- Sass (SCSS)

The project can be used as a starting point for further development of an online shop.
