---
id: mui-breadcrumb
title: Breadcrumb
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Material UI [Breadcrumb][mui-breadcrumb] components using the [`useBreadcrumb`](/core/hooks/useBreadcrumb.md) hook.

:::info
You can refer to the [source-code][source-code] of the `<Breadcrumb>` component to see how it is built. You can also create your custom breadcrumb component inspired by the source code.
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Material UI [Breadcrumb][mui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    return (
        <List breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}>
            ...
        </List>
    );
};
```

### `showHome`

If your application has a [DashboardPage](/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    return <List breadcrumb={<Breadcrumb showHome={false} />}>...</List>;
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    return (
        <List breadcrumb={<Breadcrumb hideIcons />}>...</List>;
    );
};
```

## API Reference

### Properties

| Property        | Description                                              | Type                                    | Default |
| --------------- | -------------------------------------------------------- | --------------------------------------- | ------- |
| breadcrumbProps | Passes properties for [`<Breadcrumb>`][mui-breadcrumb]   | [BreadcrumbProps][mui-breadcrumb-props] |         |
| showHome        | Shows the home button if application has `DashboardPage` | `boolean`                               | `true`  |
| hideIcons       | Allows to hide resource icons                            | `boolean`                               | `false` |

[mui-breadcrumb]: https://mui.com/material-ui/react-breadcrumbs/#main-content
[mui-breadcrumb-props]: https://mui.com/material-ui/react-breadcrumbs/#api
[source-code]: https://github.com/pankod/refine/blob/master/packages/mui/src/components/breadcrumb/index.tsx
