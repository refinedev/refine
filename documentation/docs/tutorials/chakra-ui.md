---
id: chakra-ui-tutorial
title: Your First App using Chakra UI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```tsx live shared
const IconChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="6 9 12 15 18 9"></polyline>
</svg>
);

const IconSelector = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-selector" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="8 9 12 5 16 9"></polyline>
   <polyline points="16 15 12 19 8 15"></polyline>
</svg>
);

const IconX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <line x1="18" y1="6" x2="6" y2="18"></line>
   <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
);

const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 12l5 5l10 -10"></path>
</svg>
);

const IconChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="15 6 9 12 15 18"></polyline>
</svg>
);

const IconChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <polyline points="9 6 15 12 9 18"></polyline>
</svg>
);

const IconFilter = () => (
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-filter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"></path>
</svg>
);

const ColumnSorter: React.FC<{ column: Column<any, any> }> = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <RefineChakra.IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </RefineChakra.IconButton>
    );
};

const ColumnFilter: React.FC<{ column: Column<any, any> }> = ({ column }) => {
    const [state, setState] = useState(null as null | { value: any });

    if (!column.getCanFilter()) {
        return null;
    }

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

    // eslint-disable-next-line
    const change = (value: any) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    

    const renderFilterElement = () => {
        // eslint-disable-next-line
        const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <RefineChakra.Input
                    borderRadius="md"
                    size="sm"
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return (
            <FilterComponent
                value={state?.value}
                onChange={(e: any) => change(e.target.value)}
            />
        );
    };

    return (
        <RefineChakra.Menu isOpen={!!state} onClose={close}>
            <RefineChakra.MenuButton
                onClick={open}
                as={RefineChakra.IconButton}
                aria-label="Options"
                icon={<IconFilter size="16" />}
                variant="ghost"
                size="xs"
            />
            <RefineChakra.MenuList p="2">
                {!!state && (
                    <RefineChakra.VStack align="flex-start">
                        {renderFilterElement()}
                        <RefineChakra.HStack spacing="1">
                            <RefineChakra.IconButton
                                aria-label="Clear"
                                size="sm"
                                colorScheme="red"
                                onClick={clear}
                            >
                                <IconX size={18} />
                            </RefineChakra.IconButton>
                            <RefineChakra.IconButton
                                aria-label="Save"
                                size="sm"
                                onClick={save}
                                colorScheme="green"
                            >
                                <IconCheck size={18} />
                            </RefineChakra.IconButton>
                        </RefineChakra.HStack>
                    </RefineChakra.VStack>
                )}
            </RefineChakra.MenuList>
        </RefineChakra.Menu>
    );
};

const PostShow: React.FC = () => {
    const { queryResult } = RefineCore.useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = RefineCore.useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <RefineChakra.Show isLoading={isLoading}>
            <RefineChakra.Heading as="h5" size="sm">
                Id
            </RefineChakra.Heading>
            <RefineChakra.Text mt={2}>{record?.id}</RefineChakra.Text>

            <RefineChakra.Heading as="h5" size="sm" mt={4}>
                Title
            </RefineChakra.Heading>
            <RefineChakra.Text mt={2}>{record?.title}</RefineChakra.Text>

            <RefineChakra.Heading as="h5" size="sm" mt={4}>
                Status
            </RefineChakra.Heading>
            <RefineChakra.Text mt={2}>{record?.status}</RefineChakra.Text>

            <RefineChakra.Heading as="h5" size="sm" mt={4}>
                Category
            </RefineChakra.Heading>
            <RefineChakra.Text mt={2}>{categoryData?.data?.title}</RefineChakra.Text>

            <RefineChakra.Heading as="h5" size="sm" mt={4}>
                Content
            </RefineChakra.Heading>
            <RefineChakra.Spacer mt={2} />
            <RefineChakra.MarkdownField value={record?.content} />
        </RefineChakra.Show>
    );
};

const PostEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        formState: { errors },
        resetField,
    } = RefineReactHookForm.useForm<IPost>();

    const { options } = RefineCore.useSelect({
        resource: "categories",

        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <RefineChakra.Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.title}>
                <RefineChakra.FormLabel>Title</RefineChakra.FormLabel>
                <RefineChakra.Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <RefineChakra.FormErrorMessage>
                    {`${errors.title?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.status}>
                <RefineChakra.FormLabel>Status</RefineChakra.FormLabel>
                <RefineChakra.Select
                    id="content"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </RefineChakra.Select>
                <RefineChakra.FormErrorMessage>
                    {`${errors.status?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <RefineChakra.FormLabel>Category</RefineChakra.FormLabel>
                <RefineChakra.Select
                    id="ca"
                    placeholder="Select Category"
                    {...register("category.id", {
                        required: true,
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </RefineChakra.Select>
                <RefineChakra.FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
        </RefineChakra.Edit>
    );
}

const PostCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = RefineReactHookForm.useForm<IPost>();

    const { options } = RefineCore.useSelect({
        resource: "categories",
    });

    return (
        <RefineChakra.Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.title}>
                <RefineChakra.FormLabel>Title</RefineChakra.FormLabel>
                <RefineChakra.Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <RefineChakra.FormErrorMessage>
                    {`${errors.title?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.status}>
                <RefineChakra.FormLabel>Status</RefineChakra.FormLabel>
                <Select
                    id="content"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <RefineChakra.FormErrorMessage>
                    {`${errors.status?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
            <RefineChakra.FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <RefineChakra.FormLabel>Category</RefineChakra.FormLabel>
                <RefineChakra.Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("categoryId", {
                        required: "Category is required",
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </RefineChakra.Select>
                <RefineChakra.FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </RefineChakra.FormErrorMessage>
            </RefineChakra.FormControl>
        </Create>
    );
};

const Pagination: React.FC<{
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
}> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = RefineChakra.usePagination({
        current,
        pageCount,
    });

    return (
        <RefineChakra.Box display="flex" justifyContent="flex-end">
            <RefineChakra.HStack my="3" spacing="1">
                {pagination?.prev && (
                    <RefineChakra.IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >  
                        <IconChevronLeft size="18" />
                    </RefineChakra.IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <RefineChakra.Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </RefineChakra.Button>
                    );
                })}
                {pagination?.next && (
                    <RefineChakra.IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </RefineChakra.IconButton>
                )}
            </RefineChakra.HStack>
        </RefineChakra.Box>
    );
};

const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
// const { notificationProvider } = RefineChakra;

setRefineProps({
    routerProvider,
    // notificationProvider: notificationProvider(),
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    Layout: RefineChakra.Layout,
    catchAll: <RefineChakra.ErrorComponent />,
    ReadyPage: RefineChakra.ReadyPage,
});

const Wrapper = ({ children }) => {
    return (
        <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
            {children}
        </RefineChakra.ChakraProvider>
    );
};
```

## Introduction

This tutorial will go through process of building a simple _admin panel_ for a _CMS-like_ application with headless.

Step by step, you're going to learn how to consume a _REST API_ and add basic CRUD functionality to your panel leveraging the unique capabilities of **refine**.

Let's begin by setting up a new **refine** project.

## Setting up

There are two alternative methods to set up a **refine** application.

The recommended way is using the `create refine-app` tool. _create refine-app_'s _CLI wizard_ will let you create and customize your application in seconds.

Alternatively, you may use the _create-react-app_ tool to create an empty _React_ application and then add **refine** module via _npm_.

<Tabs
defaultValue="create-refine-app"
values={[
{label: 'use create refine-app', value: 'create-refine-app'},
{label: 'use create-react-app', value: 'create-react-app'}
]}>
<TabItem value="create-react-app">

First, run the _create-react-app_ tool to bootstrap an empty _React project_.

```
npx create-react-app tutorial --template typescript
```

:::note
_--template typescript_ flag will ensure that the Typescript language is selected.
:::
Navigate to the project folder and install **refine** with the following _npm_ command:

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine-core @pankod/refine-chakra-ui @pankod/refine-react-router-v6 @pankod/refine-react-table @pankod/refine-react-hook-form 
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add  @pankod/refine-core @pankod/refine-chakra-ui @pankod/refine-react-router-v6 @pankod/refine-react-table @pankod/refine-react-hook-form 
```

  </TabItem>
</Tabs>

:::danger
This tutorial assumes your project is configured for absolute imports. Since CRA does not configure it by default, you should configure it yourself to be able to use absolute imports. You should configure a [`tsconfig.json`](https://www.typescriptlang.org/tsconfig#baseUrl) with `baseUrl` setting pointing to the `/src` directory in your project.

[Refer to CRA docs for more information about absolute imports. &#8594](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)
:::

</TabItem>
<TabItem value="create-refine-app">

First, run the **create refine-app** with the following command:

```
npm create refine-app@latest -- -o refine-chakra-ui tutorial
```
</TabItem>
</Tabs>

## About Fake REST API

**refine** is designed to consume data from APIs.

For the sake of this tutorial, we will provide you a fully working, _fake REST API_ located at https://api.fake-rest.refine.dev/. You may take a look at available [resources and routes of the API](https://api.fake-rest.refine.dev/) before proceeding to the next step.

## Using a Dataprovider

Dataproviders are **refine** components making it possible to consume different API's and data services conveniently. To consume our _Fake REST API_, we'll use the **"Simple REST Dataprovider"**.

Next, navigate to the project folder and run the following command to install the required package:

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine-simple-rest
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add @pankod/refine-simple-rest
```

  </TabItem>
</Tabs>

:::note
If you used `create refine-app` to bootstrap the project, you can skip issuing this command as `create refine-app` already installs the selected data provider.
:::

:::note

Fake REST API is based on [JSON Server Project](https://github.com/typicode/json-server). **Simple REST Dataprovider** is fully compatible with the REST rules and methods of the **JSON Server**.
:::

:::tip

**refine** includes many out-of-the-box data providers to use in your projects like

-   [Simple REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest)
-   [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql)
-   [NestJS CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud)
-   [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable)
-   [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi) - [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4)
-   [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql)
-   [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase)
-   [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura)
-   [Nhost](https://github.com/refinedev/refine/tree/master/packages/nhost)
-   [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite)
-   [Medusa](https://github.com/refinedev/refine/tree/master/packages/medusa)
-   [Altogic](https://github.com/refinedev/refine/tree/master/packages/altogic)

### Community ❤️

-   [Firebase](https://github.com/resulturan/refine-firebase) by [rturan29](https://github.com/resulturan)
-   [Directus](https://github.com/tspvivek/refine-directus) by [tspvivek](https://github.com/tspvivek)
-   [Elide](https://github.com/chirdeeptomar/refine-elide-rest) by [chirdeeptomar](https://github.com/chirdeeptomar)

[Refer to the `dataProvider` documentation for detailed usage. &#8594](/api-reference/core/providers/data-provider.md)
:::

## Bootstrapping the Application

Replace the contents of `App.tsx` with the following code:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
            />
        </ChakraProvider>
    );
};
```

:::info
Refine application uses [`Montserrat`](https://fonts.google.com/specimen/Montserrat) font by default as it is defined in the [`typography`](https://github.com/refinedev/refine/blob/next/packages/chakra-ui/src/theme/index.ts) property of the theme. But to use [`Montserrat`](https://fonts.google.com/specimen/Montserrat), you need to embed it to your `index.html` file.
For more information about adding font family in your Refine application, you can look at [`Chakra UI Theme Customization`](/api-reference/chakra-ui/customization/theme.md).

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        // highlight-start
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />
        // highlight-end
        <title>refine adding font family example</title>
    </head>

    <body>
        ...
    </body>
</html>
```

:::

:::tip
**refine** comes native with Light/Dark theme support. Check out the [`theme`](/api-reference/chakra-ui/customization/theme.md) documentation for more information.
:::

<br/>

`<Refine/>` is the root component of a **refine** application. Using the [`dataProvider`](/api-reference/core/providers/data-provider.md) prop, we made our **Simple REST Dataprovider** available to the entire application.

Run the following command to launch the app in development mode:

<Tabs
defaultValue="create-refine-app"
values={[
{label: 'with create refine-app', value: 'create-refine-app'},
{label: 'with create-react-app', value: 'create-react-app'}
]}>
<TabItem value="create-refine-app">

```sh
npm run dev
```

  </TabItem>
  <TabItem value="create-react-app">

```sh
npm run start
```

  </TabItem>
</Tabs>

Your **refine** application should be up and running!  
Point your browser to [http://localhost:3000](http://localhost:3000) to access it. You will see the welcome page.

```tsx live url=http://localhost:3000 previewHeight=420px previewOnly
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

const App = () => {
    return <Refine />;
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Adding Resources

Now we are ready to start connecting to our API by adding a resource to our application.

Let's add **/posts/** endpoint from our API as a resource. First take a look to the raw API response for the request made to the **/posts/** route:

<details><summary>Show response</summary>
<p>

```ts title="GET https://api.fake-rest.refine.dev/posts/"
[
  {
    "id": 1,
    "title": "Eius ea autem sapiente placeat fuga voluptas quos quae.",
    "slug": "beatae-esse-dolor",
    "content": "Explicabo nihil delectus. Nam aliquid sunt numquam...",
    "category": {
      "id": 24
    },
    "user": {
      "id": 7
    },
    "status": "draft",
    "createdAt": "2021-03-13T03:09:30.186Z",
    "image": [],
    "tags": [
      7,
      4
    ],
    "language": 2
  },
  ...
]
```

</p>
</details>

<br/>

Now, add the highlighted code to your `App.tsx` to connect to the endpoint.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";

const App = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                // highlight-next-line
                resources={[{ name: "posts" }]}
            />
        </ChakraProvider>
    );
};
```

:::info
`resources` is a property of `<Refine/>` representing API Endpoints. The `name` property of every single resource should match one of the endpoints in your API!
:::

Instead of showing the welcome page, the application should redirect now to an URL defined by the `name` property. Open your application to check that the URL is routed to **/posts**:

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly disableScroll
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";

const App = () => {
    return <Refine resources={[{ name: "posts" }]} />;
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

You'll still see a **404** error page because no **Page** component is assigned to our resource yet.

:::note
`resources` use **Page** components to handle data and perform rendering. **Page** components are passed to `resources` as an array of objects.
For basic _CRUD_ operations, there are **four** predefined props: **list**, **create**, **edit** and **show**.
:::

Let's create a **Page** component to fetch **posts** and display them as a table. Later, we will pass the component as the **list** prop to our resource.

## Creating a List Page

First, we'll need an interface to work with the data from the API endpoint.

:::tip
We'll use the `@pankod/refine-react-table` for benefit of the **TanStack Table v8** library. However, you can use `useTable` without the `@pankod/refine-react-table` package.
:::

Create a new folder named _"interfaces"_ under _"/src"_ if you don't already have one. Then create a _"index.d.ts"_ file with the following code:

```ts title="interfaces/index.d.ts"
export interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    createdAt: string;
}
```

We'll be using **title**, **status** and **createdAt** fields of every **post** record.

Now, create a new folder named _"pages/posts"_ under _"/src"_. Under that folder, create a _"list.tsx"_ file with the following code:

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
} from "@pankod/refine-chakra-ui";

import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const { getHeaderGroups, getRowModel } = useTable({
        columns,
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};
```

`@pankod/refine-react-table` hook uses `useTable()` fetches data from API. Normally, **TanStack-table**'s `useReactTable` expects a `data` prop but `@pankod/refine-react-table`'s `useTable` doesn't expect a `data` prop.

[Refer to the **@pankod/refine-react-table** for more information. →](/packages/documentation/react-table.md)

:::note
We didn't use arrow functions for rendering cell because of the react/display-name is not compatible with arrow functions. If you want to use arrow functions, you can use like this:

```tsx title="pages/posts/list.tsx"
// eslint-disable-next-line
renderCell: ({ getValue }) => (
    <DateField value={getValue() as string} format="LLL" />
);
```

[Refer to `<DateField />` for more information. &#8594](/api-reference/chakra-ui/components/fields/tag.md)

:::

<br/>

Finally, we are ready to add `<PostList>` to our resource. Add the highlighted line to your `App.tsx`:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-next-line
import { PostList } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                // highlight-next-line
                resources={[{ name: "posts", list: PostList }]}
            />
        </ChakraProvider>
    );
};
```

Note you will need a few more files which help `src/App.tsx` to find your pages and posts. In the `/pages` folder, put this `index.tsx` file in it which allows everything in the `posts` folder to be used elsewhere.

```tsx title="src/pages/index.ts"
export * from "./posts";
```

<br />

Similarly, put a file in the `/src/pages/posts` folder which accomplishes the same function. We will use the commented out code later as we add more capabilities to our app. Remember as you add functions, uncomment each appropriate line.

```tsx title="src/pages/posts/index.ts"
export * from "./list";
```

<br />

Open your application in your browser. You will see **posts** are displayed correctly in a table structure and even the pagination works out-of-the box.

On the next step, we are going to add a category field to the table which involves handling data relationships.

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
} from "@pankod/refine-chakra-ui";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const { getHeaderGroups, getRowModel } = useTable({
        columns,
    });

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Handling relationships

Remember the records from `/posts` endpoint that had a category id field.

```ts title="https://api.fake-rest.refine.dev/posts/1"
...
  "category": {
    "id": 26
  }
...
```

<br />

To display category titles on our table, we need to category id to their corresponding titles.
The category title data can be obtained from the `/categories` endpoint for each record.

```ts title="https://api.fake-rest.refine.dev/categories/26"
  {
    "id": 26,
    "title": "mock category title",
  }
```

<br />

At this point, we need to join records from different resources. For this, we're going to use the refine hook `useMany`.

Before we start, just edit our interface for the new `ICategory` type:

```ts title="interfaces/index.d.ts"
// highlight-start
export interface ICategory {
    id: number;
    title: string;
}
// highlight-end

export interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    // highlight-next-line
    category: { id: number };
    createdAt: string;
}
```

So we can update our `list.tsx` with the highlighted lines:

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
} from "@pankod/refine-chakra-ui";
// highlight-next-line
import { GetManyResponse, useMany } from "@pankod/refine-core";

// highlight-next-line
import { IPost, ICategory } from "../../interfaces";

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            // highlight-start
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            // highlight-end
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        // highlight-start
        setOptions,
        refineCore: {
            tableQueryResult: { data: tableData },
        },
        // highlight-end
    } = useTable({
        columns,
    });

    // highlight-start
    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));
    // highlight-end

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};
```

We construct an array of `categoryId`'s from `/posts` endpoint and pass it to the `useMany` hook. `categoriesData` will be filled with _id-title_ tuples to be used for rendering our component.

Try the result on your browser and you'll notice that the category column is filled correctly with the matching category titles for the each record's category id's. Even the loading state is managed by **refine**.

To get more detailed information about this hook, please refer the [useMany Documentation](/api-reference/core/hooks/data/useMany.md).

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Adding Sorting and Filtering

The `@pankod/refine-react-table` package also listens for changes in `filters` and `sorting` states of the **Tanstack Table** and updates the table accordingly. The change in these states triggers the fetch of the new data.

So, we can add filters and sorting features to our table as suggested by TanStack Table with the following code:

```tsx title="src/pages/posts/list.tsx"
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    // highlight-next-line
    Select,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

// highlight-next-line
import { ColumnFilter, ColumnSorter } from "../../components/table";
// highlight-next-line
import { IPost, ICategory, FilterElementProps } from "../../interfaces";

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                // highlight-next-line
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                // highlight-start
                meta: {
                    filterOperator: "contains",
                },
                // highlight-end
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                // highlight-start
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
                // highlight-end
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                // highlight-next-line
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                // highlight-start
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                                // highlight-end
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};
```

```tsx title="src/interfaces/index.d.ts"
export interface IPost {
    id: number;
    title: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
    createdAt: string;
}

export interface ICategory {
    id: number;
    title: string;
}

// highlight-start
export interface ColumnButtonProps {
    column: Column<any, any>;
}

export interface FilterElementProps {
    value: any;
    onChange: (value: any) => void;
}
// highlight-end
```

<details><summary>Show ColumnFilter</summary>

```tsx title="src/components/table/columnFilter.tsx"
import React, { useState } from "react";
import {
    Input,
    Menu,
    IconButton,
    MenuButton,
    MenuList,
    VStack,
    HStack,
} from "@pankod/refine-chakra-ui";
import { IconFilter, IconX, IconCheck } from "@tabler/icons";

import { ColumnButtonProps } from "../../interfaces";

export const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
    // eslint-disable-next-line
    const [state, setState] = useState(null as null | { value: any });

    if (!column.getCanFilter()) {
        return null;
    }

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

    // eslint-disable-next-line
    const change = (value: any) => setState({ value });

    const clear = () => {
        column.setFilterValue(undefined);
        close();
    };

    const save = () => {
        if (!state) return;
        column.setFilterValue(state.value);
        close();
    };

    const renderFilterElement = () => {
        // eslint-disable-next-line
        const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

        if (!FilterComponent && !!state) {
            return (
                <Input
                    borderRadius="md"
                    size="sm"
                    autoComplete="off"
                    value={state.value}
                    onChange={(e) => change(e.target.value)}
                />
            );
        }

        return (
            <FilterComponent
                value={state?.value}
                onChange={(e: any) => change(e.target.value)}
            />
        );
    };

    return (
        <Menu isOpen={!!state} onClose={close}>
            <MenuButton
                onClick={open}
                as={IconButton}
                aria-label="Options"
                icon={<IconFilter size="16" />}
                variant="ghost"
                size="xs"
            />
            <MenuList p="2">
                {!!state && (
                    <VStack align="flex-start">
                        {renderFilterElement()}
                        <HStack spacing="1">
                            <IconButton
                                aria-label="Clear"
                                size="sm"
                                colorScheme="red"
                                onClick={clear}
                            >
                                <IconX size={18} />
                            </IconButton>
                            <IconButton
                                aria-label="Save"
                                size="sm"
                                onClick={save}
                                colorScheme="green"
                            >
                                <IconCheck size={18} />
                            </IconButton>
                        </HStack>
                    </VStack>
                )}
            </MenuList>
        </Menu>
    );
};
```

</details>

<details><summary>Show ColumnSorter</summary>

```tsx title="src/components/table/columnSorter.tsx"
import { IconButton } from "@chakra-ui/react";
import { IconChevronDown, IconSelector } from "@tabler/icons";

import { ColumnButtonProps } from "../../interfaces";

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
    if (!column.getCanSort()) {
        return null;
    }

    const sorted = column.getIsSorted();

    return (
        <IconButton
            aria-label="Sort"
            size="xs"
            onClick={column.getToggleSortingHandler()}
            style={{
                transition: "transform 0.25s",
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? (
                <IconChevronDown size={18} />
            ) : (
                <IconSelector size={18} />
            )}
        </IconButton>
    );
};
```

</details>

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Pagination

`Chakra UI` does not provide a pagination component. Let's create a simple pagination component.

<details><summary>Show Pagination Component</summary>

```tsx title="src/components/pagination/index.tsx"
import { FC } from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";
import { IconButton, usePagination } from "@pankod/refine-chakra-ui";

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
```

</details>


```tsx title="src/pages/posts/list.tsx"
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { Pagination } from "../../components/pagination";
import { IPost, ICategory, FilterElementProps } from "../../interfaces";

export const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
                enableColumnFilter: false,
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            tableQueryResult: { data: tableData },
            // highlight-start
            setCurrent,
            pageCount,
            current,
            // highlight-end
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            // highlight-start
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
            // highlight-end
        </List>
    );
};
```

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```


