# Layout 01 Component

## Purpose & Overview

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

## File Structure & Paths

The registry will generate the following files:

```
src/components/refine-ui/
├── layout/
│   ├── layout.tsx       # Main Layout component
│   ├── header.tsx       # Header sub-component
│   ├── sidebar.tsx      # Sidebar sub-component
│   ├── theme-provider.tsx # (from theme-provider dependency)
│   ├── theme-toggle.tsx   # (from theme-provider dependency)
│   ├── user-avatar.tsx  # UserAvatar sub-component for sidebar/header
│   └── user-info.tsx    # UserInfo sub-component for sidebar/header
└── ... (other registry components)
```

## Usage

Integrate the `Layout` component into your Refine application's routing structure, typically wrapping authenticated routes.

```tsx
import { Refine } from "@refinedev/core";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

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

## Components & Props

### Main `Layout` Component

Wraps the entire authenticated part of your application. It utilizes `SidebarProvider` and `ThemeProvider` internally.

| Prop       | Type        | Default | Description                               |
| ---------- | ----------- | ------- | ----------------------------------------- |
| `children` | `ReactNode` | -       | The content of the current page (Outlet). |

### `Header` Component (Sub-component)

Displayed at the top of the layout. Contains a trigger to toggle the sidebar and a theme toggle button.

- No direct props are typically needed; it consumes context from `SidebarProvider` and `ThemeProvider`.

### `Sidebar` Component (Sub-component)

Displays navigation links, user information, and other relevant sidebar content. It is highly customizable through its own props and by modifying its internal structure.

- **Key Functionality:**
  - Responsive: Collapses on smaller screens, expandable on larger screens.
  - Navigation: Uses Refine's `useMenu` hook to generate navigation items based on your defined resources.
  - User Info: Displays user avatar and name/email using `useGetIdentity`.
  - Theme Toggle: Integrated within the `Header`.

For detailed props of `Sidebar`, `Header`, `UserAvatar`, `UserInfo`, `ThemeProvider`, and `ThemeToggle`, please refer to their respective individual documentation or source code if not yet documented.

## Features

- **Responsive Design**: Adapts to different screen sizes, with a collapsible sidebar.
- **Integrated Navigation**: Automatically generates sidebar navigation from Refine resources.
- **Theme Support**: Includes a theme provider and toggle for light/dark mode, powered by the `theme-provider` registry component.
- **User Identity**: Displays user avatar and information in the sidebar.
- **Context Providers**: Manages sidebar state (`SidebarProvider`) and theme state (`ThemeProvider`).

## Customization

- **Sidebar Content**: Modify `src/components/refine-ui/layout/sidebar.tsx` to change navigation links, add custom sections, or adjust user information display.
- **Header Content**: Modify `src/components/refine-ui/layout/header.tsx` to add custom elements or change the theme toggle's position.
- **Styling**: Use Tailwind CSS utility classes directly in the component files or override default styles in your global CSS.
- **Theme**: Customize light/dark mode variables via the `ThemeProvider` and your Tailwind configuration as per shadcn/ui theming docs.
