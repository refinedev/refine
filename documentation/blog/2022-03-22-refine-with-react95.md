---
title: We are going back to 1995! The perfect harmony of Modern stack and Win95
description: With the refine being headless, we may use any UI we choose for our Admin Panel. In this tutorial, we'll create a Nostalgic-style admin panel using refine and React95 UI.
slug: awesome-react-windows95-ui-with-refine
authors: melih
tags:
    [refine, react, supabase, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/social.jpg
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/overview.gif" alt="Refine Overview" />
</div>
<br />

With **refine**'s **headless** feature, you can include any UI in your project and take full advantage of all its features without worrying about compatibility. To build a project with a vintage `Windows95` style using [React95](https://react95.io/) UI components, we'll use the **refine** headless feature.

## Introduction

In this tutorial, we will use [Supabase](https://supabase.com/) Database in the backend of our project. Our goal with this is to create a `Windows95`-style admin panel using **refine** **headless** and [**refine** Supabase Data Provider](/docs/examples/data-provider/supabase/) features.

## Project Setup

Let's start by creating our **refine** project. You can use the superplate to create a refine project. superplate will quickly create our **refine** project according to the features we choose.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/refine_setup.gif" alt="Refine Project Setup" />
</div>
<br />

That's it! After the installation process is finished, our **refine** project is ready. In addition, Supabase Data Provider features will also come ready. As we mentioned above, since we are using the headless feature of **refine**, we will manage the UI processes ourselves. In this project, we will use `React95` for the UI. Let's continue by installing the necessary packages in our **refine** Project directory.

```bash
npm i react95 styled-components
```

### Manually Project Setup

```bash
npm install @refinedev/core @refinedev/supabase

npm install react95 styled-components
```

Let's begin editing our project now that it's ready to use.

## Usage

**refine**, automatically creates `supabaseClient` and `AuthProvider` for you. All you have to do is define your Database URL and Secret_Key. You can see how to use it in detail below.

### Supabase Client

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/utility/supabaseClient.ts"
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "YOUR_DATABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_KEY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
```

</p>
</details>

### AuthProvider

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@refinedev/core";

import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
    login: async ({ username, password }) => {
        const { user, error } = await supabaseClient.auth.signIn({
            email: username,
            password,
        });

        if (error) {
            return {
                success: false,
                error: error || new Error("Invalid email or password"),
            };
        }

        if (data?.user) {
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: error || new Error("Invalid email or password"),
        };
    },
    logout: async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            return {
                success: false,
                error: error || new Error("Invalid email or password"),
            };
        }

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const { data, error } = await supabaseClient.auth.getSession();
        const { session } = data;

        if (!session) {
            return {
                authenticated: false,
                error: error || new Error("Session not found"),
                logout: true,
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return user.role;
        }

        return null;
    },
    getUserIdentity: async () => {
        const user = supabaseClient.auth.user();

        if (user) {
            return {
                ...user,
                name: user.email,
            };
        }

        return null;
    },
};

export default authProvider;
```

</p>
</details>

### Configure Refine for Supabase

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";

//highlight-start
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";
//highlight-end

function App() {
    return (
        <Refine
            routerProvider={routerProvider}
            //highlight-start
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            //highlight-end
        />
    );
}

export default App;
```

We've completed our project structure. Now we can easily access our Supabase Database and utilize our data in our user interface. To begin, let's define the React95 library and create a Login page to access our Supabase data.

### React95 Setup

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

//highlight-start
import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";
//highlight-end

function App() {
    return (
        //highlight-start
        <ThemeProvider theme={original}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(supabaseClient)}
                authProvider={authProvider}
            />
        </ThemeProvider>
        //highlight-end
    );
}

export default App;
```

In this step, we imported and defined the React95 library in our Refine project. We can now use React95 components and Refine features together in harmony. Let's design a Windows95-style Login page!

## Refine Login Page

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/pages/login/LoginPage.tsx"
import { useState } from "react";
//highlight-start
import { useLogin } from "@refinedev/core";

import {
    Window,
    WindowHeader,
    WindowContent,
    TextField,
    Button,
} from "react95";
//highlight-end

interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const [username, setUsername] = useState("info@refine.dev");
    const [password, setPassword] = useState("refine-supabase");

    //highlight-next-line
    const { mutate: login } = useLogin<ILoginForm>();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                backgroundColor: "rgb(0, 128, 128)",
            }}
        >
            //highlight-start
            <Window>
                <WindowHeader active={true} className="window-header">
                    <span> Refine Login</span>
                </WindowHeader>
                <div style={{ marginTop: 8 }}>
                    <img src="./refine.png" alt="refine-logo" width={100} />
                </div>
                <WindowContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login({ username, password });
                        }}
                    >
                        <div style={{ width: 500 }}>
                            <div style={{ display: "flex" }}>
                                <TextField
                                    placeholder="User Name"
                                    fullWidth
                                    value={username}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <br />
                            <TextField
                                placeholder="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <br />
                            <Button type="submit" value="login">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </WindowContent>
            </Window>
            //highlight-end
        </div>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/refine_login.png" alt="Refine Login Page" />