## Showing a single record

At this point we are able to list all _post_ records on the table component with pagination, sorting and filtering functionality. Next, we are going to add a _details page_ to fetch and display data from a single record.

Let's create a `<PostShow>` component on `/pages/posts` folder:

```tsx title="/pages/posts/show.tsx"
import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Heading,
    Text,
    MarkdownField,
    Spacer,
} from "@pankod/refine-chakra-ui";

import { ICategory, IPost } from "../../interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <Text mt={2}>{record?.id}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Title
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Status
            </Heading>
            <Text mt={2}>{record?.status}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Category
            </Heading>
            <Text mt={2}>{categoryData?.data?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Content
            </Heading>
            <Spacer mt={2} />
            <MarkdownField value={record?.content} />
        </Show>
    );
};
```

✳️ `useShow()` is a **refine** hook used to fetch a single record of data. The `queryResult` has the response and also `isLoading` state.

[Refer to the `useShow` documentation for detailed usage information. &#8594](/api-reference/core/hooks/show/useShow.md)

✳️ To retrieve the category title, again we need to make a call to `/categories` endpoint. This time we used `useOne()` hook to get a single record from another resource.

[Refer to the `useOne` documentation for detailed usage information. &#8594](/api-reference/core/hooks/data/useOne.md)

:::caution attention
`useShow()` is the preferred hook for fetching data from the current resource. To query foreign resources you may use the low-level `useOne()` hook.
:::

Since we've got access to raw data returning from `useShow()`, there is no restriction on how it's displayed on your components. If you prefer presenting your content with a nicer wrapper, **refine** provides you
the `<Show>` component which has extra features like `list` and `refresh` buttons.

[Refer to the `<Show>` documentation for detailed usage information. &#8594](/api-reference/mui/components/basic-views/show.md)

<br />

Now we can add the newly created component to our resource with `show` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-next-line
import { PostList, PostShow } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                // highlight-next-line
                resources={[{ name: "posts", list: PostList, show: PostShow }]}
            />
        </ChakraProvider>
    );
};
```

<br />

And then we can add a `<ShowButton>` on the list page to make it possible for users to navigate to detail pages:

```tsx title="src/pages/posts/list.tsx"
import {
    ...
    // highlight-next-line
    ShowButton,
} from "@pankod/refine-chakra-ui";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
           ...
           //highlight-start
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <ShowButton
                            hideText
                            recordItemId={getValue() as number}
                        />
                    );
                },
            },
            //highlight-end
        ],
        [],
    );


    const { ... } = useTable<IPost>({ columns });

    return (
        ...
    );
};
```

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
    ShowButton,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <ShowButton
                            hideText
                            recordItemId={getValue() as number}
                        />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Editing a record

Until this point, we were basically working with reading operations such as fetching and displaying data from resources. From now on, we are going to start creating and updating records by using `useForm`.

Let's start by creating a new `<PostEdit>` page responsible for editing a single record:

```tsx title="src/pages/posts/edit.tsx"
import { useEffect } from "react";
import {
    Edit,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from "@pankod/refine-chakra-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPost } from "../../interfaces";

export const PostEdit = () => {
    const {
        refineCore: { formLoading, queryResult },
        saveButtonProps,
        register,
        formState: { errors },
        resetField,
    } = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
        queryOptions: { enabled: !!queryResult?.data?.data.category.id },
    });

    useEffect(() => {
        resetField("category.id");
    }, [options]);

    return (
        <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Select
                    id="content"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {`${errors.status?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Select
                    id="category"
                    placeholder="Select Category"
                    {...register("category.id", {
                        required: true,
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </FormErrorMessage>
            </FormControl>
        </Edit>
    );
};
```

<br />

Let's see what's going on our `<PostEdit>` component in detail:

✳️ `useForm` is a refine hook for handling form data. In edit page, `useForm` hook initializes the form with current record values.

:::caution Attention
✳️ [`<Input>`](https://chakra-ui.com/docs/components/input/usage) is Chakra UI components to build form inputs.

✳️ Save button submits the form by executing the `useUpdate` method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md). After a successful response, the application will be redirected to the listing page.
:::

Now we can add the newly created component to our resource with `edit` prop:

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-next-line
import { PostList, PostShow, PostEdit } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        // highlight-next-line
                        edit: PostEdit,
                    },
                ]}
            />
        </ChakraProvider>
    );
};
```

We are going to need an _edit_ button on each row to display the `<PostEdit>` component. **refine** doesn't automatically add one, so we have to update our `<PostList>` component to add a `<EditButton>` for each record:

```tsx title="src/pages/posts/list.tsx"
import {
    ...
    ShowButton,
    // highlight-start
    EditButton
    HStack,
    // highlight-end
} from "@pankod/refine-chakra-ui";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
           ...
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        // highlight-start
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                        //highlight-end
                    );
                },
            },
        ],
        [],
    );


    const { ... } = useTable<IPost>({ columns });

    return (
        ...
    );
};
```

[Refer to the `<EditButton>` documentation for detailed usage information. &#8594](/api-reference/mui/components/buttons/edit.md)

You can try using edit buttons which will trigger the edit forms for each record, allowing you to update the record data.

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
    ShowButton,
    EditButton,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    edit: PostEdit,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Creating a record

Creating a record in **refine** follows a similar flow as `editing` records.

First, we'll create a `<PostCreate>` page:

```tsx title="src/pages/posts/create.tsx"
import {
    Create,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
} from "@pankod/refine-chakra-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPost } from "../../interfaces";

