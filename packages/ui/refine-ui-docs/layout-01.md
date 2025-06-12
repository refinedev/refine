# Layout 01 Component

`Layout 01` provides a complete, responsive application layout system for Refine applications. It includes a collapsible sidebar, a fixed header, and a main content area. This layout integrates seamlessly with Refine's routing and authentication mechanisms.

**When to use:**

- As the main application shell for most Refine projects.
- When you need a standard dashboard layout with sidebar navigation and a header.
- To provide a consistent look and feel across all authenticated pages.

## Installation

Install the `layout-01` block via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/layout-01.json
```

This command will install the `Layout` component and its sub-components (`Header`, `Sidebar`), along with their dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `lucide-react`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `sidebar` (shadcn/ui component)
  - `avatar` (shadcn/ui component)
  - `button` (shadcn/ui component)
  - `separator` (shadcn/ui component)
  - `dropdown-menu` (shadcn/ui component)
  - `collapsible` (shadcn/ui component)
  - `theme-provider` (Refine UI component, installed via `https://ui.refine.dev/r/theme-provider.json`)

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies if they are not already in your project.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── layout/
│   ├── breadcrumb.tsx
│   ├── error-component.tsx
│   ├── layout.tsx
│   ├── loading-overlay.tsx
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── user-avatar.tsx
│   └── user-info.tsx
├── theme/
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── theme-select.tsx
└── ... (other registry components)
```

## Usage

Integrate the `Layout` component into your Refine application's routing structure, typically wrapping authenticated routes.

```tsx
import { Refine } from "@refinedev/core";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";

import { Layout } from "@/components/refine-ui/layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Refine
        resources={[
          {
            name: "posts",
            list: "/posts",
            show: "/posts/:id",
            edit: "/posts/:id",
            create: "/posts/create",
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/:id",
            edit: "/categories/:id",
            create: "/categories/create",
          },
        ]}
        // ... other Refine options
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/posts" element={<div>Post List Page</div>} />
            <Route path="/categories" element={<div>Category List Page</div>} />
          </Route>

          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}

export default App;
```
