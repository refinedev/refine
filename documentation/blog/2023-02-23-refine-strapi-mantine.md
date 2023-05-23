---
title: How to Build a React Admin Panel with Mantine and Strapi
description: We'll be building a simple React Admin Panel with refine and Mantine using Strapi as a backend service.
slug: react-admin-panel
authors: joseph_mawa
tags: [refine, strapi, mantine, tutorial, react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Fsocial.png
hide_table_of_contents: false
is_featured: true
featured_image: https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Ffeatured.png
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

## Introduction

Building complex, data-intensive front-end user interfaces(UIs) such as admin panels, dashboards, and other internal tools from scratch can be a daunting and laborious process. React frameworks such as refine make the process easier because that is a problem they are attempting to solve.

[refine](https://github.com/refinedev/refine) is a free, open-source, and MIT-licensed React framework for building CRUD apps. It has integrations for popular UI frameworks and design systems such as Material UI, Chakra UI, Ant Design, and Mantine. You can build any CRUD app like React admin panel.

Though it comes with several features out of the box, refine is customizable. If you don't fancy any of the above UI frameworks or design systems, you can also use "headless" refine.

Every data-intensive front-end application must source data from somewhere. refine has integrations for popular content management systems and cloud databases such as Strapi, Hasura, and Firebase.

All the above integrations are opt-in. In this article, we will build a simple React Admin Panel using refine. We will use Mantine as the UI component library and Strapi as our back-end service.

## What is Strapi?

[Strapi](https://strapi.io/) is a popular open-source headless CMS built using Node. It is flexible and has an intuitive UI. The refine ecosystem has data providers for the most popular content management systems, such as Strapi, and cloud databases like Firebase and Supabase.

While creating a project using the refine command line tool, select Strapi as your back-end service. The refine command line tool will bootstrap a refine application with all the requisite packages and functionalities.

You don't need a Strapi instance to learn how to use Strapi with refine. The refine ecosystem has a [fake Strapi API](https://automatic-sweltering-dog.strapiapp.com) that you can use when learning to integrate Strapi in a refine project.

The refine command line tool will install the `@refinedev/strapi-v4` data provider when you choose it as your back-end service during project creation. You can then import and use it in your application like so:

```tsx
import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

function App() {
  return (
    <Refine
      ...
      dataProvider={DataProvider(`${process.env.API_URL}/api`, axiosInstance)}
    />
  );
}
```

## What is Mantine?

[Mantine](https://mantine.dev/) is a free, open-source MIT-licensed React components library. Mantine can help you build fully functional and accessible web applications fast. You can use it with most modern React frameworks such as Next, Gatsby, and Remix.

As highlighted above, one of the benefits of using refine is the built-in support for most of the popular design systems, UI frameworks, and component libraries. Mantine is one of the component libraries for which refine has built-in support.

When creating a refine application using `create-refine-app`, select Mantine as the UI framework in the command prompt. The refine command line tool will bootstrap a refine application and install the necessary Mantine packages.

You can then import the refine Mantine components and hooks you want to use from the `@refinedev/mantine` package like so:

```ts
import { Edit, useForm, useSelect } from "@refinedev/mantine";
```

The refine ecosystem comprises several hooks and components for Mantine. You can read the refine [Mantine API documentation](https://refine.dev/docs/api-reference/mantine/) for more on the different Mantine hooks and Components and how to use them.

## Setting up a refine application

In this article, you will learn to create a simple React admin panel with refine and Mantine using Strapi as a headless content management system. Follow the steps below to bootstrap a refine application using `create-refine-app`. I assume you have the prerequisite tools highlighted above.

### Step 1 — Create a refine app

Navigate to the directory you want to create the refine app and run the command below on the terminal.

```sh
# Using npm
npm create refine-app@latest -- -b v3

# Using pnpm
pnpm create refine-app@latest -- -b v3
```

Be sure to respond to the command line prompts during the installation. Select `refine-react` as the project template and Strapi version 4 as the back-end service. You can choose the default for the other options. Check the guide below if you don't know how to respond to a question.

```txt
✔ Downloaded remote source successfully.
✔ Choose a project template · refine-react
✔ What would you like to name your project?: · refine-demo-app
✔ Choose your backend service to connect: · data-provider-strapi-v4
✔ Do you want to use a UI Framework?: · mantine
✔ Do you want to add example pages?: · no
✔ Do you want to add dark mode support?: · no
✔ Do you want a customized layout?: · no
✔ Do you need i18n (Internationalization) support?: · no
✔ Do you want to add kbar command interface support?: · no
✔ Choose a package manager: · npm
✔ Would you mind sending us your choices so that we can improve superplate? · yes
```

### Step 2 — Launch the development server

After successfully bootstrapping a refine application, open the project directory in a text editor like VS Code and run the command below to launch the development server.

```sh
# Using npm
npm run dev

# Using yarn
yarn run dev

# Using pnpm
pnpm run dev
```

The command above launches the development server on local host on port 3000 in your default web browser. The landing page should look like the image below.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Frefine-project-landing-page.png"  alt="react admin panel" />

</div>

<br />

If your landing page is similar to the screenshot above, you have successfully created a refine project. We will build a React admin panel by modifying the project you have just created.

## Built-in refine hooks and components for Mantine

refine has several built-in hooks and components for Mantine. Most built-in refine Mantine hooks and components directly export or use their corresponding core Mantine hooks and components internally.

## `useForm` - For form management

One of the hooks we will use a lot in this article is the [`useForm`](https://refine.dev/docs/examples/form/mantine/useForm/) hook. As its name suggests, you can use it to manage forms when working with Mantine and refine. It is based on and has all the features of the core Mantine and refine `useForm` hooks with additional features.

The refine documentation does a great job of explaining the `useForm` hook. Check it out to understand the `useForm` hook in-depth and how to use it.

```tsx
import { useForm } from "@refinedev/mantine";

const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
        title: "",
        status: "",
    },
    validate: {
        title: (value) =>
            value.length < 2
                ? "Post title should be atleast 2 characters long"
                : null,
        status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
});
```

## `useTable` - For table management

Another hook that we will use in this article is the `useTable` hook. It is part of the [refine-react-table](https://github.com/refinedev/refine/tree/master/packages/react-table) package. The `refine-react-table` package is an adapter for the [TanStack Table](https://tanstack.com/table/v8). It has all the features of the [TanStack Table](https://tanstack.com/table/v8) package out of the box. It also has features for filtering, sorting, and pagination.

Similarly, we will use basic layout and UI components such as `List`, `Create`, `Edit`, and `Show`. As I pointed out above, the refine documentation explains them well. Refer to the appropriate sections of the refine documentation to understand a component that might be unfamiliar to you.

## How to build a React admin panel with refine, Mantine and Strapi

In this section, we will build a React admin panel with CRUD functionality using refine, Mantine and Strapi. We will utilize a fake [Strapi version 4 API](https://automatic-sweltering-dog.strapiapp.com/api). Follow the steps below if you have created a refine project by following the steps under the "Creating a refine application" section above.

### How to list records

You should now have your application's authentication pages if you followed the previous step. However, logging in using the credentials I mentioned will open a non-existent page.

We need to fetch the list of posts from our Strapi API and display it when you log in. Let us start by creating an interface for the data from our Strapi API. Create a `src/interfaces/index.d.ts` file. You can copy and paste the code below into it.

```ts title="src/interfaces/index.d.ts"
export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: ICategory;
    createdAt: string;
}
```

The above interface should give you an idea of the shape of the data returned from the API. The Strapi API has the `posts` and `categories` collections. There is a relation between the two collection types. Read the [documentation](https://refine.dev/docs/packages/documentation/data-providers/strapi-v4/) to understand how the Strapi version 4 data provider works.

Since we will work with blog posts, let us create a `posts` directory and keep all our component files in it. Create an `src/pages/posts/list.tsx` file and copy and paste the code below into it.

<details>
<summary>Show code</summary>
<p>

```tsx title="src/pages/posts/list.tsx"
import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { useTable, ColumnDef, flexRender } from "@refinedev/react-table";
import {
    List,
    Table,
    Pagination,
    DateField,
    CreateButton,
} from "@refinedev/mantine";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
            },
            {
                id: "title",
                accessorKey: "title",
                header: "Title",
                cell: function ({ getValue }) {
                    return getValue();
                },
            },

            {
                id: "createdAt",
                accessorKey: "createdAt",
                header: "Created At",
                cell: function render({ getValue }) {
                    return <DateField format="LL" value={getValue<any>()} />;
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

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));

    return (
        <List>
            <Table highlightOnHover striped withBorder withColumnBorders>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};
```

</p>
</details>

In the `PostList` component above, we used the `useTable` hook from the `refine-react-table` package. The `useTable` hook is headless by design. Therefore, the responsibility for managing the UI lies with you.

We imported several other UI components from the `@refinedev/mantine` package. I won't explain them here. Read the [refine Mantine](https://refine.dev/docs/api-reference/mantine/) or the core [Mantine](https://mantine.dev/guides/cra/) documentation.

Create a `src/pages/posts/index.tsx` file and add the following export statement to it.

```ts title="src/pages/posts/index.ts"
export * from "./list";
```

## Adding resources and connect pages to refine app

Now we are ready to start connecting to our API by adding a resource to our application

[Refer to documentation for more info about `resources` concept](https://refine.dev/docs/tutorial/understanding-resources/index/)

Finally, import the `PostList` component you created above into the `App.tsx` component and add it to the `resources` prop of the `Refine` component like so:

```tsx title="src/App.tsx"
...
//highlight-next-line
import { PostList } from "./pages/posts";

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          //highlight-start
          LoginPage={AuthPage}
          resources={[

            {
              name: "posts",
              list: PostList,
            },
          ]}
         //highlight-end
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />

---

### Setting AuthProvider

Similarly, `create-refine-app` bootstraps a refine application with default `AuthProvider`. You should have the `src/authProvider.ts` file if you created the application using `create-react-app` while following the steps above.

Of particular interest is the login method of the `authProvider`. We will use email and password to log into our application. Be sure the login method has the code below.

```ts title="src/authProvider.ts"
import type { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
  //highlight-start
  login: async ({ email, password }) => {

    const { data, status } = await strapiAuthHelper.login(email, password);
    //highlight-end
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, data.jwt);

      // set header axios instance
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${data.jwt}`,
      };

      return {
        success: true,
        redirectTo: "/",
      }
    }
    return {
      success: false,
      message: "Invalid email or password",
    }
  },
  ...
};
```

After setting up your resources and providers as described above, the landing page should redirect you to the login page. The login page looks like the image below.

For this demonstration, use the credentials below to log into an existing account. It is a fake Strapi instance set up for development. Be sure to use it responsibly.

> Email: demo@refine.dev
> Password: demodemo

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Frefine-project-login-page.png"  alt="react admin panel" />

</div>

<br />

When you log into your refine application, you should have a table similar to the image below. Though still incomplete, it is a simple React admin panel.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Flist_new.png"  alt="react admin panel" />

</div>

<br />

### How to handle relational data

As highlighted in the previous section, our Strapi API has `posts` and `categories` collections with relational fields. However, Strapi version 4 doesn't populate relational data out of the box when fetching entries in a collection.

[Refer to documentation for more info about relation populate.](https://refine.dev/docs/packages/documentation/data-providers/strapi-v4/#relations-population)

[Refer to tutorial section for more info about handling relationships.](https://refine.dev/docs/tutorial/adding-crud-pages/mantine/index/#handling-relationships)

Therefore, for our data provider to return the categories for each post, we need to specify using the `populate` field of the `metaData` property in the object we pass to the `useTable` hook.

```tsx title="src/pages/posts/list.tsx"
...
import { useTable } from '@refinedev/react-table';

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
    //highlight-start
    refineCoreProps: {
      metaData: {
        populate: ["category"],
      },
    },
    //highlight-end
  });
...
```

After modifying your code, like in the example above, the data provider will also fetch the category for each post. Each post object in the array that the `useTable` hook returns will contain the category field.

Since each post object now has a category field, we need to add a category column to our table. Modify the column array, which you passed to the `useTable` hook, to include the `Category` column like in the example below.

```tsx title="src/pages/posts/list.tsx"
...
 const columns = React.useMemo<ColumnDef<any>[]>(
  () => [
    ...
    //highlight-start
    {
      id: "category",
      header: "Category",
      accessorFn: ({ category }) => {
        return category?.title;
      },
    },
    //highlight-end
    ...
  ],
  []
);
...
```

The code above should modify your table to include a Category column like the image below.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Flist_with_category.png"  alt="react admin panel" />

</div>

<br />

### How to create a record

In the previous sections, you learned how to fetch the list of posts from the Strapi API whenever the user logs in. However, in an React admin panel, you should also be able to create a new record. And that is what you will learn in this section.

By default, refine adds a create button to the `List` component. You should see it in the top right corner. However, clicking the create button will open a non-existent page.

We need to create a component that will render when a user clicks the create button. The component will contain the form we shall use to create a new post. Create the `src/pages/posts/create.tsx` file. You can copy and paste the code below into it.

<details>
<summary>Show code</summary>
<p>

```tsx title="src/pages/posts/create.tsx"
import {
    Create,
    useForm,
    TextInput,
    useSelect,
    Select,
} from "@refinedev/mantine";

import { ICategory } from "interfaces";

export const PostCreate = () => {
    const {
        getInputProps,
        saveButtonProps,
        refineCore: { formLoading },
    } = useForm({
        initialValues: {
            title: "",
            category: {
                id: "",
            },
            status: "",
        },
        validate: {
            title: (value) =>
                value.length < 5
                    ? "Title should be atleast 5 characters long"
                    : null,
            category: {
                id: (value) => (value.length <= 0 ? "Title is required" : null),
            },
            status: (value) =>
                value.length <= 0 ? "Status is required" : null,
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <TextInput
                mt="sm"
                required={true}
                label="Title"
                {...getInputProps("title")}
            />
            <Select
                mt={8}
                label="Status"
                required={true}
                placeholder="Pick one"
                {...getInputProps("status")}
                data={[
                    { label: "Published", value: "published" },
                    { label: "Draft", value: "draft" },
                    { label: "Rejected", value: "rejected" },
                ]}
            />
            <Select
                mt={8}
                label="Category"
                required={true}
                placeholder="Select category"
                {...getInputProps("category.id")}
                {...selectProps}
            />
        </Create>
    );
};
```

</p>
</details>

In the above example, we used the `useForm` hook to manage the form. We passed the initial input values and field validation methods to the `useForm` hook.

Open the `src/pages/posts/index.tsx` file you created in one of the previous sub-sections and add the export statement below.

```tsx title="src/pages/posts/index.tsx"
...
//highlight-next-line
export * from "./create";
```

You can now import the `PostCreate` component into the `App.tsx` file and add it to the list of resources like so:

```tsx title="src/App.tsx"
...
import {
  ...
  //highlight-next-line
  PostCreate,
} from "./pages/posts";

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          resources={[
            {
              name: "posts",
              list: PostList,
              //highlight-next-line
              create: PostCreate,
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

Clicking the create button will now navigate you to the `/posts/create` page. The `/posts/create` page looks like the image below. You can use it to create a new post. After filling and submitting the form with details of your post, it should now be available in the list of all posts.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Frefine-project-create-page.png"  alt="react admin panel" />

</div>

### How to edit a record

In the previous section, we looked at creating a new post. It is also possible to edit an existing record. To edit records in our table, let us add an `Actions` column. The column will have a button to edit the contents of each row in the table.

To add a new column to our table, add a column object to the `columns` array we created in the `PostList` component. We will render an `EditButton` in our new column.

```tsx title="src/pages/posts/list.tsx"
import {
  ...
  //highlight-start
  EditButton,
  Group,
  //highlight-end
} from "@refinedev/mantine";

const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      ...
      //highlight-start
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: ({ getValue }) => {
          return (
            <Group>
              <EditButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
            </Group>
          );
        },
      },
      //highlight-end
    ],
    []
);
```

After adding the code above, your table should include the `Actions` column. Clicking the edit button at the moment will again redirect you to a non-existent page.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Factions_edit.png"  alt="react admin panel" />

</div>

<br/>

Let us create the component that will render when a user clicks the edit button. The component will contain a form for editing the contents of a specific record in our collection.

Create the `src/pages/posts/edit.tsx` file into which copy and paste the code below.

<details>
<summary>Show code</summary>
<p>

```tsx title="src/pages/posts/edit.tsx"
import {
    Edit,
    useForm,
    TextInput,
    Select,
    useSelect,
} from "@refinedev/mantine";

import { ICategory } from "interfaces";

export const PostEdit = () => {
    const {
        getInputProps,
        saveButtonProps,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            id: "",
            title: "",
            category: {
                id: "",
            },
        },
        refineCoreProps: {
            metaData: {
                populate: ["category"],
            },
        },
        validate: {
            title: (value) =>
                value.length < 5
                    ? "Title should be atleast 5 characters long"
                    : null,
            category: {
                id: (value) => (value.length <= 0 ? "Title is required" : null),
            },
        },
    });

    const postData = queryResult?.data?.data;
    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category?.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
            <TextInput
                mt="sm"
                required
                label="Title"
                {...getInputProps("title")}
            />
            <Select
                mt={8}
                label="Category"
                required
                placeholder="Select category"
                {...selectProps}
                {...getInputProps("category.id")}
            />
        </Edit>
    );
};
```

</p>
</details>

Add the export statement below to the `src/pages/posts/index.tsx` file.

```tsx title="src/pages/posts/index.tsx"
//highlight-next-line
export * from "./edit";
```

Finally, add the `PostEdit` component to the `resources` prop of your `Refine` component.

```tsx title="src/App.tsx"
...
import {
  ...
  //highlight-next-line
  PostEdit
} from "./pages/posts";

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          resources={[
            {
              name: "posts",
              list: PostList,
              create: PostCreate,
              //highlight-next-line
              edit: PostEdit,
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

Clicking the edit button should now redirect you to a page for editing the contents of a specific record. The edit page will look like the image below.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Frefine-project-edit-page.png"  alt="react admin panel" />
</div>

### How to delete a record

You can use two methods to delete records in a collection. These methods are:

-   Using the delete action button on each table row
-   Using the delete button on the edit page

#### How to add delete action button on each table row

Add the following import statement at the top of the `list.tsx` file in the `src/pages/posts` directory.

```tsx title="src/pages/posts/list.tsx"
import {
 ...
 //highlight-next-line
  DeleteButton,
} from "@refinedev/mantine";
```

We will add the `DeleteButton` we imported above to every row in our table under the `Actions` column. The columns array we declared while creating the table in one of the sections above contains an object with the id `actions`. That object defines our `Actions` column. We will add the `DeleteButton` to it.

The cell method of the `Actions` column object returns the `Group` Mantine UI component. Add the `DeleteButton` so that it is a child of the `Group` component like so:

```tsx title="src/pages/posts/list.tsx"
...

const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      ...
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: ({ getValue }) => {
          return (
            <Group noWrap>
              <EditButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
              //highlight-start
              <DeleteButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
              //highlight-end
            </Group>
          );
        },
      },
    ],
    []
  );
```

After making the above changes, your table will have the delete action button like in the image below. Click the delete button to delete a specific record.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Factions_delete.png"  alt="react admin panel" />
</div>

#### How to add delete button on the edit page

Instead of adding a delete button to each row in a table, you can also add it to the edit page. This time, we will modify the `resources` prop of the `Refine` component. Add the `canDelete` prop to the `posts` resource like so:

```tsx title="src/App.tsx"
...

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          resources={[
            {
              name: "posts",
              list: PostList,
              create: PostCreate,
              edit: PostEdit,
              //highlight-next-line
              canDelete: true,
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

Your edit page should now include a delete button on the bottom right.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
   <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog%2F2023-02-23-refine-strapi-mantine%2Frefine-project-edit-page-with-delete-btn.png"  alt="react admin panel" />
</div>

## How to implement mutation mode

Mutation mode is a handy feature in refine when performing side effects. It can help you provide a better user experience to your clients. You can configure your refine app to use any of the three mutation modes below.

-   Pessimistic
-   Optimistic
-   Undoable

### Pessimistic mutation mode

With pessimistic mutation mode, refine initiates the mutation immediately. It applies UI updates and redirects after the mutation update returns successfully. The pessimistic mode is the default mutation mode.

### Optimistic mutation mode

When using the optimistic mutation mode, refine applies the mutation locally and immediately updates UI and redirects without waiting for a response from the server. It updates the UI accordingly in case there is an error.

### Undoable mutation mode

With the undoable mutation mode, refine applies the mutation locally, updates the UI, and redirects. It then waits for a customizable timeout before making the mutation. You can cancel the mutation update within the timeout. It also updates the UI if the mutation update returns an error.

You can configure the mutation mode using the `options` prop of the `Refine` component.

```tsx title="src/App.tsx"
...
function App() {
  return (
    <MantineProvider theme={LightTheme}>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          //highlight-next-line
          options = {{ mutationMode: "optimistic"}}

        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

## How to share the current page with filters

With refine, it is possible to sync the URL with the contents of a page. Assuming the `posts` page has a multi-page table sorted in ascending order, you can display the currently active page and the sort order in the URL using query parameters.

You can activate this feature by setting the `syncWithLocation` property of the `options` prop to `true`.

```tsx title="src/App.tsx"
...
function App() {
  return (
    <MantineProvider theme={LightTheme}>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          //highlight-next-line
          options = {{ syncWithLocation: true}}

        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
```

## Using the refine Mantine inferencer

In the previous sections, we performed CRUD operations by building components from scratch. The refine ecosystem has the Inferencer package for generating CRUD pages based on the responses from your API.

The sole purpose of the Inferencer is to set you off by generating CRUD pages. You can then customize the components to suit your needs. Depending on your design system or component library, import Inferencer from the `@refinedev/inferencer` package.

Since we are using Mantine as our components library, import and add `MantineInferencer` to the `resources` prop of the `Refine` component like so:

```tsx title="src/App.tsx"
...
//highlight-next-line
import { MantineInferencer } from "@refinedev/inferencer/mantine";

function App() {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          ...
          //highlight-start
          resources={[
            {
              name: "posts",
              list: MantineInferencer,
              create: MantineInferencer,
              show: MantineInferencer,
              edit: MantineInferencer,
              canDelete: true
            },
            {
              name: "categories",
              list: MantineInferencer,
              create: MantineInferencer,
              show: MantineInferencer,
              edit: MantineInferencer,
            },
          ]}
          //highlight-end
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

```

The code above will generate CRUD pages for you out of the box. Each of the other design systems or component libraries which refine supports has its corresponding Inferencer. Import and add it to your `<Refine>` component as in the above example.

## Conclusion

When looking to build a React admin panel, refine is one of the react frameworks worth exploring. As highlighted above, it supports most of the popular design systems and UI frameworks like Material UI, Ant design, Chakra UI, and Mantine.

Furthermore, refine has out-of-the-box support for authentication, i18n, routing, and state management. The refine command line tool can get you up and running instantly with all the necessary configurations for a basic refine project. You can modify the default settings to suit your needs.

All the refine features I have highlighted above will significantly increase your development speed, improve your development experience and reduce time to production, especially when building complex front-end applications.

## Live CodeSandbox Example

<CodeSandboxExample path="blog-react-admin-mantine" />

---
