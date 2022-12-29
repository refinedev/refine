---
id: useForm
title: useForm
---

```tsx live shared tailwind
import React from "react";
import {
    Refine,
    useResource,
    useNavigation,
    LayoutProps,
    useList,
    HttpError,
    useShow,
} from "@pankod/refine-core";
import { Layout } from "components";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

type FormValues = Omit<IPost, "id">;

interface IPost {
    id: number;
    title: string;
    content: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { resources } = useResource();
    const { list } = useNavigation();

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <div className="mb-2 border-b py-2">
                <div className="container mx-auto">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <img
                                className="w-32"
                                src="https://refine.dev/img/refine_logo.png"
                                alt="Logo"
                            />
                        </Link>
                        <ul>
                            {resources.map(({ name, icon }) => (
                                <li key={name} className="float-left">
                                    <a
                                        className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out hover:underline"
                                        onClick={() => list(name)}
                                    >
                                        {icon}
                                        <span>{name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-white">{children}</div>
        </div>
    );
};

const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { onFinish, formLoading } = useForm<
        IPost,
        HttpError,
        Omit<IPost, "id">
    >({
        action: "clone",
    });

    const handleCloneClick = () => {
        if (!record) return;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = record;
        onFinish(rest);
    };

    const loading = isLoading || formLoading;

    return (
        <div className="container mx-auto">
            <button
                disabled={loading}
                className="ml-auto flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
                onClick={handleCloneClick}
            >
                {loading && LoadingIcon}
                <span>Clone Post</span>
            </button>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                    value={record?.title}
                    disabled
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                    Content
                </label>
                <textarea
                    value={record?.content}
                    disabled
                    rows={10}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
            </div>
        </div>
    );
};

const PAGE_SIZE = 10;

const PostList: React.FC = () => {
    const [page, setPage] = React.useState(1);
    const { edit, create, show } = useNavigation();

    const { data } = useList<IPost>({
        resource: "posts",
        config: {
            pagination: {
                current: page,
                pageSize: PAGE_SIZE,
            },
        },
    });

    const posts = data?.data || [];
    const toalCount = data?.total || 0;

    const pageCount = Math.ceil(toalCount / PAGE_SIZE);
    const hasNext = page * PAGE_SIZE < toalCount;
    const hasPrev = page > 1;

    return (
        <div className="container mx-auto pb-4">
            <div className="container mx-auto pb-4">
                <button
                    className="ml-auto flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
                    onClick={() => create("posts")}
                >
                    {CreateIcon}
                    <span>Create Post</span>
                </button>
            </div>

            <table className="min-w-full table-fixed divide-y divide-gray-200 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>ID</div>
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>Title</div>
                        </th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 ">
                            <div>Content</div>
                        </th>

                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                            <div>Action</div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {posts.map((post) => (
                        <tr
                            key={post.id}
                            className="transition hover:bg-gray-100"
                        >
                            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900">
                                {post.id}
                            </td>
                            <td className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900">
                                {post.title}
                            </td>
                            <td className=" py-2 px-6 text-sm font-medium text-gray-900">
                                {post.content}
                            </td>
                            <td>
                                <div className="flex gap-2">
                                    <button
                                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                        onClick={() => edit("posts", post.id)}
                                    >
                                        {EditIcon}
                                    </button>
                                    <button
                                        className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                                        onClick={() => show("posts", post.id)}
                                    >
                                        {ShowIcon}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-2 flex items-center justify-end gap-4">
                <div className="flex gap-1">
                    <button
                        onClick={() => setPage(1)}
                        disabled={!hasPrev}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsLeftIcon}
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={!hasPrev}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronLeftIcon}
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={!hasNext}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronRightIcon}
                    </button>
                    <button
                        onClick={() => setPage(pageCount)}
                        disabled={!hasNext}
                        className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
                    >
                        {ChevronsRightIcon}
                    </button>
                </div>
                <span>
                    Page{" "}
                    <strong>
                        {page} of {pageCount}
                    </strong>
                </span>
                <span>
                    Go to page:
                    <input
                        type="number"
                        defaultValue={page + 1}
                        onChange={(e) => {
                            const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                            setPage(value);
                        }}
                        className="w-12 rounded border border-gray-200 p-1 text-gray-700"
                    />
                </span>
            </div>
        </div>
    );
};

const PostEdit: React.FC = () => {
    const { formLoading, onFinish, queryResult } = useForm<FormValues>();
    const defaultValues = queryResult?.data?.data;

    const [formValues, seFormValues] = useState<FormValues>({
        title: defaultValues?.title || "",
        content: defaultValues?.content || "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    useEffect(() => {
        seFormValues({
            title: defaultValues?.title || "",
            content: defaultValues?.content || "",
        });
    }, [defaultValues]);

    return (
        <div className="container mx-auto">
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        rows={10}
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};

const PostCreate: React.FC = () => {
    const { formLoading, onFinish } = useForm<IPost, HttpError, FormValues>();

    const [formValues, seFormValues] = useState<FormValues>({
        title: "",
        content: "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};

interface Props {
    checkedLabel?: string;
    uncheckedLabel?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Toggle: React.FC<Props> = ({
    checked,
    checkedLabel,
    uncheckedLabel,
    onChange,
}) => {
    return (
        <div>
            <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className={`absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white ${
                        checked ? "right-0 border-green-400" : ""
                    }`}
                />
                <label
                    htmlFor="toggle"
                    className={`block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 ${
                        checked ? "bg-green-400" : ""
                    }`}
                ></label>
            </div>
            <label htmlFor="toggle" className="text-xs text-gray-700">
                {checked ? checkedLabel : uncheckedLabel}
            </label>
        </div>
    );
};

const PostIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

const LoadingIcon = (
    <svg
        role="status"
        className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
        />
    </svg>
);

const EditIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
);

const ShowIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const CreateIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const ChevronsLeftIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="11 17 6 12 11 7"></polyline>
        <polyline points="18 17 13 12 18 7"></polyline>
    </svg>
);

const ChevronLeftIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRightIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const ChevronsRightIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="13 17 18 12 13 7"></polyline>
        <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
);
```