export const PostCreate = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm<IPost>();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                />
                <FormErrorMessage>
                    {`${errors.title?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
                <FormLabel>Status</FormLabel>
                <Select
                    id="content"
                    placeholder="Select Post Status"
                    {...register("status", {
                        required: "Status is required",
                    })}
                >
                    <option>published</option>
                    <option>draft</option>
                    <option>rejected</option>
                </Select>
                <FormErrorMessage>
                    {`${errors.status?.message}`}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
                <FormLabel>Category</FormLabel>
                <Select
                    id="categoryId"
                    placeholder="Select Category"
                    {...register("categoryId", {
                        required: "Category is required",
                    })}
                >
                    {options?.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>
                    {`${errors.categoryId?.message}`}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};
```

We should notice some minor differences from the edit example:

✳️ `<form>` is wrapped with `<Create>` component.

✳️ Save button submits the form by executing the `useCreate` method provided by the [`dataProvider`](/api-reference/core/providers/data-provider.md).

✳️ No `defaultValue` is passed to `useSelect`.

<br />

After creating the `<PostCreate>` component, add it to resource with `create` prop:

<br />

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

// highlight-next-line
import { PostList, PostShow, PostEdit, PostCreate } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        edit: PostEdit,
                        // highlight-next-line
                        create: PostCreate,
                    },
                ]}
            />
        </ChakraProvider>
    );
};
```

And that's it! Try it on the browser and see if you can create new posts from scratch.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
    ShowButton,
    EditButton,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    edit: PostEdit,
                    create: PostCreate,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Deleting a record

Deleting a record can be done in two ways.

The first way is adding a delete button on each row since _refine_ doesn't automatically add one, so we have to update our `<PostList>` component to add a `<DeleteButton>` for each record:

```tsx title="src/pages/posts/list.tsx"
import {
    ...
    ShowButton,
    EditButton
    HStack,
    // highlight-next-line
    DeleteButton,
} from "@pankod/refine-chakra-ui";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
           ...
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            // highlight-start
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            //highlight-end
                        </HStack>
                    );
                },
            },
        ],
        [],
    );


    const { ... } = useTable<IPost>({ columns });

    return (
        ...
    );
};
```

[Refer to the `<DeleteButton>` documentation for detailed usage information. &#8594](/api-reference/mui/components/buttons/delete.md)

Now you can try deleting records yourself. Just click on the delete button of the record you want to delete and confirm.

The second way is showing delete button in `<PostEdit>` component. To show delete button in edit page, `canDelete` prop needs to be passed to resource object.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    ChakraProvider,
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { PostList, PostShow, PostEdit, PostCreate } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        edit: PostEdit,
                        create: PostCreate,
                        // highlight-next-line
                        canDelete: true,
                    },
                ]}
            />
        </ChakraProvider>
    );
};
```

