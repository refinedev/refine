import { Edit, useEditableTable, useForm, useSelect } from "@refinedev/antd";
import { useForm as useFormCore, useShow, useTable } from "@refinedev/core";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    queryResult: queryResultCore,
    mutationResult: mutationResultCore,
    mutation: mutationCore,
    query: queryCore,
  } = useFormCore();
  const { queryResult: queryResultShow } = useShow();
  const { queryResult: queryResultShowSelect, defaultValueQueryResult } =
    useSelect({ resource: "" });
  const { tableQueryResult } = useTable();

  // const { queryResult,query } = useEditableTable();

  const {
    formProps,
    saveButtonProps,
    queryResult,
    mutationResult,
    autoSaveProps,
  } = useForm<IPost>({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
