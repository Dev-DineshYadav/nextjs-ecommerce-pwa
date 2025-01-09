# YouVet Assignment - Next.js E-commerce PWA

This project is a Progressive Web App (PWA) built with Next.js for an e-commerce platform. This document provides a comprehensive guide from installation to the usage of all files in the project.

## Table of Contents
1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [File Usage](#file-usage)
4. [Running the Project](#running-the-project)
5. [Building for Production](#building-for-production)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/nextjs-ecommerce-pwa.git
    cd nextjs-ecommerce-pwa
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

## Project Structure

The project structure is as follows:

```
nextjs-ecommerce-pwa/
├── components/
│   ├── InstallPrompt.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.js
│   └── ...
├── context/
│   ├── CartContext.tsx
│   └── ...
├── pages/
│   ├── products/
│   │   └── [id].tsx
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── styles/
│   ├── globals.css
│   └── ...
├── types/
│   ├── next-pwa.d.ts
│   └── product.ts
├── utils/
│   ├── api.ts
│   └── cart.ts
├── next.config.js
├── package.json
├── README.md
```

## File Usage

### `components/`
Contains reusable React components used throughout the project.

- `InstallPrompt.tsx`: Component to prompt users to install the PWA.
- `ProductCard.tsx`: A component to display individual product details.
- `SearchBar.js`: A component for the search functionality.

### `context/`
Contains React context files for state management.

- `CartContext.tsx`: Provides cart state and actions to the application.

### `pages/`
Contains the Next.js pages. Each file in this directory corresponds to a route in the application.

- `products/[id].tsx`: Dynamic route for individual product pages.
- `_app.js`: Custom App component to initialize pages.
- `_document.js`: Custom Document component to augment the application's HTML and body tags.
- `index.js`: The main landing page of the application.

### `styles/`
Contains global and component-specific styles.

- `globals.css`: Global CSS styles.

### `types/`
Contains TypeScript type definitions.

- `next-pwa.d.ts`: Type definitions for Next.js PWA.
- `product.ts`: Type definitions for product data.

### `utils/`
Contains utility functions and helpers used across the project.

- `api.ts`: Utility functions for API calls.
- `cart.ts`: Utility functions for cart operations.

### `next.config.js`
Configuration file for Next.js.

### `package.json`
Contains project metadata and dependencies.

### `README.md`
The documentation file you are currently reading.

## Running the Project

To run the project in development mode, use the following command:

```bash
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Building for Production

To build the project for production, use the following command:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory. To start the production server, use:

```bash
npm start
```

This will start the server on `http://localhost:3000`.
