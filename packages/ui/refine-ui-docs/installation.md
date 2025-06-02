# Refine UI Components Installation Guide

This guide shows you how to install Refine UI components using the shadcn/ui CLI.

## Prerequisites

Make sure you have shadcn/ui set up in your project. If not, follow the [shadcn/ui installation guide](https://ui.shadcn.com/docs/installation) first.

## Available Components

### 🔐 Authentication Forms

#### Sign In Form

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-in-form.json
```

**Installs:**

- `src/components/refine-ui/form/sign-in-form.tsx`
- `src/components/refine-ui/form/input-password.tsx`

**Description:** A Sign In Form component for Refine to use on the sign in page

**Dependencies:** `@refinedev/core`

#### Sign Up Form

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-up-form.json
```

**Installs:**

- `src/components/refine-ui/form/sign-up-form.tsx`
- `src/components/refine-ui/form/input-password.tsx`

**Description:** A Sign Up Form component for Refine to use on the registration page

**Dependencies:** `@refinedev/core`

#### Forgot Password Form

```bash
npx shadcn@latest add https://ui.refine.dev/r/forgot-password-form.json
```

**Installs:**

- `src/components/refine-ui/form/forgot-password-form.tsx`

**Description:** A Forgot Password Form component for Refine to use on the password reset page

**Dependencies:** `@refinedev/core`

### 📱 Layout & Navigation

#### Layout System

```bash
npx shadcn@latest add https://ui.refine.dev/r/layout-01.json
```

**Installs:**

- `src/components/refine-ui/layout/layout.tsx`
- `src/components/refine-ui/layout/mobile-header.tsx`
- `src/components/refine-ui/layout/sidebar.tsx`
- `src/components/refine-ui/layout/user-avatar.tsx`
- `src/components/refine-ui/layout/user-info.tsx`
- `src/components/refine-ui/layout/theme-select.tsx`

**Description:** A complete layout system with sidebar, header, and main content area for Refine applications

**Dependencies:** `@refinedev/core`, `lucide-react`

#### Breadcrumb Navigation

```bash
npx shadcn@latest add https://ui.refine.dev/r/breadcrumb.json
```

**Installs:**

- `src/components/refine-ui/layout/breadcrumb.tsx`

**Description:** A breadcrumb navigation component for Refine applications that automatically generates breadcrumbs based on the current route and resource structure

**Dependencies:** `@refinedev/core`, `lucide-react`

#### Error Component

```bash
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

**Installs:**

- `src/components/refine-ui/layout/error-component.tsx`

**Description:** 404 error page component for Refine applications with elegant SVG graphics and navigation back to home page

**Dependencies:** `@refinedev/core`, `lucide-react`

### 📊 Data Display

#### Data Table

```bash
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
```

**Installs:**

- `src/components/refine-ui/data-table/data-table.tsx`
- `src/components/refine-ui/data-table/data-table-filter.tsx`
- `src/components/refine-ui/data-table/data-table-sorter.tsx`
- `src/components/refine-ui/data-table/data-table-pagination.tsx`

**Description:** A comprehensive data table component for Refine with sorting, filtering, pagination, and advanced features

**Dependencies:** `@refinedev/core`, `@refinedev/react-table`, `@tanstack/react-table`, `react-day-picker`, `lucide-react`

### 🔘 Action Buttons

#### CRUD Buttons

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

**Installs:**

- `src/components/refine-ui/buttons/create.tsx`
- `src/components/refine-ui/buttons/edit.tsx`
- `src/components/refine-ui/buttons/show.tsx`
- `src/components/refine-ui/buttons/delete.tsx`
- `src/components/refine-ui/buttons/clone.tsx`
- `src/components/refine-ui/buttons/list.tsx`
- `src/components/refine-ui/buttons/refresh.tsx`

**Description:** A comprehensive set of action buttons for Refine applications including create, edit, delete, show, clone, list, and refresh buttons

**Dependencies:** `@refinedev/core`, `lucide-react`

### 📄 Page Views

#### View Templates

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

**Installs:**

- `src/components/refine-ui/views/create-view.tsx`
- `src/components/refine-ui/views/edit-view.tsx`
- `src/components/refine-ui/views/show-view.tsx`
- `src/components/refine-ui/views/list-view.tsx`

**Description:** A comprehensive set of view components for Refine applications including create, edit, show, and list views with headers and content areas. These components are designed to be used as page templates for CRUD operations

**Dependencies:** `@refinedev/core`, `lucide-react`

### 🔧 Utilities

#### Notification Provider

```bash
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
```

**Installs:**

- `src/components/refine-ui/hooks/use-notification-provider.tsx`

**Description:** A notification provider hook for Refine that uses sonner toast notifications

**Dependencies:** `@refinedev/core`, `sonner`

#### Loading Overlay

```bash
npx shadcn@latest add https://ui.refine.dev/r/loading-overlay.json
```

**Installs:**

- `src/components/refine-ui/layout/loading-overlay.tsx`

**Description:** A loading overlay component that displays a spinner over content while loading. Can be used to provide visual feedback during async operations

**Dependencies:** `lucide-react`

#### Theme System

```bash
npx shadcn@latest add https://ui.refine.dev/r/theme-provider.json
```

**Installs:**

- `src/components/refine-ui/layout/theme-provider.tsx`
- `src/components/refine-ui/layout/theme-toggle.tsx`
- `src/components/refine-ui/layout/theme-select.tsx`

**Description:** A complete theme system with provider and toggle components. Supports dark, light, and system themes with localStorage persistence

**Dependencies:** `lucide-react`

## Install All Components

To install all Refine UI components at once:

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-in-form.json
npx shadcn@latest add https://ui.refine.dev/r/sign-up-form.json
npx shadcn@latest add https://ui.refine.dev/r/forgot-password-form.json
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
npx shadcn@latest add https://ui.refine.dev/r/layout-01.json
npx shadcn@latest add https://ui.refine.dev/r/data-table.json
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
npx shadcn@latest add https://ui.refine.dev/r/views.json
npx shadcn@latest add https://ui.refine.dev/r/breadcrumb.json
npx shadcn@latest add https://ui.refine.dev/r/loading-overlay.json
npx shadcn@latest add https://ui.refine.dev/r/theme-provider.json
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

## Dependencies

These components require the following packages to be installed in your project:

```bash
npm install @refinedev/core @refinedev/react-table @tanstack/react-table
npm install react-day-picker lucide-react sonner
```

## Usage

After installation, you can import and use the components in your Refine application:

```tsx
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Layout } from "@/components/refine-ui/layout/layout";
import { RefineBreadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ThemeProvider } from "@/components/refine-ui/layout/theme-provider";
import { ThemeToggle } from "@/components/refine-ui/layout/theme-toggle";
import { useNotificationProvider } from "@/components/refine-ui/hooks/use-notification-provider";
```

## Component Categories

The components are organized into the following categories:

- **Auth**: Authentication forms (sign-in, sign-up, forgot-password)
- **Layout**: Layout components (layout, breadcrumb, error-component)
- **Data**: Data display components (data-table)
- **Actions**: Action buttons (create, edit, delete, show, clone, list, refresh)
- **Views**: Page templates (create-view, edit-view, show-view, list-view)
- **Utilities**: Utility components and hooks (notification-provider, loading-overlay, theme-provider)
