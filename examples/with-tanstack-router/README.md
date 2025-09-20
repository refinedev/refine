# Refine with TanStack Router Example

This example demonstrates how to use **Refine** with **TanStack Router** for modern, type-safe routing.

## About

This project showcases the integration between Refine and TanStack Router, highlighting:

- Type-safe routing with TanStack Router
- Built-in data fetching and caching
- Advanced search parameter handling
- Modern routing patterns with Refine

## Features

- ✅ **Type Safety**: Full TypeScript support with route-level type safety
- ✅ **Performance**: Optimized routing with built-in caching and preloading
- ✅ **Modern DX**: Advanced developer experience with TanStack Router's tooling
- ✅ **Search Params**: Advanced search parameter management with validation
- ✅ **Data Fetching**: Integrated data loading with automatic caching

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── posts/
│       ├── list.tsx      # Posts list component
│       ├── create.tsx    # Post creation component
│       ├── edit.tsx      # Post editing component
│       └── show.tsx      # Post detail component
├── routes/
│   ├── __root.tsx        # Root route component
│   ├── index.tsx         # Home page route
│   └── posts/
│       ├── index.tsx     # Posts list route
│       ├── create.tsx    # Post creation route
│       ├── $id.edit.tsx  # Post editing route
│       └── $id.show.tsx  # Post detail route
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Key Concepts

### Router Configuration

The router is configured using TanStack Router's file-based routing system. Each route file automatically generates the appropriate route configuration.

### Refine Integration

Refine is configured to use the TanStack Router bindings:

```tsx
import { Refine } from "@refinedev/core";
import routerBindings from "@refinedev/tanstack-router";

<Refine
  routerProvider={routerBindings}
  // ... other props
/>;
```

### Type Safety

TanStack Router provides full type safety for routes and parameters:

```tsx
// Automatically typed based on route definition
const { id } = useParams({ from: "/posts/$id/edit" });
```

## Learn More

- [Refine Documentation](https://refine.dev/docs)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Refine TanStack Router Integration](https://refine.dev/docs/router-integrations/tanstack-router)
