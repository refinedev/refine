---
id: edit-button
title: Edit
swizzle: true
---

`<EditButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `edit` method from [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) under the hood. It can be useful to redirect the app to the edit page route of resource.

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
    EditButton,
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
            return <EditButton size="small" recordItemId={row.id} />;
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
                edit: () => (
                    <RefineMui.Edit>Rest of the page here...</RefineMui.Edit>
                ),
            },
        ]}
    />,
);
```

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path for the edit route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
    return (
        <EditButton
            resource="posts"
            // highlight-next-line
            recordItemId="1"
        />
    );
};

// visible-block-end

const EditPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                edit: EditPage,
            },
        ]}
        DashboardPage={MyEditComponent}
    />,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

:::note
**`<EditButton>`** component reads the id information from the route by default.
:::

### `resource`

Redirection endpoint is defined by the `resource` property and its `edit` action path. By default, `<EditButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
    return (
        <EditButton
            // highlight-next-line
            resource="categories"
            recordItemId="2"
        />
    );
};

// visible-block-end

const EditPage = () => {
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
                edit: EditPage,
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

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
    return (
        <EditButton
            // highlight-next-line
            hideText={true}
        />
    );
};

// visible-block-end

const EditPage = () => {
    const params = useRouterContext().useParams();
    return <div>{JSON.stringify(params)}</div>;
};

render(
    <RefineMuiDemo
        initialRoutes={["/"]}
        resources={[
            {
                name: "posts",
                list: MyEditComponent,
                edit: EditPage,
            },
        ]}
    />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/api-reference/core/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-reference/core/components/refine-config.md)

```tsx
import { EditButton } from "@refinedev/mui";

export const MyListComponent = () => {
    return (
        <EditButton
            accessControl={{ enabled: true, hideIfUnauthorized: true }}
        />
    );
};
```

### ~~`resourceNameOrRouteName`~~ <PropTag deprecated />

> `resourceNameOrRouteName` prop is deprecated. Use `resource` prop instead.

It is used to redirect the app to the `/edit` endpoint of the given resource name. By default, the app redirects to a URL with `/edit` defined by the name property of resource object.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { EditButton } from "@refinedev/mui";

const MyEditComponent = () => {
    return (
        <EditButton
            // highlight-next-line
            resourceNameOrRouteName="categories"
            recordItemId="2"
        />
    );
};

// visible-block-end

const EditPage = () => {
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
                edit: EditPage,
            },
        ]}
        DashboardPage={MyEditComponent}
    />,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-reference/core/hooks/navigation/useNavigation.md) and then redirect to `/posts/edit/2`.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/EditButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).
:::
