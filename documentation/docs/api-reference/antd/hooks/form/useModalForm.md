---
id: useModalForm
title: useModalForm
sidebar_label: useModalForm
---

The `useModalForm` hook allows you to manage a form within a [`<Modal>`][antd-modal]. It returns Ant Design [`<Form>`][antd-form] and [Modal][antd-modal] components props.

:::info
`useModalForm` hook is extended from [`useForm`][antd-use-form] from the [`@refinedev/antd`][@refinedev/antd] package. This means that you can use all the features of [`useForm`][antd-use-form] hook.
:::

## Basic Usage

We'll show three examples, `"create"`, `"edit"` and `"clone"`. Let's see how `useModalForm` is used in all.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'},
]}>

<TabItem value="create">

In this example, we will show you how to create a record with `useModalForm`.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start

import React from "react";

import { List, EditButton, useTable, useModalForm } from "@refinedev/antd";
import { Table, Form, Select, Input, Modal, Space } from "antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-start
    const {
        modalProps: createModalProps,
        formProps: createFormProps,
        show: createModalShow,
    } = useModalForm<IPost>({
        action: "create",
    });
    // highlight-end

    return (
        <>
            <List
                // createButtonProps allows us to create and manage a button above the table.
                // This code block makes <Modal> appear when you click the button.
                createButtonProps={{
                    // highlight-start
                    onClick: () => {
                        createModalShow();
                    },
                    // highlight-end
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column dataIndex="status" title="Status" />
                </Table>
            </List>
            {/* highlight-start */}
            <Modal {...createModalProps}>
                <Form {...createFormProps} layout="vertical">
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
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
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
            </Modal>
            {/* highlight-end */}
        </>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="edit">

Let's learn how to add editing capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";

import { List, EditButton, useTable, useModalForm } from "@refinedev/antd";
import { Table, Form, Select, Input, Modal, Space } from "antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-start
    const {
        modalProps: editModalProps,
        formProps: editFormProps,
        show: editModalShow,
    } = useModalForm<IPost>({
        action: "edit",
        warnWhenUnsavedChanges: true,
    });
    // highlight-end

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column dataIndex="status" title="Status" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, record) => (
                            <Space>
                                {/* highlight-start */}
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => editModalShow(record.id)}
                                />
                                {/* highlight-end */}
                            </Space>
                        )}
                    />
                </Table>
            </List>
            {/* highlight-start */}
            <Modal {...editModalProps}>
                <Form {...editFormProps} layout="vertical">
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
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
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
            </Modal>
            {/* highlight-end */}
        </>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineAntdDemo />);
```

:::caution
**refine** doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens the edit form in `<Modal>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => <EditButton onClick={() => show(record.id)} />}
/>
```

:::

:::caution
Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

<TabItem value="clone">

Let's learn how to add cloning capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

import React from "react";

import { List, CloneButton, useTable, useModalForm } from "@refinedev/antd";
import { Table, Form, Select, Input, Modal, Space } from "antd";

const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-start
    const {
        modalProps: cloneModalProps,
        formProps: cloneFormProps,
        show: cloneModalShow,
    } = useModalForm<IPost>({
        action: "clone",
    });
    // highlight-end

    return (
        <>
            <List>
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column dataIndex="status" title="Status" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, record) => (
                            <Space>
                                {/* highlight-start */}
                                <CloneButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => cloneModalShow(record.id)}
                                />
                                {/* highlight-end */}
                            </Space>
                        )}
                    />
                </Table>
            </List>
            {/* highlight-start */}
            <Modal {...cloneModalProps}>
                <Form {...cloneFormProps} layout="vertical">
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
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
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
            </Modal>
            {/* highlight-end */}
        </>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
    resources: [
        {
            name: "posts",
            list: PostList,
        },
    ],
});

render(<RefineAntdDemo />);
```

:::caution
**refine** doesn't automatically add a `<CloneButton/>` to the each record in `<PostList>` which opens clone form in `<Modal>` when clicked.

So, we have to put the `<CloneButton/>` on our list. In that way, `<Clone>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => <CloneButton onClick={() => show(record.id)} />}
/>
```

:::

:::caution
Don't forget to pass the record id to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

</Tabs>

## Properties

