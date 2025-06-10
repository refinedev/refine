# useNotificationProvider Hook

A comprehensive notification system for Refine that integrates with Sonner toast notifications, featuring theme support and undoable notifications.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
```

This command will install the `useNotificationProvider` hook along with its dependencies:

- **Dependencies** (npm packages):
  - `@refinedev/core`
  - `sonner`

**Note:** The CLI will automatically install required npm dependencies and attempt to install registry dependencies.

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── notification/
│   ├── use-notification-provider.tsx
│   ├── toaster.tsx
│   └── undoable-notification.tsx
└── ... (other registry components)
```

This package includes three main components:

- `useNotificationProvider` - The main hook that provides notification functionality
- `Toaster` - A themed toast container component
- `UndoableNotification` - A custom notification component for undoable actions

## Usage

First we need to give the `useNotificationProvider` hook to the `Refine` component.

```tsx
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { Toaster } from "@/components/refine-ui/notification/toaster";

function App() {
  return (
    <>
      <Refine
        notificationProvider={useNotificationProvider}
        // ... other props
      >
        {/* Your app content */}
        <Toaster />
      </Refine>
    </>
  );
}
```

Then we can use the `useNotification` hook to open and close notifications.

```tsx
import { useNotification } from "@refinedev/core";

const { open, close } = useNotification();

// open success notification
open?.({
  key: "my-notification",
  type: "success",
  message: "Success",
  description: "This is a success message",
});

// open error notification
open?.({
  type: "error",
  message: "Error!",
  description: "Something went wrong",
  key: "error-notification",
});

// open progress notification (undoable)
// when undo button is clicked, run the `cancelMutation` callback
open?.({
  type: "progress",
  message: "Record deleted",
  description: "The record has been moved to trash",
  undoableTimeout: 5,
  cancelMutation: () => {
    // when undo button is clicked, run this callback
    console.log("Undoing operation...");
  },
});

// close notification by key
close?.("my-notification");
```