</div>
<br />

We used React95 components to construct our Login page design. Then, using the **refine** [`<AuthProvider>`](/docs/api-reference/core/providers/auth-provider/) [`<useLogin>`](/docs/api-reference/core/hooks/authentication/useLogin/) hook, we carried out the database sign-in operation. We can now access our database and fetch our Posts and Categories, as well as create our pages.

## Refine Post Page

After our login process, we'll get the posts from our Supabase Database and display them in the table. We will use React95 components for the UI portion of our table, as well as `@refinedev/react-table` package to handle pagination, sorting, and filtering. You can use all the features of [TanStack Table](https://react-table.tanstack.com/) with the `@refinedev/react-table` adapter. On this page, we will use this adapter of **refine** to manage the table.

In this step, we'll show how to use the `@refinedev/react-table` package to create a data table. We will begin by examining this page in two parts. In the first step, we'll utilize our `@refinedev/react-table` package and React95 UI components to only use our data. Then, in the following stage, we'll arrange the sorting, pagination processes and our UI part. Let's start!

[Refer to the **refine** TanStack Table packages documentation for detailed information. →](/docs/packages/documentation/react-table/)

<details>
<summary>Show Part I Code</summary>
<p>

```tsx title="src/pages/post/PostList.tsx"
import { useMemo } from "react";
import { useOne } from "@refinedev/core";
import { useTable, ColumnDef, flexRender } from "@refinedev/react-table";

import { IPost, ICategory } from "interfaces";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
} from "react95";

export const PostList = () => {
    //highlight-start
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
                id: "categoryId",
                header: "Category",
                accessorKey: "categoryId",
                cell: function render({ getValue }) {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: getValue() as number,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title ?? "Not Found";
                },
            },
        ],
        [],
    );
    //highlight-end

    //highlight-start
    const { getHeaderGroups, getRowModel } = useTable<IPost>({ columns });
    //highlight-end

    return (
        <>
            //highlight-start
            <Window style={{ width: "100%" }}>
                <WindowHeader>Posts</WindowHeader>
                <WindowContent>
                    <Table>
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    style={{ overflowX: "auto" }}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHeadCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHeadCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <TableDataCell
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render("Cell")}
                                                </TableDataCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </WindowContent>
            </Window>
            //highlight-end
        </>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/table.png" alt="Refine Table" />
</div>
<br />

As you can see, our first step is complete. Thanks to the `@refinedev/react-table` adapter, we fetch our Supabase data and process as table data. Then we placed this data in React95 components. Now let's move on to the second step.

<details>
<summary>Show Part II Code</summary>
<p>

```tsx title="src/pages/post/PostList.tsx"
import { useMemo, useRef, useState } from "react";
import { useOne, useNavigation, useDelete } from "@refinedev/core";
import { useTable, ColumnDef, flexRender } from "@refinedev/react-table";

import { IPost, ICategory } from "interfaces";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell,
    Window,
    WindowHeader,
    WindowContent,
    Button,
    Select,
    NumberField,
    Progress,
} from "react95";

export const PostList = () => {
    const { edit, create } = useNavigation();
    const { mutate } = useDelete();

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
                id: "categoryId",
                header: "Category",
                accessorKey: "categoryId",
                cell: function render({ getValue }) {
                    const { data, isLoading } = useOne<ICategory>({
                        resource: "categories",
                        id: getValue() as number,
                    });

                    if (isLoading) {
                        return <p>loading..</p>;
                    }

                    return data?.data.title ?? "Not Found";
                },
            },
            //highlight-start
            {
                id: "action",
                header: "Action",
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Button
                            onClick={() => edit("posts", getValue() as number)}
                        >
                            Edit
                        </Button>
                    );
                },
            },
            //highlight-end
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        //highlight-start
        options: { pageCount },
        getState,
        setPageIndex,
        setPageSize,
        //highlight-end
    } = useTable<IPost>({ columns });

    return (
        <>
            <Window style={{ width: "100%" }}>
                <WindowHeader>Posts</WindowHeader>
                <WindowContent>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    style={{ overflowX: "auto" }}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHeadCell
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            //highlight-next-line
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHeadCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <TableDataCell
                                                    {...cell.getCellProps()}
                                                >
                                                    {cell.render("Cell")}
                                                </TableDataCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </WindowContent>
                //highlight-start
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 8,
                        marginTop: 8,
                        alignItems: "flex-end",
                    }}
                >
                    <Select
                        style={{ marginLeft: 8 }}
                        value={getState().pagination.pageSize}
                        onChange={(_: any, selection: any) => {
                            setPageSize(selection.value);
                        }}
                        options={opt}
                        defaultValue={"10"}
                    ></Select>
                    <span style={{ marginLeft: 8 }}>
                        Page{" "}
                        <strong>
                            {getState().pagination.pageIndex + 1} of {pageCount}
                        </strong>
                        <span style={{ marginLeft: 8 }}>
                            Go to page:
                            <NumberField
                                style={{ marginLeft: 8 }}
                                min={1}
                                defaultValue={
                                    getState().pagination.pageIndex + 1
                                }
                                width={130}
                                onChange={(value: any) => {
                                    const page = value ? Number(value) - 1 : 0;
                                    setPageIndex(page);
                                }}
                            />
                        </span>
                    </span>
                </div>
                //highlight-end
            </Window>
        </>
    );
};

