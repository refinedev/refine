---
id: breadcrumb
title: Breadcrumb
sidebar_label: Breadcrumb 🆙
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Mantine [Breadcrumb][mantine-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Mantine [Breadcrumb][mantine-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { Show, Breadcrumb } from "@refinedev/mantine";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
```

### `showHome`

If you have a page with route `/`, it will be used as the root of the hierarchy and shown in the `Breadcrumb` with a home icon. To hide the root item, set `showHome` to `false.`

```tsx
import { List, Breadcrumb } from "@refinedev/mantine";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb showHome={true} />}
        >
            ...
        </List>
    );
};
```

### `meta`

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/mantine";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}
        >
            ...
        </List>
    );
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { Show, Breadcrumb } from "@refinedev/mantine";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb hideIcons />}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/Breadcrumb" />

[mantine-breadcrumb]: https://mantine.dev/core/breadcrumbs/
[source-code]: https://github.com/refinedev/refine/blob/master/packages/mantine/src/components/breadcrumb/index.tsx
