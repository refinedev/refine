---
title: <AutoSaveIndicator />
description: <AutoSaveIndicator> component shows `autoSave` status on edit actions.
---

The `<AutoSaveIndicator />` component provides visual feedback for auto-save operations in your forms. It displays different states (loading, success, error, idle) with appropriate icons and messages, making it clear to users when their data is being saved automatically.

## Key Features

- **Real-time Status Updates**: Shows current auto-save status with visual indicators
- **Smooth Transitions**: Includes fade effects for better user experience
- **Customizable Elements**: Override default elements for each state
- **Internationalization**: Supports translation through Refine's `useTranslate` hook
- **Responsive Design**: Works seamlessly across different screen sizes

## Installation

```bash
npx shadcn@latest add https://ui.refine.dev/r/auto-save-indicator.json
```

This command will install the `AutoSaveIndicator` component along with its dependencies:

**Dependencies** (npm packages):

- `@refinedev/core`
- `lucide-react`

After installation, you will have the following files in your project:

```
src/components/refine-ui/
├── form/
│   ├── auto-save-indicator.tsx
└── ... (other registry components)
```

## Basic Usage

The `AutoSaveIndicator` is typically used with Refine's `useForm` hook when auto-save is enabled:

```tsx
import { useForm } from "@refinedev/react-hook-form";
import { AutoSaveIndicator } from "@/components/refine-ui/form/auto-save-indicator";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";

export default function EditPost() {
  const {
    refineCore: { onFinish, autoSaveProps },
    ...form
  } = useForm({
    refineCoreProps: {
      autoSave: {
        enabled: true,
        debounce: 1000, // Auto-save after 1 second of inactivity
      },
    },
  });

  return (
    <EditView>
      <EditViewHeader
        title="Edit Post"
        actionsSlot={<AutoSaveIndicator {...autoSaveProps} />}
      />
      {/* Your form content */}
    </EditView>
  );
}
```

## Auto-Save Configuration

Configure auto-save functionality through the `useForm` hook's `refineCoreProps.autoSave` option:

```tsx
const {
  refineCore: { autoSaveProps },
  ...form
} = useForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      debounce: 1000, // Wait 1 second after user stops typing
      invalidateOnUnmount: true, // Refresh data when component unmounts
      onMutationSuccess: (data) => {
        // Custom success handler
        console.log("Auto-save successful:", data);
      },
      onMutationError: (error) => {
        // Custom error handler
        console.error("Auto-save failed:", error);
      },
    },
  },
});
```

## API Reference

### Properties

| Prop       | Type                                          | Description                             |
| ---------- | --------------------------------------------- | --------------------------------------- |
| `status`   | `"loading" \| "success" \| "error" \| "idle"` | Current auto-save status                |
| `elements` | `AutoSaveIndicatorElements`                   | Optional custom elements for each state |

### Status States

- **`loading`**: Displays a spinner and "Saving..." message while the auto-save operation is in progress
- **`success`**: Shows a checkmark and "Saved" message when auto-save completes successfully
- **`error`**: Displays an error icon and "Auto save failed" message when there's an error
- **`idle`**: Hidden state when no auto-save operation is active

### Custom Elements

You can customize the appearance of each state by providing custom elements:

```tsx
const customElements = {
  success: <span className="text-green-600">✓ Saved successfully</span>,
  error: <span className="text-red-600">⚠ Save failed</span>,
  loading: <span className="text-blue-600">⏳ Saving...</span>,
};

<AutoSaveIndicator {...autoSaveProps} elements={customElements} />;
```
