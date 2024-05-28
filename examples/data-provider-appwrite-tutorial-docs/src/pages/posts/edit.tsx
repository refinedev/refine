import React from "react";
import type { HttpError } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import type { IPost, IPostVariables } from "../../interfaces";

export const PostEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    IPost,
    HttpError,
    IPostVariables
  >();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
