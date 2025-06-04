# Refine Action Buttons

## Purpose & Overview

The `buttons` registry item provides a comprehensive set of pre-styled action buttons commonly used in Refine applications for CRUD operations and navigation. These buttons integrate with Refine's hooks for functionality like navigation, data operations, and access control.

**When to use:**

- To quickly add standard CRUD action buttons (Create, Edit, Show, Delete, Clone, List, Refresh) to your pages.
- To ensure consistent styling and behavior for common actions across your application.
- To leverage Refine's built-in functionalities like `useNavigation`, `useDelete`, `useCan`, etc., with minimal setup.

## Installation

Install the `buttons` component package via shadcn/ui registry:

```bash
npx shadcn@latest add https://ui.refine.dev/r/buttons.json
```

This command will install all the button components listed below.

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `lucide-react`
- **Registry Dependencies** (other shadcn/ui or Refine UI components):
  - `button` (shadcn/ui component)
  - `popover` (shadcn/ui component)
  -

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

## File Structure & Paths

The registry will generate the following files under `src/components/refine-ui/buttons/`:

- `create.tsx` (CreateButton)
- `edit.tsx` (EditButton)
- `show.tsx` (ShowButton)
- `delete.tsx` (DeleteButton)
- `clone.tsx` (CloneButton)
- `list.tsx` (ListButton)
- `refresh.tsx` (RefreshButton)

## Available Buttons & Usage

All buttons are designed to work seamlessly with Refine's resource and routing system. They typically infer the `resource` and `recordId` (where applicable) from the current route but can also be explicitly provided via props.

### Common Props

Most buttons share a common set of props for customization and behavior control:

| Prop            | Type                                                   | Default                                               | Description                                                                                                                   |
| --------------- | ------------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `resource`      | `string`                                               | Inferred from route                                   | The resource name or identifier.                                                                                              |
| `recordId`      | `BaseKey` (string or number)                           | Inferred for item actions (edit, show, delete, clone) | The ID of the record for item-specific actions.                                                                               |
| `accessControl` | `{ enabled?: boolean; hideIfUnauthorized?: boolean; }` | `{ enabled: true, hideIfUnauthorized: false }`        | Configures access control. If `hideIfUnauthorized` is true, the button will not render if the user lacks permission.          |
| `meta`          | `Record<string, unknown>`                              | -                                                     | Additional metadata to pass to data hooks or navigation.                                                                      |
| `hideText`      | `boolean`                                              | `false`                                               | If true, only the icon will be shown.                                                                                         |
| `children`      | `ReactNode`                                            | Default text & icon                                   | Custom content for the button. Overrides default text and icon.                                                               |
| `...rest`       | `React.ComponentProps<typeof Button>`                  | -                                                     | Other props are passed down to the underlying shadcn/ui `Button` component (e.g., `variant`, `size`, `className`, `onClick`). |

### `CreateButton`

Navigates to the create page of a resource.

**Component:** `CreateButton` from `@/components/refine-ui/buttons/create`

```tsx
import { CreateButton } from "@/components/refine-ui/buttons/create";

<CreateButton resource="posts" />
// With custom text and icon hidden
<CreateButton resource="posts" hideText>Create New Post</CreateButton>
```

### `EditButton`

Navigates to the edit page for a specific record.

**Component:** `EditButton` from `@/components/refine-ui/buttons/edit`

```tsx
import { EditButton } from "@/components/refine-ui/buttons/edit";

<EditButton resource="posts" recordId={123} />
// Icon only
<EditButton resource="posts" recordId={123} hideText />
```

### `ShowButton`

Navigates to the show page for a specific record.

**Component:** `ShowButton` from `@/components/refine-ui/buttons/show`

```tsx
import { ShowButton } from "@/components/refine-ui/buttons/show";

<ShowButton resource="posts" recordId={123} />;
```

### `DeleteButton`

Deletes a specific record, usually with a confirmation popover.

**Component:** `DeleteButton` from `@/components/refine-ui/buttons/delete`

**Additional Props:**

| Prop                  | Type                        | Default         | Description                                                             |
| --------------------- | --------------------------- | --------------- | ----------------------------------------------------------------------- |
| `onSuccess`           | `(value: any) => void`      | -               | Callback function invoked after successful deletion.                    |
| `confirmTitle`        | `string`                    | "Are you sure?" | Title for the confirmation popover.                                     |
| `confirmOkText`       | `string`                    | "Delete"        | Text for the confirm button in the popover.                             |
| `confirmCancelText`   | `string`                    | "Cancel"        | Text for the cancel button in the popover.                              |
| `successNotification` | `string \| false \| object` | Default message | Notification message on successful deletion. Set to `false` to disable. |
| `errorNotification`   | `string \| false \| object` | Default message | Notification message on error. Set to `false` to disable.               |

```tsx
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

<DeleteButton resource="posts" recordId={123} />
// With custom confirmation title
<DeleteButton resource="posts" recordId={123} confirmTitle="Permanently delete this post?" />
```

### `CloneButton`

Navigates to the create page, often pre-filling form data from the record being cloned.

**Component:** `CloneButton` from `@/components/refine-ui/buttons/clone`

```tsx
import { CloneButton } from "@/components/refine-ui/buttons/clone";

<CloneButton resource="posts" recordId={123} />;
```

### `ListButton`

Navigates to the list page of a resource.

**Component:** `ListButton` from `@/components/refine-ui/buttons/list`

```tsx
import { ListButton } from "@/components/refine-ui/buttons/list";

// Typically used on edit/show/create pages to go back to the list
<ListButton resource="posts" />;
```

### `RefreshButton`

Refreshes the data for the current view or a specific record.

**Component:** `RefreshButton` from `@/components/refine-ui/buttons/refresh`

**Additional Props:**

| Prop        | Type                         | Default | Description                                           |
| ----------- | ---------------------------- | ------- | ----------------------------------------------------- |
| `recordId`  | `BaseKey` (string or number) | -       | If provided, refreshes data for this specific record. |
| `onRefresh` | `                            |
