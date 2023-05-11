---
id: list
title: List
sidebar_label: List
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts
interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

// visible-block-start
import { useMany } from "@refinedev/core";

import { List, TextField, TagField, useTable } from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>({
        syncWithLocation: true,
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value: string) => <TagField value={value} />}
                />
            </Table>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding a title for the `<List>` component. if you don't pass title props, it uses plural form of resource name by default.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList: React.FC = () => {
    return (
        /* highlight-next-line */
        <List title="Custom Title">
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

### `resource`

`<List>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<List>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { List } from "@refinedev/antd";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <List resource="posts">
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <RefineAntdDemo
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
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};

render(<App />);
```

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { Create } = RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    create: async ({ resource, variables }) => {
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
import { List } from "@refinedev/antd";
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
    <RefineAntdDemo
        authProvider={authProvider}
        dataProvider={customDataProvider}
        initialRoutes={["/posts"]}
        resources={[
            {
                name: "posts",
                list: PostList,
                create: () => {
                    return <Create>Create Page</Create>;
                },
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/authentication/usePermissions.md)

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/antd/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const CustomBreadcrumb: React.FC = () => {
    return (
        <p
            style={{
                padding: "3px 6px",
                border: "2px dashed cornflowerblue",
            }}
        >
            My Custom Breadcrumb
        </p>
    );
};

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            breadcrumb={<CustomBreadcrumb />}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

### `wrapperProps`

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property. For `@refinedev/antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            wrapperProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/page-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            headerProps={{
                subTitle: "This is a subtitle",
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property. `<List/>` components content is wrapped with a `<div/>` and `contentProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            contentProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

If "create" resource is not defined or [`canCrate`](#cancreate-and-createbuttonprops) is `false`, (#cancreate-and-createbuttonprops), the [`<CreateButton>`][create-button] will not render and `createButtonProps` will be `undefined`.

:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";
import { Button } from "antd";

const PostList: React.FC = () => {
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
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List, CreateButton } from "@refinedev/antd";
import { Button } from "antd";

const PostList: React.FC = () => {
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
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";
import { Button } from "antd";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            headerButtonProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
            headerButtons={<Button type="primary">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
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

<PropsTable module="@refinedev/antd/List" 
headerProps-type="[`PageHeaderProps`](https://procomponents.ant.design/en-US/components/page-header)" 
headerButtonProps-type="[`SpaceProps`](https://ant.design/components/space/)"
createButtonProps-type="[`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName: string }`"
breadcrumb-default="[`<Breadcrumb>`](https://ant.design/components/breadcrumb/)"
canCreate-default="If the resource is passed a create component, `true` else `false`"
/>

[breadcrumb-component]: /api-reference/antd/components/breadcrumb.md
[create-button]: /docs/api-reference/antd/components/buttons/create-button/
