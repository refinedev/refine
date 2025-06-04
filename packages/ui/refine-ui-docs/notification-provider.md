# useNotificationProvider Hook

A comprehensive notification system for Refine that integrates with Sonner toast notifications, featuring theme support and undoable notifications.

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/notification-provider.json
```

**Dependencies:** `@refinedev/core`, `sonner`
**Registry Dependencies:** `button`, `dropdown-menu`, `theme-provider`

## Components Included

This package includes three main components:

- `useNotificationProvider` - The main hook that provides notification functionality
- `Toaster` - A themed toast container component
- `UndoableNotification` - A custom notification component for undoable actions

## Setup

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

## Usage

```tsx
import { useNotification } from "@refinedev/core";

const { open, close } = useNotification();

// open notification
open?.({
  key: "my-notification",
  type: "success",
  message: "Success",
  description: "This is a success message",
});

// close notification
close?.("my-notification");
```

### Success Notification

```tsx
open?.({
  type: "success",
  message: "Success!",
  description: "Operation completed successfully",
  key: "my-notification",
});
```

### Error Notification

```tsx
open?.({
  type: "error",
  message: "Error!",
  description: "Something went wrong",
  key: "error-notification",
});
```

### Progress Notification (Undoable)

```tsx
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
```