After adding `canDelete` prop, `<DeleteButton>` will appear in edit form.

```tsx live url=http://localhost:3000/posts previewHeight=420px previewOnly
setInitialRoutes(["/posts"]);

import { Refine } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Text,
    DateField,
    Select,
    ShowButton,
    EditButton,
    DeleteButton,
} from "@pankod/refine-chakra-ui";
import { GetManyResponse, useMany } from "@pankod/refine-core";

import { ColumnFilter, ColumnSorter } from "../../components/table";


const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select defaultValue="published" {...props}>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="rejected">Rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <EditButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                            <DeleteButton
                                hideText
                                size="sm"
                                recordItemId={getValue() as number}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder && (
                                            <HStack spacing="2">
                                                <Text>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                </Text>
                                                <HStack spacing="2">
                                                    <ColumnSorter
                                                        column={header.column}
                                                    />
                                                    <ColumnFilter
                                                        column={header.column}
                                                    />
                                                </HStack>
                                            </HStack>
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    show: PostShow,
                    edit: PostEdit,
                    create: PostCreate,
                    canDelete: true,
                },
            ]}
        />
    );
};

render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## Example

Our tutorial is complete. Below you'll find a Live StackBlitz Example displaying what we have done so far:

<StackblitzExample path="tutorial-chakra-ui" />

## Next Steps

-   [Read about the authProvider to implement authentication for your refine application. &#8594](/api-reference/core/providers/auth-provider.md)

-   [Read about the dataProvider to consume custom API's &#8594](/api-reference/core/providers/data-provider.md)

-   [Read about the i18nProvider to add language support. &#8594](/api-reference/core/providers/i18n-provider.md)

-   [Check the Guides & Concept section to learn generic solutions to common problems &#8594](/advanced-tutorials/upload/multipart-upload.md)

-   [Check example section for code snippets &#8594](/examples/customization/topMenuLayout.md)