`useForm` is a hook that allows to manage forms. It has some `action` methods that `create`, `edit` and `clone` the form. The hook return value comes to according to the called action and it can run different logic depending on the `action`.

You can think of `useForm` as a bridge between your `state` and `dataProvider`. It's a low-level hook that you can use to build your own form components. It's also use `notificationProvider` to inform users according to the `action` and `dataProvider` response.

Let's review the steps after creating a `post` resource with `useForm`. After form is submitted:

1. `useForm` calls `onFinish` function with the form values.
2. `onFinish` method calls [`useCreate`](/docs/api-reference/core/hooks/data/useCreate/) with the form values.
3. `useCreate` calls [`dataProvider`](/docs/api-reference/core/providers/data-provider/)'s `create` function and returns the response.
4. `useForm` calls `onSuccess` or `onError` function with the response. `onSuccess` or `onError` method calls [`notificationProvider`](/docs/api-reference/core/providers/notification-provider/) and [`notificationProvider`](/docs/api-reference/core/providers/notification-provider/) shows the notification to the user.
5. `useForm`, redirects to the `list` page.

This is the default behavior of `useForm` when `action:"create"`. You can customize it by passing your own [`redirect`](/docs/api-reference/core/hooks/useForm/#redirect), [`onFinish`](/docs/api-reference/core/hooks/useForm/##how-can-i-change-the-form-data-before-submitting-it-to-the-api), [`onMutationSuccess`](/docs/api-reference/core/hooks/useForm/#onmutationsuccess) and [`onMutationError`](/docs/api-reference/core/hooks/useForm/#onmutationerror) props.

`edit` or `clone` actions are similar to `create` action. The only difference is that `useForm` fetches the record on first render and returns the `queryResult` for you to fill the form. We will see how to use `useForm`'s [`action`](/docs/api-reference/core/hooks/useForm/#action) in the [next section](/docs/api-reference/core/hooks/useForm/#action).

:::info
`useForm` does not manage state. If you're looking for a complete form library, `refine` supports three form libraries out-of-the-box.

-   [React Hook Form](https://react-hook-form.com/) (for Headless users) - [Documentation](/packages/documentation/react-hook-form/useForm.md) - [Example](/examples/form/react-hook-form/useForm.md)
-   [Ant Design Form](https://ant.design/components/form/#header) (for Ant Design users) - [Documentation](/api-reference/antd/hooks/form/useForm.md) - [Example](/examples/form/antd/useForm.md)
-   [Mantine Form](https://mantine.dev/form/use-form) (for Mantine users) - [Documentation](/api-reference/mantine/hooks/form/useForm.md) - [Example](/examples/form/mantine/useForm.md)

:::

<GeneralConceptsLink />

## Basic Usage

We'll show the basic usage of `useForm` by adding an creating form.

```tsx title="src/posts/create.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-core";

const PostCreate = () => {
    const [title, setTitle] = useState();
    const { onFinish } = useForm({
        action: "create",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish({ title });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

-   Returns the `mutationResult` after called the `onFinish` callback.
-   Accepts generic type parameters. It is used to define response type of the mutation and query.

## Options

### `action`

`useForm` can handle `edit`, `create` and `clone` actions.

:::tip
By default, it determines the `action` from route.

-   If the route is `/posts/create` thus the hook will be called with `action: "create"`.
-   If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.
-   If the route is `/posts/clone/1`, the hook will be called with `action: "clone"`.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'}
]}>
<TabItem value="create">

`action: "create"` is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/docs/api-reference/core/hooks/data/useCreate.md) under the hood for mutations on create mode.

In the following example, we'll show how to use `useForm` with `action: "create"`.

```tsx live tailwind url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import React, { useState } from "react";
import { useForm } from "@pankod/refine-core";

const PostCreateExample: React.FC = () => {
    const { formLoading, onFinish } = useForm<IPost, HttpError, FormValues>();

    const [formValues, seFormValues] = useState<FormValues>({
        title: "",
        content: "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props: LayoutProps) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreateExample,
            edit: PostEdit,
            show: PostShow,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="edit">

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` with[`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it updates the record with [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md).

In the following example, we'll show how to use `useForm` with `action: "edit"`. You can go to edit page by clicking on the edit button in the list page.

```tsx live tailwind url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React, { useState, useEffect } from "react";
import { useForm } from "@pankod/refine-core";

const PostEditExample: React.FC = () => {
    const { formLoading, onFinish, queryResult } = useForm<FormValues>();
    const defaultValues = queryResult?.data?.data;

    const [formValues, seFormValues] = useState<FormValues>({
        title: defaultValues?.title || "",
        content: defaultValues?.content || "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    useEffect(() => {
        seFormValues({
            title: defaultValues?.title || "",
            content: defaultValues?.content || "",
        });
    }, [defaultValues]);

    return (
        <div className="container mx-auto">
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        rows={10}
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props: LayoutProps) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEditExample,
            show: PostShow,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="clone">

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

You can think `action:clone` like save as. It's similar to `action:edit` but it creates a new record instead of updating the existing one.

It fetches the record data according to the `id` with [`useOne`](/docs/api-reference/core/hooks/data/useOne/) and returns the `queryResult` for you to fill the form. After the form is submitted, it creates a new record with [`useCreate`](/docs/api-reference/core/hooks/data/useCreate.md).

In the following example, we'll show how to use `useForm` with `action: "clone"`.

You can go to edit page by clicking on the edit button in the list page. You will see `action:clone` toggle at the top of the page. You can toggle it to set the action to `clone`.

```tsx live tailwind url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import React, { useState, useEffect } from "react";
import { useForm } from "@pankod/refine-core";

const PostEditFormWithClone: React.FC = () => {
    // highlight-next-line
    const [action, setAction] = useState<"edit" | "clone">("clone");

    const { formLoading, onFinish, queryResult } = useForm<FormValues>({
        // highlight-next-line
        action,
    });
    const defaultValues = queryResult?.data?.data;

    const [formValues, seFormValues] = useState<FormValues>({
        title: defaultValues?.title || "",
        content: defaultValues?.content || "",
    });

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        seFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish(formValues);
    };

    useEffect(() => {
        seFormValues({
            title: defaultValues?.title || "",
            content: defaultValues?.content || "",
        });
    }, [defaultValues]);

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                // highlight-start
                <Toggle
                    checkedLabel="Clone"
                    uncheckedLabel="Clone"
                    checked={action === "clone"}
                    onChange={(checked) =>
                        setAction(checked ? "clone" : "edit")
                    }
                />
                // highlight-end
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Title"
                        value={formValues.title}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-medium"
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
                        placeholder="Content"
                        rows={10}
                        value={formValues.content}
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="flex w-full items-center rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
                >
                    {formLoading && LoadingIcon}
                    <span>Save</span>
                </button>
            </form>
        </div>
    );
};
// visible-block-end

setRefineProps({
    Layout: (props: LayoutProps) => <Layout {...props} />,
    resources: [
        {
            name: "posts",
            list: PostList,
            create: PostCreate,
            edit: PostEditFormWithClone,
            show: PostShow,
        },
    ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

</Tabs>

### `resource`

**refine** passes the `resource` to the `dataProvider` as a params. This parameter is usually used to as a API endpoint path. It all depends on how to handle the `resource` in your `dataProvider`. See the [`creating a data provider`](/api-reference/core/providers/data-provider.md#creating-a-data-provider) section for an example of how `resource` are handled.

The `resource` value is determined from the active route where the component or the hook is used. It can be overridden by passing the `resource` prop.

Use case for overriding the `resource` prop:

-   We can create a `category` from the `<PostEdit>` page.
-   We can edit a `category` from the `<PostEdit>` page.

In the following example, we'll show how to use `useForm` with `resource` prop.

```tsx title="src/posts/edit.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-core";
import { PostForm } from "./PostForm";

const PostEdit = () => {
    return (
        <div>
            <PostForm />
            <CategoryForm />
        </div>
    );
};

const CategoryForm = () => {
    const [title, setTitle] = useState("");

    // highlight-start
    const { onFinish } = useForm({
        action: "create",
        resource: "categories",
    });
    // highlight-end

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFinish({ title });
        setTitle("");
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <label htmlFor="categoryTitle">Category Title</label>
            <input
                id="categoryTitle"
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="Category Title"
            />
            <button type="submit">Create Category</button>
        </form>
    );
};
```

Also you can give URL path to the `resource` prop.

```tsx
const form = useForm({
    action: "create",
    resource: "categories/subcategory", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory
});
```

### `id`

`id` is used for determining the record to `edit` or `clone`. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It is usefull when you want to `edit` or `clone` a `resource` from a different page.

```tsx
const form = useForm({
    action: "edit", // or clone
    resource: "categories",
    id: 1, // <BASE_URL_FROM_DATA_PROVIDER>/categories/1
});
```

Also you can give `id` from `resource` prop.

```tsx
const form = useForm({
    action: "edit", // or clone
    resource: "categories/subcategory/3", // <BASE_URL_FROM_DATA_PROVIDER>/categories/subcategory/3/
});
```

### `redirect`

`redirect` is used for determining the page to redirect after the form is submitted. By default, it uses the `list`. It can be changed with the `redirect` property.

It can be set to `"show" | "edit" | "list" | "create"` or `false` to prevent the page from redirecting to the list page after the form is submitted.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    redirect: false,
});
```

### `onMutationSuccess`

It's a callback function that will be called after the mutation is successful.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    onMutationSuccess: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `onMutationError`

It's a callback function that will be called after the mutation is failed.

It receives the following parameters:

-   `data`: The data returned from the mutation.
-   `variables`: The variables passed to the mutation.
-   `context`: react-query context.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    onMutationError: (data, variables, context) => {
        console.log({ data, variables, context });
    },
});
```

### `invalidates`

You can use it to manage the invalidations that will occur at the end of the mutation.

By default it's invalidates following queries from the current `resource`:

-   on `create` or `clone` mode: `"list"` and `"many"`
-   on `edit` mode: `"list`", `"many"` and `"detail"`

### `dataProviderName`

If there is more than one dataProvider, you should use the dataProviderName that you will use.
It is useful when you want to use a different dataProvider for a specific resource.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    dataProviderName: "second-data-provider",
});
```

### `mutationMode`

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`. Default mode is `pessimistic`.
Each mode corresponds to a different type of user experience.

-   `pessimistic`: The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.
-   `optimistic`:The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.
-   `undoable`: The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly. > It's only available for `edit` action.

> For more information about mutation modes, please check [Mutation Mode documentation](/docs/advanced-tutorials/mutation-mode/#supported-data-hooks) page.

```tsx title="src/posts/edit.tsx"
const form = useForm({
    action: "edit",
    resource: "categories",
    mutationMode: "undoable", // "pessimistic" | "optimistic" | "undoable",
});
```

### `successNotification`

> `NotificationProvider` is required.

After form is submitted successfully, `refine` will show a success notification. With this prop, you can customize the success notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    successNotification: (data, values, resource) => {
        return {
            message: `Post Successfully created with ${data.title}`,
            description: "Success with no errors",
            type: "success",
        };
    },
});
```

### `errorNotification`

> `NotificationProvider` is required.

After form is submit is failed, `refine` will show a error notification. With this prop, you can customize the error notification.

```tsx title="src/posts/create.tsx"
const form = useForm({
    action: "create",
    resource: "post",
    errorNotification: (data, values, resource) => {
        return {
            message: `Something went wrong when deleting ${data.id}`,
            description: "Error",
            type: "error",
        };
    },
});
```

```json title="Default values"
{
    "message": "Error when updating <resource-name> (status code: ${err.statusCode})" or "Error when creating <resource-name> (status code: ${err.statusCode})",
    "description": "Error",
    "type": "error",
}
```

### `metaData`

[`metaData`](/docs/api-reference/general-concepts/#metadata) is used following two purposes:

-   To pass additional information to data provider methods.
-   Generate GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
const form = useForm({
    action: "create",
    resource: "post",
    // highlight-start
    metaData: {
        headers: { "x-meta-data": "true" },
    },
    // highlight-end
});

const myDataProvider = {
    //...
    // highlight-start
    create: async ({ resource, id, metaData }) => {
        const headers = metaData?.headers ?? {};
        // highlight-end
        const url = `${apiUrl}/${resource}/${id}`;

        // highlight-next-line
        const { data } = await httpClient.get(url, { headers });

        return {
            data,
        };
    },
    //...
};
```

### `queryOptions`

[queryOptions](https://tanstack.com/query/v4/docs/react/reference/useMutation) options can be set by passing queryOptions property.

```tsx title="src/posts/create.tsx"
const form = useForm({
    action: "create",
    resource: "post",
    // highlight-start
    queryOptions: {
        retry: 3,
    },
    // highlight-end
});
```

### `liveMode`

Whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check [Live / Realtime](/docs/advanced-tutorials/real-time/) page.

## FAQ

### How can Invalidate other resources?

You can invalidate other resources with help of [`useInvalidate`](/docs/api-reference/core/hooks/invalidate/useInvalidate/) hook.

```tsx title="src/posts/edit.tsx"
import { useInvalidate, useForm } from "@pankod/refine-core";

const PostEdit = () => {
    const invalidate = useInvalidate();

    const form = useForm({
        // highlight-start
        onMutationSuccess: (data, variables, context) => {
            invalidate({
                resource: "categories",
                invalidates: ["resourceAll"],
            });
        },
        // highlight-end
    });

    // ---
    // ---
};
```

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="src/users/create.tsx"
import React, { useState } from "react";
import { useForm } from "@pankod/refine-core";

export const UserCreate: React.FC = () => {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();

    const { onFinish } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        const fullName = `${name} ${surname}`;
        onFinish({
            fullName: fullName,
            name,
            surname,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setName(e.target.value)} />
            <input onChange={(e) => setSurname(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useForm" />

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

### Return values

| Property       | Description                                            | Type                                                                                                                                                           |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onFinish       | Triggers the mutation                                  | `(values: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                  |
| queryResult    | Result of the query of a record                        | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)                                                                                |
| mutationResult | Result of the mutation triggered by calling `onFinish` | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation)                                                                               |
| formLoading    | Loading state of form request                          | `boolean`                                                                                                                                                      |
| id             | Record id for `clone` and `create` action              | [`BaseKey`](/api-reference/core/interfaces.md#basekey)                                                                                                         |
| setId          | `id` setter                                            | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                               |
| redirect       | Redirect function for custom redirections              | (redirect: `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,idFromFunction?: [`BaseKey`](/api-reference/core/interfaces.md#basekey)\|`undefined`) => `data` |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror

## Example

<StackblitzExample path="form-core-use-form" />
