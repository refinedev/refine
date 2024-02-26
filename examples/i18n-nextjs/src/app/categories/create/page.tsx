"use client";

import { Create, useForm } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";

export default function CategoryCreate() {
  const t = useTranslate();
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("categories.fields.title")}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
}
