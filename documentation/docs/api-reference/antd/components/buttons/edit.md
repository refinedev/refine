---
id: edit-button
title: Edit
swizzle: true
---

`<EditButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `edit` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the edit page with the record id route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live
// visible-block-start
import {
    List,
    useTable,
    // highlight-next-line
    EditButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" width="100%" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        // highlight-next-line
                        <EditButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
}
// visible-block-end

render(
    <RefineAntdDemo
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;
// visible-block-start
import { EditButton } from "@refinedev/antd";

const MyEditComponent = () => {
    return (
        <EditButton
            resource="posts"
            // highlight-next-line
            recordItemId="123"
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <RefineAntd.List>List page here...</RefineAntd.List>;
                },
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
        ]}
        DashboardPage={MyEditComponent}
    />,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

:::note
`<EditButton>` component reads the id information from the route by default.
:::

### `resource`

Redirection endpoint is defined by the `resource` property and its `edit` action path. By default, `<EditButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/antd";

const MyEditComponent = () => {
    return (
        <EditButton
            // highlight-next-line
            resource="categories"
            recordItemId="123"
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <RefineAntd.List>List page here...</RefineAntd.List>;
                },
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
            {
                name: "categories",
                list: () => {
                    return <RefineAntd.List>List page here...</RefineAntd.List>;
                },
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
        ]}
        DashboardPage={MyEditComponent}
    />,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

### `meta`

It is used to pass additional parameters to the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md). By default, existing parameters in the route are used by the `edit` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `edit` action route is defined by the pattern: `/posts/:authorId/edit/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
    return (
        <EditButton meta={{ authorId: "10" }} />
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/antd";

const MyEditComponent = () => {
    return (
        <EditButton
            recordItemId="123"
            // highlight-next-line
            hideText={true}
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: MyEditComponent,
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
        ]}
    />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { EditButton } from "@refinedev/antd";

export const MyListComponent = () => {
    return (
        <EditButton
            // highlight-start
            accessControl={{
                enabled: true,
                hideIfUnauthorized: true,
            }}
            // highlight-end
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

Redirection endpoint(`resourceNameOrRouteName/edit`) is defined by `resourceNameOrRouteName` property. By default, `<EditButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=150px disableScroll
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/antd";

const MyEditComponent = () => {
    return (
        <EditButton
            // highlight-next-line
            resourceNameOrRouteName="categories"
            recordItemId="123"
        />
    );
};

// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: () => {
                    return <RefineAntd.List>List page here...</RefineAntd.List>;
                },
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
            {
                name: "categories",
                list: () => {
                    return <RefineAntd.List>List page here...</RefineAntd.List>;
                },
                edit: () => {
                    return <RefineAntd.Edit>Edit page here...</RefineAntd.Edit>;
                },
            },
        ]}
        DashboardPage={MyEditComponent}
    />,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/edit/2`.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/EditButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
