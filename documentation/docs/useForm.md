---
slug: /useForm
id: useForm
title: useForm
---

`useForm` is used to edit, create and clone data then manage forms. It uses Ant-design [Form](https://ant.design/components/form/) data scope management under the hood and returns the required props for managing the form actions.

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

`useForm` can handle edit, create and clone actions. By default it determines the action from route. 
In the example if you navigate to `/resources/posts/edit/1234` it will manage the data of the post with id `1234` in an editing context. Firstly it will fill the form with data of the post with id `1234` and then will be able to edit the form further then submit the changes. 

Submit functionality is provided by `saveButtonProps` which includes all necessary props for a button to submit a form.