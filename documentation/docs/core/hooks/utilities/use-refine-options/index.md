---
title: "useRefineOptions Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useRefineOptions"
sidebar_label: "useRefineOptions"
description: "Explore how to use the useRefineOptions hook in Refine v5 to access global configuration options like mutationMode, syncWithLocation, and overtime in custom components."
source: packages/core/src/hooks/use-refine-options/index.tsx
---

`useRefineOptions` is a utility hook that returns the global configuration `options` passed to the `<Refine>` component from `RefineContext`.

It is useful when building custom components or hooks that need to adapt their behavior based on global Refine settings such as `mutationMode`, `warnWhenUnsavedChanges`, `syncWithLocation`, `liveMode`, or `overtime`.

## Usage

```ts
import { useRefineOptions } from "@refinedev/core";

const options = useRefineOptions();
```

### Example

The following example shows a custom save button that checks the global `mutationMode` to display an undo notice when `undoable` mode is active:

```tsx title="src/components/CustomSaveButton.tsx"
import React from "react";
import { useRefineOptions } from "@refinedev/core";

export const CustomSaveButton: React.FC<{ onSave: () => void }> = ({ onSave }) => {
  const options = useRefineOptions();

  return (
    <div>
      <button onClick={onSave}>Save Changes</button>
      {options?.mutationMode === "undoable" && (
        <span className="text-sm text-gray-500">
          (You will have {((options?.undoableTimeout ?? 5000) / 1000)}s to undo)
        </span>
      )}
    </div>
  );
};
```

## Return Value

`useRefineOptions` returns an `IRefineContextOptions` object containing:

| Property | Type | Description |
| --- | --- | --- |
| `mutationMode` | `"pessimistic" \| "optimistic" \| "undoable"` | Default mutation execution mode for data mutations. |
| `syncWithLocation` | `boolean` | Whether query parameters sync with the browser URL. |
| `undoableTimeout` | `number` | Duration in milliseconds before an undoable mutation executes (default `5000`). |
| `warnWhenUnsavedChanges` | `boolean` | Whether to warn users before navigating away with unsaved form changes. |
| `liveMode` | `"auto" \| "manual" \| "off"` | Default live update mode across subscriptions. |
| `redirect` | `{ afterCreate?: RouteAction, afterClone?: RouteAction, afterEdit?: RouteAction }` | Default redirect behavior after CRUD actions. |
| `overtime` | `{ enabled?: boolean, interval?: number }` | Configuration for loading overtime indicators. |
| `textTransformers` | `{ humanize?: (text: string) => string, plural?: (text: string) => string, singular?: (text: string) => string }` | Text transformation helpers for titles and resource labels. |
| `disableServerSideValidation` | `boolean` | Whether server-side form error mapping is disabled. |
| `title` | `{ text?: string, icon?: React.ReactNode }` | Title and icon configured for the application brand. |

## Related

- [Refine Options Configuration](/docs/core/refine-component/#options)
- [Mutation Mode Guide](/docs/advanced-tutorials/mutation-mode/)
