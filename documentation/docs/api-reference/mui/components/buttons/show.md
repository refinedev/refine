---
id: show-button
title: Show
swizzle: true
---

`<ShowButton>` uses Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
    useDataGrid,
    List,
    // highlight-next-line
    ShowButton,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

const columns: GridColumns = [
    { field: "id", headerName: "ID", type: "number" },
    { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
    {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
            // highlight-next-line
            return <ShowButton size="small" recordItemId={row.id} />;
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
    },
];

const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
}
// visible-block-end

render(
    <RefineMuiDemo
        resources={[
            {
                name: "posts",
                list: PostsList,
                show: () => (
                    <RefineMui.Show>Rest of the page here...</RefineMui.Show>
                ),
            },
        ]}
    />,
);
```

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
    return (
        <ShowButton
            resource="posts"
            // highlight-next-line
            recordItemId="1"
        />
    );
};

// visible-block-end

const ShowPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                show: ShowPage,
            },
        ]}
        DashboardPage={MyShowComponent}
    />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resource`

Redirection endpoint is defined by the `resource`'s `show` action path. By default, `<ShowButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
    return (
        <ShowButton
            // highlight-next-line
            resource="categories"
            recordItemId="2"
        />
    );
};

// visible-block-end

const ShowPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
            },
            {
                name: "categories",
                show: ShowPage,
            },
        ]}
        DashboardPage={MyShowComponent}
    />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

### `meta`

It is used to pass additional parameters to the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md). By default, existing parameters in the route are used by the `show` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `show` action route is defined by the pattern: `/posts/:authorId/show/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
    return (
        <ShowButton meta={{ authorId: "10" }} />
    );
};
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
    return (
        <ShowButton
            // highlight-next-line
            hideText={true}
        />
    );
};

// visible-block-end

const ShowPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: MyShowComponent,
                show: ShowPage,
            },
        ]}
    />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { ShowButton } from "@refinedev/mui";

export const MyListComponent = () => {
    return (
        <ShowButton
            accessControl={{ enabled: true, hideIfUnauthorized: true }}
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

Redirection endpoint(`resourceNameOrRouteName/show`) is defined by `resourceNameOrRouteName` property. By default, `<ShowButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@refinedev/mui";

const MyShowComponent = () => {
    return (
        <ShowButton
            // highlight-next-line
            resourceNameOrRouteName="categories"
            recordItemId="2"
        />
    );
};

// visible-block-end

const ShowPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
            },
            {
                name: "categories",
                show: ShowPage,
            },
        ]}
        DashboardPage={MyShowComponent}
    />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/show/2`.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ShowButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::
