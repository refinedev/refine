---
title: Refactoring
---

import { Sandpack, RefactorTableInListProducts, RefactorFieldsInShowProduct, RefactorFormInEditProduct, RefactorFormInCreateProduct } from "./sandpack.tsx";

<Sandpack>

Now we're ready to refactor our app to use the `@refinedev/antd`'s `useForm` and `useTable` hooks. These hooks will allow us to create forms and tables with ease by providing an interface that is compatible with Ant Design's `<Form />` and `<Table />` components.

We'll also be using the field components provided by `@refinedev/antd` to create product details screen. These components are tailored to work with Ant Design's design system and provide an easy way to display various types of data.

## Using `<Table />` and `useTable`

We'll start by refactoring our `<ListProducts />` component to use the `useTable` hook from `@refinedev/antd` and the `<Table />` component from Ant Design. This will allow us to create a table to display our products with minimal effort.

`useTable` will give us the same functionality as the core version but will also return the `tableProps` that we can use to pass to the `<Table />` component with ease.

Try to update your `src/list-products.tsx` file with the following lines:

```tsx title="src/list-products.tsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import { useTable, EditButton, ShowButton } from "@refinedev/antd";

// highlight-next-line
import { Table, Space } from "antd";

export const ListProducts = () => {
  // highlight-start
  // We'll use pass `tableProps` to the `<Table />` component,
  // This will manage the data, pagination, filters and sorters for us.
  const { tableProps } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });
  // highlight-end

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      {/* highlight-start */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorTableInListProducts />

Notice that we've get rid of every logic related to managing the data, pagination, filters and sorters because these will be managed by the `tableProps` value. We've also used the `EditButton` and `ShowButton` components to manage navigation easily.

Button components provided by Refine uses the styling from Ant Design and provides many features from built-in access control to i18n and more.

List of available button components:

- [`<CreateButton />`](/docs/ui-integrations/ant-design/components/buttons/create-button)
- [`<EditButton />`](/docs/ui-integrations/ant-design/components/buttons/edit-button)
- [`<ListButton />`](/docs/ui-integrations/ant-design/components/buttons/list-button)
- [`<ShowButton />`](/docs/ui-integrations/ant-design/components/buttons/show-button)
- [`<CloneButton />`](/docs/ui-integrations/ant-design/components/buttons/clone-button)
- [`<DeleteButton />`](/docs/ui-integrations/ant-design/components/buttons/delete-button)
- [`<SaveButton />`](/docs/ui-integrations/ant-design/components/buttons/save-button)
- [`<RefreshButton />`](/docs/ui-integrations/ant-design/components/buttons/refresh-button)
- [`<ImportButton />`](/docs/ui-integrations/ant-design/components/buttons/import-button)
- [`<ExportButton />`](/docs/ui-integrations/ant-design/components/buttons/export-button)

## Using `useForm` and `<Form />`

Next, we'll refactor our `<EditProduct />` and `<CreateProduct />` components to use the `useForm` hook from `@refinedev/antd` and the `<Form />` component from Ant Design. This will allow us to create forms with minimal effort.

`useForm` will give us the same functionality as the core version but will also return the `formProps` that we can use to pass to the `<Form />` component with ease.

Try to update your `src/edit-product.tsx` file with the following lines:

```tsx title="src/edit-product.tsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
    // highlight-start
  const { formProps, saveButtonProps, queryResult } = useForm({
    redirect: "show",
  });
    // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,
  });

  return (
    { /* highlight-start */}
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      {/* SaveButton renders a submit button to submit our form */}
      <SaveButton {...saveButtonProps} />
    </Form>
    { /* highlight-end */}
  );
};
```

<RefactorFormInEditProduct />

Notice that we've also used the `useSelect` hook with `<Select />` component to create a select input for the `category` field. `useSelect` is fully compatible with Ant Design's `<Select />` component and provides an easy way to create select inputs with minimal effort.

Now let's do the same for the `CreateProduct` component. These components will use mostly the same logic except the edit action will provide default values for the fields.

Try to update your `src/create-product.tsx` file with the following lines:

```tsx title="src/create-product.tsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
    // highlight-start
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });
    // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    { /* highlight-start */}
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      <SaveButton {...saveButtonProps} />
    </Form>
    { /* highlight-end */}
  );
};
```

<RefactorFormInCreateProduct />

## Refactoring `<ShowProduct />`

Now that we've refactored our list, edit and create components, let's refactor our `<ShowProduct />` component to use the field components from `@refinedev/antd` to represent every field with proper styling and formatting.

List of available field components:

- [`<BooleanField />`](/docs/ui-integrations/ant-design/components/fields/boolean-field)
- [`<DateField />`](/docs/ui-integrations/ant-design/components/fields/date-field)
- [`<EmailField />`](/docs/ui-integrations/ant-design/components/fields/email-field)
- [`<FileField />`](/docs/ui-integrations/ant-design/components/fields/file-field)
- [`<ImageField />`](/docs/ui-integrations/ant-design/components/fields/image-field)
- [`<MarkdownField />`](/docs/ui-integrations/ant-design/components/fields/markdown-field)
- [`<NumberField />`](/docs/ui-integrations/ant-design/components/fields/number-field)
- [`<TagField />`](/docs/ui-integrations/ant-design/components/fields/tag-field)
- [`<TextField />`](/docs/ui-integrations/ant-design/components/fields/text-field)
- [`<UrlField />`](/docs/ui-integrations/ant-design/components/fields/url-field)

We'll be using the `<TextField />`, `<NumberField />` and `<MarkdownField />` components to represent the fields of the products properly.

Try to update your `src/show-product.tsx` file with the following lines:

```tsx title="src/show-product.tsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: data?.data?.category.id || "",
    queryOptions: {
      enabled: !!data?.data,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* highlight-start */}
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={data?.data?.id} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={data?.data?.name} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={data?.data?.description} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={data?.data?.material} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
      />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={data?.data?.price} />
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorFieldsInShowProduct />

Now we've updated all our routes to use extended versions of Refine's core hooks and helper components.

In the next step, we'll be learning about the CRUD views provided by `@refinedev/antd`, what they are and why they are useful.

</Sandpack>
