---
id: useModalForm
title: useModalForm
---

import createGif from '@site/static/img/hooks/useModalForm/create.gif';
import editGif from '@site/static/img/hooks/useModalForm/edit.gif';

`useModalForm` hook allows you manage a form within a modal. It returns Ant Design [Form](https://ant.design/components/form/) and [Modal](https://ant.design/components/modal/) components props.

```ts
const { modalProps, formProps } = useModalForm<IPost>();
```

All we have to do is to pass the `modalProps` to `<Modal>` and `formProps` to `<Form>` components.

## Usage

We'll do two examples, one for creating a post and one for editing a post. Let's see how `useModalForm` is used in both.

### Create Modal

For example, let's look at an example of creating a record with `useModalForm`.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    //highlight-start
    const { modalProps, formProps, show } = useModalForm<IPost>({
        action: "create",
    });
    //highlight-end

    return (
        <>
            <List
                //highlight-start
                createButtonProps={{
                    onClick: () => {
                        show();
                    },
                }}
                //highlight-end
            >
                ...
            </List>
            //highlight-start
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
            //highlight-end
        </>
    );
};
```

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

<br/>

`createButtonProps` allows creating and managing a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Modal>` appear when you click the button.


<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>

<br />

### Edit Modal

Let's learn how to add editing capability to records that will be opening form in Modal with using `action` prop.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const {
        modalProps,
        formProps,
        show,
        //highlight-start
        editId,
        //highlight-end
    } = useModalForm<IPost>({
        //highlight-next-line
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
                            //highlight-start
                            <EditButton onClick={() => show(record.id)} />
                            //highlight-end
                        )}
                    />
                </Table>
            </List>
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
        </>
    );
};
```

<br />

:::important
refine doesn't automatically add a edit button by default to the each record in `<PostList>` which opens edit form in `<Modal>` when clicking.

So, we put the edit buttons on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by record `id`.

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

<div style={{textAlign: "center"}}>
    <img src={editGif} />
</div>

<br />

[Refer to codesandbox example for detailed usage. &#8594](https://www.google.com.tr)

## API Reference

### Properties

| Key                                              | Description                                                                                                                                                                             | Type                                                                           | Default    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------- |
| action <div className=" required">Required</div> | Type of form mode                                                                                                                                                                       | `"edit"` \| `"create"`                                                         | `"create"` |
| autoSubmitClose                                  | Close modal after submit                                                                                                                                                                | `boolean`                                                                      |            |
| form                                             | Ant Design form instance                                                                                                                                                                | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance) |            |
| mutationMode                                     | [Determines when mutations are executed](guides-and-concepts/mutation-mode.md). If not explicitly configured, it is read from the mutation mode config of the resource in current route | `"pessimistic"` \| `"optimistic"` \| `"undoable"`                              |            |
| onMutationError                                  | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) encounters an error                                                                                      | `(error: TError, variables: TVariables, context: any) => void`                 |            |
| onMutationSuccess                                | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful                                                                                            | `(data: TData, variables: TVariables, context: any) => void`                   |            |
| redirect                                         | Page to redirect after succesfull mutation                                                                                                                                              | `"show` \| `"edit` \| `"list"`\*\*                                             |            |
| submit                                           | Submit the form                                                                                                                                                                         | `(values?: TVariables) => Promise<TData>`                                      |            |
| submitOnEnter                                    | Listen `Enter` key press to submit form                                                                                                                                                 | `boolean`                                                                      | `false`    |
| undoableTimeout                                  | Duration to wait before executing mutations when `mutationMode = "undoable"`                                                                                                            | `number`                                                                       | `5000`\*   |
| warnWhenUnsavedChanges                           | Shows notification when unsaved changes exist                                                                                                                                           | `boolean`                                                                      | `false`\*  |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](#)>** component. `useModalForm` will use what is passed to `<Refine>` as default and can override locally.

> `**`: If not explicitly configured, default value of `redirect` depends which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). Otherwise if `action` is `edit`, `redirect`s default value is `list`.

### Return Value

| Key                      | Description                                                  | Type                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| show                     | A function that can open the modal                           | `(id?: string) => void`                                                                                                                                                               |
| formProps                | Ant Design form props                                        | [`FormProps`](https://ant.design/components/form/#Form)                                                                                                                               |
| modalProps               | Props for managed modal                                      | [`ModalProps`](https://ant.design/components/modal/#API)                                                                                                                              |
| formLoading              | Loading status of form                                       | `boolean`                                                                                                                                                                             |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                                                                                                                          |
| visible                  | Whether the modal dialog is visible or not                   | `boolean`                                                                                                                                                                             |
| close                    | Specify a function that can close the modal                  | `() => void`                                                                                                                                                                          |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                                                                                                                             |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)                                                                                                        |
| editId                   | Record id for edit action                                    | `string`                                                                                                                                                                              |
| setEditId                | `editId` setter                                              | `Dispatch<SetStateAction<` `string` \| `undefined>>`                                                                                                                                  |
| queryResult              | Result of the query of a record                              | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery)                                                                                         |
| mutationResult           | Result of the mutation triggered by submitting the form      | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`](https://react-query.tanstack.com/reference/useMutation) |
| setCloneId               | `cloneId` setter                                             | `Dispatch<SetStateAction<` `string` \| `undefined>>`                                                                                                                                  |
| cloneId                  | Record id for clone action                                   | `string`                                                                                                                                                                              |

## Live Codesandbox Example

   <iframe src="https://codesandbox.io/embed/refine-use-modal-form-example-qbi4m?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Flist.tsx&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-modal-form-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
