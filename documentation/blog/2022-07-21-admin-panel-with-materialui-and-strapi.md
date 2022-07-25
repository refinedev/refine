---
title: Building a Refine CRUD app with Material UI and Strapi 
description: test
slug: build-admin-panel-with-material-ui-and-strapi
authors: necati
tags: [refine, fundamentals, react, javascript, low-code, internal-tools]
image: https://refine.dev/img/refine_social.png
hide_table_of_contents: false
---


import resourceSecond from '@site/static/img/tutorial/mui/resource-2.png';
import createGif from '@site/static/img/blog/2022-07-21-admin-panel-with-materialui-and-strapi/create.gif'

## Introduction
We will build an admin panel that supports CRUD operations, has built in authentication, and a mutation mode feature using industry-standard best tools.

UI design can be a complex and time-consuming process, but using a tool like Material UI can help to simplify the process and speed up the development cycle. In this tutorial we'll use the benefits of Material UI and to handle data fetching and mutations, we'll integrate Strapi that Refine has built-in support.

We'll walk through the process of listing, creating and deleting posts in a Refine application and make use of Refine's components and hooks to build out our functionality.

Steps we'll cover includes:
- What are the benefits of using Refine?
- Bootstrapping the Refine App
- Implementing Strapi-v4 data provider
- Creating page
- CRUD operations
- Adding authentication
- Implementing mutation mode
- Testing syncwithlocation feature
<!--truncate-->