export const opt = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 40, label: "40" },
];
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/advanced_table.gif" alt="Refine Table" />
</div>
<br />

You may quickly handle sorting and paging operations by simply adding a few lines thanks to **refine**'s out-of-the-box features. We have completed our Post page by adding the pagination and sorting features provided by the Refine `useTable` hook to our table.

## Refine Create and Edit Page

We have created our post page. Now we will create pages where we can create and edit posts. **refine** provides a [`refine-react-hook-form`](/docs/packages/documentation/react-hook-form/useForm/) adapter that you can use with the headless feature. All the features of [React Hook Form](https://react-hook-form.com/) work in harmony with **refine** and the form you will create.

-   `Create Page`

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/pages/posts/Create.tsx"
import { Controller, useForm } from "@refinedev/react-hook-form";
import { useSelect, useNavigation } from "@refinedev/core";
import {
    Select,
    Fieldset,
    Button,
    TextField,
    Window,
    WindowHeader,
    WindowContent,
    ListItem,
} from "react95";

export const PostCreate: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
    });

    return (
        <>
            <Window style={{ width: "100%", height: "100%" }}>
                <WindowHeader active={true} className="window-header">
                    <span>Create Post</span>
                </WindowHeader>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowContent>
                        <label>Title: </label>
                        <br />
                        <br />
                        <TextField
                            {...register("title", { required: true })}
                            placeholder="Type here..."
                        />
                        {errors.title && <span>This field is required</span>}
                        <br />
                        <br />

                        <Controller
                            {...register("categoryId", { required: true })}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Fieldset label={"Category"}>
                                    <Select
                                        options={options}
                                        menuMaxHeight={160}
                                        width={160}
                                        variant="flat"
                                        onChange={onChange}
                                        value={value}
                                    />
                                </Fieldset>
                            )}
                        />
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <label>Content: </label>
                        <br />
                        <TextField
                            {...register("content", { required: true })}
                            multiline
                            rows={10}
                            cols={50}
                        />

                        {errors.content && <span>This field is required</span>}
                        <br />
                        <Button type="submit" value="Submit">
                            Submit
                        </Button>
                        {formLoading && <p>Loading</p>}
                    </WindowContent>
                </form>
            </Window>
        </>
    );
};
```

</p>
</details>

-   `Edit Page`

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/pages/posts/Edit.tsx"
import { useEffect } from "react";
import { Controller, useForm } from "@refinedev/react-hook-form";
import { useSelect, useNavigation } from "@refinedev/core";
import {
    Select,
    Fieldset,
    Button,
    TextField,
    WindowContent,
    Window,
    WindowHeader,
    ListItem,
} from "react95";

export const PostEdit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm();

    const { goBack } = useNavigation();

    const { options } = useSelect({
        resource: "categories",
        defaultValue: queryResult?.data?.data.categoryId,
    });

    useEffect(() => {
        resetField("categoryId");
    }, [options]);

    return (
        <>
            <Window style={{ width: "100%", height: "100%" }}>
                <form onSubmit={handleSubmit(onFinish)}>
                    <WindowHeader active={true} className="window-header">
                        <span>Edit Post</span>
                    </WindowHeader>
                    <WindowContent>
                        <label>Title: </label>
                        <br />
                        <TextField
                            {...register("title", { required: true })}
                            placeholder="Type here..."
                        />
                        {errors.title && <span>This field is required</span>}
                        <br />
                        <br />

                        <Controller
                            {...register("categoryId", { required: true })}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Fieldset label={"Category"}>
                                    <Select
                                        options={options}
                                        menuMaxHeight={160}
                                        width={160}
                                        variant="flat"
                                        onChange={onChange}
                                        value={value}
                                    />
                                </Fieldset>
                            )}
                        />
                        {errors.category && <span>This field is required</span>}
                        <br />
                        <label>Content: </label>
                        <br />
                        <TextField
                            {...register("content", { required: true })}
                            multiline
                            rows={10}
                            cols={50}
                        />

                        {errors.content && <span>This field is required</span>}
                        <br />
                        <Button type="submit" value="Submit">
                            Submit
                        </Button>
                        {formLoading && <p>Loading</p>}
                    </WindowContent>
                </form>
            </Window>
        </>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/create_edit.gif" alt="Refine Create and Edit Page" />
</div>
<br />

We can manage our forms and generate Posts thanks to the `refine-react-hook-form` adapter, and we may save the Post that we created with the **refine** `onFinish` method directly to Supabase.

## Customize Refine Layout

Our app is almost ready. As a final step, let's edit our Layout to make our application more like Window95. Let's create a footer component first and then define it as a **refine** Layout.

[Refer to the refine Custom Layout docs for detailed usage. →](/docs/advanced-tutorials/custom-layout/)

-   `Footer`

<details>
<summary>Show Code</summary>
<p>

```tsx title="components/Footer.tsx"
import React, { useState } from "react";
import { useLogout, useNavigation } from "@refinedev/core";
import { AppBar, Toolbar, Button, List, ListItem } from "react95";

