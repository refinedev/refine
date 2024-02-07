---
title: CRUD Components
---

import { Sandpack, ListInListProducts, EditInEditProduct, CreateInCreateProduct, ShowInShowProduct } from "./sandpack.tsx";

<Sandpack>

Now we've refactored our components, it's time to learn about the CRUD view components provided by Refine's Ant Design integration. These components are implemented to provide consistent design with Ant Design with additional features such as headers with i18n support, breadcrumbs, navigation buttons, submission buttons, and more.

These components are not required to use Refine, but they are useful for building a consistent user interface without worrying about the common features you need across your application.

## List View

The `<List />` component is a wrapper component for list pages. It provides an header with i18n support and navigation to create a new record. You can always provide more features and elements by passing customizing the component.

:::note

Remember that when we've removed the `<Header />` component, we've also removed the navigation link for the `/products/create` route. `<List />` will automatically add a button for this purpose without needing any additional code.

:::

Try to update your `src/list-products.tsx` file with the following lines:

```tsx title="src/list-products.tsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import { useTable, EditButton, ShowButton, List } from "@refinedev/antd";

import { Table, Space } from "antd";

export const ListProducts = () => {
  const { tableProps } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    {/* highlight-next-line */}
    <List>
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
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    {/* highlight-next-line */}
    </List>
  );
};
```

<ListInListProducts />

## Show View

The `<Show />` component is a wrapper component for show pages. It provides an header with i18n support and navigation to list view, to edit the record, a refresh button. a delete button, a back button and breadcrumbs. You can always provide more features and elements by passing customizing the component.

Try to update your `src/show-product.tsx` file with the following lines:

```tsx title="src/show-product.tsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
    const { queryResult: { data, isLoading } } = useShow();

    const { data: categoryData, isLoading: categoryIsLoading } =
    useOne({
        resource: "categories",
        id: data?.data?.category.id || "",
        queryOptions: {
            enabled: !!data?.data,
        },
    });

    return (
        {/* highlight-next-line */}
      <Show isLoading={isLoading}>
        <Typography.Title level={5}>Id</Typography.Title>
        <TextField value={data?.data?.id} />

        <Typography.Title level={5}>Name</Typography.Title>
        <TextField value={data?.data?.name} />

        <Typography.Title level={5}>Description</Typography.Title>
        <MarkdownField value={data?.data?.description} />

        <Typography.Title level={5}>Material</Typography.Title>
        <TextField value={data?.data?.material} />

        <Typography.Title level={5}>Category</Typography.Title>
        <TextField
          value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
        />

        <Typography.Title level={5}>Price</Typography.Title>
        <NumberField value={data?.data?.price} />
        {/* highlight-next-line */}
      </Show>
    );
};
```

<ShowInShowProduct />

## Edit View

The `<Edit />` component is a wrapper component for edit pages. The design is similar to the `<Show />` component and additionally provides a `<SaveButton />` in its footer. You can always provide more features and elements by passing customizing the component.

Try to update your `src/edit-product.tsx` file with the following lines:

```tsx title="src/edit-product.tsx"
// highlight-next-line
import { useForm, useSelect, Edit } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    redirect: "show",
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,
  });

  return (
    {/* highlight-next-line */}
    <Edit saveButtonProps={saveButtonProps}>
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
      </Form>
    {/* highlight-next-line */}
    </Edit>
  );
};
```

<EditInEditProduct />

:::tip

Notice that we've removed the `<SaveButton />` component from the `<EditProduct />` and used the `saveButtonProps` prop to provide the same functionality with the `<Edit />` component.

:::

## Create View

The `<Create />` component is a wrapper component for create pages. The design and the usage is similar to the `<Edit />` component. You can always provide more features and elements by passing customizing the component.

Try to update your `src/create-product.tsx` file with the following lines:

```tsx title="src/create-product.tsx"
// highlight-next-line
import { useForm, useSelect, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    {/* highlight-next-line */}
    <Create saveButtonProps={saveButtonProps}>
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
      </Form>
    {/* highlight-next-line */}
    </Create>
  );
};
```

<CreateInCreateProduct />

Now our application has a consistent design with many features ready to use without writing a single line of code.

In the next step, we will learn how to handle notifications with Refine and integrate it with Ant Design's notification system.

</Sandpack>
