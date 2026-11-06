import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";
import MDEditor from "@uiw/react-md-editor";
import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
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
    defaultValue: postData?.category?.id,
    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form
        {...formProps}
        layout="vertical"
        style={{ maxWidth: 840 }}
        requiredMark="optional"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a title",
            },
          ]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Category"
              name={["category", "id"]}
              rules={[
                {
                  required: true,
                  message: "Please select a category",
                },
              ]}
            >
              <Select placeholder="Select category" {...categorySelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select a status",
                },
              ]}
            >
              <Select
                placeholder="Select status"
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
          </Col>
        </Row>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please enter post content",
            },
          ]}
        >
          <MDEditor data-color-mode="light" height={320} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
