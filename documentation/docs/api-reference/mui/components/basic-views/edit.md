---
id: edit
title: Edit
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a [`<RefreshButton>`](/api-reference/mui/components/buttons/refresh.md).

We will show what `<Edit>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/edit/123
// visible-block-start
import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const samplesData = queryResult?.data?.data;

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "categories",
        defaultValue: samplesData?.category?.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Id"
                    name="id"
                    disabled
                />
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Title"
                    name="title"
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...categoryAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    categoryAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.category?.id}
                                    helperText={
                                        (errors as any)?.category?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/samples/edit/123"]}
        resources={[{ name: "samples", edit: SampleEdit, list: SampleList }]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Edit>` component. if you don't pass title props it uses "Edit" prefix and singular resource name by default. For example, for the `/posts/edit` resource, it will be "Edit post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Typography } from "@mui/material";

const EditPage: React.FC = () => {
    return (
        <Edit
            // highlight-next-line
            title={<Typography variant="h5">Custom Title</Typography>}
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId="123" />
                    </div>
                ),
                edit: EditPage,
            },
        ]}
    />,
);
```

### `resource`

The `<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Edit } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit resource="posts" recordItemId={123}>
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            Layout={Layout}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `saveButtonProps`

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/mui/components/buttons/save.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit saveButtonProps={{ size: "small" }}>
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property, refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the [`useDelete`](/docs/api-reference/core/hooks/data/useDelete/) method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md).

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/api-reference/mui/components/buttons/delete.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    deleteOne: async ({ resource, id, variables }) => {
        return {
            data: {},
        };
    },
};

const authProvider = {
    login: async () => {
        return {
            success: true,
            redirectTo: "/",
        };
    },
    register: async () => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    updatePassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        return {
            success: true,
            redirectTo: "/",
        };
    },
    check: async () => ({
        authenticated: true,
    }),
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
};

// visible-block-start
import { Edit } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

const PostEdit: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <Edit
            /* highlight-start */
            canDelete={permissionsData?.includes("admin")}
            deleteButtonProps={{ size: "small" }}
            /* highlight-end */
            saveButtonProps={{ size: "small" }}
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        authProvider={authProvider}
        dataProvider={customDataProvider}
        initialRoutes={["/posts/edit/123"]}
        Layout={RefineMui.Layout}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId="123">
                            Edit Item 123
                        </RefineMui.EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/authentication/usePermissions.md)

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import { Layout } from "@refinedev/mui";
// visible-block-start
import { Edit } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit resource="posts" recordItemId={123}>
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end
const App: React.FC = () => {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
            }}
            Layout={Layout}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

:::note
The `<Edit>` component needs the `id` information for the [`<RefreshButton>`](/api-reference/mui/components/buttons/refresh.md) to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing [`<DeleteButton>`](/api-reference/mui/components/buttons/delete.md).

