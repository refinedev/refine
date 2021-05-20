---
id: customPages
title: customPages
---

`refine` allows us to add custom pages to our application. To do this, it is necessary to create an object array with [react-router-dom](#) `<Route>` properties. Then, pass this array as `routes` prop in the `<Admin>` component.

Let's see how to do it:

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
            //...
        >
            ...
        </Admin>
    );
};

export default App;
```

Now, everyone can access our page via `/custom-page` path. If we only want authenticated users to access this page, it is enough to wrap our page component with `<Authenticated>` component.

```tsx title="src/App.tsx"
//highlight-next-line
import { Admin, Authenticated } from "@pankod/refine";

import { CustomPage } from "pages/custom-page";

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
            routes={[
                {
                    exact: true,
                    //highlight-next-line
                    component: AuthenticatedCustomPage,
                    path: "/custom-page",
                },
            ]}
            //...
        >
            ...
        </Admin>
    );
};

export default App;
```

:::caution attention
For authenticated custom page, your application needs an `authProvider`.

Refer to [authProvider](#) for more detailed information.
:::

## Example

Let's make a custom page for posts using https://refine-fake-rest.pankod.com Data Provider. On this page, the editor can approve or reject the posts with "draft" status.

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

First, we created the post's CRUD pages and bootstrap the app. Then, let's create the custom page with the name `<PostReview>`.

We will use the props of `useList`, `filter` and `pagination`, to fetch a post with "draft" status.

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
        <>
            {record && (
                <Show
                    title="Review Posts"
                    resource="posts"
                    isLoading={isLoading || categoryIsLoading}
                >
                    <Title level={5}>Status</Title>
                    <Text mark>{record.status}</Text>
                    <Title level={5}>Title</Title>
                    <Text>{record.title}</Text>
                    <Title level={5}>Category</Title>
                    <Text>{categoryData?.data.title}</Text>
                    <Title level={5}>Content</Title>
                    <MarkdownField value={record.content} />
                </Show>
            )}
        </>
    );
    //highlight-end
};
```

Now our page looks like this:

...to be continues
