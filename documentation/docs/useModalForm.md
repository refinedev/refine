---
title: useModalForm
siderbar_label: useModalForm
---

The `useModalForm` hook allows you to easily open your form or anything you want within Modal. If we look in detail, `useModalForm` uses ant-design [form](https://ant.design/components/form/) and [modal](https://ant.design/components/modal/) components so it returns the appropriate values to the components. All we have to do is write the props it returns to the Modal and Form component.

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
         //highlight-end
    } = useModalForm<IPost>({
         // highlight-next-line
        action: "create",
    });
    ...

    return (
        //highlight-start
        <Modal {...createModalProps}>
            <Create {...props} saveButtonProps={createSaveButtonProps}>
                <Form {...createFormProps} layout="vertical">
        //highlight-end
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Radio.Group>
                            <Radio value={true}>Enable</Radio>
                            <Radio value={false}>Disable</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Create>
        </Modal>
    )
}

```

Burada bu kodun nasıl gözükeceğini gösteren bir gif olabilir.
Ayrıca List tıklayınca açılacağı yeri belirtmedik. List içine gönderebiliriz.

Daha sonrasında Edit için bir örnek gösterip.
Daha detaylı example için codesandbox'a yönlendirme yapılmalı.
Markdowntable olucak. Useform ve useModal'ın tüm proplarını aldığını belirtebiliriz.

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
-   `cloneId`: lorem lorem
