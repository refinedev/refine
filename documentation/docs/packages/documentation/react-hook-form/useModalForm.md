---
id: useModalForm
title: useModalForm
---


`useModalForm` hook allows you to manage a form within a modal. It provides some useful methods to handle the form modal.

:::info
`useModalForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package.
:::

## Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useModalForm` is used in both.

Before we start, let's create a basic `<Modal>` component.

```tsx title="src/components/modal.tsx"
type ModalPropsType = {
    isOpen: boolean;
    onClose: () => void;
};

export const Modal: React.FC<ModalPropsType> = ({
    isOpen,
    onClose,
    children,
}) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-title">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </>
    );
};
```

<details>
  <summary>See styles</summary>
  <div>

```css title="src/styles.css"
* {
    box-sizing: border-box;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 1000;
    width: 500px;
    overflow-y: auto;
}

.modal .modal-title {
    display: flex;
    justify-content: flex-end;
    padding: 4px;
}

.modal .modal-content {
    padding: 0px 16px 16px 16px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form input,
select,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
```

  </div>
</details>

### Create Modal

We'll create a `PostList` page that will display a list of posts. It will also display a `<CreatePost>` modal that will allow us to create a new post. We'll use `useModalForm` to manage the modal.

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
//highlight-next-line
import { useModalForm } from "@pankod/refine-react-hook-form";

//highlight-next-line
import { CreatePost, EditPost } from "components";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    //highlight-start
    const createModalFormReturnValues = useModalForm({
        refineCoreProps: { action: "create" },
    });
    //highlight-end

    //highlight-start
    const {
        modal: { show: showCreateModal },
    } = createModalFormReturnValues;
    //highlight-end

    return (
        <div>
            //highlight-start
            <CreatePost {...createModalFormReturnValues} />
            <button onClick={() => showCreateModal()}>Create Post</button>
            //highlight-end
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

`<CreatePost>` component will be used to create a new post.

```tsx title="src/components/post/create.tsx"
import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";

import { Modal } from "../modal";

export const CreatePost: React.FC<UseModalFormReturnType> = ({
    register,
    formState: { errors },
    refineCore: { onFinish, formLoading },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
}) => {
    return (
        <Modal isOpen={visible} onClose={close}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        {...register("title", {
                            required: "This field is required",
                        })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <select {...register("status")}>
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea
                        {...register("content", {
                            required: "This field is required",
                        })}
                        rows={10}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>
                <button type="submit" {...saveButtonProps}>
                    {formLoading ? "Loading" : "Save"}
                </button>
            </form>
        </Modal>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/packages/react-hook-form/useModalForm/create-modal.gif" alt="Create Modal" />
</div>

### Edit Modal

Now we'll create a `<EditPost>` component that will allow us to edit a post within the modal. Also, we'll add a button to specify that wich post to edit.

```tsx title="src/pages/posts/list.tsx"
import { useTable } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";

//highlight-next-line
import { CreatePost, EditPost } from "components";
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

    const createModalFormReturnValues = useModalForm({
        refineCoreProps: { action: "create" },
    });
    //highlight-start
    const editModalFormReturnValues = useModalForm({
        refineCoreProps: { action: "edit" },
    });
    //highlight-end

    const {
        modal: { show: showCreateModal },
    } = createModalFormReturnValues;
    //highlight-start
    const {
        modal: { show: showEditModal },
    } = editModalFormReturnValues;
    //highlight-end

    return (
        <div>
            <CreatePost {...createModalFormReturnValues} />
            //highlight-next-line
            <EditPost {...editModalFormReturnValues} />
            <button onClick={() => showCreateModal()}>Create Post</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.status}</td>
                            <td>
                                //highlight-start
                                <button onClick={() => showEditModal(post.id)}>
                                    Edit
                                </button>
                                //highlight-end
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
```

`<EditPost>` component will be used to edit a post.

```tsx title="src/components/post/edit.tsx"
import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";

import { Modal } from "components/modal";

export const EditPost: React.FC<UseModalFormReturnType> = ({
    register,
    formState: { errors },
    refineCore: { onFinish, formLoading },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
}) => {
    return (
        <Modal isOpen={visible} onClose={close}>
            <form className="form" onSubmit={handleSubmit(onFinish)}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        {...register("title", {
                            required: "This field is required",
                        })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <select {...register("status")}>
                        <option value="published">published</option>
                        <option value="draft">draft</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Content: </label>
                    <textarea
                        {...register("content", {
                            required: "This field is required",
                        })}
                        rows={10}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>
                <button type="submit" {...saveButtonProps}>
                    {formLoading ? "Loading" : "Save"}
                </button>
            </form>
        </Modal>
    );
};
```

<div class="img-container" style={{"max-width": "800px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/packages/react-hook-form/useModalForm/edit-modal.gif" alt="Edit Modal" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-hook-form/useModalForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/api-reference/core/components/refine-config.md)>** component.

:::tip External Props
It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the  [React Hook Form](https://react-hook-form.com/).
:::

### Return values

| Property                      | Description                                                     | Type                                                          |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| modal                         | Relevant states and methods to control the modal                | [`ModalReturnValues`](#modalreturnvalues)                     |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/api-reference/core/hooks/useForm.md#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

<br />

> -   #### ModalReturnValues
>
> | Property        | Description                                    | Type                                         |
> | --------------- | ---------------------------------------------- | -------------------------------------------- |
> | visible         | State of modal visibility                      | `boolean`                                    |
> | show            | Sets the visible state to true                 | `(id?: BaseKey) => void`                     |
> | close           | Sets the visible state to false                | `() => void`                                 |
> | submit          | Submits the form                               | `(values: TVariables) => void`               |
> | title           | Modal title based on resource and action value | `string`                                     |
> | saveButtonProps | Props for a submit button                      | `{ disabled: boolean, onClick: (e: React.BaseSyntheticEvent) => void;  }` |

## Example

<StackblitzExample path="form-react-hook-form-use-modal-form" />

[@pankod/refine-react-hook-form]: https://github.com/refinedev/refine/tree/master/packages/react-hook-form
[refine-react-hook-form-use-form]: /packages/documentation/react-hook-form/useForm.md
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /api-reference/core/hooks/useForm.md
