---
title: Introduction
---

Refine provides an integration package for [Material UI](https://mui.com/material-ui/getting-started/) framework. This package provides a set of ready to use components and hooks that connects Refine with Material UI components.

import Usage from "./usage.tsx";

<Usage />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

```bash
npm install @refinedev/mui
```

## Tables

Material UI offers a very powerful and customizable `<DataGrid />` component. Refine provides a seamless integration with the `<DataGrid />` component of Material UI from pagination to sorting and filtering via the [`useDataGrid`](/docs/api-reference/mui/hooks/useDataGrid/index.md) hook exported from the `@refinedev/mui` package. This `useDataGrid` hook extends the `useTable` hook of `@refinedev/core` package and provides a set of additional features and transformations to make it work with Material UI's `<DataGrid />` component without any additional configuration.

```tsx title="posts/list.tsx"
// highlight-next-line
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const PostList: FC = () => {
  // highlight-next-line
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", width: 50 },
      { field: "title", headerName: "title", minWidth: 200, flex: 1 },
      { field: "content", headerName: "Content", minWidth: 300, flex: 1 },
    ],
    [],
  );

  return (
    <List>
      {/* highlight-next-line */}
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
```

## Forms

Material UI offers form elements yet it does not provide a form management solution. To have a complete solution, Refine recommends using `@refinedev/react-hook-form` package which is built on top of Refine's [`useForm`](/docs/api-reference/core/hooks/useForm.md) hook and React Hook Form's [`useForm`](/docs/packages/documentation/react-hook-form/useForm.md) hook.

Refine's documentations and examples of Material UI uses `@refinedev/react-hook-form` package for form management but you have the option to use any form management solution you want.

```tsx title="posts/create.tsx"
import { useForm } from "@refinedev/react-hook-form";
import { Create, useAutoComplete } from "@refinedev/mui";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { Controller } from "react-hook-form";

export const PostCreate: FC = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }} autoComplete="off">
        <TextField
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          autoFocus
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete<ICategory>
              id="category"
              {...autocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return autocompleteProps?.options?.find((p) => p?.id?.toString() === item?.id?.toString())?.title ?? "";
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
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

`@refinedev/mui` also provides `useAutocomplete` hook which can be used to implement autocomplete fields with relational data. This hook leverages the `useSelect` hook from the `@refinedev/core` package.

Additional hooks of `@refinedev/react-hook-form` such as `useStepsForm` and `useModalForm` can also be used together with Refine's Material UI integration with ease.

## Notifications

Material UI has its own notification elements but lacks the notification management solution. As [recommended by the Material UI's documentation](https://mui.com/material-ui/react-snackbar/#notistack); Refine's integration provides a notification provider which uses `notistack` package under the hood. This integration is provided by the `notificationProvider` exported from the `@refinedev/mui` package which can be directly used in the `notificationProvider` prop of the `<Refine>` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/antd";

const App = () => {
  return (
    // `notistack` also requires a context provider to be used
    <RefineSnackbarProvider>
      <Refine notificationProvider={notificationProvider}>{/* ... */}</Refine>
    </RefineSnackbarProvider>
  );
};
```

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Material UI's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
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

Additionally, Refine also provides a `<Breadcrumb />` component that uses the Material UI's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Material UI package automatically.

### Buttons

Refine's Material UI integration offers variety of buttons that are built above the `<Button>` component of Material UI and includes many logical functionalities such as authorization checks, confirmation dialogs, loading states, invalidation, navigation and more. You can use buttons such as `<EditButton>` or `<ListButton>` etc. in your views to provide navigation for the related routes or `<DeleteButton>` and `<SaveButton>` etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="posts/list.tsx"
import { useDataGrid, EditButton } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const PostList: FC = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      { field: "id", headerName: "ID", type: "number", width: 50 },
      { field: "title", headerName: "title", minWidth: 200, flex: 1 },
      { field: "content", headerName: "Content", minWidth: 300, flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
            return (
              {/* highlight-next-line */}
              <EditButton hideText recordItemId={row.id} />
            );
        },
      }
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

Many of these buttons are already used in the views provided by Refine's Material UI integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Material UI integration uses components such as `<Card />` and `<Box />` to provide these views and provides customization options by passing related props to these components.

An example usage of the `<Show />` component is as follows:

```tsx title="posts/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mui";
import Typography from "@mui/material/Typography";

export const PostShow: FC = () => {
  // highlight-next-line
  const { queryResult } = useShow<IPost>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-start
    // This will add breadcrumbs, page title and edit, list, refresh and delete buttons to the page
    <Show isLoading={isLoading}>
      <Typography variant="body1" fontWeight="bold">
        Id
      </Typography>
      <TextField value={record?.id} />

      <Typography variant="body1" fontWeight="bold">
        Title
      </Typography>
      <TextField value={record?.title} />
    </Show>
    // highlight-end
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
import { useShow } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mui";
import Typography from "@mui/material/Typography";

export const PostShow: FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-start
    // This will add breadcrumbs, page title and edit, list, refresh and delete buttons to the page
    <Show isLoading={isLoading}>
      <Typography variant="body1" fontWeight="bold">
        Id
      </Typography>
      <TextField value={record?.id} />

      <Typography variant="body1" fontWeight="bold">
        Title
      </Typography>
      <TextField value={record?.title} />
    </Show>
    // highlight-end
  );
};
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Material UI components such as `<TextField>` and `<Card>` etc.

An example usage of the `<AuthPage />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { AuthPage } from "@refinedev/mui";
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

Refine's Material UI integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/mui";
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

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Material UI. All components and providers exported from the `@refinedev/mui` package will use the current theme of Material UI without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Material UI which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/mui` package and can be used in `<ThemeProvider>` component of Material UI.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ThemeProvider } from "@mui/material/styles";

import { RefineThemes } from "@refinedev/mui";

const App = () => {
  return (
    // highlight-next-line
    <ThemeProvider theme={RefineThemes.Blue}>
      <Refine
      // ...
      >
        {/* ... */}
      </Refine>
    </ThemeProvider>
  );
};
```
