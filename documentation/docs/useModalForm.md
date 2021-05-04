---
title: useModalForm
siderbar_label: useModalForm
---

import createGif from '@site/static/img/create-useModalForm.gif';
import editGif from '@site/static/img/edit-useModalForm.gif';

The `useModalForm` hook allows you manage a form within Modal. If we look in detail, `useModalForm` uses ant-design [Form](https://ant.design/components/form/) and [Modal](https://ant.design/components/modal/) components so it returns the appropriate values to the components. All we have to do is pass the props it returns to the Modal and Form components.

For example, let's look at an example of creating a record with `useModalForm`.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "../../interfaces";

export const PostList (props) => {
    ...
    const {
         //highlight-start
        modalProps,
        formProps,
        show,
        saveButtonProps,
         //highlight-end
    } = useModalForm<IPost>({
         // highlight-next-line
        action: "create",
    });
    ...

    return (
        <>
            <List
                ...
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
            //highlight-end
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
        </>
    )
}

```

Let's see how it looks

<div style={{textAlign: "center"}}>
    <img src={createGif} />
</div>

<br />

With the `saveButtonProps` value coming from our hook, save button is automatically activated.

Let's learn the edit action of modal. Now, just like in the example above, we will open the records that we can edit in the modal.

```tsx title="pages/posts/list.tsx"
import { useModalForm, Modal, Form, Create, Radio } from "@pankod/refine";
import { IPost } from "../../interfaces";

export const PostList (props) => {
    ...
    const {
        //highlight-start
        modalProps,
        formProps,
        show,
        saveButtonProps,
        deleteButtonProps,
        editId,
         //highlight-end
    } = useModalForm<IPost>({
         // highlight-next-line
        action: "edit",
    });
    ...

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
                            <EditButton
                                size="small"
                                recordItemId={record.id}
                                onClick={() => show(record.id)}
                            />
                        )}
                    />
                </Table>
            </List>
            //highlight-start
            <Modal {...modalProps}>
                <Edit
                    {...props}
                    recordItemId={editId}
                    saveButtonProps={saveButtonProps}
                    deleteButtonProps={deleteButtonProps}
                >
                    <Form {...formProps} layout="vertical">
            //highlight-end
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
        </>
    )
}
```

We put the edit buttons on our list. In this way, our modal form can fetch data by record `id`.

<div style={{textAlign: "center"}}>
    <img src={editGif} />
</div>

<br />

The `saveButtonProps` and `deleteButtonProps` values coming from our hook, save, delete, and refresh button is automatically activated.

For a more detailed codesandbox example, you can see [here](https://www.google.com.tr).

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
