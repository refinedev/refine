---
slug: /useStepsForm
id: useStepsForm
title: useStepsForm
---

import useStepsFormExample from '@site/static/img/use-steps-form-example.gif';

`refine`'s `useStepsForm` hook allows you to split your form under an ant-design based [Steps](https://ant.design/components/steps/) component and provides you with a few useful values to help you manage your form.

All we have to do is to pass the props it returns to our `<Steps>` and `<Form>` components.

## Example

For the sake of simplicity, we're going to build a `Post` create form that consists of only a `title` and a relational `category` field.

To split your form items under a `<Steps>` component, first import and use `useStepsForm` hook in your page:

```tsx title="src/pages/posts/create.tsx"
import {
    useSelect,
    useStepsForm,
    IResourceComponentsProps,
} from "@pankod/refine";

export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    //highlight-start
    const {
        current,
        gotoStep,
        stepsProps,
        formProps,
        saveButtonProps,
        queryResult,
    } = useStepsForm<IPost>();
    //highlight-end
    ...
}
```

`useStepsForm` is generic over the type form data to help you type check your code.

```ts title="src/interfaces.d.ts"
export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
}
```

This hook returns a set of useful values to render steps form. Given `current` value, you should have a way to render your form items conditionally with this index value. You can use an array to achieve this.

Here, each item of `formList` corresponds to one step in form:

```tsx title="src/pages/posts/create.tsx"
export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });
    //highlight-start
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
                <Select {...categorySelectProps} />
            </Form.Item>
        </>,
    ];
    //highlight-end
    ...
}
```

:::tip
Since `category` is a relational data, we use `useSelect` to fetch its data.

Refer to [useSelect](#useSelect) documentation for detailed usage.
:::

You should use `stepsProps` on `<Steps>` component, `formProps` on the `<Form>` component correctly. And as the last step, you should render the `<Steps>` component besides the form like this:

```tsx title="src/pages/posts/create.tsx"
export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    ...
    <Create
        {...props}
        saveButtonProps={saveButtonProps}
    >
        //highlight-start
        // make sure to add as much <Step> components
        // as the number of steps in `formList` array
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
}
```

:::tip
In this example, we're building a page for creating new resources using `<Create>` component. You can build an edit page with `<Edit>` component, without modifying any code in the rest of this example.
:::

To help users navigate between pages in the form, you can use action buttons. Your navigation buttons should use `gotoStep` function that was previously returned from the `useStepsForm` hook.

```tsx title="src/pages/posts/create.tsx"
export const PostCreate: React.FC<IResourceComponentsProps> = (props) => {
    ...
    return (
        <Create
            {...props}
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
                            {...saveButtonProps}
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
}
```

And it's done.

<div style={{textAlign: "center"}}>
    <img src={useStepsFormExample} />
</div>