export const Footer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { mutate: logout } = useLogout();
    const { push } = useNavigation();

    return (
        <AppBar style={{ top: "unset", bottom: 0 }}>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: "bold" }}
                    >
                        <img
                            src={"./refine.png"}
                            alt="refine logo"
                            style={{ height: "20px", marginRight: 4 }}
                        />
                    </Button>
                    {open && (
                        <List
                            style={{
                                position: "absolute",
                                left: "0",
                                bottom: "100%",
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <ListItem
                                onClick={() => {
                                    push("posts");
                                }}
                            >
                                Posts
                            </ListItem>
                            <ListItem
                                onClick={() => {
                                    push("categories");
                                }}
                            >
                                Categories
                            </ListItem>
                            <ListItem
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <span role="img" aria-label="🔙">
                                    🔙
                                </span>
                                Logout
                            </ListItem>
                        </List>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};
```

</p>
</details>

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import original from "react95/dist/themes/original";
import { ThemeProvider } from "styled-components";

import { PostList, PostEdit, PostCreate } from "pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "pages/category";
import { LoginPage } from "pages/login";
//highlight-next-line
import { Footer } from "./components/footer";

import "./app.css";

function App() {
    return (
        <ThemeProvider theme={original}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(supabaseClient)}
                authProvider={authProvider}
                LoginPage={LoginPage}
                //highlight-start
                Layout={({ children }) => {
                    return (
                        <div className="main">
                            <div className="layout">{children}</div>
                            <div>
                                <Footer />
                            </div>
                        </div>
                    );
                }}
                //highlight-end
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
            />
        </ThemeProvider>
    );
}

export default App;
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/menu.gif" alt="Refine95 Menu" />
</div>
<br />

Now we'll make a top menu component that's specific to the Windows 95 design.

-   Top Menu

<details>
<summary>Show Code</summary>
<p>

```tsx title="components/bar/TopMenu"
import React, { useState } from "react";
import { AppBar, Toolbar, Button, List } from "react95";

type TopMenuProps = {
    children: React.ReactNode[] | React.ReactNode;
};

export const TopMenu: React.FC<TopMenuProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <AppBar style={{ zIndex: 1 }}>
            <Toolbar>
                <Button
                    variant="menu"
                    onClick={() => setOpen(!open)}
                    active={open}
                >
                    File
                </Button>
                <Button variant="menu" disabled>
                    Edit
                </Button>
                <Button variant="menu" disabled>
                    View
                </Button>
                <Button variant="menu" disabled>
                    Format
                </Button>
                <Button variant="menu" disabled>
                    Tools
                </Button>
                <Button variant="menu" disabled>
                    Table
                </Button>
                <Button variant="menu" disabled>
                    Window
                </Button>
                <Button variant="menu" disabled>
                    Help
                </Button>
                {open && (
                    <List
                        style={{
                            position: "absolute",
                            left: "0",
                            top: "100%",
                        }}
                        onClick={() => setOpen(false)}
                    >
                        {children}
                    </List>
                )}
            </Toolbar>
        </AppBar>
    );
};
```

</p>
</details>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/top_menu.gif" alt="Refine Top Menu" />
</div>
<br />

## Project Overview

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-03-22-refine-with-react95/overview.gif" alt="Refine Project Overview" />
</div>
<br />

## Live CodeSandbox Example

<iframe src="https://codesandbox.io/embed/refine-react95-example-beie0q?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-react95-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## Conclusion

**refine** is a very powerful and flexible internal tool development framework. The features it provides will greatly reduce your development time. In this example, we have shown step-by-step how a development can be quick and easy using a custom UI and refine-core features. **refine** does not restrict you, and it delivers almost all of your project's requirements via the hooks it provides, regardless of the UI.
