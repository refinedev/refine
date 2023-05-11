---
id: list
title: List
sidebar_label: List
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts
// visible-block-start
import React from "react";
import { useMany } from "@refinedev/core";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

const SampleList = () => {
    const { dataGridProps } = useDataGrid();

    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        resource: "categories",
        ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                headerName: "Title",
                minWidth: 200,
            },
            {
                field: "category",
                headerName: "Category",
                valueGetter: ({ row }) => {
                    const value = row?.category?.id;

                    return value;
                },
                minWidth: 300,
                renderCell: function render({ value }) {
                    return categoryIsLoading ? (
                        <>Loading...</>
                    ) : (
                        categoryData?.data?.find((item) => item.id === value)
                            ?.title
                    );
                },
            },
            {
                field: "createdAt",
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
        ],
        [categoryData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/samples"]}
        resources={[{ name: "samples", list: SampleList }]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<List>` component. if you don't pass title props it uses the plural resource name by default. For example, for the `/posts` resource, it will be "Posts".

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts/create
// visible-block-start
import { List } from "@refinedev/mui";
import { Typography } from "@mui/material";

const ListPage: React.FC = () => {
    return (
        <List
            // highlight-next-line
            title={<Typography variant="h5">Custom Title</Typography>}
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: ListPage,
            },
        ]}
    />,
);
```

### `resource`

The `<List>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<List>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { List } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <List resource="posts">
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            Layout={Layout}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const authProvider = {
    login: async () => {
        return {
            success: true,
            redirectTo: "/",
        };
    },
    register: async () => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    updatePassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        return {
            success: true,
            redirectTo: "/",
        };
    },
    check: async () => ({
        authenticated: true,
    }),
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
};

// visible-block-start
import { List } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

const PostList: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <List
            /* highlight-start */
            canCreate={permissionsData?.includes("admin")}
            createButtonProps={{ size: "small" }}
            /* highlight-end */
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        authProvider={authProvider}
        dataProvider={dataProvider}
        initialRoutes={["/posts"]}
        Layout={RefineMui.Layout}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/authentication/usePermissions.md)

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/mui/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List, Breadcrumb } from "@refinedev/mui";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            breadcrumb={
                <div
                    style={{
                        padding: "3px 6px",
                        border: "2px dashed cornflowerblue",
                    }}
                >
                    <Breadcrumb />
                </div>
            }
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
        DashboardPage={() => {
            return (
                <div>
                    <p>This page is empty.</p>
                    <RefineMui.ListButton resource="posts" />
                </div>
            );
        }}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/mui";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            wrapperProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/mui";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            headerProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/mui";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            contentProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

### `headerButtons`

By default, the `<List/>` component has a [`<CreateButton>`][create-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, createButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::caution

If "create" resource is not defined or [`canCrate`](#cancreate-and-createbuttonprops) is `false`, the [`<CreateButton>`][create-button] will not render and `createButtonProps` will be `undefined`.

:::

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<CreateButton>`][create-button] component.

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List, CreateButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            headerButtons={({ createButtonProps }) => (
                <>
                    {createButtonProps && (
                        <CreateButton
                            {...createButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=210px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostList: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <List
            // highlight-start
            headerButtonProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
        >
            <span>Rest of your page here</span>
        </List>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/List" 
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`CreateButton`](https://refine.dev/docs/api-reference/mui/components/buttons/create-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/docs/api-reference/mui/components/mui-breadcrumb/)"
createButtonProps-type="[`CreateButtonProps`](https://refine.dev/docs/api-reference/mui/components/buttons/create-button/)"
/>

```tsx live shared
const Wrapper = ({ children }) => {
    return (
        <MuiMaterial.ThemeProvider theme={RefineMui.LightTheme}>
            <MuiMaterial.CssBaseline />
            <MuiMaterial.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            {children}
        </MuiMaterial.ThemeProvider>
    );
};
```

[create-button]: /docs/api-reference/mui/components/buttons/create-button/
