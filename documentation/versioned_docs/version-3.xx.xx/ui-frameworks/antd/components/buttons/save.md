---
id: save-button
title: Save
---

import saveButton from '@site/static/img/guides-and-concepts/components/buttons/save/save.png';

`<SaveButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses it for presantation purposes only. Some of the hooks that **refine** has adds features to this button.

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/ui-frameworks/antd/hooks/form/useForm.md) hook.

```tsx
import { Edit, Form, Input, useForm } from "@pankod/refine-antd";

export const PostEdit: React.FC = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        // highlight-next-line
        <Edit saveButtonProps={saveButtonProps}>
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

interface IPost {
    id: string;
    title: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={saveButton} alt="Default save button" />
</div>
<br/>

The [`useForm`](/ui-frameworks/antd/hooks/form/useForm.md) hook exposes `saveButtonProps` to be passed to `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { SaveButton } from "@pankod/refine-antd";

export const MyRefreshComponent = () => {
    return <SaveButton hideText />;
};
```

## API Reference

### Properties

| Property | Description                       | Type                                                                                   | Default                                                   |
| -------- | --------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| props    | Ant Design button props           | [`ButtonProps`](https://ant.design/components/button/#API) & `{ hideText?: boolean; }` |                                                           |
| hideText | Allows to hide button text        | `boolean`                                                                              | `false`                                                   |
| children | Sets the button text              | `ReactNode`                                                                            | `"Save"`                                                  |
| type     | Sets the button type              | `string`                                                                               | `"primary"`                                               |
| icon     | Sets the icon component of button | `ReactNode`                                                                            | [`<SaveOutlined />`](https://ant.design/components/icon/) |
