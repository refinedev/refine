---
id: list
title: List
sidebar_label: List
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/list/pageHeaderProps.png'

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

const { List, Table, TextField, TagField, useTable } = RefineAntd;
const { useMany } = RefineCore;

// visible-block-start
import { useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    TagField,
    useTable,
} from "@pankod/refine-antd";

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

## Properties

### `title`

It allows adding a title for the `<List>` component. if you don't pass title props, it uses plural form of resource name by default.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List, Form, Input, Select, useForm, useSelect } = RefineAntd;

// visible-block-start
import { List } from "@pankod/refine-antd";

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

`<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/guides-and-concepts/custom-pages.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
const { List } = RefineAntd;
const { Refine } = RefineCore;
const routerProvider = RefineDemoReactRouterV6(["/custom"]);
const dataProvider = RefineSimpleRest.default;

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { List } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <List resource="posts">
            <p>Rest of your page here</p>
        </List>
    );
};

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
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
// visible-block-end

render(<App />);
```

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List, Form, Input, Select, useForm, useSelect, Create } = RefineAntd;
const { usePermissions } = RefineCore;

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
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve("admin"),
    getUserIdentity: () => Promise.resolve(),
};

// visible-block-start
import { List, Create } from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";

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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/hooks/auth/usePermissions.md)

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/ui-frameworks/antd/components/breadcrumb.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List, Breadcrumb } = RefineAntd;

// visible-block-start
import { List } from "@pankod/refine-antd";

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

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property. For `@pankod/refine-antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List } = RefineAntd;

// visible-block-start
import { List } from "@pankod/refine-antd";

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
const { List } = RefineAntd;

// visible-block-start
import { List } from "@pankod/refine-antd";

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
const { List } = RefineAntd;

// visible-block-start
import { List } from "@pankod/refine-antd";

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

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List, Button } = RefineAntd;

// visible-block-start
import { List, Button } from "@pankod/refine-antd";

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

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { List, Button } = RefineAntd;

// visible-block-start
import { List, Button } from "@pankod/refine-antd";

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

### ~~`pageHeaderProps`~~

:::caution Deprecated
Use `headerProps`, `wrapperProps` or `contentProps` instead.
:::

`<List>` uses ant-design `<PageHeader>` components so you can customize with the props of `pageHeaderProps`.

By default, the `breadcrumb` property of the `<PageHeader>` component shows [`<Breadcrumb>`][breadcrumb-component] component.

[Refer to the `<PageHeader>` documentation for detailed usage. &#8594](https://ant.design/components/page-header/#API)

```tsx
import { List } from "@pankod/refine-antd";

export const ListPage: React.FC = () => {
    return (
        <List
            pageHeaderProps={{
                onBack: () => console.log("clicked"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </List>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
       <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>

</div>
<br/>

## API Reference

### Properties

| Property                                                                                                     | Description                               | Type                                                                                  | Default                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| title                                                                                                        | Adds title                                | `React.ReactNode`                                                                     | Plural of `resource.name`                                                                                    |
| resource                                                                                                     | Resource name for API data interactions   | `string`                                                                              | Resource name that it reads from the url.                                                                    |
| canCreate                                                                                                    | Adds create button                        | `boolean`                                                                             | If the resource is passed a create component, `true` else `false`                                            |
| createButtonProps                                                                                            | Adds props for create button              | [ButtonProps](https://ant.design/components/button/#API) & `{ resourceName: string }` | `<CreateButton />`                                                                                           |
| breadcrumb                                                                                                   | Custom breadcrumb element                 | `React.ReactNode`                                                                     | `<Breadcrumb/>`                                                                                              |
| wrapperProps                                                                                                 | Wrapper element props                     | `React.DetailedHTMLProps<HTMLDivElement>`                                             |                                                                                                              |
| headerProps                                                                                                  | Header element props                      | `PageHeaderProps`                                                                     |                                                                                                              |
| contentProps                                                                                                 | Content wrapper element props             | `React.DetailedHTMLProps<HTMLDivElement>`                                             |                                                                                                              |
| headerButtons                                                                                                | Header buttons element or render function | `({ defaultButtons: React.ReactNode }) => React.ReactNode` \| `React.ReactNode`       |                                                                                                              |
| headerButtonProps                                                                                            | Header buttons wrapper element props      | `SpaceProps`                                                                          |                                                                                                              |
| <div className="required-block"><div>pageHeaderProps</div> <div className=" required">deprecated</div></div> | Passes properties for `<PageHeader>`      | [PageHeaderProps](https://ant.design/components/page-header/#API)                     | { ghost: false, [title](#title), extra: `<CreateButton />`, breadcrumb: [Breadcrumb][breadcrumb-component] } |

[breadcrumb-component]: /ui-frameworks/antd/components/breadcrumb.md
