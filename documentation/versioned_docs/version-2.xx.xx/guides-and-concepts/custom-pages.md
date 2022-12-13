---
id: custom-pages
title: Custom Pages
---


:::caution

This document is related to how to create custom pages for **react** applications. Since **Nextjs** has a file system based router built on the page concept, you can create your custom pages under the `pages` folder.

[Refer to the `Nextjs Guide` documentation for detailed information. &#8594][ssrNextjs]
:::

<br />

**refine** allows us to add custom pages to our application. To do this, it is necessary to create an object array with [react-router-dom](https://reactrouter.com/web/api/Route) `<Route>` properties. Then, pass this array as `routes` property in `routerProvider` property.

## Public Custom Pages

Allows creating custom pages that everyone can access via path.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";

// highlight-next-line
import { CustomPage } from "pages/custom-page";

const App = () => {
    return (
        <Refine
            ...
// highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                     {
                        exact: true,
                        component: CustomPage,
                        path: "/custom-page",
                    },
                ],
            }}
// highlight-end
        />
    );
};

export default App;
```

Everyone can access this page via `/custom-page` path.

## Authenticated Custom Pages

Allows creating custom pages that only authenticated users can access via path.

```tsx title="src/App.tsx"
// highlight-start
import { Refine, Authenticated, AuthProvider } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
// highlight-end

// highlight-next-line
import { CustomPage } from "pages/custom-page";

// highlight-start
const authProvider: AuthProvider = {
    login: (params: any) => {
        if (params.username === "admin") {
            localStorage.setItem("username", params.username);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("username") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
};
// highlight-end

// highlight-start
const AuthenticatedCustomPage = () => {
    return (
        <Authenticated>
            <CustomPage />
        </Authenticated>
    );
};
// highlight-end

const App = () => {
    return (
        <Refine
            ...
// highlight-start
            authProvider={authProvider}
            routerProvider={{
                ...routerProvider,
                routes: [
                     {
                        exact: true,
                        component: AuthenticatedCustomPage,
                        path: "/custom-page",
                    },
                ],
            }}
// highlight-end
        />
    );
};

export default App;
```

Only authenticated users can access this page via `/custom-page` path.

:::caution attention
For authenticated custom page, your application needs an `authProvider`.

[Refer to the `authProvider` for more detailed information. &#8594](/api-references/providers/auth-provider.md)

:::

:::info
By default, custom pages don't have any layout. If you want to show your custom page in a layout, you can use `<LayoutWrapper>` component.

[Refer to the `<LayoutWrapper>` for more detailed information. &#8594](/api-references/components/layout-wrapper.md)
:::

## Example

Let's make a custom page for posts. On this page, the editor can approve or reject the posts with the "draft" status.

Before starting the example, let's assume that our [`dataProvider`](/api-references/providers/data-provider.md) has an endpoint that returns posts as following.

```ts title="https://api.fake-rest.refine.dev/posts"
{
    [
        {
            id: 1,
            title: "Dolorem suscipit assumenda laborum id facilis maiores.",
            content:
                "Non et asperiores dolores. Vero quas natus sed ut iste omnis sequi. Enim veniam soluta vel. Est soluta suscipit velit architecto et. Tenetur ea impedit alias rerum in tenetur. Aut tempore consequatur ipsa neque aspernatur sit. Ut ea aspernatur aut voluptatem. Nulla quos laboriosam molestiae impedit eius. Dicta est maxime fuga debitis. Dicta necessitatibus odit quis qui animi.",
            category: {
                id: 32,
            },
            status: "draft",
        },
        {
            id: 2,
            title: "Voluptatibus laboriosam dignissimos non.",
            content:
                "Dolor cumque blanditiis aspernatur earum quo autem voluptatem vel consequuntur. Consequatur et sed dolores rerum ipsam aut et sed. Nostrum provident voluptas facere distinctio voluptates in et. Magni asperiores quod unde tempore veritatis beatae qui cum officia. Omnis quia cumque et qui. Quis et explicabo et similique voluptatum. Culpa assumenda autem laborum impedit perspiciatis ducimus perferendis. Quo doloribus magnam perferendis doloremque voluptas libero autem. Nihil enim aliquam molestias aspernatur impedit. Ad eius qui sit et.",
            category: {
                id: 22,
            },
            status: "draft",
        },
        // ...
    ];
}
```

First, we will create the post's CRUD pages and bootstrap the app.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        />
    );
};

export default App;
```

Now, let's create the custom page with the name `<PostReview>`. We will use the properties of `useList`, `filter` and `pagination` to fetch a post with "draft" status.

[Refer to the `useList` documentation for detailed usage. &#8594](/api-references/hooks/data/useList.md)

```tsx  title="src/pages/post-review.tsx"
import { useList } from "@pankod/refine";

const PostReview = () => {
    const { data, isLoading } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "draft",
                },
            ],
            pagination: { pageSize: 1 },
        },
    });
};

interface ICategory {
    id: string;
    title: string;
}

interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
```

<br/>

We set the filtering process with `filters` then page size set with `pagination` to return only one post.

Post's category is relational. So we will use the post's category "id" to get the category title. Let's use `useOne` to fetch the category we want.

```tsx  title="src/pages/post-review.tsx"
// highlight-next-line
import { useList, useOne } from "@pankod/refine";

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "draft",
                },
            ],
            pagination: { pageSize: 1 },
        },
    });

// highlight-start
    const post = data?.data[0];

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: post!.category.id,
            queryOptions: {
                enabled: !!post,
            },
        });
};
// highlight-end
```

Now we have the data to display the post as we want. Let's use the `<Show>` component of refine to show this data.

:::tip
`<Show>` component is not required, you are free to display the data as you wish.
:::

```tsx  title="src/pages/post-review.tsx"
import {
// highlight-start
    Typography,
    Show,
    MarkdownField,
// highlight-end
    useOne,
    useList,
} from "@pankod/refine";

// highlight-next-line
const { Title, Text } = Typography;

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "draft",
                },
            ],
            pagination: { pageSize: 1 },
        },
    });
    const record = data?.data[0];

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record!.category.id,
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
// highlight-start
        <Show
            title="Review Posts"
            resource="posts"
            recordItemId={record?.id}
            isLoading={isLoading || categoryIsLoading}
            pageHeaderProps={{
                backIcon: false,
            }}
        >
            <Title level={5}>Status</Title>
            <Text>{record?.status}</Text>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.title}</Text>
            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
// highlight-end
    );
};
```

Then, pass this `<PostReview>` as the routes property in the `<Refine>` component:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

// highlight-next-line
import { PostReview } from "pages/post-review";

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
// highlight-start
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        exact: true,
                        component: PostReview,
                        path: "/post-review",
                    },
                ],
            }}
