---
id: useForm
title: useForm
---

```tsx live shared
import React from "react";
import { useTable } from "@pankod/refine-core";
import { useForm as ReactHoomFormUseForm } from "@pankod/refine-react-hook-form";

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}

const Layout: React.FC = ({ children }) => {
    return (
        <div
            style={{
                height: "100vh",
                background: "white",
            }}
        >
            {children}
        </div>
    );
};

const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });
    const { edit, create, clone } = useNavigation();

    return (
        <div>
            <button onClick={() => create("posts")}>Create Post</button>
            <table>
                <thead>
                    <td>ID</td>
                    <td>Title</td>
                    <td>Actions</td>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                <button onClick={() => edit("posts", post.id)}>
                                    Edit
                                </button>
                                <button onClick={() => clone("posts", post.id)}>
                                    Clone
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = ReactHoomFormUseForm();

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <br />
            <input type="submit" disabled={formLoading} value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};

const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = ReactHoomFormUseForm();

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <br />
            <input type="submit" disabled={formLoading} value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
```

The [`@pankod/refine-react-hook-form`][refine-react-hook-form] adapter allows you to integrate the [React Hook Form][react-hook-form] library with refine, enabling you to manage your forms in a headless manner. This adapter supports all of the features of both [React Hook Form][react-hook-form] and [refine's useForm][use-form-core] hook, and you can use any of the [React Hook Form][react-hook-form] examples as-is by copying and pasting them into your project."

<GeneralConceptsLink />

## Installation

Install the [`@pankod/refine-react-hook-form`][refine-react-hook-form] library.

```bash
npm i @pankod/refine-react-hook-form
```

## Basic Usage

> For more detailed usage examples please refer to the [React Hook Form](https://react-hook-form.com/get-started) documentation.

We'll show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Category: </label>
            <select
                {...register("category.id", {
                    required: true,
                })}
                defaultValue={queryResult?.data?.data.category.id}
            >
                {options?.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            {errors.category && <span>This field is required</span>}
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />

            {queryResult?.data?.data?.thumbnail && (
                <>
                    <br />
                    <label>Image: </label>
                    <br />

                    <img
                        src={queryResult?.data?.data?.thumbnail}
                        width={200}
                        height={200}
                    />
                    <br />
                    <br />
                </>
            )}

            <input type="submit" value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
```

:::tip
If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/docs/packages/documentation/react-hook-form/useModalForm).
:::

## Options

### `action`

`useForm` can handle `edit`, `create` and `clone` actions.

:::tip
By default, it determines the `action` from route.

-   If the route is `/posts/create` thus the hook will be called with `action: "create"`.
-   If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.
-   If the route is `/posts/clone/1`, the hook will be called with `action: "clone"`.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'}
]}>
<TabItem value="create">

`action: "create"` is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/docs/api-reference/core/hooks/data/useCreate.md) under the hood for mutations on create mode.

In the following example, we'll show how to use `useForm` with `action: "create"`.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";

const PostCreatePage: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <br />
            <input type="submit" disabled={formLoading} value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreatePage,
            edit: PostEdit,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md).

In the following example, we'll show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";

const PostEditPage: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Content: </label>
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <input type="submit" value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEditPage,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/docs/api-reference/core/hooks/data/useCreate.md).

In the following example, we'll show how to use `useForm` with `action: "clone"`.

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";

const PostCreatePage: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <br />
            <input type="submit" disabled={formLoading} value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreatePage,
            edit: PostEdit,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

</Tabs>

### `id`

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is usefull when you want to `edit` or `clone` a `resource` from a different page.

```tsx
const form = useForm({
    refineCoreProps: {
        action: "edit", // or clone
        resource: "categories",
        id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
    },
});
```

Also you can give `id` from `resource` prop.

```tsx
const form = useForm({
    refineCoreProps: {
        action: "edit", // or clone
        resource: "categories/subcategory/3", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory/3/
    },
});
```

### `redirect`

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        redirect: false,
    },
});
```

### `onMutationSuccess`

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        onMutationSuccess: (data, variables, context) => {
            console.log({ data, variables, context });
        },
    },
});
```

### `onMutationError`

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        onMutationError: (data, variables, context) => {
            console.log({ data, variables, context });
        },
    },
});
```

### `invalidates`

You can use it to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

-   on `create` or `clone` mode: `"list"` and `"many"`
-   on `edit` mode: `"list`", `"many"` and `"detail"`

### `dataProviderName`

