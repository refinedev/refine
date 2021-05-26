---
slug: /custom-form-validation
id: customFormValidation
title: Custom Form Validation
---

import createForm from '@site/static/img/custom-form-validation.gif';

In refine, we can use the form validation that comes with `antd` with the `rules` prop of the `Form.Item` component.

```tsx
<Form>
    <Form.Item
        label="Title"
        name="title"
        // highlight-start
        rules={[
            {
                required: true,
            },
            {
                min: 5,
            },
        ]}
        // highlight-end
    >
        <Input />
    </Form.Item>
    ...
</Form>
```

In addition to pre-defined rules, we can also prepare **custom rules** with the validator function.

### Example

Now let's prepare a rule that checks that the title of posts is unique. We have an endpoint like the one below. We will do the uniqueness check here.

```json title="https://refine-fake-rest.pankod.com/posts-unique-check?title=Example"
{
    "isAvailable": true
}
```

```tsx
import { useApiUrl, useCustom, HttpError } from "@pankod/refine";

interface PostUniqueCheckResponse {
    isAvailable: boolean;
}

interface PostUniqueCheckRequestQuery {
    title: string;
}


export const PostCreate = (props: IResourceComponentsProps) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    // highlight-start
    const apiUrl = useApiUrl();
    const url = `${apiUrl}/posts-unique-check`;

    const [title, setTitle] = useState("");

    const { refetch } = useCustom<
    PostUniqueCheckResponse, 
    HttpError, 
    PostUniqueCheckRequestQuery
    >
    (
        url,
        "get",
        {
            query: {
                title,
            },
        },
        {
            enabled: false,
        },
    );
    // highlight-end

    return (
        <Create {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    // highlight-start
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
                                    new Error("'title' is must be unique"),
                                );
                            },
                        },
                    ]}
                    // highlight-end
                >
                    // highlight-next-line
                    <Input onChange={(event) => setTitle(event.target.value)} />
                </Form.Item>
                ...
        </Create>
    );
};

```

<>

<div style={{textAlign: "center"}}>
<img src={createForm} />
</div>
<br/>
</>

:::danger important
Value must be kept in the state.

```tsx
<Input onChange={(event) => setTitle(event.target.value)} />
```

:::