:::tip
All [`useForm`][antd-use-form] props are also available in `useModalForm`. You can find descriptions on the [`useForm` documentation](/docs/api-reference/antd/hooks/form/useForm/#properties).
:::

### `syncWithLocation`

When `syncWithLocation` is `true`, the drawers visibility state and the `id` of the record will be synced with the URL. It is `false` by default.

This property can also be set as an object `{ key: string; syncId?: boolean }` to customize the key of the URL query parameter. `id` will be synced with the URL only if `syncId` is `true`.

```tsx
const modalForm = useModalForm({
    syncWithLocation: { key: "my-modal", syncId: true },
});
```

### `defaultFormValues`

:::caution
`defaultFormValues` is only available in `"create"` form.
:::

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
const modalForm = useModalForm({
    defaultFormValues: {
        title: "Hello World",
    },
});
```

### `defaultVisible`

When `defaultVisible` is `true`, the modal will be visible by default. It is `false` by default.

```tsx
const modalForm = useModalForm({
    defaultVisible: true,
});
```

### `autoSubmitClose`

`autoSubmitClose` will make the modal close after a successful submit. It is `true` by default.

```tsx
const modalForm = useModalForm({
    autoSubmitClose: false,
});
```

### `autoResetForm`

`autoResetForm` will reset the form after a successful submit. It is `true` by default.

```tsx
const modalForm = useModalForm({
    autoResetForm: false,
});
```

### `warnWhenUnsavedChanges`

When set to true, `warnWhenUnsavedChanges` shows a warning when the user tries to leave the page with unsaved changes. It is used to prevent the user from accidentally leaving the page. It is `false` by default

You can also set this value in [`<Refine>`](/docs/api-reference/core/components/refine-config/#warnwhenunsavedchanges) component.

```tsx
const modalForm = useModalForm({
    warnWhenUnsavedChanges: true,
});
```

### `overtimeOptions`

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds. `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useModalForm({
    //...
    overtimeOptions: {
        interval: 1000,
        onInterval(elapsedInterval) {
            console.log(elapsedInterval);
        },
    },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>}
```
### `autoSave`

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

:::caution
Works only in `action: "edit"` mode.
:::

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### `enabled`

To enable the `autoSave` feature, set the `enabled` parameter to `true`.

```tsx
useModalForm({
    autoSave: {
        enabled: true,
    },
})
```

#### `debounce`

Set the debounce time for the `autoSave` prop. Default value is `1000`.

```tsx
useModalForm({
    autoSave: {
        enabled: true,
        // highlight-next-line
        debounce: 2000,  
    },
})
```
#### `onFinish`

If you want to modify the data before sending it to the server, you can use `onFinish` callback function.

```tsx
useModalForm({
    autoSave: {
        enabled: true,
        // highlight-start
        onFinish: (values) => {
            return {
                foo: "bar",
                ...values,
            };
        },
        // highlight-end
    },
})
```
## Return Values

### `formProps`

It's required to manage `<Form>` state and actions. Under the hood the `formProps` came from [`useForm`][antd-use-form].

It contains the props to manage the [Antd `<Form>`](https://ant.design/components/form#api) components such as [`onValuesChange`, `initialValues`, `onFieldsChange`, `onFinish` etc.](/docs/api-reference/antd/hooks/form/useForm/#return-values)

### `modalProps`

The props needed by the [`<Modal>`][antd-modal] component.

#### `title`

> Default when url is `"/posts/create"`: "Create Post"

Title of the modal. Value is based on resource and action values.

#### `okText`

`okText` is the text of the `"submit"` button within the modal. It is "Save" by default.

#### `cancelText`

`cancelText` is the text of the `"cancel"` button within the modal. It is "Cancel" by default.

#### `width`

Width of the `<Modal>`. It is `1000px` by default.

#### `forceRender`

`forceRender` renders the `<Modal>` instead of lazy rendering it. It is `true` by default.

#### `okButtonProps`

`okButtonProps` contains all the props needed by the `"submit"` button within the modal (disabled,loading etc.). When `okButtonProps.onClick` is called, it triggers `form.submit()`. You can manually pass these props to your custom button.

#### `onOk`

A function that can submit the `<Form>` inside `<Modal>`. It's useful when you want to submit the form manually.

#### `onCancel`

> Same as `close`

A function that can close the `<Modal>`. It's useful when you want to close the modal manually.

#### ~~`visible`~~ <PropTag deprecated />

> This prop is deprecated. Please use `open` instead.

Current visible state of `<Modal>`. Default value depends on `defaultVisible` prop.

### `open`

Current visible state of `<Modal>`. Default value depends on `defaultVisible` prop.

### `close`

> Same as `onCancel`

A function that can close the `<Modal>`. It's useful when you want to close the modal manually.

```tsx
const { close, modalProps, formProps, onFinish } = useModalForm();

const onFinishHandler = (values) => {
    onFinish(values);
    close();
};

// ---

return (
    <Modal {...modalProps}>
        <Form {...formProps} onFinish={onFinishHandler} layout="vertical">
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
        </Form>
    </Modal>
);
```

### `submit`

`submit` is a function that can submit the form. It's useful when you want to submit the form manually.

```tsx
const { modalProps, formProps, submit } = useModalForm();

// ---

return (
    <Modal
        {...modalProps}
        footer={[
            <Button key="submit" type="primary" onClick={submit}>
                Submit
            </Button>,
        ]}
    >
        <Form {...formProps} layout="vertical">
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
        </Form>
    </Modal>
);
```

### `show`

`show` is a function that can show the modal.

```tsx
const { modalProps, formProps, show } = useModalForm();

return (
    <>
        <Button type="primary" onClick={() => show()}>
            Show Modal
        </Button>
        <Modal
            {...modalProps}
            footer={[
                <Button key="submit" type="primary" onClick={submit}>
                    Submit
                </Button>,
            ]}
        >
            <Form {...formProps} onFinish={onFinishHandler} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>
);
```

```tsx
const { modalProps, formProps } = useModalForm();

// ---

return (
    <Modal
        {...modalProps}
        footer={
            <Button
                onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> &
                        React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => modalProps.onCancel(e)}
            >
                Cancel
            </Button>
        }
    >
        <Form {...formProps} layout="vertical">
            <Form.Item label="Title" name="title">
                <Input />
            </Form.Item>
        </Form>
    </Modal>
);
```

### `overtime`

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useModalForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```
### `autoSaveProps`

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

## FAQ

### How can I change the form data before submitting it to the API?

Here is an example where we modify the form data before submit:

We need to send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import React from "react";
import { Modal, useModalForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const UserCreate: React.FC = () => {
    // highlight-start
    const { formProps, modalProps } = useModalForm({
        action: "create",
    });
    // highlight-end

    // highlight-start
    const handleOnFinish = (values) => {
        formProps.onFinish?.({
            fullName: `${values.name} ${values.surname}`,
        });
    };
    // highlight-end

    return (
        <Modal {...modalProps}>
            // highlight-next-line
            <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Surname" name="surname">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useModalForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). If `action` is `edit` instead, `redirect`s default value is `list`.

### Type Parameters

| Property       | Desription                                                                                                                                                          | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Values for params.                                                                                                                                                  | `{}`                       |                            |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return Value

| Key                      | Description                                                                                                | Type                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                                                                         | `(id?: BaseKey) => void`                                                                                                                                   |
| formProps                | [Props needed to manage form component](/docs/api-reference/antd/hooks/form/useModalForm/#formprops)       | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                    |
| modalProps               | [Props for needed to manage modal component](/docs/api-reference/antd/hooks/form/useModalForm/#modalprops) | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                   |
| formLoading              | Loading status of form                                                                                     | `boolean`                                                                                                                                                  |
| submit                   | Submit method, the parameter is the value of the form fields                                               | `() => void`                                                                                                                                               |
| open                     | Whether the modal dialog is open or not                                                                    | `boolean`                                                                                                                                                  |
| close                    | Specify a function that can close the modal                                                                | `() => void`                                                                                                                                               |
| defaultFormValuesLoading | DefaultFormValues loading status of form                                                                   | `boolean`                                                                                                                                                  |
| form                     | Ant Design form instance                                                                                   | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                             |
| id                       | Record id for edit action                                                                                  | [`BaseKey`][basekey] \| `undefined`                                                                                                                        |
| setId                    | `id` setter                                                                                                | `Dispatch<SetStateAction<` [`BaseKey`][basekey] \| `undefined>>`                                                                                           |
| queryResult              | Result of the query of a record                                                                            | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                              |
| mutationResult           | Result of the mutation triggered by submitting the form                                                    | [`UseMutationResult<{ data: TData }, TError, { resource: string; values: TVariables; }, unknown>`](https://react-query.tanstack.com/reference/useMutation) |
| overtime                 | Overtime loading props                                                                                     | `{ elapsedTime?: number }`                                                                                                                                 |
| autoSaveProps            | Auto save props                                                                                            | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }`                    |

## Example

<CodeSandboxExample path="form-antd-use-modal-form" />

[@refinedev/antd]: https://github.com/refinedev/refine/tree/master/packages/antd
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[basekey]: /api-reference/core/interfaces.md#basekey
[antd-use-form]: /docs/api-reference/antd/hooks/form/useForm
[antd-modal]: https://ant.design/components/modal/
[antd-form]: https://ant.design/components/form/
