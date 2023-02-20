---
id: breadcrumb
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Ant Design's [Breadcrumb][antd-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { Show } from "@pankod/refine-antd";
import { Breadcrumb } from "antd";

const PostIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-list"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1={9} y1={6} x2={20} y2={6}></line>
        <line x1={9} y1={12} x2={20} y2={12}></line>
        <line x1={9} y1={18} x2={20} y2={18}></line>
        <line x1={5} y1={6} x2={5} y2="6.01"></line>
        <line x1={5} y1={12} x2={5} y2="12.01"></line>
        <line x1={5} y1={18} x2={5} y2="18.01"></line>
    </svg>
);

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb />}
        >
            <p>Content of your show page...</p>
        </Show>
    );
};
// visible-block-end

const PostList = () => {
    return (
        <RefineAntd.List>
            <p>Content of your list page...</p>
        </RefineAntd.List>
    );
};

render(
    <RefineAntdDemo
        initialRoutes={["/posts/show/123"]}
        resources={[
            {
                name: "posts",
                icon: PostIcon,
                show: PostShow,
                list: PostList,
            },
        ]}
    />,
);
```

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Ant Design [Breadcrumb][antd-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List } from "@pankod/refine-antd";
import { Breadcrumb } from "antd";

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

### `showHome`

If your application has a [DashboardPage](/api-reference/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx
import { List } from "@pankod/refine-antd";
import { Breadcrumb } from "antd";

export const PostList: React.FC = () => {
    return (
        <List
            // highlight-next-line
            breadcrumb={<Breadcrumb showHome={false} />}
        >
            ...
        </List>
    );
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List } from "@pankod/refine-antd";
import { Breadcrumb } from "antd";

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

<PropsTable module="@pankod/refine-antd/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://ant.design/components/breadcrumb/#API)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://ant.design/components/breadcrumb/#Breadcrumb)"
/>

[antd-breadcrumb]: https://ant.design/components/breadcrumb
[antd-breadcrumb-props]: https://ant.design/components/breadcrumb/#Breadcrumb
