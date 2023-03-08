---
id: breadcrumb
title: Breadcrumb
sidebar_label: Breadcrumb 🆙
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Chakra UI [Breadcrumb][chakra-ui-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Chakra UI [Breadcrumb][chakra-ui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@refinedev/chakra-ui";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
        >
            ...
        </List>
    );
};
```

### `home`

If you have a root page other than a resource, you can pass `{ icon?: React.ReactNode; path?: string; }` to thr `home` property to make it the root of the hierarchy.

```tsx
import { List, Breadcrumb } from "@refinedev/chakra-ui";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb home={{ path: "/my-landing-page" }} />}
        >
            ...
        </List>
    );
};
```

### `meta`

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/chakra-ui";

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
import { List, Breadcrumb } from "@refinedev/chakra-ui";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb hideIcons />}
        >
            ...
        </List>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/Breadcrumb" />

[chakra-ui-breadcrumb]: https://chakra-ui.com/docs/components/breadcrumb/usage
