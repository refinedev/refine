import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { finalFiles as initialFiles } from "@site/tutorial/ui-libraries/layout/ant-design/react-router/sandpack";
import { dependencies } from "@site/tutorial/ui-libraries/intro/ant-design/react-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
    return (
        <TutorialSandpack
            showNavigator
            dependencies={dependencies}
            files={files}
            finalFiles={finalFiles}
        >
            {children}
        </TutorialSandpack>
    );
};

// updates

const ListProductsTsx = /* tsx */ `
import { useMany } from "@refinedev/core";
import { useTable, EditButton, ShowButton } from "@refinedev/antd";

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
    <div>
      <h1>Products</h1>
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

            return categories?.data?.find((category) => category.id == value)?.title;
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
    </div>
  );
};
`.trim();

const ShowProductTsx = /* tsx */ `
import { useShow, useOne } from "@refinedev/core";
import { TextField, NumberField, MarkdownField } from "@refinedev/antd";

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
      <div>
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
      </div>
    );
};
`.trim();

const CreateProductTsx = /* tsx */ `
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
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
  );
};
`.trim();

const EditProductTsx = /* tsx */ `
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

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
  );
};
`.trim();

// actions

export const RefactorTableInListProducts = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/list-products.tsx", ListProductsTsx);
                sandpack.setActiveFile("/list-products.tsx");
            }}
        />
    );
};

export const RefactorFormInEditProduct = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/edit-product.tsx", EditProductTsx);
                sandpack.setActiveFile("/edit-product.tsx");
            }}
        />
    );
};

export const RefactorFormInCreateProduct = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/create-product.tsx", CreateProductTsx);
                sandpack.setActiveFile("/create-product.tsx");
            }}
        />
    );
};

export const RefactorFieldsInShowProduct = () => {
    const { sandpack } = useSandpack();

    return (
        <TutorialUpdateFileButton
            onClick={() => {
                sandpack.updateFile("/show-product.tsx", ShowProductTsx);
                sandpack.setActiveFile("/show-product.tsx");
            }}
        />
    );
};

// files

export const files = {
    ...initialFiles,
    "styles.css": {
        code: "",
    },
};

export const finalFiles = {
    ...removeActiveFromFiles(files),
    "list-products.tsx": {
        code: ListProductsTsx,
        active: true,
    },
    "show-product.tsx": {
        code: ShowProductTsx,
    },
    "create-product.tsx": {
        code: CreateProductTsx,
    },
    "edit-product.tsx": {
        code: EditProductTsx,
    },
};
