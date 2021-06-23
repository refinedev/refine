---
id: save-button
title: Save
---

import saveButtonProps from '@site/static/img/guides-and-concepts/components/buttons/save/saveButtonProps.png';

`<SaveButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses for presantation purposes only. Some refine hooks add features to this button.

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the `useForm` hook.

```tsx
import { Edit, Form, Input, useForm } from "@pankod/refine";

import { IPost } from "interfaces";

export const PostEdit: React.FC = (props) => {
    //highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        //highlight-next-line
        <Edit {...props} saveButtonProps={saveButtonProps}>
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
            </Form>
        </Edit>
    );
};
```

```ts
export interface IPost {
    id: string;
    title: string;
}
```

Looks like this:

<div>
    <img  src={saveButtonProps} alt="Default Save Button" />
</div>
<br/>

In this example, `useForm` hook gives properties the `<SaveButton>` component to submit the form, loading button, disable button via `saveButtonProps`.

## API Reference

### Properties

| Property | Description                      | Type                                                       | Default                                                   |
| -------- | -------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| props    | Ant Design button props          | [`ButtonProps`](https://ant.design/components/button/#API) |                                                           |
| children | Set the button text              | `ReactNode`                                                | `"Save"`                                                  |
| type     | Set the button type              | `string`                                                   | `"primary"`                                               |
| icon     | Set the icon component of button | `ReactNode`                                                | [`<SaveOutlined />`](https://ant.design/components/icon/) |
