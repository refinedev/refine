---
id: useStepsForm
title: useStepsForm
---

import listPage from '@site/static/img/packages/react-hook-form/useStepsForm/list-page.png';
import createForm from '@site/static/img/packages/react-hook-form/useStepsForm/create-form.gif';
import editForm from '@site/static/img/packages/react-hook-form/useStepsForm/edit-form.gif';

`useStepsForm` allows you to manage a form with multiple steps. It provides features such as which step is currently active, the ability to go to a specific step and validation when changing steps etc.

:::info
`useStepsForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package.
:::

## Properties

### `stepsProps`

**`defaultStep`**: It allows you to set the initial step. By default it is `0`.

```tsx
const stepsFormReturnValues = useStepsForm({
    stepsProps: {
        defaultStep: 1,
    },
});
```

**`isBackValidate`**: Should the validation be done when going back to a previous step? By default it is `false`.

```tsx
const stepsFormReturnValues = useStepsForm({
    stepsProps: {
        isBackValidate: true,
    },
});
```

### `refineCoreProps`

[Refer to the useForm documentation in core for seeing properties. →](/core/hooks/useForm.md#properties)

### Other props

[Refer to the useForm documentation in React Hook Form for seeing properties. →][react-hook-form-use-form]

## Return values

### `steps`

**`currentStep`**: It is the current step.

**`gotoStep`**: It allows you to go to a specific step.

```tsx
const {
    steps: { currentStep, gotoStep },
} = useStepsForm();

// Example usage
const goToPreviousStep = () => gotoStep(currentStep - 1);
```

### `refineCore`

[Refer to the useForm documentation in core for seeing return values. →](/core/hooks/useForm.md#return-values)

### Other return values

[Refer to the useForm documentation in React Hook Form for return values. →][react-hook-form-use-form]

## Example

First, we need to create resource pages. Let's assume we have a resource called `posts` and simply a `<PostList>`, `<PostCreate>` and `<PostEdit>` components.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

//highlight-next-line
import { PostList, PostCreate, PostEdit } from "pages/posts";

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

### List Page

In this component we will use [`useNavigation`](/core/hooks/navigation/useNavigation.md) to redirect to the `<PostCreate>` and `<PostEdit>` components.

```tsx title="src/posts/list.tsx"
import { useTable, useNavigation, useMany } from "@pankod/refine-core";

import { ICategory, IPost } from "interfaces";

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

    const categoryIds =
        tableQueryResult?.data?.data.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <div>
            <button onClick={() => create("posts")}>Create Post</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                {isLoading
                                    ? "Loading"
                                    : data?.data.find(
                                          (item) => item.id == post.category.id,
                                      )?.title}
                            </td>
                            <td>{post.status}</td>
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

