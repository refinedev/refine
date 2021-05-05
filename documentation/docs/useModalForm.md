---
title: useModalForm
siderbar_label: useModalForm
---

import createGif from '@site/static/img/create-useModalForm.gif';
import editGif from '@site/static/img/edit-useModalForm.gif';

The `useModalForm` hook allows you manage a form within Modal. If we look in detail, `useModalForm` uses ant-design [Form](https://ant.design/components/form/) and [Modal](https://ant.design/components/modal/) components data scope management under the hood and returns the appropriate values to the components.

All we have to do is pass the props it returns to the `<Modal>` and `<Form>` components.

For example, let's look at an example of creating a record with `useModalForm`.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "../../interfaces";

export const PostList (props) => {

    //highlight-start
    const {
        modalProps,
        formProps,
        show,
        saveButtonProps,
    } = useModalForm<IPost>({
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
                <Create {...props} saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Create>
            </Modal>
            //highlight-end
        </>
    )
}

```

`createButtonProps` allows creating and managing a button above the table.

```tsx
    createButtonProps={{
        onClick: () => {
            show();
        },
    }}
```

This code block makes `<Modal>` appear when you click the button.

`saveButtonProps` allows us to manage save button in the modal.

<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>

<br />

Let's learn how to add editing capability to records that will be opening form in Modal with using `action` prop.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "../../interfaces";

export const PostList (props) => {
    const {
        modalProps,
        formProps,
        show,
        saveButtonProps,
        //highlight-start
        deleteButtonProps,
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
                            <EditButton
                                size="small"
                                recordItemId={record.id}
                                onClick={() => show(record.id)}
                            />
                            //highlight-end
                        )}
                    />
                </Table>
            </List>
            <Modal {...modalProps}>
            //highlight-next-line
                <Edit
                    {...props}
                    saveButtonProps={saveButtonProps}
                    //highlight-start
                    deleteButtonProps={deleteButtonProps}
                    recordItemId={editId}
                    //highlight-end
                >
                    <Form {...formProps} layout="vertical">
                        <Form.Item label="Title" name="title">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="published">Published</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Edit>
            </Modal>
        </>
    )
}
```

:::important
`refine` doesn't automatically add a edit button by default to the each record in `<PostList>` which opens edit form in `<Modal>` when clicking.

So, we put the edit buttons on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by record `id`.

```tsx
<Table.Column<IPost>
    title="Actions"
    dataIndex="actions"
    key="actions"
    render={(_value, record) => (
        <EditButton
            size="small"
            recordItemId={record.id}
            onClick={() => show(record.id)}
        />
    )}
/>
```

:::

The `saveButtonProps` and `deleteButtonProps` can provides functionality to save and delete buttons in the modal.

<div style={{textAlign: "center"}}>
    <img src={editGif} />
</div>

<br />

Refer to [codesandbox](https://www.google.com.tr) example for detailed usage.

<!-- Markdowntable olucak.
Useform ve useModal'ın tüm proplarını aldığını belirtebiliriz.

`useModalForm` expects argument with the following keys:

-   `action`: lorem lorem
-   `autoSubmitClose`: lorem lorem
-   `defaultFormValues`: lorem lorem
-   `defaultVisible`: lorem lorem
-   `form`: lorem lorem
-   `mutationMode`: lorem lorem
-   `onMutationError`: lorem lorem
-   `onMutationSuccess`: lorem lorem
-   `redirect`: lorem lorem
-   `submit`: lorem lorem
-   `submitOnEnter`: lorem lorem
-   `undoableTimeout`: lorem lorem
-   `warnWhenUnsavedChanges`: lorem lorem

The return value of `useModalForm` is an object, using the following keys:

-   `show`: lorem lorem
-   `formProps`: lorem lorem
-   `modalProps`: lorem lorem
-   `saveButtonProps`: lorem lorem
-   `deleteButtonProps`: lorem lorem
-   `formLoading`: lorem lorem
-   `submit`: lorem lorem
-   `initialValues`: lorem lorem
-   `visible`: lorem lorem
-   `close`: lorem lorem
-   `defaultFormValuesLoading`: lorem lorem
-   `formValues`: lorem lorem
-   `formResult`: lorem lorem
-   `form`: lorem lorem
-   `editId`: lorem lorem
-   `setEditId`: lorem lorem
-   `queryResult`: lorem lorem
-   `mutationResult`: lorem lorem
-   `setCloneId`: lorem lorem
-   `cloneId`: lorem lorem -->
