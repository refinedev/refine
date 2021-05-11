---
slug: /useForm
id: useForm
title: useForm
---

`useForm` is used to manage forms. It uses Ant-design [Form](https://ant.design/components/form/) data scope management under the hood and returns the required props for managing the form actions.

## Example

We'll show the basic usage of `useForm` by adding an editing form.

```tsx title="pages/posts/edit.tsx"
  //highlight-next-line
import { Edit, Form, Input, IResourceComponentsProps, useForm, Select } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostEdit = (props: IResourceComponentsProps) => {

     //highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
          //highlight-next-line
        <Edit {...props} saveButtonProps={saveButtonProps}>
          //highlight-next-line
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
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
```

```tsx
const { formProps, saveButtonProps } = useForm<IPost>();
```

`formProps` includes all necessary values to manage Ant-design Form components. 

In the example if you navigate to `/resources/posts/edit/1234` it will manage the data of the post with id `1234` in an editing context. See [Actions](#actions) on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with id `1234` and then the form will be ready to edit further and submit the changes. 

Submit functionality is provided by `saveButtonProps` which includes all necessary props for a button to submit a form including automatically updating loading states.

`useForm` accepts type parameters for the record in use and for the response type of the mutation. `IPost` in the example represents the record to edit. It is also used as default type for mutation response.


## Actions

`useForm` can handle edit, create and clone actions. 

:::tip
By default it determines the action from route. In the example the route is `/resources/posts/edit/1234` thus this is an editing form.  
::: 

It can take an `action` parameter for the situations where it isn't possible to determine the action from route i.e. using a form in a modal, using a custom route.

```tsx
const { formProps, saveButtonProps } = useForm({ action: "edit" });
```

### `action: "edit"`

Used for editing an existing record. Form initially will be filled with the data of the record.
### `action: "create"`

Used for creating a new record that didn't exist before.

### Clone mode
When creating a new record, `useForm` can initialize the form with the data of an existing record.

`useForm` works on clone mode when route has a `create` and `id` params like `resources/create/1234`.  
Alternatively, if route doesn't have those params, action can be set with `action: "create"` and id can be set with `setCloneId`.

```tsx
const { setCloneId } = useForm();
```
:::tip 
If you want to show a form in a modal or drawer where necessary route params might not be there you can use [useModalForm](useModalForm) or [useDrawerForm](useDrawerForm) hook.
:::

:::tip 
`<CloneButton>` can be used to navigate to a create route with id like `resources/create/1234`.

```tsx
<CloneButton recordItemId={record.id} />
```
Also `clone` method from [useNavigation](#) hook can be used too.

```tsx
const { clone } = useNavigation()

<Button onClick={() => clone("posts", "push", record.id)} />
```
:::

## API Reference

### Properties

| Property               | Description                                                                                        | Type                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| action                 | Type of form mode                                                                                  | `"edit"` \| `"create"`                                            |
| resource               | [`Resource`](#) for API data interactions                                                          | `string`                                                          |
| onMutationSuccess      | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) is successful       | `(data: UpdateResponse<M>, variables: any, context: any) => void` |
| onMutationError        | Called when [mutation](https://react-query.tanstack.com/reference/useMutation) encounters an error | `(error: any, variables: any, context: any) => void`              |
| mutationMode           | [Determines when mutations are executed](#)                                                        | ` "pessimistic` \| `"optimistic` \| `"undoable"`                  |
| submitOnEnter          | Listen `Enter` key press to submit form                                                            | `boolean`                                                         |
| warnWhenUnsavedChanges | Shows notification when unsaved changes exist                                                      | `boolean`                                                         |
| redirect               | Page to redirect after succesfull mutation                                                         | ` "show` \| `"edit` \| `"list"` \| `false`                        |
| undoableTimeout        | Duration to wait before executing mutations when `mutationMode = "undoable"`                       | `number`                                                          |

<br/>

### Return values

| Property        | Description                                             | Type                                                                             |
| --------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| form            | Ant design form instance                                | [`FormInstance`](https://ant.design/components/form/#FormInstance)               |
| formProps       | Ant design form props                                   | [`FormProps`](https://ant.design/components/form/#Form)                          |
| saveButtonProps | Props for a submit button                               | `{ disabled: boolean; onClick: () => void; loading?:boolean; }`                  |
| queryResult     | Result of the query of a record                         | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)  |
| mutationResult  | Result of the mutation triggered by submitting the form | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation) |
| formLoading     | Loading state of form request                           | `boolean`                                                                        |
| cloneId         | Record id for clone action                              | `"string"` \| `"number"`                                                         |
| setCloneId      | `cloneId` setter                                        | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                 |
| editId          | Record id for edit action                               | `"string"` \| `"number"`                                                         |  |
| setEditId       | `editId` setter                                         | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                 |
