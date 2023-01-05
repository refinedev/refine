---
id: useForm
title: useForm
---

```tsx live shared
import {
    Table as AntdTable,
    Edit as AntdEdit,
    Create as AntdCreate,
    List as AntdList,
    Form as AntdForm,
    Input as AntdInput,
    useForm as useAntdForm,
    useTable as useAntdTable,
    Space as AntdSpace,
    EditButton as AntdEditButton,
    CloneButton as AntdCloneButton,
} from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
}

const PostList = () => {
    const { tableProps } = useAntdTable();

    return (
        <AntdList>
            <AntdTable {...tableProps} rowKey="id">
                <AntdTable.Column dataIndex="id" title="ID" />
                <AntdTable.Column dataIndex="title" title="Title" />
                <AntdTable.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <AntdSpace>
                            <AntdEditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <AntdCloneButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </AntdSpace>
                    )}
                />
            </AntdTable>
        </AntdList>
    );
};

const PostEdit = () => {
    const { formProps, saveButtonProps } = useAntdForm();

    return (
        <AntdEdit saveButtonProps={saveButtonProps}>
            <AntdForm {...formProps} layout="vertical">
                <AntdForm.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <AntdInput />
                </AntdForm.Item>
                <AntdForm.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <AntdInput.TextArea />
                </AntdForm.Item>
            </AntdForm>
        </AntdEdit>
    );
};

const PostCreate = () => {
    const { formProps, saveButtonProps } = useAntdForm();

    return (
        <AntdCreate saveButtonProps={saveButtonProps}>
            <AntdForm {...formProps} layout="vertical">
                <AntdForm.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <AntdInput />
                </AntdForm.Item>
                <AntdForm.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <AntdInput.TextArea />
                </AntdForm.Item>
            </AntdForm>
        </AntdCreate>
    );
};
```

`useForm` is used to manage forms. It is based on [Antd Form](https://ant.design/components/form/) and [`refine useForm`](/docs/api-reference/core/hooks/useForm/) to supports all the features of these packages and adds some additional features.

<GeneralConceptsLink />

## Usage

> For more detailed usage examples please refer to the [Ant Design Form](https://ant.design/components/form/) documentation.

We'll show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Form, Input, useForm, Select } from "@pankod/refine-antd";

export const PostEdit: React.FC = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        // highlight-next-line
        <Edit saveButtonProps={saveButtonProps}>
            // highlight-next-line
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

`formProps` includes all necessary values to manage Ant Design [Form](https://ant.design/components/form/) components.

In the example if you navigate to `/posts/edit/1234` it will manage the data of the post with id of `1234` in an editing context. See [Actions](#actions) on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with id of `1234` and then the form will be ready to edit further and submit the changes.

Submit functionality is provided by `saveButtonProps` which includes all of the necessary props for a button to submit a form including automatically updating loading states.

`useForm` accepts type parameters for the record in use and for the response type of the mutation. `IPost` in the example represents the record to edit. It is also used as the default type for mutation response.

:::tip
If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/api-reference/antd/hooks/form/useModalForm.md) or the [useDrawerForm](/api-reference/antd/hooks/form/useDrawerForm.md) hook.
:::

## Properties

### `action`

`useForm` can handle `edit`, `create` and `clone` actions.

:::tip
By default, it determines the `action` from route.

-   If the route is `/posts/create` thus the hook will be called with `action: "create"`.
-   If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.
-   If the route is `/posts/clone/1`, the hook will be called with `action: "clone"`. To display form, uses `create` component from resource.

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
import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { Create, Form, Input, useForm } from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
}

const PostCreatePage: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreatePage,
            edit: PostEdit,
        },
    ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md).

In the following example, we'll show how to use `useForm` with `action: "edit"`.

```tsx live url=http://localhost:3000/edit/123 previewHeight=420px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { Edit, Form, Input, useForm } from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
}

const PostEditPage: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Edit>
    );
};
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEditPage,
        },
    ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/docs/api-reference/core/hooks/data/useCreate.md).

```tsx live url=http://localhost:3000/clone/123 previewHeight=420px
setInitialRoutes(["/posts/clone/123"]);

// visible-block-start
import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Create,
    Form,
    Input,
    useForm,
    Space,
    Switch,
} from "@pankod/refine-antd";

interface IPost {
    id: number;
    title: string;
    content: string;
}

const PostCreatePage: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Create>
    );
};
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreatePage,
            edit: PostEdit,
        },
    ],
});

