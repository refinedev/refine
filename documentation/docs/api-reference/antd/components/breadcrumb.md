---
id: breadcrumb
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Ant Design's [Breadcrumb][antd-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Ant Design [Breadcrumb][antd-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    return (
        <List
            pageHeaderProps={{
                breadcrumb: <Breadcrumb breadcrumbProps={{ separator: "-" }} />,
            }}
        >
            ...
        </List>
    );
};
```

### `showHome`

If your application has a [DashboardPage](/api-reference/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    return (
        <List
            pageHeaderProps={{
                breadcrumb: <Breadcrumb showHome={false} />,
            }}
        >
            ...
        </List>
    );
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    return (
        <List
            pageHeaderProps={{
                breadcrumb: <Breadcrumb hideIcons />,
            }}
        >
            ...
        </List>
    );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://ant.design/components/breadcrumb/#API)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://ant.design/components/breadcrumb/#Breadcrumb)"
/>


[antd-breadcrumb]: https://ant.design/components/breadcrumb
[antd-breadcrumb-props]: https://ant.design/components/breadcrumb/#Breadcrumb