If there is more than one dataProvider, you should use the dataProviderName that you will use.
It is useful when you want to use a different dataProvider for a specific resource.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        dataProviderName: "second-data-provider",
    },
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

-   `pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.
-   `optimistic`:The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.
-   `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly. > It's only available for `edit` action.

> For more information about mutation modes, please check [Mutation Mode documentation](/docs/advanced-tutorials/mutation-mode/#supported-data-hooks) page.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        action: "edit",
        resource: "categories",
        mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
    },
});
```

### `successNotification`

> `NotificationProvider` is required.

After form is submitted successfully, `refine` will show a success notification. With this prop, you can customize the success notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    refineCoreProps: {
        successNotification: (data, values, resource) => {
            return {
                message: `Post Successfully created with ${data.title}`,
                description: "Success with no errors",
                type: "success",
            };
        },
    },
});
```

### `errorNotification`

> `NotificationProvider` is required.

After form is submit is failed, `refine` will show a error notification. With this prop, you can customize the error notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    refineCoreProps: {
        action: "create",
        resource: "post",
        errorNotification: (data, values, resource) => {
            return {
                message: `Something went wrong when deleting ${data.id}`,
                description: "Error",
                type: "error",
            };
        },
    },
});
```

```json title="Default values"
{
    "message": "Error when updating <resource-name> (status code: ${err.statusCode})" or "Error when creating <resource-name> (status code: ${err.statusCode})",
    "description": "Error",
    "type": "error",
}
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const form = useForm({
    refineCoreProps: {
        action: "create",
        resource: "post",
        // highlight-start
        metaData: {
            headers: { "x-meta-data": "true" },
        },
        // highlight-end
    },
});

const myDataProvider = {
    //...
    // highlight-start
    create: async ({ resource, id, metaData }) => {
        const headers = metaData?.headers ?? {};
        // highlight-end
        const url = `${apiUrl}/${resource}/${id}`;

        // highlight-next-line
        const { data } = await httpClient.get(url, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `queryOptions`

> Works only in `action: "edit"` or `action: "clone"` mode.

in `edit` or `clone` mode, `refine` uses [`useOne`](/docs/api-reference/core/hooks/data/useOne/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing `queryOptions` property.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    refineCoreProps: {
        // highlight-start
        queryOptions: {
            retry: 3,
        },
        // highlight-end
    },
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/advanced-tutorials/real-time/) page.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/docs/api-reference/core/hooks/invalidate/useInvalidate/) hook.

```tsx title="src/posts/edit.tsx"
import React from "react";
import { useInvalidate } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

const PostEdit = () => {
    const invalidate = useInvalidate();

    const form = useForm({
        refineCoreProps: {
            // highlight-start
            onMutationSuccess: (data, variables, context) => {
                invalidate({
                    resource: "categories",
                    invalidates: ["resourceAll"],
                });
            },
            // highlight-end
        },
    });

    // ---
};
```

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import React from "react";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

export const UserCreate: React.FC = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
    } = useForm();

    // highlight-start
    const onFinishHandler = (data: FieldValues) => {
        onFinish({
            fullName: `${data.name} ${data.surname}`,
        });
    };
    // highlight-end

    return (
        <form onSubmit={handleSubmit(onFinishHandler)}>
            <label>Name: </label>
            <input {...register("name")} />
            <br />

            <label>Surname: </label>
            <input {...register("surname")} />
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};
```

## API

### Properties

<PropsTable module="@pankod/refine-react-hook-form/useForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/api-reference/core/components/refine-config.md)>** component.

:::tip External Props
It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).
:::

<br/>

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const { ... } = useForm({
    ...,
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        // You can define all properties provided by refine useForm
    },
});
```

### Return values

Returns all the properties returned by [React Hook Form][react-hook-form] of the `useForm` hook. Also, we added the following return values:

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/api-reference/core/hooks/useForm.md##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const {
    refineCore: { queryResult, ... },
} = useForm({ ... });
```

| Property        | Description               | Type                                                                     |
| --------------- | ------------------------- | ------------------------------------------------------------------------ |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: (e: React.BaseSyntheticEvent) => void; }` |

### Type Parameters

| Property   | Desription                                                   | Type                       | Default                    |
| ---------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData      | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables | Field Values for mutation function                           | `{}`                       | `{}`                       |
| TContext   | Second generic type of the `useForm` of the React Hook Form. | `{}`                       | `{}`                       |

## Example

<StackblitzExample path="form-react-hook-form-use-form" />

[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/refinedev/refine/tree/master/packages/react-hook-form
[use-form-core]: /api-reference/core/hooks/useForm.md
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
