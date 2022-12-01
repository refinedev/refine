---
id: mui-breadcrumb
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Material UI [Breadcrumb][mui-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
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

If your application has a [DashboardPage](/api-reference/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

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

<PropsTable module="@pankod/refine-mui/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://mui.com/material-ui/react-breadcrumbs/#main-content)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://mui.com/material-ui/react-breadcrumbs/#api)"
/>

[mui-breadcrumb]: https://mui.com/material-ui/react-breadcrumbs/#main-content
[mui-breadcrumb-props]: https://mui.com/material-ui/react-breadcrumbs/#api
[source-code]: https://github.com/refinedev/refine/blob/master/packages/mui/src/components/breadcrumb/index.tsx
