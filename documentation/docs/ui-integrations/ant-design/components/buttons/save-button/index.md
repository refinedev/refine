---
title: Save
swizzle: true
---

`<SaveButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses it for presantation purposes only. Some of the hooks that Refine has adds features to this button.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/docs/packages/list-of-packages)

:::

## Usage

Let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/docs/ui-integrations/ant-design/hooks/use-form) hook:

```tsx live url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

const PostEdit: React.FC = () => {
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
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        edit: PostEdit,
        list: () => {
          return (
            <RefineAntd.List>
              <p>Your list page here</p>
            </RefineAntd.List>
          );
        },
      },
    ]}
  />,
);
```

The [`useForm`](/docs/ui-integrations/ant-design/hooks/use-form) hook exposes `saveButtonProps` to be passed to the `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { SaveButton } from "@refinedev/antd";

const MySaveComponent = () => {
  return (
    <SaveButton
      // highlight-next-line
      hideText
    />
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MySaveComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/SaveButton" />

:::simple External Props

`<SaveButton>` also accepts all props of Ant Design's [Button](https://ant.design/components/button/#API) component.

:::
