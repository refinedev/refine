---
id: customPages
title: Custom Pages
---

import basic from '@site/static/img/custom-pages-basic.png'
import gif from '@site/static/img/custom-pages-gif.gif'

`refine` allows us to add custom pages to our application. To do this, it is necessary to create an object array with [react-router-dom](https://reactrouter.com/web/api/Route) `<Route>` properties. Then, pass this array as `routes` prop in the `<Admin>` component.

## Public Custom Pages

It allows creating custom pages that everyone can access via path.

```tsx title="src/App.tsx"
import { Admin } from "@pankod/refine";

//highlight-end
import { CustomPage } from "pages/custom-page";

const App = () => {
    return (
        <Admin
            //highlight-start
            routes={[
                {
                    exact: true,
                    component: CustomPage,
                    path: "/custom-page",
                },
            ]}
            //highlight-end
        >
            ...
        </Admin>
    );
};

export default App;
```

Everyone can access this page via `/custom-page` path.

## Authenticated Custom Pages

It allows creating custom pages that only authenticated users can access via path.

```tsx title="src/App.tsx"
//highlight-next-line
import { Admin, Authenticated, AuthProvider } from "@pankod/refine";

import { CustomPage } from "pages/custom-page";

//highlight-start
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
//highlight-end

//highlight-start
const AuthenticatedCustomPage = () => {
    return (
        <Authenticated>
            <CustomPage />
        </Authenticated>
    );
};
//highlight-end
const App = () => {
    return (
        <Admin
            authProvider={authProvider}
            routes={[
                {
                    exact: true,
                    //highlight-next-line
                    component: AuthenticatedCustomPage,
                    path: "/custom-page",
                },
            ]}
        >
            ...
        </Admin>
    );
};

export default App;
```

Only authenticated users can access this page via `/custom-page` path.

:::caution attention
For authenticated custom page, your application needs an `authProvider`.

[Refer to authProvider for more detailed information. &#8594](#)

:::

:::danger
`refine` needs to know in order to manage resources, It recognizes them from the `<Resource>` component you have given to the `<Admin>` component. So, you need to give the resources you use in the custom page to the `<Admin>` component. But you don't need list, create, edit and show pages, you just need to give the name like the below code.

```tsx
<Resource name="posts" />
```

:::

## Example

Let's make a custom page for posts. On this page, the editor can approve or reject the posts with "draft" status.

Before starting the example, let's assume that our `dataProvider` has an endpoint that returns posts as following.

```ts title="https://refine-fake-rest.pankod.com/posts"
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
import { Admin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
```

Now, let's create the custom page with the name `<PostReview>`. We will use the props of `useList`, `filter` and `pagination`, to fetch a post with "draft" status.

[Refer to `useList` documentation for detailed usage. &#8594](#)

```tsx title="src/pages/post-review.tsx"
import { useList } from "@pankod/refine";

import { IPost } from "interfaces";

const PostReview = () => {
    const { data, isLoading } = useList<IPost>("posts", {
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        pagination: { pageSize: 1 },
    });

    ...
};
```

We set the filtering process with `filters` then page size set with `pagination` to return only one post.

Post's category is relational. So we will use the post's category "id" to get the category title. Let's use `useOne` to fetch the category we want.

```tsx title="src/pages/post-review.tsx"
//highlight-next-line
import { useList, useOne } from "@pankod/refine";

//highlight-next-line
import { IPost, ICategory } from "interfaces";

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>("posts", {
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        pagination: { pageSize: 1 },
    });
    //highlight-start
    const post = data?.data[0];

    const {
        data: categoryData,
        isLoading: categoryIsLoading,
    } = useOne<ICategory>("categories", post!.category.id, {
        enabled: !!post,
    });
    //highlight-end

    ...
};
```

Now we have the data to display the post as we want. Let's use the `<Show>` component of `refine` to show this data.

:::tip
`<Show>` component is not required, you are free to display the data as you wish.
:::

```tsx title="src/pages/post-review.tsx"
import {
    //highlight-start
    Typography,
    Button,
    Show,
    MarkdownField,
    //highlight-end
    useOne,
    useList,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

//highlight-next-line
const { Title, Text } = Typography;

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>("posts", {
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        pagination: { pageSize: 1 },
    });
    const post = data?.data[0];

    const {
        data: categoryData,
        isLoading: categoryIsLoading,
    } = useOne<ICategory>("categories", post!.category.id, {
        enabled: !!post,
    });

    //highlight-start
    return (
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
    );
    //highlight-end
};
```

Then, pass this `<PostReview>` as routes prop in the `<Admin>` component:

```tsx title="src/App.tsx"
import { Admin } from "@pankod/refine";
import dataProvider from "@pankod/refine-json-server";
import "@pankod/refine/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
//highlight-next-line
import { PostReview } from "pages/post-review";

const App = () => {
    return (
        <Admin
            dataProvider={dataProvider("https://refine-fake-rest.pankod.com")}
            //highlight-start
            routes={[
                {
                    exact: true,
                    component: PostReview,
                    path: "/post-review",
                },
            ]}
            //highlight-end
        >
            <Resource
                name="posts"
                list={PostList}
                create={PostCreate}
                edit={PostEdit}
                show={PostShow}
            />
        </Admin>
    );
};

export default App;
```

Now our page looks like this:

<div>
    <img src={basic} />
</div>
<br/>

Now let's put in approve and reject buttons to change the status of the post shown on the page. When these buttons are clicled, we will change the status of the post using `useUpdate`.

[Refer to `useUpdate` documentation for detailed usage. &#8594](#)

```tsx title="src/pages/post-review.tsx"
import {
    Typography,
    Button,
    Show,
    MarkdownField,
    //highlight-start
    Space,
    Button,
    //highlight-end
    useOne,
    useList,
} from "@pankod/refine";

import { IPost, ICategory } from "interfaces";

const { Title, Text } = Typography;

export const PostReview = () => {
    const { data, isLoading } = useList<IPost>("posts", {
        filters: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        pagination: { pageSize: 1 },
    });
    const post = data?.data[0];

    const {
        data: categoryData,
        isLoading: categoryIsLoading,
    } = useOne<ICategory>("categories", post!.category.id, {
        enabled: !!post,
    });

    //highlight-next-line
    const mutationResult = useUpdate<IPost>("posts");

    //highlight-next-line
    const { mutate, isLoading: mutateIsLoading } = mutationResult;

    //highlight-start
    const handleUpdate = (item: IPost, status: string) => {
        mutate({ id: item.id, values: { ...item, status } });
    };
    //highlight-end

    //highlight-next-line
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
            //highlight-start
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
            //highlight-end
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

<div>
    <img src={gif} />
</div>
<br/>