[Refer to the mutation mode docs for further information. &#8594](/advanced-tutorials/mutation-mode.md)

```tsx live hideCode url=http://localhost:3000/posts/edit/123
// visible-block-start
import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { TextField, Autocomplete, Box } from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();

    const samplesData = queryResult?.data?.data;

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "categories",
        defaultValue: samplesData?.category?.id,
    });

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            canDelete
            // highlight-next-line
            mutationMode="undoable"
        >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Id"
                    name="id"
                    disabled
                />
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Title"
                    name="title"
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...categoryAutocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    categoryAutocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.title ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option?.id?.toString() ===
                                    (value?.id ?? value)?.toString()
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!(errors as any)?.category?.id}
                                    helperText={
                                        (errors as any)?.category?.id?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/samples/edit/123"]}
        resources={[{ name: "samples", edit: SampleEdit, list: SampleList }]}
    />,
);
```

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/mui";

// highlight-start
const PostEdit = () => {
    return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
        >
            {/* ... */}
        </Refine>
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";
import { useBack } from "@refinedev/core";

const BackButton = () => {
    const goBack = useBack();

    return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-next-line
            goBack={<BackButton />}
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `isLoading`

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-next-line
            isLoading={loading}
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/mui/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            breadcrumb={
                <div
                    style={{
                        padding: "3px 6px",
                        border: "2px dashed cornflowerblue",
                    }}
                >
                    <Breadcrumb />
                </div>
            }
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            wrapperProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            headerProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            contentProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerButtons`

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::caution

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `refreshButtonProps` and `listButtonProps` to utilize the default values of the [`<ListButton>`][list-button] and [`<RefreshButton>`][refresh-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, ListButton, RefreshButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            headerButtons={({ refreshButtonProps, listButtonProps }) => (
                <>
                    <RefreshButton
                        {...refreshButtonProps}
                        meta={{ foo: "bar" }}
                    />
                    {listButtonProps && (
                        <ListButton
                            {...listButtonProps}
                            meta={{ foo: "bar" }}
                        />
                    )}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            headerButtonProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `footerButtons`

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::caution

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` and `deleteButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] and [`<DeleteButton>`][delete-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, SaveButton, DeleteButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            footerButtons={({ saveButtonProps, deleteButtonProps }) => (
                <>
                    <Button type="primary">Custom Button</Button>
                    <SaveButton {...saveButtonProps} hideText />
                    {deleteButtonProps && (
                        <DeleteButton {...deleteButtonProps} hideText />
                    )}
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Edit
            // highlight-start
            footerButtonProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
        >
            <span>Rest of your page here</span>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/edit/123"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.EditButton recordItemId={123} />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Edit" 
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`ListButton`](https://refine.dev/docs/api-reference/mui/components/buttons/list-button/) and [`RefreshButton`](https://refine.dev/docs/api-reference/mui/components/buttons/refresh-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
deleteButtonProps-type="[`DeleteButtonProps`](/docs/api-reference/mui/components/buttons/delete-button/)"
saveButtonProps-type="[`SaveButtonProps`](https://refine.dev/docs/api-reference/mui/components/buttons/save-button/)"
footerButtons-default="[`SaveButton`](https://refine.dev/docs/api-reference/mui/components/buttons/save-button/) and [`DeleteButton`](https://refine.dev/docs/api-reference/mui/components/buttons/delete-button/)"
footerButtonsProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/docs/api-reference/mui/components/mui-breadcrumb/)"
goBack-default="`<ArrowLeft />`" 
goBack-type="`ReactNode`"
/>

```tsx live shared
const SampleList = () => {
    const { dataGridProps } = RefineMui.useDataGrid();

    const { data: categoryData, isLoading: categoryIsLoading } =
        RefineCore.useMany({
            resource: "categories",
            ids:
                dataGridProps?.rows?.map((item: any) => item?.category?.id) ??
                [],
            queryOptions: {
                enabled: !!dataGridProps?.rows,
            },
        });

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "number",
                minWidth: 50,
            },
            {
                field: "title",
                headerName: "Title",
                minWidth: 200,
            },
            {
                field: "category",
                headerName: "Category",
                valueGetter: ({ row }) => {
                    const value = row?.category?.id;

                    return value;
                },
                minWidth: 300,
                renderCell: function render({ value }) {
                    return categoryIsLoading ? (
                        <>Loading...</>
                    ) : (
                        categoryData?.data?.find((item) => item.id === value)
                            ?.title
                    );
                },
            },
            {
                field: "createdAt",
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <RefineMui.DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <RefineMui.EditButton
                                hideText
                                recordItemId={row.id}
                            />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [categoryData?.data],
    );

    return (
        <RefineMui.List>
            <MuiXDataGrid.DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
            />
        </RefineMui.List>
    );
};

const Wrapper = ({ children }) => {
    return (
        <MuiMaterial.ThemeProvider theme={RefineMui.LightTheme}>
            <MuiMaterial.CssBaseline />
            <MuiMaterial.GlobalStyles
                styles={{ html: { WebkitFontSmoothing: "auto" } }}
            />
            {children}
        </MuiMaterial.ThemeProvider>
    );
};
```

[list-button]: /docs/api-reference/mui/components/buttons/list-button/
[refresh-button]: /docs/api-reference/mui/components/buttons/refresh-button/
[save-button]: /docs/api-reference/mui/components/buttons/save-button/
[delete-button]: /docs/api-reference/mui/components/buttons/delete-button/