## Prerequisities
Before we dive into the meat of the article, let's first take a look at the tools we'll be using. 
- [Refine](https://refine.dev/docs/getting-started/overview/)
- [Refine StrapiV4 data provider ](https://refine.dev/docs/examples/data-provider/strapi-v4/)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)
- [Refine Material UI Tutorial](https://refine.dev/docs/ui-frameworks/mui/tutorial/)



##  What are the benefits of using Refine?

Refine is a headless React internal tool framework that helps you develop quickly while developing both B2B and B2C applications. t speeds you up while allowing full customization, making it an ideal choice for rapid development with pro features.

-   It is Open Source under the MIT license.
-   Easy to use and it is easy to learn. There are many examples to help you get started, as well as documentation.
-   Is a framework that does not require you to use any UI libraries or frameworks.
-   Supports Ant Design and Material UI for quick and easy solutions.
-   Backend agnostic, so you can connect to any backend you want.
-   Customizable, which means you can change it to fit your needs.
-   Some of main features are data fetching and state management, routings, authentication, authorization, internationalization, real-time, mutation modes with optimistic and pessimistic and undoadable modes


## Bootstrapping the Refine app
We'll use [superplate](https://github.com/pankod/superplate) CLI wizard to create and customize Refine application.

Run the following command
```
npx superplate-cli -p refine-react materialui-example
```

Select the following options to complete CLI wizard:

```
? Do you want to use a UI Framework?:
❯ Material UI

? Do you want an extended theme?:
❯ No

? Do you want to add dark mode support?:
❯ No

? Router Provider:
❯ React Router v6

? Data Provider:
❯ Strapi v4

? Do you want a customized layout?
❯ No

? i18n - Internationalization:
❯ No
```



### Implementing Strapi-v4 data provider
Data providers are refine components making it possible to consume different API's and data services conveniently.
The required Strapi-V4 data provider setups are added automatically by CLI wizard.

To consume Refine's Fake StrapiV4 provider, we'll need change API URL.

```tsx title="src/constants.ts"
export const API_URL = "https://api.strapi-v4.refine.dev";
```
[Refer to Refine docs for more detailed information about refine Strapi-V4 support&#8594](https://refine.dev/docs/guides-and-concepts/data-provider/strapi-v4/)

[Refer to Refine's data provider documentation for detailed information&#8594](https://refine.dev/docs/core/providers/data-provider/)

[Refer to official Strapi v4 documentation&#8594](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html)


### Creating list page
 We need to create "PostList" page to show data on the UI.

First, we'll need an interface to work with the data from the API endpoint.

We'll create a new folder named "interfaces" under "/src" if you don't already have one. Then create a "index.d.ts" file with the following code:


```tsx title="src/interfaces"
export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
    createdAt: string;
}

```

<br/>

Now, we'll create a new folder named "pages/posts" under "/src". Under that folder, create a "list.tsx" file with the following code


```tsx title="src/pages/posts/list.tsx"
import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    DeleteButton,
    TagField,
    DateField,
    List,
    Stack,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();


    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            {
                field: "createdAt",
                headerName: "CreatedAt",
                minWidth: 220,
                renderCell: function render(params) {
                    return (
                        <DateField format="LLL" value={params.row.createdAt} />
                    );
                },
            },
            {
                headerName: "Actions",
                headerAlign: "center",
                field: "actions",
                minWidth: 180,
                align: "center",
                flex: 1,
                renderCell: function render(params) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                            <ShowButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={params.row.id}
                            />
                        </Stack>
                    );
                },
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};

```

We use Material UI components that exports from Refine.

[Get more information about components and hooks in PostList page we defined&#8594](https://refine.dev/docs/ui-frameworks/mui/tutorial/#creating-a-list-page)


[Refer to Material UI offical docs to learn more about components&#8594](https://mui.com/x/react-data-grid/components/#main-content)




Note you will need a few more files which help src/App.tsx to find your pages and posts. In the /pages folder, put this index.tsx file in it which allows everything in the posts folder to be used elsewhere.

```tsx title="src/pages/posts/index.tsx"
export * from "./list";
```



### Adding resources and list page to Refine

Now we are ready to start connecting to our API by adding a resource to our application.
We'll add `/posts/` endpoint from our example API as a resource.


We'll add the highlighted code to our App.tsx to connect to the endpoint and List page.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    Layout,
    ThemeProvider,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import { DataProvider } from "@pankod/refine-strapi-v4";

import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { PostList } from "./pages/posts";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                    //highlight-start
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                        },
                    ]}
                    //highlight-end
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;

```

:::info
`resources` is a property of `<Refine/>` representing API Endpoints. The `name` property of every single resource should match one of the endpoints in your API!
:::

After setup is complete, navigate to the project folder and start your project with:
```
npm run dev
```

The application should redirect now to an URL defined by the `name` property. 

Open your application to check that the URL is routed to **/posts** and posts are displayed correctly in a table structure and even the pagination works out-of-the box.


<>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={resourceSecond} alt="Resource only List component" />
</div>
<br/>
</>


### CRUD operations

We are going to implement CRUD operations features like creating records.

For the sake of simplicity, we are only going to show creating a record example.

[Please check offical Refine Material UI tutorial for Showing, editing, and deleting records explanations and examples &#8594](https://refine.dev/docs/ui-frameworks/mui/tutorial/#showing-a-single-record)

The Material UI provides already styled, but still very customizable inputs that encapsulate adding labels and error handling with helper texts. However, we need a third-party library to handle forms when using Material UI. [React Hook Form](https://react-hook-form.com/) is one of the best options for this job!
The React Hook Form library has been integrated with **refine** ([`@pankod/refine-react-hook-form`](https://github.com/pankod/refine/tree/master/packages/react-hook-form)) . This means you can now use Material UI for your forms and manage them using [`@pankod/refine-react-hook-form`](https://github.com/pankod/refine/tree/master/packages/react-hook-form)!

First, we'll create PostCreate page to create new records.

```tsx title="src/pages/posts/create"
import {
    Box,
    TextField,
    Autocomplete,
    useAutocomplete,
    Create,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

import { ICategory } from "interfaces";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        control,
        formState: { errors },
    } = useForm();

    const { autocompleteProps } = useAutocomplete<ICategory>({
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
                    {...register("title", { required: "Title is required" })}
                    error={!!errors?.title}
                    helperText={errors.title?.message}
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                />
                <Controller
                    control={control}
                    name="status"
                    rules={{ required: "Status is required" }}
                    defaultValue=""
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={["published", "draft", "rejected"]}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Status"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.status}
                                    helperText={errors.status?.message}
                                    required
                                />
                            )}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return item.title ? item.title : "";
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined || option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    margin="normal"
                                    variant="outlined"
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
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


```

<br />


After creating the `<PostCreate>` component, add it to resource with `create` prop:

<br />

```tsx title="src/App.tsx"
...

import {
    PostList,
// highlight-next-line
    PostCreate,
} from "pages/posts";

...

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    authProvider={authProvider}
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            // highlight-next-line
                            create: PostCreate,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};
```

<br />

Try it on the browser and see if you can create new posts from scratch.

<br />



<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={createGif} alt="Create record action" />
</div>

<br/>




