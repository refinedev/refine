---
id: create
title: Create
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
// visible-block-start
import React from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
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
                <TextField
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.content}
                    helperText={(errors as any)?.content?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    multiline
                    label="Content"
                    name="content"
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/samples/create"]}
        resources={[
            { name: "samples", create: SampleCreate, list: SampleList },
        ]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Typography } from "@mui/material";

const CreatePage: React.FC = () => {
    return (
        <Create
            // highlight-next-line
            title={<Typography variant="h5">Custom Title</Typography>}
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: CreatePage,
            },
        ]}
    />,
);
```

### `resource`

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

import { Refine } from "@refinedev/core";
import { Layout } from "@refinedev/mui";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
// visible-block-start
import { Create } from "@refinedev/mui";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create resource="posts">
            <span>Rest of your page here</span>
        </Create>
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

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/mui/components/buttons/save.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    return (
        /* highlight-next-line */
        <Create saveButtonProps={{ size: "small" }}>
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";
import { useBack } from "@refinedev/core";

const BackButton = () => {
    const goBack = useBack();

    return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostCreate: React.FC = () => {
    return (
        <Create
            // highlight-next-line
            goBack={<BackButton />}
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            // highlight-next-line
            isLoading={loading}
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
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

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Breadcrumb } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    return (
        <Create
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            // highlight-start
            wrapperProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            // highlight-start
            headerProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            // highlight-start
            contentProps={{
                sx: {
                    backgroundColor: "lightsteelblue",
                },
            }}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `footerButtons`

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the header.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] component.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, SaveButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
            // highlight-start
            footerButtons={({ saveButtonProps }) => (
                <>
                    <SaveButton
                        {...saveButtonProps}
                        type="primary"
                        sx={{ marginRight: 8 }}
                    >
                        Save
                    </SaveButton>
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <span>Rest of your page here</span>
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    return (
        <Create
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
        </Create>
    );
};
// visible-block-end

render(
    <RefineMuiDemo
        initialRoutes={["/posts", "/posts/create"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <RefineMui.CreateButton />
                    </div>
                ),
                create: PostCreate,
            },
        ]}
    />,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Create" goBack-default="`<ArrowLeft />`"/>

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

[save-button]: /docs/api-reference/mui/components/buttons/save-button/
