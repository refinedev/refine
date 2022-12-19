---
id: useModalForm
title: useModalForm
---


`useModalForm` hook allows you to manage a form within a modal. It returns Ant Design [Form](https://ant.design/components/form/) and [Modal](https://ant.design/components/modal/) components props.

```ts
import { useModalForm } from "@pankod/refine-antd";

const { modalProps, formProps } = useModalForm<IPost>({
    action: "create", // or "edit"
});
```

All we have to do is to pass the `modalProps` to `<Modal>` and `formProps` to `<Form>` components.

## Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useModalForm` is used in both.

### Create Modal

In this example, we will show you how to create a record with `useModalForm`.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio, List, Input } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
// highlight-start
    const { modalProps, formProps, show } = useModalForm<IPost>({
        action: "create",
    });
// highlight-end

    return (
        <>
            <List
// highlight-start
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
// highlight-end
            >
                ...
            </List>
// highlight-start
            <Modal {...modalProps}>
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value="draft">Draft</Radio>
                            <Radio value="published">Published</Radio>
                            <Radio value="rejected">Rejected</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
// highlight-end
        </>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>

`createButtonProps` allows us to create and manage a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Modal>` appear when you click the button.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useModalForm/create.gif" alt="Create modal action" />
</div>

<br />

### Edit Modal

Let's learn how to add editing capabilities to records that will be opening form in Modal by using the `action` prop.

```tsx  title="pages/posts/list.tsx"
import {
    useModalForm,
    Modal,
    Form,
    Create,
    Radio,
    List,
    Table,
    EditButton,
    Input
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const {
        modalProps,
        formProps,
        show,
        id,
    } = useModalForm<IPost>({
// highlight-next-line
        action: "edit",
    });

    return (
        <>
            <List>
                <Table>
                    ...
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_value, record) => (
// highlight-next-line
                            <EditButton onClick={() => show(record.id)} />
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps}>
// highlight-next-line
                <Form {...formProps} layout="vertical">
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value="draft">Draft</Radio>
                            <Radio value="published">Published</Radio>
                            <Radio value="rejected">Rejected</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br />

:::caution
**refine** doesn't automatically add a edit button to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the edit buttons on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

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
Don't forget to pass the record id to `show` to fetch the record data. This is necessary for both edit and clone forms.
:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useModalForm/edit.gif" alt="Edit modal action" />
</div>

<br />


## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useModalForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). If `action` is `edit` instead, `redirect`s default value is `list`.

### Return Value

| Key                      | Description                                                  | Type                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                           | `(id?: BaseKey) => void`                                                                                                                                                              |
| formProps                | Ant Design form props                                        | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                                               |
| modalProps               | Props for managed modal                                      | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                                              |
| formLoading              | Loading status of form                                       | `boolean`                                                                                                                                                                             |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                                                                                                                          |
| open                     | Whether the modal dialog is open or not                      | `boolean`                                                                                                                                                                             |
| close                    | Specify a function that can close the modal                  | `() => void`                                                                                                                                                                          |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                                                                                                                             |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                                                        |
| id                       | Record id for edit action                                    | [`BaseKey`][basekey] \| `undefined`                                                                                                                                                   |
| setId                    | `id` setter                                                  | `Dispatch<SetStateAction<` [`BaseKey`][basekey] \| `undefined>>`                                                                                                                      |
| queryResult              | Result of the query of a record                              | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                                                         |
| mutationResult           | Result of the mutation triggered by submitting the form      | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |


### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] |
| TError     | Custom error object that extends [`HttpError`][HttpError]        | [`HttpError`][HttpError]   |
| TVariables | Values for params.                                               | `{}`                       |

## Example

   <StackblitzExample path="form-antd-use-modal-form" />

[BaseRecord]: /api-reference/core/interfaces.md#baserecord
[HttpError]: /api-reference/core/interfaces.md#httperror
[basekey]: /api-reference/core/interfaces.md#basekey