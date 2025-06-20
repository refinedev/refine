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

#### Sign Up Form

```bash
npx shadcn@latest add https://ui.refine.dev/r/sign-up-form.json
```

**Installs:**

- `src/components/refine-ui/form/sign-up-form.tsx`
- `src/components/refine-ui/form/input-password.tsx`

**Description:** A Sign Up Form component for Refine to use on the registration page

#### Forgot Password Form

```bash
npx shadcn@latest add https://ui.refine.dev/r/forgot-password-form.json
```

**Installs:**

- `src/components/refine-ui/form/forgot-password-form.tsx`

**Description:** A Forgot Password Form component for Refine to use on the password reset page

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

**Description:** A complete layout system with sidebar, header, and main content area for Refine applications

#### Breadcrumb Navigation

```bash
npx shadcn@latest add https://ui.refine.dev/r/breadcrumb.json
```

**Installs:**

- `src/components/refine-ui/layout/breadcrumb.tsx`

**Description:** A breadcrumb navigation component for Refine applications that automatically generates breadcrumbs based on the current route and resource structure

#### Error Component

```bash
npx shadcn@latest add https://ui.refine.dev/r/error-component.json
```

**Installs:**

- `src/components/refine-ui/layout/error-component.tsx`

**Description:** 404 error page component for Refine applications with elegant SVG graphics and navigation back to home page

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

### 📝 Form Components

#### Auto Save Indicator

```bash
npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
```

**Installs:**

- `src/components/refine-ui/form/auto-save-indicator.tsx`

**Description:** A visual indicator component for auto-save functionality in Refine forms. Shows loading, success, error, and idle states with smooth transitions and customizable elements

### 🔧 Utilities

#### Notification Provider

```bash
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
```

**Installs:**

- `src/components/refine-ui/notification/use-notification-provider.tsx`
- `src/components/refine-ui/notification/toaster.tsx`
- `src/components/refine-ui/notification/undoable-notification.tsx`

**Description:** A comprehensive notification system for Refine with toast notifications, undoable notifications, and provider hooks using sonner

#### Loading Overlay

```bash
npx shadcn@latest add https://ui.refine.dev/r/loading-overlay.json
```

**Installs:**

- `src/components/refine-ui/layout/loading-overlay.tsx`

**Description:** A loading overlay component that displays a spinner over content while loading. Can be used to provide visual feedback during async operations

#### Theme System

```bash
npx shadcn@latest add https://ui.refine.dev/r/theme-provider.json
```

**Installs:**

- `src/components/refine-ui/theme/theme-provider.tsx`
- `src/components/refine-ui/theme/theme-toggle.tsx`
- `src/components/refine-ui/theme/theme-select.tsx`

**Description:** A complete theme system with provider, toggle, and select components. Supports dark, light, and system themes with localStorage persistence