// highlight-end
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
        />
    );
};

export default App;
```

Now our page looks like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/custom-pages/basic.png" alt="A custom page" />
</div>
<br />

Now let's put in approve and reject buttons to change the status of the post shown on the page. When these buttons are clicked, we will change the status of the post using `useUpdate`.

[Refer to the `useUpdate` documentation for detailed usage. &#8594](/api-references/hooks/data/useUpdate.md)

```tsx  title="src/pages/post-review.tsx"
import {
    Typography,
    Show,
    MarkdownField,
// highlight-start
    Space,
    Button,
    useUpdate,
// highlight-end
    useOne,
    useList,
} from "@pankod/refine";

const { Title, Text } = Typography;

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>({
        resource: "posts",
        config: {
            filters: [
                {
                    field: "status",
                    operator: "eq",
                    value: "draft",
                },
            ],
            pagination: { pageSize: 1 },
        },
    });
    const record = data?.data[0];

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record!.category.id,
            queryOptions: {
                enabled: !!record,
            },
        });

// highlight-next-line
    const mutationResult = useUpdate<IPost>();

// highlight-next-line
    const { mutate, isLoading: mutateIsLoading } = mutationResult;

// highlight-start
    const handleUpdate = (item: IPost, status: string) => {
        mutate({ resource: "posts", id: item.id, values: { ...item, status } });
    };
// highlight-end

    const buttonDisabled = isLoading || categoryIsLoading || mutateIsLoading;

    return (
        <Show
            title="Review Posts"
            resource="posts"
            recordItemId={record?.id}
            isLoading={isLoading || categoryIsLoading}
            pageHeaderProps={{
                backIcon: false,
            }}
// highlight-start
            actionButtons={
                <Space
                    key="action-buttons"
                    style={{ float: "right", marginRight: 24 }}
                >
                    <Button
                        danger
                        disabled={buttonDisabled}
                        onClick={() =>
                            record && handleUpdate(record, "rejected")
                        }
                    >
                        Reject
                    </Button>
                    <Button
                        type="primary"
                        disabled={buttonDisabled}
                        onClick={() =>
                            record && handleUpdate(record, "published")
                        }
                    >
                        Approve
                    </Button>
                </Space>
            }
       // highlight-end
>
            <Title level={5}>Status</Title>
            <Text>{record?.status}</Text>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
            <Title level={5}>Category</Title>
            <Text>{categoryData?.data.title}</Text>
            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/custom-pages/gif.gif" alt="A custom page in action" />
</div>
<br />

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/custom-pages-example-1o1by?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="custom-pages-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[ssrNextjs]: /guides-and-concepts/ssr-nextjs.md