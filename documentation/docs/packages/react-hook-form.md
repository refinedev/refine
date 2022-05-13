---
id: react-hook-form
title: React Hook Form
---

import listPage from '@site/static/img/packages/react-hook-form/list-page.png';
import createForm from '@site/static/img/packages/react-hook-form/create-form.gif';
import editForm from '@site/static/img/packages/react-hook-form/edit-form.gif';
import fileUpload from '@site/static/img/packages/react-hook-form/upload.gif';

**refine** offers a [React Hook Form][react-hook-form] adapter([@pankod/refine-react-hook-form][refine-react-hook-form]) that allows you to use the React Hook Form library with **refine**. Thus, you can manage your forms in headless way.

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
import routerProvider from "@pankod/refine-react-router-v6";
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

[Refer to the `useSelect` documentation for detailed information. &#8594](/core/hooks/useSelect.md)

```tsx title="src/posts/create.tsx"
// highlight-next-line
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostCreate: React.FC = () => {
    //highlight-start
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //highlight-end

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        // highlight-next-line
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

Edit form is very similar to create form. `@pankod/refine-react-hook-form` sets the default values for the form fields according to the `id` of the route and fetch the data from the server. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.


However, we need to pass `defaultValues` to the `useSelect` hook to make sure that the category id from data is in the options. Otherwise, the category will not match the existing options. Since the options are async, we need to reset the relavent field every time the options are changed.

```tsx title="src/posts/edit.tsx"
import { useEffect } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    // highlight-start
    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });
    // highlight-end

    // highlight-start
    useEffect(() => {
        resetField("category.id");
    }, [options]);
    // highlight-end

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

### Multipart File Upload

You can submit files or images to your server in multipart/form-data format using the refine-react-hook-form adapter. First of all, let's create a function called `onSubmitFile` to convert the file from the input to formData type. After placing the selected file in formData, let's upload it to our server. When your form is submitted, the **refine** `onFinish` method automatically saves your file and other data on your server.

```tsx title="src/posts/create.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { useSelect, useApiUrl } from "@pankod/refine-core";

import axios from "axios";

export const PostCreate: React.FC = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    //highlight-next-line
    const apiURL = useApiUrl();

    const { options } = useSelect({
        resource: "categories",
    });

    //highlight-start
    const onSubmitFile = async () => {
        setIsUploading(true);
        const inputFile = document.getElementById(
            "fileInput",
        ) as HTMLInputElement;

        const formData = new FormData();
        formData.append("file", inputFile?.files?.item(0) as File);

        const res = await axios.post<{ url: string }>(
            `${apiURL}/media/upload`,
            formData,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            },
        );

        setValue("thumbnail", res.data.url);
        setIsUploading(false);
    };
    //highlight-end

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
            <br />
            //highlight-start
            <label>Image: </label>
            <input id="fileInput" type="file" onChange={onSubmitFile} />
            <input
                type="hidden"
                {...register("thumbnail", { required: true })}
            />
            {errors.thumbnail && <span>This field is required</span>}
            //highlight-end
            <br />
            <br />
            <input type="submit" disabled={isUploading} value="Submit" />
            {formLoading && <p>Loading</p>}
        </form>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={fileUpload} alt="Multipart File Upload" />
</div>

## API

### Properties

Supports all the properties supported by the `useForm` hook are available in the [React Hook Form][react-hook-form] documentation. Also, we added the following property:

`refineCoreProps`: You can define all properties provided by [`useForm`][use-form-core] here. You can see all of them in [here](/core/hooks/useForm.md#properties).

> For example, we can define the `refineCoreProps` property in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const { ... } = useForm({
    ...,
    refineCoreProps: {
        resource: "posts",
        redirect: false,
        // You can define all properties provided by refine useForm
    },
});
```

### Return values

Returns all the properties returned by [React Hook Form][react-hook-form] of the `useForm` hook. Also, we added the following return values:

`refineCore`: Returns all values returned by [`refineCore`][use-form-core]. You can see all of them in [here](/core/hooks/useForm.md##return-values).

> For example, we can access the `refineCore` return value in the `useForm` hook as:

```tsx
import { useForm } from "@pankod/refine-react-hook-form";

const {
    refineCore: { queryResult, ... },
} = useForm({ ... });
```

| Property        | Description               | Type                                          |
| --------------- | ------------------------- | --------------------------------------------- |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: () => void; }` |


### Type Parameters

| Property   | Desription                                                   | Type                       | Default                    |
| ---------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData      | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables | Field Values for mutation function                           | `{}`                       | `{}`                       |
| TContext   | Second generic type of the `useForm` of the React Hook Form. | `{}`                       | `{}`                       |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-react-hook-form-example-4hf74?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-react-hook-form-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/pankod/refine/tree/master/packages/react-hook-form
[use-form-core]: /core/hooks/useForm.md
[baserecord]: /core/interfaces.md#baserecord
[httperror]: /core/interfaces.md#httperror
