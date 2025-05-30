# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

# Currency Conversion Project

## Overview

This project is a currency conversion application built with React, TypeScript, and Vite. It uses Material-UI for styling, Axios for API requests, and React Query for state management.

---

## Features

- **Currency Conversion**: Fetch and display currency data from an external API.
- **Material-UI Integration**: Styled components with a custom theme.
- **React Query**: Efficient data fetching and caching.
- **Environment Variables**: Securely manage API keys and tokens.
- **Custom Hooks**: Modular and reusable logic for API calls.

---

## Project Structure

The project follows a modular structure for scalability and maintainability:

```
/src
├── app/                  # App-wide context and providers
│   └── App.tsx
├── components/           # Reusable UI components
│   └── lazy_load/        # Lazy loading utilities
├── features/             # Feature-specific modules
│   ├── api_client/       # API client context and services
│   └── dashboard/        # Dashboard feature
├── hooks/                # Custom React hooks
├── routing/              # Route definitions
├── styles/               # Global styles and themes
├── theme/                # Material-UI theme configuration
└── types/                # Global TypeScript types
```

---

## Getting Started

### 1. Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-repo/currency-conversion.git
cd currency-conversion
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_CURRENCYBEACON_API_KEY=your_currency_api_key
```

### 4. Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Scripts

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the development server with Vite.   |
| `npm run build`        | Build the project for production.         |
| `npm run preview`      | Preview the production build.             |
| `npm run lint`         | Run ESLint to check for code issues.      |
| `npm run format`       | Format the codebase using Prettier.       |
| `npm run format-check` | Check if the code is formatted correctly. |

---

## Key Technologies

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Vite**: Fast development server and build tool.
- **Material-UI**: Component library for styling.
- **React Query**: Data fetching and caching.
- **Axios**: HTTP client for API requests.

---

## Custom Hooks

### `useFetchCurrencies`

Fetches currency data from the API.

```tsx
const { currenciesList, isLoading } = useFetchCurrencies();
```

---

## Styling

The project uses Material-UI for styling with a custom theme. The theme is defined in `src/theme/theme.ts` and applied globally using `ThemeProvider`.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.