<div class="img-container" style={{"max-width": "800px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={listPage} alt="List Page" />
</div>

### Create Page

In this component you can see how `useStepsForm` is used to manage the steps and form.

```tsx title="src/posts/create.tsx"
//highlight-next-line
import { useStepsForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

const stepTitles = ["Title", "Status", "Content"];

export const PostCreate: React.FC = () => {
    //highlight-start
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm();
    //highlight-end

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    // It handles which form elements render at which step.
    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <label>Title: </label>
                        <input {...register("title", { required: true })} />
                        {errors.title && <span>This field is required</span>}
                    </>
                );
            case 1:
                return (
                    <>
                        <label>Status: </label>
                        <select {...register("status")}>
                            <option value="published">published</option>
                            <option value="draft">draft</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </>
                );
            case 2:
                return (
                    <>
                        <label>Category: </label>
                        <select
                            {...register("category.id", {
                                required: true,
                            })}
                            defaultValue={queryResult?.data?.data.category.id}
                        >
                            {options?.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <br />
                        <label>Content: </label>
                        <textarea
                            {...register("content", { required: true })}
                            rows={10}
                            cols={50}
                        />
                        {errors.content && <span>This field is required</span>}
                    </>
                );
        }
    };

    if (formLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            // Where step titles are shown
            <div style={{ display: "flex", gap: 36 }}>
                {stepTitles.map((title, index) => (
                    <button
                        key={index}
                        onClick={() => gotoStep(index)}
                        style={{
                            backgroundColor:
                                currentStep === index ? "lightgray" : "initial",
                        }}
                    >
                        {index + 1} - {title}
                    </button>
                ))}
            </div>
            //highlight-next-line
            <form autoComplete="off">{renderFormByStep(currentStep)}</form>
            // Where buttons are shown and where the form is submitted
            <div style={{ display: "flex", gap: 8 }}>
                {currentStep > 0 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep - 1);
                        }}
                    >
                        Previous
                    </button>
                )}
                {currentStep < stepTitles.length - 1 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep + 1);
                        }}
                    >
                        Next
                    </button>
                )}
                {currentStep === stepTitles.length - 1 && (
                    <button onClick={handleSubmit(onFinish)}>Save</button>
                )}
            </div>
        </div>
    );
};
```

<div class="img-container" style={{"max-width": "800px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createForm} alt="Create Form" />
</div>

### Edit Page

Magic, `<PostCreate>` and `<PostEdit>` pages are almost the same. So how are the form's default values set? `useStepsForm` does this with te `id` parameter it reads from the URL and fetches the data from the server.

You can change the `id` as you want with the `setId` that comes out of `refineCore`.

Another part that is different from `<PostCreate>` and `<PostEdit>` is the `defaultValue` value passed to the `useSelect` hook.

[Refer to the `useSelect` documentation for detailed information. &#8594](/core/hooks/useSelect.md)

```tsx title="src/posts/edit.tsx"
//highlight-next-line
import { useStepsForm } from "@pankod/refine-react-hook-form";
import { useSelect } from "@pankod/refine-core";

const stepTitles = ["Title", "Status", "Category and content"];

export const PostEdit: React.FC = () => {
    //highlight-start
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        formState: { errors },
        steps: { currentStep, gotoStep },
    } = useStepsForm();
    //highlight-end

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    // It handles which form elements render at which step.
    const renderFormByStep = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <label>Title: </label>
                        <input {...register("title", { required: true })} />
                        {errors.title && <span>This field is required</span>}
                    </>
                );
            case 1:
                return (
                    <>
                        <label>Status: </label>
                        <select {...register("status")}>
                            <option value="published">published</option>
                            <option value="draft">draft</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </>
                );
            case 2:
                return (
                    <>
                        <label>Category: </label>
                        <select
                            {...register("category.id", {
                                required: true,
                            })}
                            defaultValue={queryResult?.data?.data.category.id}
                        >
                            {options?.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <br />
                        <label>Content: </label>
                        <textarea
                            {...register("content", { required: true })}
                            rows={10}
                            cols={50}
                        />
                        {errors.content && <span>This field is required</span>}
                    </>
                );
        }
    };

    if (formLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            // Where step titles are shown
            <div style={{ display: "flex", gap: 36 }}>
                {stepTitles.map((title, index) => (
                    <button
                        key={index}
                        onClick={() => gotoStep(index)}
                        style={{
                            backgroundColor:
                                currentStep === index ? "lightgray" : "initial",
                        }}
                    >
                        {index + 1} - {title}
                    </button>
                ))}
            </div>
            //highlight-next-line
            <form autoComplete="off">{renderFormByStep(currentStep)}</form>
            // Where buttons are shown and where the form is submitted
            <div style={{ display: "flex", gap: 8 }}>
                {currentStep > 0 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep - 1);
                        }}
                    >
                        Previous
                    </button>
                )}
                {currentStep < stepTitles.length - 1 && (
                    <button
                        onClick={() => {
                            gotoStep(currentStep + 1);
                        }}
                    >
                        Next
                    </button>
                )}
                {currentStep === stepTitles.length - 1 && (
                    <button onClick={handleSubmit(onFinish)}>Save</button>
                )}
            </div>
        </div>
    );
};
```

<div class="img-container" style={{"max-width": "800px"}}>
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editForm} alt="Edit Form" />
</div>

## API

### Properties

Supports all the properties supported by the `useForm` hook are available in the [React Hook Form][react-hook-form-use-form] documentation. Also, we added the following properties:

`stepsProps`: You can see all the properties [here](#stepsprops).

`refineCoreProps`: You can define all properties provided by [`useForm`][use-form-core] here. You can see all of them in [here](/core/hooks/useForm.md#properties).

> For example, we can define the `refineCoreProps` and `stepsProps` properties in the `useStepsForm` hook as:

```tsx
import { useStepsForm } from "@pankod/refine-react-hook-form";

const { ... } = useStepsForm({
    ...,
    // You can define all properties provided by React Hook Form useForm
    refineCoreProps: {
        ...
        // You can define all properties provided by refine useForm
    },
    stepsProps: {
        ...
        // You can define all properties provided by refine React Hook Form useStepsForm
    },
});
```

### Return values

Returns all the properties returned by [React Hook Form][react-hook-form-use-form] of the `useForm` hook. Also, we added the following return values:

`steps`: You can see all the return values [here](#steps).

`refineCore`: Returns all values returned by [`useForm`][use-form-core]. You can see all of them in [here](/core/hooks/useForm.md##return-values).

> For example, we can access the `refineCore` and `steps` return values in the `useStepsForm` hook as:

```tsx
import { useStepsForm } from "@pankod/refine-react-hook-form";

const {
    ... // You can access all properties returned by React Hook Form useForm
    steps: { currentStep, gotoStep },
    refineCore: { queryResult, ... },
    saveButtonProps,
} = useStepsForm({ ... });
```

| Property        | Description               | Type                                          |
| --------------- | ------------------------- | --------------------------------------------- |
| saveButtonProps | Props for a submit button | `{ disabled: boolean; onClick: () => void; }` |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/github/pankod/refine/tree/master/examples/reactHookForm/useStepsForm?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-react-hook-form-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[@pankod/refine-react-hook-form]: https://github.com/pankod/refine/tree/master/packages/react-hook-form
[refine-react-hook-form-use-form]: /packages/react-hook-form/useForm.md
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/hooks/useForm.md
