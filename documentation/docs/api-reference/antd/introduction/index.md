---
title: Introduction
---

Refine provides an integration package for [Ant Design](https://ant.design/) framework. This package provides a set of ready to use components and hooks that connects Refine with Ant Design components.

import Usage from "./usage.tsx";

<Usage />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

```bash
npm install @refinedev/antd
```

## Tables

Ant Design offers a very powerful and customizable table component. Refine provides a seamless integration with the `<Table>` component of Ant Design from pagination to sorting and filtering via the [`useTable`](/docs/api-reference/antd/hooks/table/useTable.md) hook exported from the `@refinedev/antd` package. This `useTable` hook extends the `useTable` hook of `@refinedev/core` package and provides a set of additional features and transformations to make it work with Ant Design's `<Table>` component without any additional configuration.

```tsx title="posts/list.tsx"
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const PostList: FC = () => {
  // highlight-next-line
  const { tableProps } = useTable();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="title" title="Title" />
      <Table.Column dataIndex="status" title="Status" />
    </Table>
  );
};
```

`@refinedev/antd` package also provides a `<FilterDropdown />` component to be used in the filter popover of the `<Table>` component. This component makes it easy to apply filters from the Ant Design UI without any additional configuration.

## Forms

Ant Design offers a form component that is covering many use cases and provide customization options. Refine provides a seamless integration with the `<Form>` component of Ant Design from validation to submission via the [`useForm`](/docs/api-reference/antd/hooks/form/useForm.md) hook exported from the `@refinedev/antd` package.

```tsx title="posts/create.tsx"
import { useForm, useSelect, SaveButton } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const PostCreate: FC = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Category"
                name={["category", "id"]}
                rules={[{ required: true }]}
            >
                <Select {...selectProps} />
            </Form.Item>
            <SaveButton {...saveButtonProps}>
        </Form>
    )
}
```

`@refinedev/antd` also offers hooks to implement different types of forms such as `useDrawerForm`, `useModalForm` and `useStepsForm` hooks. Additionally `useSelect`, `useCheckboxGroup` and `useRadioGroup` hooks are also provided to make it easier to implement form fields with relational data. These hooks leverage the `useSelect` hook from the `@refinedev/core` package.

## Notifications

Ant Design has its own notification system which works seamlessly with its UI elements. Refine also provides a seamless integration with Ant Design's notification system and show notifications for related actions and events. This integration is provided by the `useNotificationProvider` hook exported from the `@refinedev/antd` package which can be directly used in the `notificationProvider` prop of the `<Refine>` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";

const App = () => {
  return <Refine notificationProvider={useNotificationProvider}>{/* ... */}</Refine>;
};
```

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Ant Design's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
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

Additionally, Refine also provides a `<Breadcrumb />` component that uses the Ant Design's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Ant Design package automatically.

### Buttons

Refine's Ant Design integration offers variety of buttons that are built above the `<Button>` component of Ant Design and includes many logical functionalities such as authorization checks, confirmation dialogs, loading states, invalidation, navigation and more. You can use buttons such as `<EditButton>` or `<ListButton>` etc. in your views to provide navigation for the related routes or `<DeleteButton>` and `<SaveButton>` etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="posts/list.tsx"
import { useTable, EditButton } from "@refinedev/antd";
import { Table } from "antd";

export const PostList: FC = () => {
  const { tableProps } = useTable();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="title" title="Title" />
      <Table.Column dataIndex="status" title="Status" />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          // highlight-start
          <EditButton hideText size="small" recordItemId={record.id} />
          // highlight-end
        )}
      />
    </Table>
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

Many of these buttons are already used in the views provided by Refine's Ant Design integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Ant Design integration uses components such as `<PageHeader />`, `<Card />` and `<Space />` to provide these views and provides customization options by passing related props to these components.

An example usage of the `<Show />` component is as follows:

```tsx title="posts/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";

export const PostShow: FC = () => {
  // highlight-next-line
  const { queryResult } = useShow<IPost>();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-start
    // This will add breadcrumbs, page title and edit, list, refresh and delete buttons to the page
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={record?.id} />

      <Typography.Title level={5}>Title</Typography.Title>
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

Refine's Ant Design also provides field components to render values with appropriate design and format of Ant Design. These components are built on top of respective Ant Design components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- `<BooleanField />`
- `<DateField />`
- `<EmailField />`
- `<FileField />`
- `<ImageField />`
- `<MarkdownField />`
- `<NumberField />`
- `<TagsField />`
- `<TextField />`
- `<UrlField />`

```tsx title="posts/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";

export const PostShow: FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.id} />

      <Typography.Title level={5}>Title</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.title} />
    </Show>
  );
};
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Ant Design components such as `<Form>` and `<Card>` etc.

An example usage of the `<AuthPage />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { AuthPage } from "@refinedev/antd";
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

Refine's Ant Design integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/antd";
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

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Ant Design. All components and providers exported from the `@refinedev/antd` package will use the current theme of Ant Design without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Ant Design which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/antd` package and can be used in `<ConfigProvider>` component of Ant Design.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { ConfigProvider } from "antd";
import { RefineThemes } from "@refinedev/antd";

const App = () => {
  return (
    // highlight-next-line
    <ConfigProvider theme={RefineThemes.Blue}>
      <Refine
      // ...
      >
        {/* ... */}
      </Refine>
    </ConfigProvider>
  );
};
```
