---
slug: /useForm
id: useForm
title: useForm
---

`useForm` is used to edit, create and clone data then manage forms. It uses Ant-design [Form](https://ant.design/components/form/) data scope management under the hood and returns the required props for managing the form actions.

## Example

We'll show the basic usage of `useForm` by adding an editing form.


```tsx title="pages/posts/edit.tsx"
  //highlight-next-line
import { Edit, Form, Input, IResourceComponentsProps, useForm } from "@pankod/refine";

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

`useForm` can handle edit, create and clone actions. 

:::tip Important
By default it determines the action from route. Also it can take an action parameter for the situations where it isn't possible to determine the action from route i.e. using a form in a modal or using a custom route.

```tsx
const { formProps, saveButtonProps } = useForm<IPost>({action: "edit"});
```
:::

In the example if you navigate to `/resources/posts/edit/1234` it will manage the data of the post with id `1234` in an editing context. 

Firstly it will fill the form with the data of the post with id `1234` and then be ready to edit the form further and submit the changes. 

Submit functionality is provided by `saveButtonProps` which includes all necessary props for a button to submit a form including automatically updating loading states.

`useForm` accepts type parameters for the record in use and for the response type of the mutation. `IPost` in the example represents the record to edit. It is also used as default type for mutation response.

## Parameters

### action


### resource
### mutationMode
### onMutationSuccess
### onMutationError
### submitOnEnter
### warnWhenUnsavedChanges
### redirect
### undoableTimeout

## Returns

### editId
### setEditId
### saveButtonProps
### queryResult
### mutationResult
### formLoading


<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modalProps</td>
      <td>antd Modal props</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>Specify a function that can open the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>Specify a function that can close the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
    </tr>
  </tbody>
</table>