render(<RefineAntdDemo />);
```

</TabItem>

</Tabs>

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/api-reference/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

The `resource` value is determined from the active route where the component or the hook is used. It can be overridden by passing the `resource` prop.

Use case for overriding the `resource` prop:

-   We can create a `category` from the `<PostEdit>` page.
-   We can edit a `category` from the `<PostEdit>` page.

In the following example, we'll show how to use `useForm` with `resource` prop.

```tsx title="src/posts/edit.tsx"
import { Edit, Form, Input, useForm } from "@pankod/refine-antd";
import { PostForm } from "./PostForm";

const PostEdit = () => {
    return (
        <div>
            <PostForm />
            <CategoryForm />
        </div>
    );
};

const CategoryForm = () => {
    const { formProps, saveButtonProps } = useForm({
        action: "create",
        resource: "categories",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

Also you can give URL path to the `resource` prop.

```tsx
const form = useForm({
    action: "create",
    resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
});
```

### `id`

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is usefull when you want to `edit` or `clone` a `resource` from a different page.

> Note: `id` is required when `action: "edit"` or `action: "clone"`.

```tsx
const form = useForm({
    action: "edit", // or clone
    resource: "categories",
    id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
});
```

### `redirect`

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    redirect: false,
});
```

### `onMutationSuccess`

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

-   `data`: Returned value from [`useCreate`](/docs/api-reference/core/hooks/data/useCreate/) or [`useUpdate`](/docs/api-reference/core/hooks/data/useUpdate/) depending on the `action`.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    onMutationSuccess: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `onMutationError`

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

-   `data`: Returned value from [`useCreate`](/docs/api-reference/core/hooks/data/useCreate/) or [`useUpdate`](/docs/api-reference/core/hooks/data/useUpdate/) depending on the `action`.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    onMutationError: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `invalidates`

You can use it to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

-   on `create` or `clone` mode: `"list"` and `"many"`
-   on `edit` mode: `"list"`, `"many"` and `"detail"`

```tsx title="src/posts/create.tsx"
const form = useForm({
    invalidates: ["list", "many", "detail"],
});
```

### `dataProviderName`

If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
It is useful when you want to use a different `dataProvider` for a specific resource.

:::tip
If you want to use a different `dataProvider` on all resource pages, you can use the [`dataProvider` prop ](docs/api-reference/core/components/refine-config/#dataprovidername) of the `<Refine>` component.
:::

```tsx title="src/posts/edit.tsx"
const form = useForm({
    dataProviderName: "second-data-provider",
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

> For more information about mutation modes, please check [Mutation Mode documentation](/docs/advanced-tutorials/mutation-mode) page.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    action: "edit",
    resource: "categories",
    mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
});
```

### `successNotification`

> [`NotificationProvider`][notification-provider] is required.

After form is submitted successfully, `useForm` will call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    successNotification: (data, values, resource) => {
        return {
            message: `Post Successfully created with ${data.title}`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> [`NotificationProvider`][notification-provider] is required.

After form is submit is failed, `useForm` will call `open` function from [`NotificationProvider`][notification-provider] to show a success notification. With this prop, you can customize the success notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    action: "create",
    resource: "post",
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when deleting ${data.id}`,
            description: "Error",
            type: "error",
        };
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
-   Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/docs/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx title="src/posts/create.tsx"
const form = useForm({
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    // highlight-start
    create: async ({ resource, variables, metaData }) => {
        const headers = metaData?.headers ?? {};
        // highlight-end
        const url = `${apiUrl}/${resource}`;

        // highlight-next-line
        const { data } = await httpClient.post(url, variables, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `queryOptions`

> Works only in `action: "edit"` or `action: "clone"` mode.

in `edit` or `clone` mode, **refine** uses [`useOne`](/docs/api-reference/core/hooks/data/useOne/) hook to fetch data. You can pass [`queryOptions`](https://tanstack.com/query/v4/docs/react/reference/useQuery) options by passing `queryOptions` property.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    // highlight-start
    queryOptions: {
        retry: 3,
    },
    // highlight-end
});
```

### `createMutationOptions`

> This option is only available when `action: "create"` or `action: "clone"`.

In `create` or `clone` mode, **refine** uses [`useCreate`](/docs/api-reference/core/hooks/data/useCreate/) hook to create data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `createMutationOptions` property.

```tsx title="src/posts/create.tsx"
const form = useForm({
    // highlight-start
    createMutationOptions: {
        retry: 3,
    },
    // highlight-end
});
```

### `updateMutationOptions`

> This option is only available when `action: "edit"`.

In `edit` mode, **refine** uses [`useUpdate`](/docs/api-reference/core/hooks/data/useUpdate/) hook to update data. You can pass [`mutationOptions`](https://tanstack.com/query/v4/docs/react/reference/useMutation) by passing `updateMutationOptions` property.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    // highlight-start
    updateMutationOptions: {
        retry: 3,
    },
    // highlight-end
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/api-reference/core/providers/live-provider/#livemode) page.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    // highlight-start
    liveMode: "auto",
    // highlight-end
});
```

## Return Values

### `queryResult`

If the `action` is set to `"edit"` or `"clone"` or if a `resource` with an `id` is provided, `useForm` will call [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and set the returned values as the `queryResult` property.

```tsx title="src/posts/edit.tsx"
const { queryResult } = useForm();

const { data } = queryResult;
```

### `mutationResult`

When in `"create"` or `"clone"` mode, `useForm` will call [`useCreate`](/docs/api-reference/core/hooks/data/useCreate/). When in `"edit"` mode, it will call [`useUpdate`](/docs/api-reference/core/hooks/data/useUpdate/) and set the resulting values as the `mutationResult` property."

```tsx title="src/posts/edit.tsx"
const { mutationResult } = useForm();

const { data } = mutationResult;
```

### `setId`

`useForm` determine `id` from the router. If you want to change the `id` dynamically, you can use `setId` function.

```tsx title="src/posts/edit.tsx"
const { id, setId } = useForm();

const handleIdChange = (id: string) => {
    setId(id);
};

return (
    <div>
        <input value={id} onChange={(e) => handleIdChange(e.target.value)} />
    </div>
);
```

### `redirect`

"By default, after a successful mutation, `useForm` will `redirect` to the `"list"` page. To redirect to a different page, you can either use the `redirect` function to programmatically specify the destination, or set the redirect [property](/docs/api-reference/core/hooks/useForm/#redirect) in the hook's options.

In the following example we will redirect to the `"show"` page after a successful mutation.

```tsx title="src/posts/create.tsx"
const { onFinish, redirect } = useForm();

// --

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await onFinish(formValues);
    redirect("show", data?.data?.id);
};

// --
```

### `onFinish`

`onFinish` is a function that is called when the form is submitted. It will call the appropriate mutation based on the `action` property.
You can override the default behavior by passing an `onFinish` function in the hook's options.

For example you can [change values before sending to the API](/docs/api-reference/antd/hooks/form/useForm/#how-can-i-change-the-form-data-before-submitting-it-to-the-api).

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/docs/api-reference/core/hooks/invalidate/useInvalidate/) hook.

It is useful when you want to `invalidate` other resources don't have relation with the current resource.

```tsx title="src/posts/edit.tsx"
import React from "react";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";

const PostEdit = () => {
    const invalidate = useInvalidate();

    const form = useForm({
        // highlight-start
        onMutationSuccess: (data, variables, context) => {
            invalidate({
                resource: "users",
                invalidates: ["resourceAll"],
            });
        },
        // highlight-end
    });

    // ---
};
```

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import React from "react";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";

export const UserCreate: React.FC = () => {
    // highlight-next-line
    const { formProps, saveButtonProps, onFinish } = useForm();

    // highlight-start
    const handleOnFinish = (values) => {
        onFinish({
            fullName: `${values.name} ${values.surname}`,
        });
    };
    // highlight-end

    return (
        <Create saveButtonProps={saveButtonProps}>
            // highlight-next-line
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Surname" name="surname">
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

<br/>

### Return values

| Property        | Description                                             | Type                                                                                                                                                               |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onFinish        | Triggers the mutation                                   | `(values?: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                     |
| form            | Ant Design form instance                                | [`FormInstance`](https://ant.design/components/form/#FormInstance)                                                                                                 |
| formProps       | Ant Design form props                                   | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                            |
| saveButtonProps | Props for a submit button                               | `{ disabled: boolean; onClick: () => void; loading?:boolean; }`                                                                                                    |
| redirect        | Redirect function for custom redirections               | `(redirect:` `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,`idFromFunction?:` [`BaseKey`](/api-reference/core/interfaces.md#basekey)\|`undefined`) => `data` |
| queryResult     | Result of the query of a record                         | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)                                                                                    |
| mutationResult  | Result of the mutation triggered by submitting the form | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation)                                                                                   |
| formLoading     | Loading state of form request                           | `boolean`                                                                                                                                                          |
| id              | Record id for `clone` and `create` action               | [`BaseKey`](/api-reference/core/interfaces.md#basekey)                                                                                                             |
| setId           | `id` setter                                             | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                                   |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

## Example

<StackblitzExample path="form-antd-use-form" />

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[notification-provider]: /docs/api-reference/core/providers/notification-provider/
