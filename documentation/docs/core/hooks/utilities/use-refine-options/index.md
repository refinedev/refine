---
title: "useRefineOptions Hook | Read Global Configuration in Refine v5"
display_title: "useRefineOptions"
sidebar_label: "useRefineOptions"
description: "Use useRefineOptions in Refine v5 to read global configuration options from RefineContext. Learn how to access and use configuration settings."
source: packages/core/src/hooks/use-refine-options
---

It is a hook that returns the global configuration `options` from `RefineContext`. This allows you to access configuration settings that were passed to the `<Refine>` component.

## Usage

```tsx
import React from "react";
import { useRefineOptions } from "@refinedev/core";

export const ConfigDisplay: React.FC = () => {
  const options = useRefineOptions();

  return (
    <div>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </div>
  );
};
```

## Examples

### Accessing Global Configuration

The `useRefineOptions` hook returns the options object that was passed to the `<Refine>` component. This can include settings like:

- `dataProvider`: Your data provider configuration
- `queryClient`: React Query client configuration
- `routerProvider`: Router provider configuration
- `authProvider`: Authentication provider configuration
- And more...

```tsx
import React from "react";
import { useRefineOptions } from "@refinedev/core";

export const ConfigDisplay: React.FC = () => {
  const options = useRefineOptions();

  // Access specific options
  const dataProvider = options.dataProvider;
  const routerProvider = options.routerProvider;

  return (
    <div>
      <h3>Data Provider:</h3>
      <pre>{JSON.stringify(dataProvider, null, 2)}</pre>
      <h3>Router Provider:</h3>
      <pre>{JSON.stringify(routerProvider, null, 2)}</pre>
    </div>
  );
};
```

### Conditional Logic Based on Configuration

You can use the options to conditionally render UI or change behavior based on your app's configuration:

```tsx
import React from "react";
import { useRefineOptions } from "@refinedev/core";

export const ConditionalContent: React.FC = () => {
  const options = useRefineOptions();

  // Check if a feature is enabled
  if (options?.other?.enableFeatureX) {
    return <div>Feature X is enabled!</div>;
  }

  return <div>Feature X is disabled</div>;
};
```

## API Reference

### Return values

| Property  | Description              | Type                    |
| --------- | ------------------------ | ----------------------- |
| options   | The global options object | `RefineOptions` (or `undefined` if not available) |

#### RefineOptions

The returned options object contains all the configuration that was passed to the `<Refine>` component. The exact shape depends on your configuration but typically includes:

```tsx
{
  dataProvider?: DataProvider;
  routerProvider?: RouterProvider;
  notify?: NotifyProvider;
  i18n?: I18nProvider;
  accessControl?: AccessControlProvider;
  authProvider?: AuthProvider;
  queryConfig?: QueryConfig;
  mutationConfig?: MutationConfig;
  options?: {
    warnWhenUnsavedChanges?: boolean;
    pageSize?: number;
    [key: string]: any;
  };
  [key: string]: any;
}
```

## Error Handling

If the hook is used outside of a `<Refine>` component context, it will throw an error. Make sure to use this hook inside a component that is a child of `<Refine>`.

## i18n support

The options returned by `useRefineOptions` can include i18n configuration if your app uses internationalization. You can access these settings to adjust your UI based on the current locale.

## Related Hooks

- [`useBreadcrumb`](/core/docs/core/hooks/utilities/use-breadcrumb) - For navigation breadcrumbs
- [`useMenu`](/core/docs/core/hooks/utilities/use-menu) - For menu items
- [`use-export`](/core/docs/core/hooks/utilities/use-export) - For export functionality
- [`use-import`](/core/docs/core/hooks/utilities/use-import) - For import functionality
