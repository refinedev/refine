---
title: Introduction
---

Refine provides an integration package for [Ant Design](https://ant.design/) framework. This package provides a set of ready to use components and hooks that connects Refine with Ant Design components. While Refine's integration offers a set of components and hooks, it is not a replacement for the Ant Design package, you will be able to use all the features of Ant Design in the same way you would use it in a regular React application. Refine's integration only provides components and hooks for an easier usage of Ant Design components in combination with Refine's features and functionalities.

import Example from "./example.tsx";

<Example />

## Installation

Installing the package is as simple as just by running the following command without any additional configuration:

```bash
npm install @refinedev/antd antd
```

## Usage

We'll wrap our app with the [`<ConfigProvider />`](https://ant.design/components/config-provider) to make sure we have the theme available for our app, then we'll use the layout components to wrap them around our routes. Check out the examples below to see how to use Refine's Ant Design integration.

<Tabs wrapContent={false}>
<TabItem value="react-router-dom" label="React Router Dom">

import UsageReactRouterDom from "./usage-react-router-dom.tsx";

<UsageReactRouterDom />

</TabItem>
<TabItem value="next-js" label="Next.js">

import UsageNextJs from "./usage-next-js.tsx";

<UsageNextJs />

</TabItem>
<TabItem value="remix" label="Remix">

import UsageRemix from "./usage-remix.tsx";

<UsageRemix />

</TabItem>
</Tabs>

## Tables

Refine provides a seamless integration with the [`<Table />`](https://ant.design/components/table) component of Ant Design from pagination to sorting and filtering via the [`useTable`](/docs/api-reference/antd/hooks/table/useTable.md) hook exported from the `@refinedev/antd` package. This hook is an extension of the `@refinedev/core`'s [`useTable`](/docs/api-reference/core/hooks/useTable/) and provides a set of additional features and transformations to make it work with Ant Design's `<Table />` component without any additional configuration.

```tsx title="pages/products/list.tsx"
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  // highlight-next-line
  const { tableProps } = useTable<IProduct>();
  // `tableProps` contains the necessary props to be passed
  // to the `<Table />` component of Ant Design
  // by transforming the values to fit the Ant Design's API.

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
    </Table>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

`@refinedev/antd` package also provides a [`<FilterDropdown />`](/docs/api-reference/antd/components/filter-dropdown/) component to be used in the filter popover of the `<Table />` component. This component makes it easy to apply filters from the Ant Design UI without any additional configuration.

## Forms

Refine provides a seamless integration with the [`<Form />`](https://ant.design/components/form) component of Ant Design from validation to submission via the [`useForm`](/docs/api-reference/antd/hooks/form/useForm.md) hook exported from the `@refinedev/antd` package. This hook is an extension of the `@refinedev/core`'s [`useForm`](/docs/api-reference/core/hooks/useForm/) and provides a set of additional features and transformations to make it work with Ant Design's `<Form />` component.

```tsx title="pages/products/create.tsx"
import { useForm, SaveButton } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const ProductCreate = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm<IProduct>();
    // `formProps` contains the necessary props to be passed
    // to the `<Form />` component of Ant Design
    // by transforming the values to fit the Ant Design's API.

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <SaveButton {...saveButtonProps}>
        </Form>
    )
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

`@refinedev/antd` also offers hooks to implement different types of forms such as [`useDrawerForm`](/docs/api-reference/antd/hooks/form/useDrawerForm/), [`useModalForm`](/docs/api-reference/antd/hooks/form/useModalForm/) and [`useStepsForm`](/docs/api-reference/antd/hooks/form/useStepsForm/) hooks. Additionally [`useSelect`](/docs/api-reference/antd/hooks/field/useSelect/), [`useCheckboxGroup`](/docs/api-reference/antd/hooks/field/useCheckboxGroup/) and [`useRadioGroup`](/docs/api-reference/antd/hooks/field/useRadioGroup/) hooks are also provided to make it easier to implement form fields with relational data. These hooks leverage the [`useSelect`](/docs/api-reference/core/hooks/useSelect/) hook from the `@refinedev/core` package.

## Notifications

Ant Design has its own [notification system](https://ant.design/components/notification) which works seamlessly with its UI elements. Refine also provides a seamless integration with Ant Design's notification system and show notifications for related actions and events. This integration is provided by the `useNotificationProvider` hook exported from the `@refinedev/antd` package which can be directly used in the [`notificationProvider`](/docs/api-reference/core/components/refine-config/#notificationprovider) prop of the `<Refine />` component.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { App as AntdApp } from "antd";

const App = () => {
  return (
    <ConfigProvider theme={RefineThemes.Green}>
      <AntdApp>
        <Refine notificationProvider={useNotificationProvider}>{/* ... */}</Refine>
      </AntdApp>
    </ConfigProvider>
  );
};
```

:::tip
If you have any configurations in the Ant Design's theme, you should wrap your app with the [`<App />`](https://ant.design/components/app) component to make sure the notifications are also receiving the current theme configuration.
:::

## Predefined Components and Views

### Layouts, Menus and Breadcrumbs

Refine provides Layout components that can be used to implement a layout for the application. These components are crafted using Ant Design's components and includes Refine's features and functionalities such as navigation menus, headers, authentication, authorization and more.

<Tabs wrapContent={false}>
<TabItem value="react-router-dom" label="React Router Dom">

import LayoutReactRouterDom from "./layout-react-router-dom.tsx";

<LayoutReactRouterDom />

</TabItem>
<TabItem value="next-js" label="Next.js">

import LayoutNextJs from "./layout-next-js.tsx";

<LayoutNextJs />

</TabItem>
<TabItem value="remix" label="Remix">

import LayoutRemix from "./layout-remix.tsx";

<LayoutRemix />

</TabItem>
</Tabs>

[`<ThemedLayoutV2 />`](/docs/api-reference/antd/components/antd-themed-layout/) component consists of a header, sider and a content area. The sider have a navigation menu items for the defined resources of Refine, if an authentication provider is present, it will also have a functional logout buttun. The header contains the app logo and name and also information about the current user if an authentication provider is present.

Additionally, Refine also provides a [`<Breadcrumb />`](/docs/api-reference/antd/components/breadcrumb/) component that uses the Ant Design's component as a base and provide appropriate breadcrumbs for the current route. This component is used in the basic views provided by Refine's Ant Design package automatically.

### Buttons

Refine's Ant Design integration offers variety of buttons that are built above the [`<Button />`](https://ant.design/components/button) component of Ant Design and includes many logical functionalities such as;

- Authorization checks
- Confirmation dialogs
- Loading states
- Invalidation
- Navigation
- Form actions
- Import/Export and more.

You can use buttons such as [`<EditButton />`](/docs/api-reference/antd/components/buttons/edit-button/) or [`<ListButton />`](/docs/api-reference/antd/components/buttons/list-button/) etc. in your views to provide navigation for the related routes or [`<DeleteButton />`](/docs/api-reference/antd/components/buttons/delete-button/) and [`<SaveButton />`](/docs/api-reference/antd/components/buttons/save-button/) etc. to perform related actions without having to worry about the authorization checks and other logical functionalities.

An example usage of the `<EditButton />` component is as follows:

```tsx title="pages/products/list.tsx"
import { useTable, EditButton } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable<IProduct>();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
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

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

The list of provided buttons are:

- [`<CreateButton />`](/docs/api-reference/antd/components/buttons/create-button/)
- [`<EditButton />`](/docs/api-reference/antd/components/buttons/edit-button/)
- [`<ListButton />`](/docs/api-reference/antd/components/buttons/list-button/)
- [`<ShowButton />`](/docs/api-reference/antd/components/buttons/show-button/)
- [`<CloneButton />`](/docs/api-reference/antd/components/buttons/clone-button/)
- [`<DeleteButton />`](/docs/api-reference/antd/components/buttons/delete-button/)
- [`<SaveButton />`](/docs/api-reference/antd/components/buttons/save-button/)
- [`<RefreshButton />`](/docs/api-reference/antd/components/buttons/refresh-button/)
- [`<ImportButton />`](/docs/api-reference/antd/components/buttons/import-button/)
- [`<ExportButton />`](/docs/api-reference/antd/components/buttons/export-button/)

Many of these buttons are already used in the views provided by Refine's Ant Design integration. If you're using the basic view elements provided by Refine, you will have the appropriate buttons placed in your application out of the box.

### Views

Views are designed as wrappers around the content of the pages in the application. They are designed to be used within the layouts and provide basic functionalities such as titles based on the resource, breadcrumbs, related actions and authorization checks. Refine's Ant Design integration uses components such as [`<Card />`](https://ant.design/components/card) and [`<Space />`](https://ant.design/components/space) to provide these views and provides customization options by passing related props to these components.

The list of provided views are:

- [`<List />`](/docs/api-reference/antd/components/basic-views/list/)
- [`<Show />`](/docs/api-reference/antd/components/basic-views/show/)
- [`<Edit />`](/docs/api-reference/antd/components/basic-views/edit/)
- [`<Create />`](/docs/api-reference/antd/components/basic-views/create/)

import BasicViews from "./basic-views.tsx";

<BasicViews />

### Fields

Refine's Ant Design also provides field components to render values with appropriate design and format of Ant Design. These components are built on top of respective Ant Design components and also provide logic for formatting of the values. While these components might not always be suitable for your use case, they can be combined or extended to provide the desired functionality.

The list of provided field components are:

- [`<BooleanField />`](/docs/api-reference/antd/components/fields/boolean/)
- [`<DateField />`](/docs/api-reference/antd/components/fields/date/)
- [`<EmailField />`](/docs/api-reference/antd/components/fields/email/)
- [`<FileField />`](/docs/api-reference/antd/components/fields/file/)
- [`<ImageField />`](/docs/api-reference/antd/components/fields/image/)
- [`<MarkdownField />`](/docs/api-reference/antd/components/fields/markdown/)
- [`<NumberField />`](/docs/api-reference/antd/components/fields/number/)
- [`<TagField />`](/docs/api-reference/antd/components/fields/tag/)
- [`<TextField />`](/docs/api-reference/antd/components/fields/text/)
- [`<UrlField />`](/docs/api-reference/antd/components/fields/url/)

```tsx title="pages/products/show.tsx"
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

export const ProductShow = () => {
  const { queryResult } = useShow<IProduct>();
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

      <Typography.Title level={5}>Price</Typography.Title>
      {/* highlight-next-line */}
      <NumberField value={record?.price} options={{ style: "currency", currency: "USD" }} />
    </Show>
  );
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

### Auth Pages

Auth pages are designed to be used as the pages of the authentication flow of the application. They offer an out of the box solution for the login, register, forgot password and reset password pages by leveraging the authentication hooks of Refine. Auth page components are built on top of basic Ant Design components such as [`<Form />`](https://ant.design/components/form) and [`<Card />`](https://ant.design/components/card) etc.

The list of types of auth pages that are available in the UI integrations are:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

An example usage of the [`<AuthPage />`](/docs/api-reference/antd/components/antd-auth-page/) component is as follows:

import AuthPage from "./auth-page.tsx";

<AuthPage />

### Error Components

Refine's Ant Design integration also provides an `<ErrorComponent />` component that you can use to render a 404 page in your app. While these components does not offer much functionality, they are provided as an easy way to render an error page with a consistent design language.

An example usage of the `<ErrorComponent />` component is as follows:

```tsx title="pages/404.tsx"
import { ErrorComponent } from "@refinedev/antd";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Theming

Since Refine offers application level components such as layout, sidebar and header and page level components for each action, it is important to have it working with the styling of Ant Design. All components and providers exported from the `@refinedev/antd` package will use the current theme of Ant Design without any additional configuration.

Additionally, Refine also provides a set of carefully crafted themes for Ant Design which outputs a nice UI with Refine's components with light and dark theme support. These themes are exported as `RefineThemes` object from the `@refinedev/antd` package and can be used in [`<ConfigProvider />`](https://ant.design/components/config-provider) component of Ant Design.

import Theming from "./theming.tsx";

<Theming />

To learn more about the theme configuration of Ant Design, please refer to the [official documentation](https://ant.design/docs/react/customize-theme).

## Inferencer

You can automatically generate views for your resources using `@refinedev/inferencer`. Inferencer exports the `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer` components and finally the `AntdInferencer` component, which combines all in one place.

To learn more about Inferencer, please refer to the [Ant Design Inferencer](/docs/api-reference/antd/components/inferencer/) docs.
