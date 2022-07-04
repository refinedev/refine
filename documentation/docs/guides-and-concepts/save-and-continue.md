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

```tsx title="src/pages/create.tsx"
import { useState } from "react";
import { useSelect, useForm, useNavigation } from "@pankod/refine-core";
import { v4 as uuidv4 } from "uuid";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
    const [formValues, setFormValues] = useState({
        id: uuidv4(),
        title: "",
        content: "",
        status: "draft",
        category: {
            id: "",
        },
    });
    const { formLoading, onFinish, redirect, id } = useForm({
        redirect: false,
        id: formValues.id,
    });

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });
    // highlight-start
    const handleSubmit = async (
        e: any,
        redirectTo: "list" | "edit" | "create",
    ) => {
        e.preventDefault();
        await onFinish(formValues);

        setFormValues({
            id: "1",
            title: "",
            content: "",
            status: "draft",
            category: {
                id: "",
            },
        });

        redirect(redirectTo);
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
                    <input
                        onClick={() => handleSubmit(event, "list")}
                        type="submit"
                        value="Save"
                    />
                    <input
                        onClick={() => handleSubmit(event, "edit")}
                        type="submit"
                        value="Save and continue editing"
                    />
                    <input
                        onClick={() => handleSubmit(event, "create")}
                        type="submit"
                        value="Save and add another"
                    />
                    // highlight-end
                </div>
                {formLoading && <p>Loading</p>}
            </form>
        </div>
    );
};
```
