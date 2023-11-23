---
title: Introduction
---

Refine provides an integration package for [Chakra UI](https://chakra-ui.com/) framework. This package provides a set of ready to use components and hooks that connects Refine with Chakra UI components.

import Usage from "./usage.tsx";

<Usage />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

```bash
npm install @refinedev/chakra-ui
```

## Tables

Chakra UI offers styled table primitives but lacks the table management solution. Refine recommends using `@refinedev/react-table` package which is built on top of Refine's [`useTable`](/docs/api-reference/core/hooks/useTable.md) hook and Tanstack Table's [`useTable`](https://tanstack.com/table/v8/docs/adapters/react-table) hook to enable features from pagination to sorting and filtering. Refine's documentations and examples of Chakra UI uses `@refinedev/react-table` package for table management but you have the option to use any table management solution you want.

```tsx title="posts/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import { List, ShowButton, EditButton, DeleteButton, DateField } from "@refinedev/chakra-ui";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Text, Select } from "@chakra-ui/react";

import { Pagination } from "../../components/pagination";

export const PostList: React.FC = () => {
  const columns = React.useMemo(
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
                    <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination current={current} pageCount={pageCount} setCurrent={setCurrent} />
    </List>
  );
};
```

`<Pagination />` component is a custom component that is used to render the pagination controls which uses `usePagination` hook from `@refinedev/chakra-ui` package. This hook accepts the pagination values from `useTable` hook and returns the pagination controls and related props.

## Forms

Chakra UI offers form elements yet it does not provide a form management solution. To have a complete solution, Refine recommends using `@refinedev/react-hook-form` package which is built on top of Refine's [`useForm`](/docs/api-reference/core/hooks/useForm.md) hook and React Hook Form's [`useForm`](/docs/packages/documentation/react-hook-form/useForm.md) hook.

Refine's documentations and examples of Chakra UI uses `@refinedev/react-hook-form` package for form management but you have the option to use any form management solution you want.

```tsx title="posts/create.tsx"
import { Create } from "@refinedev/chakra-ui";
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

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
        <Input id="title" type="text" {...register("title", { required: "Title is required" })} />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="status"
          placeholder="Select Post Status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="categoryId"
          placeholder="Select Category"
          {...register("category.id", {
            required: "Category is required",
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>Content</FormLabel>
        <Textarea
          id="content"
          {...register("content", {
            required: "content is required",
          })}
        />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
```

Additional hooks of `@refinedev/react-hook-form` such as `useStepsForm` and `useModalForm` can also be used together with Refine's Chakra UI integration with ease.

## Notifications

Chakra UI has its own notification system which works seamlessly with its UI elements. Refine also provides a seamless integration with Chakra UI's notification system and show notifications for related actions and events. This integration is provided by the `notificationProvider` hook exported from the `@refinedev/chakra-ui` package which can be directly used in the `notificationProvider` prop of the `<Refine>` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { notificationProvider } from "@refinedev/chakra-ui";

const App = () => {
  return <Refine notificationProvider={notificationProvider}>{/* ... */}</Refine>;
};
```

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Chakra UI's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/chakra-ui";
import { Outlet, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Refine
    // ...
    >
      <Routes>
        <Route
          element={
            // highlight-start
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
            // highlight-end
          }
        >
          <Route path="/posts" element={<PostList />} />
          {/* ... */}
        </Route>
      </Routes>
    </Refine>
  );
};
```

`<ThemedLayoutV2>` component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout buttun. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a `<Breadcrumb />` component that uses the Chakra UI's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Chakra UI package automatically.

### Buttons

Refine's Chakra UI integration offers variety of buttons that are built above the `<Button>` component of Chakra UI and includes many logical functionalities such as authorization checks, confirmation dialogs, loading states, invalidation, navigation and more. You can use buttons such as `<EditButton>` or `<ListButton>` etc. in your views to provide navigation for the related routes or `<DeleteButton>` and `<SaveButton>` etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="posts/list.tsx"
import React from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { GetManyResponse, useMany } from "@refinedev/core";
import { List, EditButton, DateField } from "@refinedev/chakra-ui";

import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack, Text, Select } from "@chakra-ui/react";

export const PostList: React.FC = () => {
  const columns = React.useMemo(
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
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          // highlight-next-line
          return <EditButton hideText size="sm" recordItemId={getValue() as number} />;
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
                    <Text>{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
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

The list of provided buttons are:

- `<CreateButton />`
- `<EditButton />`
- `<ListButton />`
- `<ShowButton />`
- `<CloneButton />`
- `<DeleteButton />`
- `<SaveButton />`
- `<RefreshButton />`
- `<ImportButton />`
- `<ExportButton />`

Many of these buttons are already used in the views provided by Refine's Chakra UI integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Chakra UI integration uses components such as `<Box />` and `<Heading />` to provide these views and provides customization options by passing related props to these components.

An example usage of the `<Show />` component is as follows:

```tsx title="posts/show.tsx"
import { useShow, useOne } from "@refinedev/core";
import { Show, TextField } from "@refinedev/chakra-ui";

import { Heading } from "@chakra-ui/react";

export const PostShow: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <TextField value={record?.id} />

      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <TextField value={record?.title} />
    </Show>
  );
};
```

The list of provided views are:

- `<List />`
- `<Show />`
- `<Edit />`
- `<Create />`

### Fields

Refine's Material UI also provides field components to render values with appropriate design and format of Material UI. These components are built on top of respective Material UI components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- `<BooleanField />`
- `<DateField />`
- `<EmailField />`
- `<FileField />`
- `<MarkdownField />`
- `<NumberField />`
- `<TagField />`
- `<TextField />`
- `<UrlField />`

```tsx title="posts/show.tsx"
import { useShow, useOne } from "@refinedev/core";
import { Show, TextField } from "@refinedev/chakra-ui";

import { Heading } from "@chakra-ui/react";

export const PostShow: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <TextField value={record?.id} />

      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <TextField value={record?.title} />
    </Show>
  );
};
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Chakra UI components such as `<TextField>` and `<Card>` etc.

An example usage of the `<AuthPage />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { AuthPage } from "@refinedev/chakra-ui";
import { Outlet, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Refine
    // ...
    >
      <Routes>
        {/* highlight-next-line */}
        <Route path="/login" element={<AuthPage type="login" />} />
        {/* ... */}
      </Routes>
    </Refine>
  );
};
```

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

### Error Components

Refine's Chakra UI integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/chakra-ui";
import { Outlet, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Refine
    // ...
    >
      <Routes>
        {/* ...rest of your routes here... */}
        {/* highlight-next-line */}
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Refine>
  );
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Chakra UI. All components and providers exported from the `@refinedev/chakra-ui` package will use the current theme of Chakra UI without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Chakra UI which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/chakra-ui` package and can be used in `<ChakraProvider>` component of Chakra UI.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { RefineThemes } from "@refinedev/chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    // highlight-next-line
    <ChakraProvider theme={RefineThemes.Blue}>
      <Refine
      // ...
      >
        {/* ... */}
      </Refine>
    </ChakraProvider>
  );
};
```
