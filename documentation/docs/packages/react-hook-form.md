---
id: react-hook-form
title: React Hook Form
---

import listPage from '@site/static/img/packages/react-hook-form/list-page.png';
import createForm from '@site/static/img/packages/react-hook-form/create-form.gif';
import editForm from '@site/static/img/packages/react-hook-form/edit-form.gif';

**refine** offers a [React Hook Form][react-hook-form] adapter([@pankod/refine-react-table][refine-react-hook-form]) that allows you to use the React Hook Form library with **refine**. Thus, you can manage your forms in headless way.

All of React Hook Form's features are supported and you can use all of the React Hook Form's examples with no changes just copy and paste them into your project.

## Installation

Install the [`@pankod/refine-react-hook-form`][refine-react-hook-form] library.

```bash
npm i @pankod/refine-react-hook-form
```

## Usage

In the following example, we will step-by-step create an example of a headless form with React Hook Form capabilities.

### Create resource pages

We simply create a `<PostList>`, `<PostCreate>`, and `<PostEdit>` components and pass to the `<Refine>` component as a resource.

```tsx title="src/posts/list.tsx"
export const PostList: React.FC = () => {
    return <></>;
};
```

```tsx title="src/posts/create.tsx"
export const PostCreate: React.FC = () => {
    return <></>;
};
```

```tsx title="src/posts/edit.tsx"
export const PostEdit: React.FC = () => {
    return <></>;
};
```

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

//highlight-next-line
import { PostList, PostCreate, PostEdit } from "pages/posts/list";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
            //highlight-start
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                },
            ]}
            //highlight-end
        />
    );
};

export default App;
```

Let's develop the `<PostList>` component for directing to the `<PostCreate>` and the `<PostEdit>` component.

```tsx title="src/posts/list.tsx"
import { useTable, useNavigation } from "@pankod/refine-core";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult } = useTable<IPost>();
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

<div class="img-container" style={{"max-width": "700px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={listPage} alt="List Page" />
</div>

### Create Form

Firts, we need to import the `useForm` hook from the `@pankod/refine-react-hook-form` library. Then we create a basic example of `post` a create form. All we have to do is to pass the `onFinish` to `handleSubmit`.

We also use `useSelect` to fetch category options.

[Refer to the `useSelect` documentation for detailed information. &#8594](#)

```tsx title="src/posts/create.tsx"
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostCreate: React.FC = () => {
    const {
        useFormCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <form onSubmit={handleSubmit(onFinish)}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Category: </label>
            <select
                defaultValue={""}
                {...register("category.id", { required: true })}
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
            {errors.category && <span>This field is required</span>}
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <input type="submit" value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
```

<div class="img-container" style={{"max-width": "500px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createForm} alt="Create Form" />
</div>

### Edit Form

Edit form is very similar to create form. `@pankod/refine-react-hook-form` sets the default values for the form fields according to the `id` of the route and fetch the data from the server.

However, we need to pass `defaultValues` to the `useSelect` hook to make sure that the category id from data is in the options. Otherwise, the category will not match the existing options. Since the options are async, we need to reset the relavent field every time the options are changed.

```tsx title="src/posts/edit.tsx"
import { useEffect } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostEdit: React.FC = () => {
    const {
        useFormCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <form onSubmit={handleSubmit(onFinish())}>
            <label>Title: </label>
            <input {...register("title", { required: true })} />
            {errors.title && <span>This field is required</span>}
            <br />
            <label>Status: </label>
            <select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
            </select>
            <br />
            <label>Category: </label>
            <select
                {...register("category.id", {
                    required: true,
                })}
                defaultValue={queryResult?.data?.data.category.id}
            >
                {options?.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            {errors.category && <span>This field is required</span>}
            <br />
            <label>Content: </label>
            <br />
            <textarea
                {...register("content", { required: true })}
                rows={10}
                cols={50}
            />
            {errors.content && <span>This field is required</span>}
            <br />
            <input type="submit" value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
```

<div class="img-container" style={{"max-width": "500px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editForm} alt="Edit Form" />
</div>

[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/pankod/refine/tree/master/packages/react-hook-form
[react-hook-form-core]: /core/hooks/useForm.md
