---
slug: /useStepsForm
id: useStepsForm
title: useStepsForm
---

import useStepsFormExample from '@site/static/img/use-steps-form-example.gif';

Using this hook, you can split your form contents under a [Steps Component](https://ant.design/components/steps/).

## Example

<div style={{textAlign: "center"}}>
    <img src={useStepsFormExample} />
</div>

To split your form items under a `Steps Component`, first import and use `useStepsForm` hook in your page:

```ts title="src/pages/posts/create.tsx"
import {
    useStepsForm,
    IResourceComponentsProps,
} from "@pankod/refine";

export const PostCreate = (props: IResourceComponentsProps) => {
    //highlight-start
    const {
        current,
        gotoStep,
        stepsProps,
        submit,
        formLoading,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<IPost>();
    //highlight-end
    ...
}
```

`useStepsForm` is generic over the type form data to help you type check your code. 

```ts title="src/interfaces/IPost.d.ts"
export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft";
    category: ICategory;
}
```

This hook returns a set of useful values for you to render your steps form. Given `current`, you should have a way to render your form items conditionally with this index value. You can use an array to achieve this: 

```ts
const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
});

const formList = [
    <>
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
    </>,
    <>
        <Form.Item
            label="Category"
            name={["category", "id"]}
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select
                showSearch
                filterOption={false}
                {...categorySelectProps}
            />
        </Form.Item>
    </>,
];
...
```
:::info about `useSelect`
Since `category` is a relational data, we use `useSelect` to fetch its name from its `id`.

Read more about [useSelect](useSelect.md).
:::

You should use `stepsProps` on `Steps` component, `formProps` on the `Form` component correctly. And as the last step, you should render the steps component besides the form like this:

```tsx
...
<Create
    {...props}
    saveButtonProps={saveButtonProps}
>
    //highlight-start
    <Steps {...stepsProps}>
        <Step title="First Step" />
        <Step title="Second Step" />
    </Steps>
    <Form {...formProps} layout="vertical">
        {formList[current]}
    </Form>
    //highlight-end
</Create>
...
```

To help your user navigate between pages in your form, you can use action buttons. Your navigation buttons should use `gotoStep` function that was previously returned from the `useStepsForm` hook.

```tsx
...
return (
    <Create
        {...props}
        saveButtonProps={saveButtonProps}
        //highlight-start
        actionButtons={
            <>
                {current > 0 && (
                    <Button
                        onClick={() => {
                            gotoStep(current - 1);
                        }}
                    >
                        Previous
                    </Button>
                )}
                {current < formList.length - 1 && (
                    <Button
                        onClick={() => {
                            gotoStep(current + 1);
                        }}
                    >
                        Next
                    </Button>
                )}
                {current === formList.length - 1 && (
                    <SaveButton
                        style={{ marginRight: 10 }}
                        onClick={() => submit()}
                    />
                )}
            </>
        }
        //highlight-end
    >
        <Steps {...stepsProps}>
            <Step title="About Post" />
            <Step title="Content" />
        </Steps>

        <div style={{ marginTop: 30 }}>
            <Form {...formProps} layout="vertical">
                {formList[current]}
            </Form>
        </div>
    </Create>
    );
...
```

And it's done.
