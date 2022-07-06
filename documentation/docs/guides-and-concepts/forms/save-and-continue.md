---
id: save-and-continue
title: Save and Continue
---

## How can I implement the save and continue feature?

refine provides you with the necessary methods to add this feature. This feature is familiar to [Django](https://www.djangoproject.com/) users.

We have three save options: `Save`, `Save and continue editing` and `Save and add another`.

Now let's see how to handle these cases,

<details>
<summary>Show Posts List</summary>
<p>

```tsx title="src/posts/pages/list.tsx"
import { useTable, useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });
    const { edit, create } = useNavigation();

    return (
        <div>
            <button onClick={() => create("posts")}>Create Post</button>
            <table>
                <thead>
                    <td>ID</td>
                    <td>Title</td>
                    <td>Actions</td>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                <button onClick={() => edit("posts", post.id)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
```

</p>
</details>

When we create our Create Page, we pass `redirect` false to the [`useForm`](/docs/core/hooks/useForm) hook that we will use to manage the form. Thus, we will be able to do the redirection we want in our buttons.

```tsx title="src/pages/create.tsx"
import React, { useState } from "react";
import { useSelect, useForm, useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
    const { formLoading, onFinish, redirect } = useForm({
        // highlight-next-line
        redirect: false,
    });

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });
};
```

We will create the form and listen to the changes in this form with the help of a state.We add the `Save`, `Save and continue editing` and `Save and add another` buttons that we will use to submit the form to our page.

:::info
`onFinish` function resolves respecting to the mutationMode property. In `pessimistic` mode it will resolve after the response is returned from the request, in `optimistic` and `undoable` modes it will resolve immediately. Only real await will happen in pessimistic mode and this will resolve with the response data, others will resolve immediately with undefined data.
:::

```tsx title="src/pages/create.tsx"
import React, { useState } from "react";
import { useSelect, useForm, useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        status: "draft",
        category: {
            id: "",
        },
    });
    const { formLoading, onFinish, redirect } = useForm({
        redirect: false,
    });

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });

    // highlight-start
    const handleSubmit = async (redirectTo: "list" | "edit" | "create") => {
        const response = await onFinish(formValues);

        setFormValues({
            title: "",
            content: "",
            status: "draft",
            category: {
                id: "",
            },
        });

        redirect(redirectTo, response?.data?.id);
    };
    // highlight-end

    return (
        <div>
            <button className="back" onClick={() => goBack()}>
                Go Back
            </button>
            <form className="form-wrapper">
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        required
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                title: e.target.value,
                            })
                        }
                        value={formValues.title}
                    />
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <select
                        required
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                status: e.target.value as IPost["status"],
                            })
                        }
                        value={formValues.status}
                    >
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category: </label>
                    <select
                        required
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                category: {
                                    id: e.target.value,
                                },
                            })
                        }
                        value={formValues.category.id}
                    >
                        <option value={""} disabled>
                            Please select
                        </option>
                        {options?.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Content: </label>

                    <textarea
                        required
                        onChange={(e) =>
                            setFormValues({
                                ...formValues,
                                content: e.target.value,
                            })
                        }
                        rows={10}
                        cols={50}
                        value={formValues.content}
                    />
                </div>
                <div className="saveActions">
                    // highlight-start
                    <button onClick={() => handleSubmit("list")} type="button">
                        Save
                    </button>
                    <button onClick={() => handleSubmit("edit")} type="button">
                        Save and continue editing
                    </button>
                    <button
                        onClick={() => handleSubmit("create")}
                        type="button"
                    >
                        Save and add another
                    </button>
                    // highlight-end
                </div>
                {formLoading && <p>Loading</p>}
            </form>
        </div>
    );
};
```
