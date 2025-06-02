# useNotificationProvider Hook

A notification provider hook for Refine that integrates with Sonner toast notifications.

## Installation

```bash
npx shadcn@latest add http://localhost:3000/r/notification-provider.json
```

**Dependencies:** `@refinedev/core`, `sonner`

## Setup

```tsx
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@/components/refine-ui/hooks/use-notification-provider";
import { Toaster } from "sonner";

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
  message: "Progress",
  description: "Operation in progress...",
  undoableTimeout: 5,
  cancelMutation: () => {
    // when undo button is clicked, run this callback
  },
});
```

## Fully integrated with Refine

Once configured, Refine will automatically show notifications for:

- Data mutations (create, update, delete operations)
- Authentication actions (login, logout, register)
- Form validation errors
