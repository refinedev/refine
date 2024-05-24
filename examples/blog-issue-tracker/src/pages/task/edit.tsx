import { useForm, Edit, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import type { ITask, IPriority, IStatus, IAuthUser } from "interfaces";

export const TaskEdit = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ITask>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Label" name="label">
          <Select {...labelSelectProps} />
        </Form.Item>
        <Form.Item label="Priority" name="priority">
          <Select {...priorityProps} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select {...statusProps} />
        </Form.Item>
        <Form.Item label="Assigne" name="users">
          <Select {...assigneProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
