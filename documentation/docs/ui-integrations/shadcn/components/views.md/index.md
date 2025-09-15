---
title: View Components
source: https://github.com/refinedev/refine/tree/feat/init-shadcn/packages/refine-ui/registry/new-york/refine-ui/views
---

# Refine View Components

The `views` registry item provides a set of components designed to structure standard CRUD pages (List, Create, Edit, Show) in Refine applications. Each view component (`<ListView />`, `<CreateView />`, `<EditView />`, `<ShowView />`) comes with a corresponding header component (`<ListViewHeader />`, `<CreateViewHeader />`, `<EditViewHeader />`, `<ShowViewHeader />`) to provide a consistent layout including breadcrumbs, titles, and relevant action buttons.

**When to use:**

- To quickly scaffold standard CRUD pages with a consistent look and feel.
- When you need automatic breadcrumb navigation and resource title generation.
- To have a clear separation between page structure (header) and content (form, table, details).

## Installation

Install the `views` component package via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/views.json
```

This command will install all view components and their dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `lucide-react`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `separator`
  - `button`
  - `breadcrumb` (Refine UI component)
  - `buttons` (Refine UI components for actions like Create, Edit, Refresh)
  - `loading-overlay` (Refine UI component)

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies if they are not already in your project.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── views/
│   ├── list-view.tsx
│   ├── create-view.tsx
│   ├── edit-view.tsx
│   └── show-view.tsx
└── ... (other registry components)
```

## `ListView` & `ListViewHeader`

Designed for displaying a list of records.

`ListView` Features

- **Resource Integration**: Automatic resource detection and title generation.
- **Breadcrumb Navigation**: Built-in breadcrumb component.
- **Optional Create Button**: `CreateButton` (from `buttons` package) is displayed based on resource definition or `canCreate` prop.

`ListView` Props

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

`ListViewHeader` Props

| Prop               | Type      | Default          | Description                                           |
| ------------------ | --------- | ---------------- | ----------------------------------------------------- |
| `resource`         | `string`  | Current resource | Override the resource name for title and actions.     |
| `title`            | `string`  | Auto-generated   | Custom title for the header.                          |
| `hideBreadcrumb`   | `boolean` | `false`          | Set to `true` to hide the breadcrumb.                 |
| `wrapperClassName` | `string`  | -                | CSS classes for the header's main wrapper div.        |
| `headerClassName`  | `string`  | -                | CSS classes for the div containing title and actions. |
| `canCreate`        | `boolean` | Resource default | Manually control visibility of the create button      |

### `ListView` Usage Example

```tsx
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostListPage() {
  const isLoading = false; // or true, based on your data fetching state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <ListView>
        <ListViewHeader />
        {/* Error content */}
      </ListView>
    );
  }

  return (
    <ListView>
      <ListViewHeader />
      <LoadingOverlay loading={isLoading}>
        {/* Record content (e.g., DataTable) */}
      </LoadingOverlay>
    </ListView>
  );
}
```

## `CreateView` & `CreateViewHeader`

Designed for building record creation pages.

`CreateView` Features

- **Automatic Navigation**: Back button functionality via `useBack()` hook.
- **Resource Integration**: Automatic resource detection and title generation.
- **Breadcrumb Navigation**: Built-in breadcrumb component.

`CreateView` Props

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

`CreateViewHeader` Props

| Prop               | Type      | Default          | Description                                           |
| ------------------ | --------- | ---------------- | ----------------------------------------------------- |
| `resource`         | `string`  | Current resource | Override the resource name for title and actions.     |
| `title`            | `string`  | Auto-generated   | Custom title for the header.                          |
| `hideBreadcrumb`   | `boolean` | `false`          | Set to `true` to hide the breadcrumb.                 |
| `wrapperClassName` | `string`  | -                | CSS classes for the header's main wrapper div.        |
| `headerClassName`  | `string`  | -                | CSS classes for the div containing title and actions. |

### `CreateView` Usage Example

