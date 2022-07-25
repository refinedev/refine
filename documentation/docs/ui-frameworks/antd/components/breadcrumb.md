---
id: breadcrumb
title: Breadcrumb
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Ant Design's [Breadcrumb][antd-breadcrumb] components using the [`useBreadcrumb`](/core/hooks/useBreadcrumb.md) hook.

:::info
You can refer to the [source-code][source-code] of the `<Breadcrumb>` component to see how it is built. You can also create your custom breadcrumb component inspired by the source code.
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

If your application has a [DashboardPage](/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

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

| Property        | Description                                              | Type                                     | Default |
| --------------- | -------------------------------------------------------- | ---------------------------------------- | ------- |
| breadcrumbProps | Passes properties for [`<Breadcrumb>`][antd-breadcrumb]  | [BreadcrumbProps][antd-breadcrumb-props] |         |
| showHome        | Shows the home button if application has `DashboardPage` | `boolean`                                | `true`  |
| hideIcons       | Allows to hide resource icons                            | `boolean`                                | `false` |

[antd-breadcrumb]: https://ant.design/components/breadcrumb
[antd-breadcrumb-props]: https://ant.design/components/breadcrumb/#Breadcrumb
[source-code]: https://github.com/pankod/refine/blob/master/packages/antd/src/components/breadcrumb/index.tsx
