---
id: custom-form-validation
title: Custom Form Validation
---

import customValidation from '@site/static/img/examples/form/custom-form-validation.gif';

In refine, we can use the form validation that comes with `Ant Design` with the [rules](https://ant.design/components/form/#Rule) property of the [Form.Item](https://ant.design/components/form/#Form.Item) component.

```tsx {4-11}
<Form>
    <Form.Item
        label="Title"
        name="title"
        rules={[
            {
                required: true,
            },
            {
                min: 5,
            },
        ]}
    >
        <Input />
    </Form.Item>
    ...
</Form>
```

In addition to pre-defined rules, we can also prepare **custom rules** with the validator function.

### Example

Now let's prepare a rule that checks if the titles of the posts are unique. We have an endpoint like the below. We will do the uniqueness check here.

```json title="https://api.fake-rest.refine.dev/posts-unique-check?title=Example"
{
    "isAvailable": true
}
```

```tsx twoslash {1, 6-26, 34-50, 52}
import { useState } from "react";
import { useApiUrl, useCustom, HttpError, useForm, Form, Create, Input } from "@pankod/refine";

export const PostCreate = () => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    const [title, setTitle] = useState("");

    const apiUrl = useApiUrl();
    const url = `${apiUrl}/posts-unique-check`;
    const { refetch } = useCustom<
        PostUniqueCheckResponse,
        HttpError,
        PostUniqueCheckRequestQuery
    >
    ({
        url,
        method: "get",
        config: {
            query: {
                title,
            },
        },
        queryOptions: {
            enabled: false,
        },
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            validator: async (_, value) => {
                                if (!value) return;
                                const { data } = await refetch();
                                if (data && data.data.isAvailable) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("'title' must be unique"),
                                );
                            },
                        },
                    ]}
                >
                    <Input onChange={(event) => setTitle(event.target.value)} />
                </Form.Item>
                ...
            </Form>
        </Create>
    );
};

interface IPost {
    title: string;
}

interface PostUniqueCheckResponse {
    isAvailable: boolean;
}

interface PostUniqueCheckRequestQuery {
    title: string;
}
```

<>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={customValidation} alt="custom form validation" />
</div>
<br/>
</>

:::danger important
Value must be kept in the state.

```tsx
<Input onChange={(event) => setTitle(event.target.value)} />
```

:::
