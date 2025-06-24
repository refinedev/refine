import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const FeedbackCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Message" name="message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, type: "number", min: 1, max: 5 }]}
        >
          <InputNumber min={1} max={5} />
        </Form.Item>
      </Form>
    </Create>
  );
};