```tsx
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostCreatePage() {
  const formLoading = false; // or true, based on your form submission state

  return (
    <CreateView>
      <CreateViewHeader />
      <LoadingOverlay loading={formLoading}>
        {/* Record content (e.g., Create Form) */}
      </LoadingOverlay>
    </CreateView>
  );
}
```

## `EditView` & `EditViewHeader`

Designed for building record editing pages.

`EditView` Features

- **Automatic Navigation**: Back button and List button functionality.
- **Resource Integration**: Automatic resource detection and title generation.
- **Breadcrumb Navigation**: Built-in breadcrumb component.
- **Refresh Functionality**: Built-in `RefreshButton` for the current record.
- **Loading States**: `LoadingOverlay` can be used to cover both data fetching and form submission loading states.

`EditView` Props

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

`EditViewHeader` Props

Includes `RefreshButton` and `ListButton` by default.

| Prop               | Type        | Default          | Description                                           |
| ------------------ | ----------- | ---------------- | ----------------------------------------------------- |
| `resource`         | `string`    | Current resource | Override the resource name for title and actions.     |
| `title`            | `string`    | Auto-generated   | Custom title for the header.                          |
| `hideBreadcrumb`   | `boolean`   | `false`          | Set to `true` to hide the breadcrumb.                 |
| `wrapperClassName` | `string`    | -                | CSS classes for the header's main wrapper div.        |
| `headerClassName`  | `string`    | -                | CSS classes for the div containing title and actions. |
| `actionsSlot`      | `ReactNode` | -                | Custom actions to render in the header.               |

### `EditView` Usage Example

```tsx
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostEditPage() {
  const queryLoading = false; // or true, based on your data fetching state
  const formLoading = false; // or true, based on your form submission state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <EditView>
        <EditViewHeader />
        {/* Error content */}
      </EditView>
    );
  }

  return (
    <EditView>
      <EditViewHeader />
      <LoadingOverlay loading={queryLoading || formLoading}>
        {/* Record content (e.g., Edit Form) */}
      </LoadingOverlay>
    </EditView>
  );
}
```

## `ShowView` & `ShowViewHeader`

Designed for displaying detailed information about a single record.

`ShowView` Features

- **Automatic Navigation**: Back button and List button functionality.
- **Resource Integration**: Automatic resource detection and title generation.
- **Breadcrumb Navigation**: Built-in breadcrumb component.
- **Action Buttons**: Includes `RefreshButton` and `EditButton` (if applicable).

`ShowView` Props

| Prop        | Type        | Default | Description                              |
| ----------- | ----------- | ------- | ---------------------------------------- |
| `children`  | `ReactNode` | -       | Content to render inside the view        |
| `className` | `string`    | -       | Additional CSS classes for the container |

`ShowViewHeader` Props

Includes `EditButton` (if resource has an edit page), `ListButton`, and `RefreshButton` by default.

| Prop               | Type      | Default          | Description                                           |
| ------------------ | --------- | ---------------- | ----------------------------------------------------- |
| `resource`         | `string`  | Current resource | Override the resource name for title and actions.     |
| `title`            | `string`  | Auto-generated   | Custom title for the header.                          |
| `hideBreadcrumb`   | `boolean` | `false`          | Set to `true` to hide the breadcrumb.                 |
| `wrapperClassName` | `string`  | -                | CSS classes for the header's main wrapper div.        |
| `headerClassName`  | `string`  | -                | CSS classes for the div containing title and actions. |

### `ShowView` Usage Example

```tsx
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

export default function PostShowPage() {
  const isLoading = false; // or true, based on your data fetching state
  const error = null; // or object, based on your data fetching state

  if (error) {
    return (
      <ShowView>
        <ShowViewHeader />
        {/* Error content */}
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader />
      <LoadingOverlay loading={isLoading}>
        {/* Record content (e.g., Record details) */}
      </LoadingOverlay>
    </ShowView>
  );
}
```
