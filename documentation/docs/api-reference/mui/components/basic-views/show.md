---
id: show
title: Show
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/show/123
// visible-block-start
import React from "react";
import { useShow, useOne } from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    MarkdownField,
    DateField,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

const SampleShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    Content
                </Typography>
                <MarkdownField value={record?.content} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>
                {categoryIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{categoryData?.data?.title}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
            </Stack>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/samples/show/123"]}
        resources={[{ name: "samples", show: SampleShow, list: SampleList }]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Show } from "@refinedev/mui";
import { Typography } from "@mui/material";

const ShowPage: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            title={<Typography variant="h5">Custom Title</Typography>}
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId="123" />
                    </div>
                ),
                show: ShowPage,
            },
        ]}
    />,
);
```

### `resource`

The `<Show>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Show>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Show } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show resource="posts" recordItemId={123}>
            <span>Rest of your page here</span>
        </Show>
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

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the [`useDelete`](/docs/api-reference/core/hooks/data/useDelete/) method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/api-reference/mui/components/buttons/delete.md) and the [`<EditButton>`](/api-reference/mui/components/buttons/edit.md) documentation for detailed usage.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    deleteOne: async ({ resource, id, variables }) => {
        return {
            data: {},
        };
    },
};

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
import { Show } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

const PostShow: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <Show
            /* highlight-start */
            canDelete={permissionsData?.includes("admin")}
            canEdit={
                permissionsData?.includes("editor") ||
                permissionsData?.includes("admin")
            }
            /* highlight-end */
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        authProvider={authProvider}
        dataProvider={customDataProvider}
        initialRoutes={["/posts/show/123"]}
        Layout={RefineMui.Layout}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId="123" />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/authentication/usePermissions.md)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Show } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Show resource="posts" recordItemId={123}>
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
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

:::note
`<Show>` component needs the `id` information for [`<RefreshButton>`](/api-reference/mui/components/buttons/refresh.md) to work properly.
:::

:::caution
The `<Show>` component needs the `id` information for work properly, so if you use the `<Show>` component in custom pages, you should pass the `recordItemId` property.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Show } from "@refinedev/mui";

// highlight-start
const PostShow = () => {
    return <Show dataProviderName="other">...</Show>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
        >
            {/* ... */}
        </Refine>
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";
import { useBack } from "@refinedev/core";

const BackButton = () => {
    const goBack = useBack();

    return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            goBack={<BackButton />}
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `isLoading`

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-next-line
            isLoading={loading}
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/mui/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Breadcrumb } from "@refinedev/mui";

const PostShow: React.FC = () => {
    return (
        <Show
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
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            wrapperProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            headerProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            contentProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerButtons`

By default, the `<Show/>` component has a [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, deleteButtonProps, editButtonProps, listButtonProps, refreshButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::caution

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

If [`canDelete`](#candelete-and-canedit) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

If [`canEdit`](#candelete-and-canedit) is `false`, [`<EditButton>`][edit-button] will not render and `editButtonProps` will be `undefined`.

:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
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
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button], and, [`<RefreshButton>`][refresh-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import {
    Show,
    ListButton,
    EditButton,
    DeleteButton,
    RefreshButton,
} from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            headerButtons={({
                deleteButtonProps,
                editButtonProps,
                listButtonProps,
                refreshButtonProps,
            }) => (
                <>
                    <Button type="primary">Custom Button</Button>
                    {listButtonProps && (
                        <ListButton
                            {...listButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    {editButtonProps && (
                        <EditButton
                            {...editButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    {deleteButtonProps && (
                        <DeleteButton
                            {...deleteButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    <RefreshButton
                        {...refreshButtonProps}
                        meta={{ foo: "bar" }}
                    />
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
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
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostShow: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Show
            // highlight-start
            footerButtonProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
        >
            <span>Rest of your page here</span>
        </Show>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/show/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.ShowButton recordItemId={123} />
                    </div>
                ),
                show: PostShow,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Show" 
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
headerButtons-default="[`ListButton`](https://refine.dev/docs/api-reference/mui/components/buttons/list-button/), [`EditButton`](https://refine.dev/docs/api-reference/mui/components/buttons/edit-button/), [`DeleteButton`](https://refine.dev/docs/api-reference/mui/components/buttons/delete-button/), [`RefreshButton`](https://refine.dev/docs/api-reference/mui/components/buttons/refresh-button/)"
footerButtonProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/docs/api-reference/mui/components/mui-breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>

```tsx live shared
const SampleList = () => {
    const { dataGridProps } = RefineMui.useDataGrid();

    const { data: categoryData, isLoading: categoryIsLoading } =
        RefineCore.useMany({
            resource: "categories",
            ids:
                dataGridProps?.rows?.map((item: any) => item?.category?.id) ??
                [],
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
                    return <RefineMui.DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <RefineMui.ShowButton
                                hideText
                                recordItemId={row.id}
                            />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [categoryData?.data],
    );

    return (
        <RefineMui.List>
            <MuiXDataGrid.DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
            />
        </RefineMui.List>
    );
};

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

[list-button]: /docs/api-reference/mui/components/buttons/list-button/
[refresh-button]: /docs/api-reference/mui/components/buttons/refresh-button/
[edit-button]: /docs/api-reference/mui/components/buttons/edit-button/
[delete-button]: /docs/api-reference/mui/components/buttons/delete-button/
